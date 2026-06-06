import { createClient } from "https://esm.sh/@supabase/supabase-js@2.105.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const lookupCountry = async (ip: string): Promise<string | null> => {
  if (!ip || ip === "unknown" || ip.startsWith("127.") || ip.startsWith("192.168.")) return null;
  try {
    const res = await fetch(`https://ipapi.co/${ip}/country/`);
    if (!res.ok) return null;
    const txt = (await res.text()).trim();
    return txt.length === 2 ? txt : null;
  } catch {
    return null;
  }
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) return json({ error: "Not configured" }, 500);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Bad body" }, 400);
  }

  const event_type = String(body.event_type ?? "").slice(0, 64);
  if (!event_type) return json({ error: "event_type required" }, 400);

  const ALLOWED_EVENTS = new Set([
    "page_view","download_click","download_complete","cta_click",
    "outbound_click","video_play","faq_open","ping",
  ]);
  if (!ALLOWED_EVENTS.has(event_type)) {
    return json({ error: "unknown event_type" }, 400);
  }

  const path = body.path ? String(body.path).slice(0, 256) : null;
  const session_id = body.session_id ? String(body.session_id).slice(0, 64) : null;
  const metadata = (body.metadata && typeof body.metadata === "object") ? body.metadata : {};

  // Cap metadata payload to 4KB to prevent storage exhaustion.
  try {
    if (JSON.stringify(metadata).length > 4096) {
      return json({ error: "metadata too large" }, 413);
    }
  } catch {
    return json({ error: "invalid metadata" }, 400);
  }

  const ip = (req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") || "unknown");
  const ua = (req.headers.get("user-agent") ?? "").slice(0, 256);
  const country = await lookupCountry(ip);

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { error } = await admin.from("analytics_events").insert({
    event_type, path, country, ua, session_id, metadata,
  });
  if (error) return json({ error: error.message }, 400);
  return json({ ok: true });
});