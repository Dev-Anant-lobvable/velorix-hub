import { next } from "@vercel/edge";

export const config = {
  matcher: [
    "/",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/download",
    "/developers",
  ],
};

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

  return next({ headers: { vary: VARY } });
}
