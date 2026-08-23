import { next } from "@vercel/edge";

export const config = {
  // Every path except static assets and the API/MCP proxies. Known routes fall
  // through untouched; unknown ones get a real 404 with an agent-readable body.
  // `/.well-known/mcp` is matched explicitly so POST handshakes reach the live
  // MCP server while GET keeps serving the static manifest.
  matcher: ["/((?!api/|mcp|md/|assets/|fonts/|sounds/|.well-known/|_vercel).*)", "/.well-known/mcp"],
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

/** Every path the SPA (or a static document) actually serves. */
const KNOWN_PATHS = new Set([
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/help",
  "/download",
  "/status",
  "/changelog",
  "/blog",
  "/crew",
  "/vx-control",
  "/maintenance",
  "/offline",
  "/developers",
]);

const KNOWN_PREFIXES = ["/blog/", "/p/", "/error/"];

const VARY = "Accept, Accept-Encoding";

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

function isKnown(path: string): boolean {
  if (KNOWN_PATHS.has(path)) return true;
  if (KNOWN_PREFIXES.some((prefix) => path.startsWith(prefix) && path.length > prefix.length)) return true;
  // Static files (anything with an extension) are served by Vercel directly.
  return /\.[a-z0-9]+$/i.test(path);
}

const NOT_FOUND_MARKDOWN = `# 404 Not Found

The requested path does not exist on VeloRix Tournaments.

## Where to look instead

- Site index for agents: /llms.txt
- Full text export: /llms-full.txt
- Developer resources: /developers
- OpenAPI specification: /openapi.json
- JSON API index: /api/v1
- MCP server handshake: /.well-known/mcp
- Sitemap: /sitemap.xml
- Home: /

Contact: service.veloxyra@gmail.com
`;

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : "/";
  const mirror = MARKDOWN_MIRRORS[path || "/"];

  if (mirror && wantsMarkdown(request, url)) {
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
          link: `<${url.origin}${mirror}>; rel="alternate"; type="text/markdown"`,
        },
      });
    }
  }

  if (!isKnown(path)) {
    const accept = request.headers.get("accept") ?? "";
    // Browsers ask for text/html and get the styled 404 document; agents and
    // plain clients get a markdown body they can act on.
    if (!/text\/html/i.test(accept)) {
      return new Response(NOT_FOUND_MARKDOWN, {
        status: 404,
        headers: {
          "content-type": "text/markdown; charset=utf-8",
          vary: VARY,
          "x-robots-tag": "noindex, follow",
          link: `<${url.origin}/llms.txt>; rel="help"`,
        },
      });
    }
  }

  return next({ headers: { vary: VARY } });
}
