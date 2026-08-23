// VeloRix public read-only JSON API. Mounted publicly at https://velorix-hub.vercel.app/api/v1/*
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.105.3";

const BASE_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, accept",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=60, s-maxage=300",
  Vary: "Accept, Accept-Encoding",
};

const ok = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body, null, 2), { status, headers: BASE_HEADERS });

/** RFC 9457-shaped JSON error every failing request returns. */
const fail = (
  status: number,
  code: string,
  message: string,
  hint: string,
  extra: Record<string, unknown> = {},
) =>
  new Response(
    JSON.stringify(
      {
        type: `https://velorix-hub.vercel.app/developers#${code}`,
        title: code,
        status,
        error: { code, message, hint, ...extra },
      },
      null,
      2,
    ),
    { status, headers: { ...BASE_HEADERS, "Content-Type": "application/problem+json; charset=utf-8" } },
  );

const env = (name: string) => Deno.env.get(name)?.trim();

function publishableKey(): string | undefined {
  const direct = env("SUPABASE_PUBLISHABLE_KEY");
  if (direct) return direct;
  const keyset = env("SUPABASE_PUBLISHABLE_KEYS");
  if (keyset) {
    try {
      const parsed = JSON.parse(keyset) as Record<string, unknown>;
      const key = [parsed.default, ...Object.values(parsed)].find(
        (v): v is string => typeof v === "string" && v.trim().startsWith("sb_publishable_"),
      );
      if (key) return key.trim();
    } catch {
      // fall through to the legacy name
    }
  }
  return env("SUPABASE_ANON_KEY");
}

const client = () => {
  const url = env("SUPABASE_URL");
  const key = publishableKey();
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: BASE_HEADERS });
  if (req.method !== "GET" && req.method !== "HEAD") {
    return fail(
      405,
      "method_not_allowed",
      `HTTP ${req.method} is not supported by the VeloRix public API.`,
      "This API is read-only. Use GET.",
      { allowed_methods: ["GET", "OPTIONS"] },
    );
  }

  const url = new URL(req.url);
  // Strip both the Supabase function prefix and the public /api mount point.
  const path =
    "/" +
    url.pathname
      .replace(/^\/functions\/v1\/public-api/, "")
      .replace(/^\/public-api/, "")
      .replace(/^\/api/, "")
      .replace(/^\/v1/, "")
      .replace(/^\/+|\/+$/g, "");

  const supabase = client();
  if (!supabase) {
    return fail(503, "backend_unavailable", "The VeloRix backend is not reachable.", "Retry in a few seconds.");
  }

  try {
    if (path === "/" || path === "/index") {
      return ok({
        name: "VeloRix Tournaments public API",
        version: "1.0.0",
        openapi: "https://velorix-hub.vercel.app/openapi.json",
        documentation: "https://velorix-hub.vercel.app/developers",
        mcp: "https://velorix-hub.vercel.app/.well-known/mcp",
        endpoints: [
          { operationId: "listPages", method: "GET", path: "/api/v1/pages" },
          { operationId: "getPage", method: "GET", path: "/api/v1/pages/{slug}" },
          { operationId: "getActiveApk", method: "GET", path: "/api/v1/apk/active" },
          { operationId: "getSiteStatus", method: "GET", path: "/api/v1/status" },
        ],
      });
    }

    if (path === "/pages") {
      const { data, error } = await supabase
        .from("custom_pages")
        .select("slug,title,subtitle,updated_at")
        .eq("published", true)
        .order("updated_at", { ascending: false });
      if (error) return fail(502, "upstream_error", error.message, "Retry the request shortly.");
      return ok({ items: data ?? [], count: data?.length ?? 0 });
    }

    const pageMatch = /^\/pages\/([^/]+)$/.exec(path);
    if (pageMatch) {
      const slug = decodeURIComponent(pageMatch[1]).toLowerCase();
      const { data, error } = await supabase
        .from("custom_pages")
        .select("slug,title,subtitle,content,updated_at")
        .eq("published", true)
        .eq("slug", slug)
        .maybeSingle();
      if (error) return fail(502, "upstream_error", error.message, "Retry the request shortly.");
      if (!data) {
        return fail(
          404,
          "page_not_found",
          `No published page exists with slug '${slug}'.`,
          "Call GET /api/v1/pages to list valid slugs.",
          { slug },
        );
      }
      return ok(data);
    }

    if (path === "/apk/active") {
      const { data, error } = await supabase
        .from("apk_versions")
        .select("version,file_path,file_size,changelog,released_at")
        .eq("is_active", true)
        .order("released_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) return fail(502, "upstream_error", error.message, "Retry the request shortly.");
      if (!data) {
        return fail(
          404,
          "no_active_release",
          "No active VeloRix Android release is published yet.",
          "Check https://velorix-hub.vercel.app/download for the current release.",
        );
      }
      return ok(data);
    }

    if (path === "/status") {
      const { data, error } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "maintenance")
        .maybeSingle();
      if (error) return fail(502, "upstream_error", error.message, "Retry the request shortly.");
      const cfg = (data?.value ?? {}) as { enabled?: boolean; message?: string };
      const maintenance = Boolean(cfg.enabled);
      return ok({
        status: maintenance ? "maintenance" : "live",
        maintenance,
        message: cfg.message ?? "VeloRix is live.",
        checked_at: new Date().toISOString(),
      });
    }

    return fail(
      404,
      "endpoint_not_found",
      `No VeloRix API endpoint matches '${path}'.`,
      "See https://velorix-hub.vercel.app/openapi.json for every available operation.",
      { path },
    );
  } catch (e) {
    return fail(
      500,
      "internal_error",
      e instanceof Error ? e.message : "Unexpected server error.",
      "Retry the request; if it persists contact service.veloxyra@gmail.com.",
    );
  }
});
