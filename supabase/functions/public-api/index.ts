// VeloRix public read-only JSON API. Mounted publicly at https://velorix-hub.vercel.app/api/v1/*
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.105.3";

const SITE = "https://velorix-hub.vercel.app";
const API_VERSION = "v1";
const VERSION_POLICY = `${SITE}/md/versioning.md`;

/** Rate limit policy: RFC 9331 style, advertised on every response. */
const RATE_LIMIT = 120;
const RATE_WINDOW_SECONDS = 60;
const buckets = new Map<string, { count: number; resetAt: number }>();

function consume(ip: string) {
  const now = Date.now();
  let bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + RATE_WINDOW_SECONDS * 1000 };
    buckets.set(ip, bucket);
  }
  bucket.count += 1;
  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [key, value] of buckets) if (value.resetAt <= now) buckets.delete(key);
  }
  const reset = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
  const remaining = Math.max(0, RATE_LIMIT - bucket.count);
  return { limited: bucket.count > RATE_LIMIT, remaining, reset };
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  return fwd.split(",")[0].trim() || req.headers.get("cf-connecting-ip") || "unknown";
}

const baseHeaders = (state: { remaining: number; reset: number }) => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, accept",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Expose-Headers":
    "RateLimit, RateLimit-Policy, Retry-After, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-API-Version",
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=60, s-maxage=300",
  Vary: "Accept, Accept-Encoding",
  "X-API-Version": API_VERSION,
  Link: `<${VERSION_POLICY}>; rel="deprecation-policy", <${SITE}/openapi.json>; rel="service-desc"`,
  "RateLimit-Policy": `"default";q=${RATE_LIMIT};w=${RATE_WINDOW_SECONDS}`,
  RateLimit: `"default";r=${state.remaining};t=${state.reset}`,
  "X-RateLimit-Limit": String(RATE_LIMIT),
  "X-RateLimit-Remaining": String(state.remaining),
  "X-RateLimit-Reset": String(state.reset),
});

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
  const state = consume(clientIp(req));
  const headers = baseHeaders(state);

  const ok = (body: unknown, pretty = true) =>
    new Response(JSON.stringify(body, null, pretty ? 2 : 0), { status: 200, headers });

  /** RFC 9457 problem document every failing request returns. */
  const fail = (
    status: number,
    code: string,
    message: string,
    hint: string,
    extra: Record<string, unknown> = {},
    extraHeaders: Record<string, string> = {},
  ) =>
    new Response(
      JSON.stringify(
        {
          type: `${SITE}/developers#${code}`,
          title: code,
          status,
          detail: message,
          instance: new URL(req.url).pathname,
          error: { code, message, hint, ...extra },
        },
        null,
        2,
      ),
      {
        status,
        headers: {
          ...headers,
          ...extraHeaders,
          "Content-Type": "application/problem+json; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );

  if (req.method === "OPTIONS") return new Response("ok", { headers });

  if (state.limited) {
    return fail(
      429,
      "rate_limited",
      `Rate limit of ${RATE_LIMIT} requests per ${RATE_WINDOW_SECONDS}s exceeded.`,
      `Wait ${state.reset} seconds, then retry. Read the RateLimit header to self-throttle.`,
      { retry_after: state.reset },
      { "Retry-After": String(state.reset) },
    );
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    return fail(
      405,
      "method_not_allowed",
      `HTTP ${req.method} is not supported by the VeloRix public API.`,
      "This API is read-only. Use GET.",
      { allowed_methods: ["GET", "HEAD", "OPTIONS"] },
      { Allow: "GET, HEAD, OPTIONS" },
    );
  }

  const url = new URL(req.url);
  const pretty = url.searchParams.get("pretty") !== "false" && url.searchParams.get("pretty") !== "0";
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
    return fail(
      503,
      "backend_unavailable",
      "The VeloRix backend is not reachable.",
      "Retry in a few seconds.",
      { retry_after: 5 },
      { "Retry-After": "5" },
    );
  }

  try {
    if (path === "/" || path === "/index") {
      return ok(
        {
          name: "VeloRix Tournaments public API",
          version: "1.0.0",
          api_version: API_VERSION,
          openapi: `${SITE}/openapi.json`,
          documentation: `${SITE}/developers`,
          mcp: `${SITE}/.well-known/mcp`,
          rate_limit: {
            limit: RATE_LIMIT,
            window_seconds: RATE_WINDOW_SECONDS,
            headers: ["RateLimit-Policy", "RateLimit", "Retry-After", "X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"],
            documentation: `${VERSION_POLICY}#rate-limits`,
          },
          versioning: {
            current: API_VERSION,
            scheme: "url-path",
            deprecation_signals: ["Deprecation", "Sunset", "Link; rel=deprecation-policy"],
            minimum_support_window_days: 180,
            policy: VERSION_POLICY,
          },
          endpoints: [
            { operationId: "getApiIndex", method: "GET", path: "/api/v1" },
            { operationId: "listPages", method: "GET", path: "/api/v1/pages" },
            { operationId: "getPage", method: "GET", path: "/api/v1/pages/{slug}" },
            { operationId: "getActiveApk", method: "GET", path: "/api/v1/apk/active" },
            { operationId: "getSiteStatus", method: "GET", path: "/api/v1/status" },
          ],
        },
        pretty,
      );
    }

    if (path === "/pages") {
      const rawLimit = url.searchParams.get("limit");
      const rawOffset = url.searchParams.get("offset");
      const q = url.searchParams.get("q");
      const limit = rawLimit === null ? 50 : Number(rawLimit);
      const offset = rawOffset === null ? 0 : Number(rawOffset);
      if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        return fail(400, "bad_request", "'limit' must be an integer between 1 and 100.", "Omit it to use the default of 50.", {
          parameter: "limit",
        });
      }
      if (!Number.isInteger(offset) || offset < 0) {
        return fail(400, "bad_request", "'offset' must be an integer of 0 or more.", "Omit it to start from the first page.", {
          parameter: "offset",
        });
      }
      if (q !== null && (q.length < 1 || q.length > 80)) {
        return fail(400, "bad_request", "'q' must be 1 to 80 characters.", "Use a shorter title fragment.", { parameter: "q" });
      }

      let query = supabase
        .from("custom_pages")
        .select("slug,title,subtitle,updated_at")
        .eq("published", true)
        .order("updated_at", { ascending: false })
        .range(offset, offset + limit - 1);
      if (q) query = query.ilike("title", `%${q}%`);
      const { data, error } = await query;
      if (error) return fail(502, "upstream_error", error.message, "Retry the request shortly.");
      return ok({ items: data ?? [], count: data?.length ?? 0, limit, offset, query: q }, pretty);
    }

    const pageMatch = /^\/pages\/([^/]+)$/.exec(path);
    if (pageMatch) {
      const slug = decodeURIComponent(pageMatch[1]).toLowerCase();
      if (!/^[a-z0-9-]{1,120}$/.test(slug)) {
        return fail(400, "bad_request", "'slug' must be lowercase letters, digits and hyphens only.", "Call GET /api/v1/pages to list valid slugs.", {
          parameter: "slug",
        });
      }
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
      return ok(data, pretty);
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
          `Check ${SITE}/download for the current release.`,
        );
      }
      return ok(data, pretty);
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
      return ok(
        {
          status: maintenance ? "maintenance" : "live",
          maintenance,
          message: cfg.message ?? "VeloRix is live.",
          checked_at: new Date().toISOString(),
        },
        pretty,
      );
    }

    return fail(
      404,
      "endpoint_not_found",
      `No VeloRix API endpoint matches '${path}'.`,
      `See ${SITE}/openapi.json for every available operation.`,
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
