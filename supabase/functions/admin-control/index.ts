import { createClient } from "https://esm.sh/@supabase/supabase-js@2.105.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PASSWORD_HASH = "b8c1492b155ef5625aaae2fbb34aa4fbac223b766feffafc17383a79026bfa94";
const TOKEN_TTL_MS = 20 * 60 * 1000;

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
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  if (action === "login") {
    const password = String(body.password ?? "");
    if ((await sha256(password)) !== PASSWORD_HASH) return json({ error: "Wrong password" }, 401);
    return json({ token: await createToken(serviceKey) });
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
    return json({ page: data });
  }

  if (action === "delete_page") {
    const slug = String(body.slug ?? "").trim().toLowerCase();
    if (!slug) return json({ error: "Slug is required" }, 400);
    const { error } = await admin.from("custom_pages").delete().eq("slug", slug);
    if (error) return json({ error: error.message }, 400);
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
    return json({ config: data });
  }

  return json({ error: "Unknown action" }, 400);
});