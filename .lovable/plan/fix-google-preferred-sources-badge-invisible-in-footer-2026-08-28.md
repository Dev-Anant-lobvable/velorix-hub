# Fix: Google Preferred Sources badge invisible in footer

## Root cause

The badge placeholder (`google-add-preferred-source-btn` div in `src/components/PreferredSourceButton.tsx`) only gets filled when Google's `publisher.js` script loads AND decides to render a badge. Three reasons it's invisible:

1. **The deeplink fallback is inside `<noscript>`** — with JavaScript on (always, in your screenshot), the fallback link never renders. So when Google's script fails to inject the badge, the slot is just an empty div.
2. **Google's script renders nothing unless the site qualifies** — the badge only appears for sites Google recognizes as a news source (Preferred Sources / Publisher Center). `velorix-hub.vercel.app` isn't recognized yet, so the script loads but leaves the div empty.
3. **Ad blockers / browsers (like Mi Browser WebView) often block `news.google.com` scripts**, again leaving an empty slot.

## Changes

### 1. Always-visible fallback (`src/components/PreferredSourceButton.tsx`)
- Replace the `<noscript>`-only fallback with a real, always-rendered styled link/button: "Add VeloRix as a Preferred Source on Google" pointing to `https://www.google.com/preferences/source?q=velorix-hub.vercel.app`.
- Render it as a theme-matching dark pill button (crimson hover) with a small Google/G icon — no dependency on Google's script at all.
- Keep the `google-add-preferred-source-btn` attribute div **hidden behind** the custom button: if Google's script does inject its badge, we show the official badge and hide the custom fallback (detect injected children via a `MutationObserver`-free approach: a tiny `useEffect` that checks `div.childElementCount > 0` after a short delay and toggles which one is visible). GPU-safe, no loops, runs once.

### 2. Verify script loading
- Confirm `publisher.js` in `src/routes/__root.tsx` head scripts is still correct (it is); no change needed beyond keeping it `async`.

### 3. Verification
- Build check + footer inspection: the custom button must be visible even with the Google script blocked (simulated by blocking the request).
- Confirm official badge swap still works if Google ever injects it.

## What you still need to do on Google's side (not code)
- The deeplink only works for end users if `velorix-hub.vercel.app` is known to Google News. Steps: verify the domain in Google Search Console (done earlier), then set up the publication in **Google Publisher Center** (publishercenter.google.com) and submit for inclusion. Until Google approves it, the deeplink page may say the source isn't available — that's a Google-side approval, not a bug.

## Technical details
- Files touched: `src/components/PreferredSourceButton.tsx` (rewrite), possibly a small helper inline.
- No new dependencies. No API keys. Performance: one-time effect, no animation loops — safe on the Poco F7.
