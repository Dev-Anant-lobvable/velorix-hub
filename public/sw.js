// VeloRix service worker — runtime caching for faster loads on slow networks.
// Strategies:
//   - Navigations (HTML): network-first w/ 4s timeout, fallback to cached shell, then offline page.
//   - Static hashed assets (JS/CSS): stale-while-revalidate.
//   - Images / fonts: cache-first with background refresh.
//   - API / Supabase / analytics: always network, never cached.

const VERSION = 'v3';
const SHELL_CACHE = `velorix-shell-${VERSION}`;
const ASSET_CACHE = `velorix-assets-${VERSION}`;
const IMAGE_CACHE = `velorix-images-${VERSION}`;
const OFFLINE_URL = '/offline.html';
const SHELL_ASSETS = ['/', '/offline.html', '/velorix-favicon.png'];

const NEVER_CACHE_HOSTS = [
  'supabase.co',
  'supabase.in',
  'googletagmanager.com',
  'google-analytics.com',
  'vercel-insights.com',
  'vercel-analytics.com',
  'trustpilot.com',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  const keep = new Set([SHELL_CACHE, ASSET_CACHE, IMAGE_CACHE]);
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function timeoutFetch(request, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    fetch(request).then((res) => {
      clearTimeout(t);
      resolve(res);
    }).catch((err) => {
      clearTimeout(t);
      reject(err);
    });
  });
}

async function networkFirstNavigation(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const res = await timeoutFetch(request, 4000);
    if (res && res.ok) cache.put('/', res.clone());
    return res;
  } catch (_) {
    const cached = (await cache.match(request)) || (await cache.match('/'));
    return cached || cache.match(OFFLINE_URL);
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((res) => {
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  }).catch(() => cached);
  return cached || fetchPromise;
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    // Background refresh (non-blocking)
    fetch(request).then((res) => { if (res && res.ok) cache.put(request, res.clone()); }).catch(() => {});
    return cached;
  }
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  } catch (err) {
    return cached || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Skip cross-origin things we should never cache (API/analytics)
  if (NEVER_CACHE_HOSTS.some((h) => url.hostname.endsWith(h))) return;

  // Skip chrome-extension, ws, etc.
  if (!url.protocol.startsWith('http')) return;

  // HTML navigations
  if (req.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(req));
    return;
  }

  const dest = req.destination;

  // Images (cache-first, long-lived)
  if (dest === 'image') {
    event.respondWith(cacheFirst(req, IMAGE_CACHE));
    return;
  }

  // Fonts (cache-first)
  if (dest === 'font' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(req, ASSET_CACHE));
    return;
  }

  // Scripts, styles, workers — stale-while-revalidate
  if (dest === 'script' || dest === 'style' || dest === 'worker' || url.hostname === 'fonts.googleapis.com') {
    event.respondWith(staleWhileRevalidate(req, ASSET_CACHE));
    return;
  }

  // Same-origin GETs — SWR as a sensible default
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(req, ASSET_CACHE));
  }
});
