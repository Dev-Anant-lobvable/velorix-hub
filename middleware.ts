import { next } from "@vercel/edge";

export const config = {
  // Only the paths the framework cannot handle itself: the markdown mirrors
  // (Accept negotiation) and the live MCP handshake. Everything else is served
  // by TanStack Start's SSR handler or by Vercel's static layer, untouched.
  matcher: [
    "/",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/download",
    "/developers",
    "/.well-known/mcp",
  ],
};

/** Live MCP endpoint behind the /mcp rewrite. */
const MCP_UPSTREAM = "https://pvzoeafqfkwfgiiflaol.supabase.co/functions/v1/mcp";

/** Route -> markdown mirror served via Accept negotiation (acceptmarkdown.com). */
const MARKDOWN_MIRRORS: Record<string, string> = {
  "/": "/md/index.md",
  "/about": "/md/about.md",
  "/contact": "/md/contact.md",
  "/privacy": "/md/privacy.md",
  "/terms": "/md/terms.md",
  "/download": "/md/download.md",
  "/developers": "/md/developers.md",
};

const VARY = "Accept, Accept-Encoding";

/**
 * Advisory quota + policy signals repeated on every document response so agents
 * can self-throttle before they ever touch /api/v1 (which returns live counters).
 */
const AGENT_HEADERS: Record<string, string> = {
  "ratelimit-policy": '"static";q=600;w=60, "default";q=120;w=60',
  ratelimit: '"static";r=600;t=60',
  "x-ratelimit-limit": "600",
  "x-ratelimit-remaining": "600",
  "x-ratelimit-reset": "60",
  "x-api-version": "v1",
  "access-control-expose-headers":
    "RateLimit, RateLimit-Policy, Retry-After, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-API-Version, Link",
};

function agentHeaders(origin: string, extra: Record<string, string> = {}): Record<string, string> {
  return {
    ...AGENT_HEADERS,
    link: [
      `<${origin}/md/versioning.md>; rel="deprecation-policy"`,
      `<${origin}/openapi.json>; rel="service-desc"`,
      `<${origin}/.well-known/api-catalog>; rel="api-catalog"`,
      `<${origin}/llms.txt>; rel="help"`,
      ...(extra.link ? [extra.link] : []),
    ].join(", "),
    ...Object.fromEntries(Object.entries(extra).filter(([key]) => key !== "link")),
  };
}


/** Normalize an inbound Accept header for the MCP Streamable HTTP transport. */
function mcpAccept(accept: string | null): string {
  const value = accept ?? "";
  const hasJson = /application\/json/i.test(value);
  const hasStream = /text\/event-stream/i.test(value);
  return hasJson && hasStream ? value : "application/json, text/event-stream";
}

function wantsMarkdown(request: Request, url: URL): boolean {
  if (url.searchParams.get("format") === "md") return true;
  const accept = request.headers.get("accept") ?? "";
  if (!/text\/markdown/i.test(accept)) return false;
  // If the client also lists text/html with a strictly higher q, prefer HTML.
  const q = (type: string) => {
    const match = accept
      .split(",")
      .map((part) => part.trim())
      .find((part) => part.toLowerCase().startsWith(type));
    if (!match) return 0;
    const qv = /;\s*q=([0-9.]+)/i.exec(match);
    return qv ? Number.parseFloat(qv[1]) : 1;
  };
  return q("text/markdown") >= q("text/html");
}

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : "/";
  const mirror = MARKDOWN_MIRRORS[path || "/"];

  // Live MCP handshake: JSON-RPC (POST) and session teardown (DELETE) at the
  // well-known URL are proxied to the Streamable HTTP MCP server; GET keeps
  // returning the static manifest document.
  if (path === "/.well-known/mcp") {
    if (request.method === "POST" || request.method === "DELETE") {
      const upstream = await fetch(MCP_UPSTREAM, {
        method: request.method,
        headers: {
          "content-type": request.headers.get("content-type") ?? "application/json",
          // The MCP Streamable HTTP transport requires BOTH media types; plain
          // agents send `*/*` (or nothing), which upstream rejects with 406.
          accept: mcpAccept(request.headers.get("accept")),
          ...(request.headers.get("mcp-session-id")
            ? { "mcp-session-id": request.headers.get("mcp-session-id") as string }
            : {}),
          ...(request.headers.get("mcp-protocol-version")
            ? { "mcp-protocol-version": request.headers.get("mcp-protocol-version") as string }
            : {}),
        },
        body: request.method === "POST" ? await request.text() : undefined,
      });
      const headers = new Headers(upstream.headers);
      headers.set("access-control-allow-origin", "*");
      for (const [key, value] of Object.entries(agentHeaders(url.origin, { link: `<${url.origin}/mcp>; rel="mcp-server"` }))) {
        headers.set(key, value);
      }
      return new Response(upstream.body, { status: upstream.status, headers });
    }
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, POST, DELETE, OPTIONS",
          "access-control-allow-headers": "content-type, accept, mcp-session-id, mcp-protocol-version",
        },
      });
    }
    return next({ headers: agentHeaders(url.origin, { link: `<${url.origin}/mcp>; rel="mcp-server"`, vary: VARY }) });
  }


  // Clients that cannot take HTML at all (plain agents sending
  // `Accept: application/json`) get the markdown mirror instead of the SSR
  // handler, which rejects non-HTML document requests.
  const acceptsHtml = /text\/html|\*\/\*/i.test(request.headers.get("accept") ?? "*/*");

  if (mirror && (wantsMarkdown(request, url) || !acceptsHtml)) {
    const upstream = await fetch(new URL(mirror, url.origin), {
      headers: { accept: "text/plain" },
    });
    if (upstream.ok) {
      return new Response(await upstream.text(), {
        status: 200,
        headers: {
          "content-type": "text/markdown; charset=utf-8",
          vary: VARY,
          "cache-control": "public, max-age=300, s-maxage=600",
          ...agentHeaders(url.origin, {
            link: `<${url.origin}${mirror}>; rel="alternate"; type="text/markdown"`,
          }),
        },
      });
    }
  }

  return next({ headers: agentHeaders(url.origin, { vary: VARY }) });
}
