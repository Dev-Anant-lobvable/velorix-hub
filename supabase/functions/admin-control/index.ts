import { createClient } from "https://esm.sh/@supabase/supabase-js@2.105.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Admin password hash. Prefer the ADMIN_PASSWORD_HASH secret in the format
//   pbkdf2$<iterations>$<saltBase64>$<hashBase64>
// (use any standard PBKDF2-SHA256 generator to produce one and rotate the password).
// If the env var is missing we fall back to the legacy SHA-256 digest below so
// the panel keeps working — set the secret to a pbkdf2 string to disable the fallback.
const LEGACY_SHA256_HASH = "b8c1492b155ef5625aaae2fbb34aa4fbac223b766feffafc17383a79026bfa94";
const TOKEN_TTL_MS = 20 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 10 * 60 * 1000;
const SUPPORTED_LANGS = ["en","hi","ta","te","mr","bn","pa","gu","kn","ml","es","ar","id","pt"];

const encoder = new TextEncoder();

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
};

const b64ToBytes = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
const bytesToB64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));

const verifyPbkdf2 = async (password: string, stored: string): Promise<boolean> => {
  // Format: pbkdf2$<iterations>$<saltB64>$<hashB64>
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  const iterations = Number(parts[1]);
  if (!Number.isFinite(iterations) || iterations < 1000) return false;
  let salt: Uint8Array; let expected: Uint8Array;
  try { salt = b64ToBytes(parts[2]); expected = b64ToBytes(parts[3]); } catch { return false; }
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const derived = new Uint8Array(
    await crypto.subtle.deriveBits(
      { name: "PBKDF2", hash: "SHA-256", salt, iterations },
      key,
      expected.length * 8,
    ),
  );
  if (derived.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < derived.length; i++) diff |= derived[i] ^ expected[i];
  return diff === 0;
};

const verifyAdminPassword = async (password: string): Promise<boolean> => {
  const envHash = Deno.env.get("ADMIN_PASSWORD_HASH")?.trim();
  if (envHash) {
    if (envHash.startsWith("pbkdf2$")) return verifyPbkdf2(password, envHash);
    // Allow raw SHA-256 hex via env so the password can be rotated without code changes.
    return (await sha256(password)) === envHash.toLowerCase();
  }
  return (await sha256(password)) === LEGACY_SHA256_HASH;
};

const sign = async (payload: string, secret: string) => {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature)).map((b) => b.toString(16).padStart(2, "0")).join("");
};

const createToken = async (secret: string) => {
  const expiry = Date.now() + TOKEN_TTL_MS;
  const nonce = crypto.randomUUID();
  const payload = `${expiry}.${nonce}`;
  return `${payload}.${await sign(payload, secret)}`;
};

const verifyToken = async (token: string | undefined, secret: string) => {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expiryText, nonce, signature] = parts;
  const expiry = Number(expiryText);
  if (!Number.isFinite(expiry) || Date.now() > expiry || !nonce) return false;
  const expected = await sign(`${expiryText}.${nonce}`, secret);
  return expected === signature;
};

const getIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  req.headers.get("cf-connecting-ip") ||
  "unknown";

const audit = async (admin: ReturnType<typeof createClient>, action: string, payload: unknown, ip: string) => {
  try {
    await admin.from("admin_audit_log").insert({ action, payload: payload ?? {}, actor_ip: ip });
  } catch (_) { /* ignore */ }
};

const translateWithAI = async (text: string, targetLang: string): Promise<string> => {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey || !text.trim()) return text;
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: `Translate user text to ${targetLang}. Output ONLY the translated string. Keep brand names like VeloRix, BGMI, Free Fire untouched. Preserve tone.` },
          { role: "user", content: text },
        ],
      }),
    });
    if (!res.ok) return text;
    const data = await res.json();
    return String(data?.choices?.[0]?.message?.content ?? text).trim();
  } catch (_) {
    return text;
  }
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) return json({ error: "Admin service is not configured" }, 500);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const action = String(body.action ?? "");
  const ip = getIp(req);
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  if (action === "login") {
    // Rate limit: count failed attempts from this IP in window
    const since = new Date(Date.now() - LOCKOUT_WINDOW_MS).toISOString();
    const { data: attempts } = await admin
      .from("admin_login_attempts")
      .select("success, created_at")
      .eq("ip", ip)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(20);
    const recentFails = (attempts ?? []).filter((a) => !a.success).length;
    if (recentFails >= MAX_ATTEMPTS) {
      return json({ error: "Too many tries. Wait 10 minutes." }, 429);
    }
    const password = String(body.password ?? "");
    const ok = await verifyAdminPassword(password);
    await admin.from("admin_login_attempts").insert({ ip, success: ok });
    if (!ok) {
      const left = MAX_ATTEMPTS - recentFails - 1;
      return json({ error: left > 0 ? `Wrong password (${left} tries left)` : "Locked for 10 minutes." }, 401);
    }
    await audit(admin, "login", {}, ip);
    return json({ token: await createToken(serviceKey) });
  }

  // Public, unauthenticated health probe used by the status page
  if (action === "ping") {
    return json({ ok: true, ts: Date.now() });
  }

  if (!(await verifyToken(String(body.token ?? ""), serviceKey))) {
    return json({ error: "Admin session expired" }, 401);
  }

  if (action === "list_pages") {
    const { data, error } = await admin.from("custom_pages").select("*").order("updated_at", { ascending: false });
    if (error) return json({ error: error.message }, 400);
    return json({ pages: data ?? [] });
  }

  if (action === "save_page") {
    const page = (body.page ?? {}) as Record<string, unknown>;
    const slug = String(page.slug ?? "").trim().toLowerCase();
    const title = String(page.title ?? "").trim();
    const content = String(page.content ?? "").trim();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return json({ error: "Slug should be like diwali-cup" }, 400);
    if (!title || !content) return json({ error: "Title and content are required" }, 400);

    const payload = {
      slug,
      title,
      subtitle: String(page.subtitle ?? "").trim() || null,
      content,
      published: Boolean(page.published),
    };
    const { data, error } = await admin.from("custom_pages").upsert(payload, { onConflict: "slug" }).select("*").single();
    if (error) return json({ error: error.message }, 400);
    await audit(admin, "save_page", { slug }, ip);
    return json({ page: data });
  }

  if (action === "delete_page") {
    const slug = String(body.slug ?? "").trim().toLowerCase();
    if (!slug) return json({ error: "Slug is required" }, 400);
    const { error } = await admin.from("custom_pages").delete().eq("slug", slug);
    if (error) return json({ error: error.message }, 400);
    await audit(admin, "delete_page", { slug }, ip);
    return json({ ok: true });
  }

  if (action === "set_maintenance") {
    const enabled = Boolean(body.enabled);
    const message = String(body.message ?? "").trim() || "Arena upgrade chal raha hai. Thoda ruk jao, squad soon back hogi.";
    const { data, error } = await admin
      .from("site_config")
      .upsert({ key: "maintenance", value: { enabled, message } }, { onConflict: "key" })
      .select("*")
      .single();
    if (error) return json({ error: error.message }, 400);
    await audit(admin, "set_maintenance", { enabled }, ip);
    return json({ config: data });
  }

  // ---------- site_settings (hero, stats, faq, footer, announcement) ----------
  if (action === "save_settings") {
    const key = String(body.key ?? "").trim();
    const value = body.value;
    if (!key) return json({ error: "Key required" }, 400);
    const { data, error } = await admin
      .from("site_settings")
      .upsert({ key, value: value as object, updated_at: new Date().toISOString() }, { onConflict: "key" })
      .select("*")
      .single();
    if (error) return json({ error: error.message }, 400);
    await audit(admin, "save_settings", { key }, ip);
    return json({ setting: data });
  }

  // ---------- APK versions ----------
  if (action === "list_apk") {
    const { data, error } = await admin.from("apk_versions").select("*").order("released_at", { ascending: false });
    if (error) return json({ error: error.message }, 400);
    return json({ versions: data ?? [] });
  }

  if (action === "create_apk_version") {
    const version = String(body.version ?? "").trim();
    const file_path = String(body.file_path ?? "").trim();
    const file_size = Number(body.file_size ?? 0);
    const changelog = String(body.changelog ?? "").trim();
    const setActive = Boolean(body.set_active);
    if (!version || !file_path) return json({ error: "Version and file required" }, 400);
    if (setActive) await admin.from("apk_versions").update({ is_active: false }).neq("id", "00000000-0000-0000-0000-000000000000");
    const { data, error } = await admin.from("apk_versions").insert({ version, file_path, file_size, changelog, is_active: setActive }).select("*").single();
    if (error) return json({ error: error.message }, 400);
    await audit(admin, "create_apk_version", { version, setActive }, ip);
    return json({ version: data });
  }

  if (action === "set_active_apk") {
    const id = String(body.id ?? "");
    if (!id) return json({ error: "ID required" }, 400);
    await admin.from("apk_versions").update({ is_active: false }).neq("id", "00000000-0000-0000-0000-000000000000");
    const { data, error } = await admin.from("apk_versions").update({ is_active: true }).eq("id", id).select("*").single();
    if (error) return json({ error: error.message }, 400);
    await audit(admin, "set_active_apk", { id }, ip);
    return json({ version: data });
  }

  if (action === "delete_apk") {
    const id = String(body.id ?? "");
    if (!id) return json({ error: "ID required" }, 400);
    const { data: row } = await admin.from("apk_versions").select("file_path").eq("id", id).maybeSingle();
    if (row?.file_path) {
      await admin.storage.from("apk-files").remove([row.file_path]);
    }
    const { error } = await admin.from("apk_versions").delete().eq("id", id);
    if (error) return json({ error: error.message }, 400);
    await audit(admin, "delete_apk", { id }, ip);
    return json({ ok: true });
  }

  // ---------- Analytics summary ----------
  if (action === "analytics_summary") {
    const days = Math.min(Number(body.days ?? 7), 90);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const realtimeSince = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    const [{ data: events }, { data: realtime }] = await Promise.all([
      admin.from("analytics_events").select("event_type, path, country, session_id, created_at").gte("created_at", since).limit(5000),
      admin.from("analytics_events").select("session_id").gte("created_at", realtimeSince).limit(500),
    ]);

    const byType: Record<string, number> = {};
    const byPath: Record<string, number> = {};
    const byCountry: Record<string, number> = {};
    const byDay: Record<string, number> = {};
    const uniqueSessions = new Set<string>();
    let downloads = 0;
    let downloadStarts = 0;

    (events ?? []).forEach((e) => {
      byType[e.event_type] = (byType[e.event_type] ?? 0) + 1;
      if (e.path) byPath[e.path] = (byPath[e.path] ?? 0) + 1;
      if (e.country) byCountry[e.country] = (byCountry[e.country] ?? 0) + 1;
      if (e.session_id) uniqueSessions.add(e.session_id);
      const day = e.created_at?.slice(0, 10) ?? "";
      if (day) byDay[day] = (byDay[day] ?? 0) + 1;
      if (e.event_type === "download_click") downloadStarts++;
      if (e.event_type === "download_complete") downloads++;
    });

    const realtimeUsers = new Set((realtime ?? []).map((r) => r.session_id).filter(Boolean)).size;

    return json({
      totals: { events: events?.length ?? 0, sessions: uniqueSessions.size, downloads, downloadStarts },
      byType, byPath, byCountry, byDay,
      realtimeUsers,
    });
  }

  // ---------- Audit log ----------
  if (action === "list_audit") {
    const { data, error } = await admin.from("admin_audit_log").select("*").order("created_at", { ascending: false }).limit(200);
    if (error) return json({ error: error.message }, 400);
    return json({ entries: data ?? [] });
  }

  // ---------- Translations ----------
  if (action === "list_translations") {
    const namespace = String(body.namespace ?? "").trim();
    const q = admin.from("translations").select("*").order("namespace");
    const { data, error } = namespace ? await q.eq("namespace", namespace) : await q;
    if (error) return json({ error: error.message }, 400);
    return json({ translations: data ?? [], langs: SUPPORTED_LANGS });
  }

  if (action === "save_translation") {
    const namespace = String(body.namespace ?? "").trim();
    const key = String(body.key ?? "").trim();
    const lang = String(body.lang ?? "").trim();
    const value = String(body.value ?? "");
    if (!namespace || !key || !lang) return json({ error: "namespace/key/lang required" }, 400);
    const { data, error } = await admin.from("translations")
      .upsert({ namespace, key, lang, value, updated_at: new Date().toISOString() }, { onConflict: "namespace,key,lang" })
      .select("*").single();
    if (error) return json({ error: error.message }, 400);
    return json({ translation: data });
  }

  if (action === "auto_translate") {
    const namespace = String(body.namespace ?? "").trim();
    const key = String(body.key ?? "").trim();
    const sourceText = String(body.text ?? "");
    const targets = Array.isArray(body.langs) && body.langs.length ? (body.langs as string[]) : SUPPORTED_LANGS;
    if (!namespace || !key || !sourceText) return json({ error: "namespace/key/text required" }, 400);

    const rows: { namespace: string; key: string; lang: string; value: string }[] = [
      { namespace, key, lang: "en", value: sourceText },
    ];
    for (const lang of targets) {
      if (lang === "en") continue;
      const translated = await translateWithAI(sourceText, lang);
      rows.push({ namespace, key, lang, value: translated });
    }
    const { error } = await admin.from("translations").upsert(rows, { onConflict: "namespace,key,lang" });
    if (error) return json({ error: error.message }, 400);
    await audit(admin, "auto_translate", { namespace, key, count: rows.length }, ip);
    return json({ ok: true, count: rows.length });
  }

  // ---------- Signed upload URL for APK ----------
  if (action === "sign_apk_upload") {
    const filename = String(body.filename ?? "").trim();
    if (!/^[\w.\-]+\.apk$/i.test(filename)) return json({ error: "Filename must end with .apk" }, 400);
    const path = `releases/${Date.now()}-${filename}`;
    const { data, error } = await admin.storage.from("apk-files").createSignedUploadUrl(path);
    if (error) return json({ error: error.message }, 400);
    const { data: pub } = admin.storage.from("apk-files").getPublicUrl(path);
    return json({ path, signedUrl: data.signedUrl, token: data.token, publicUrl: pub.publicUrl });
  }

  return json({ error: "Unknown action" }, 400);
});