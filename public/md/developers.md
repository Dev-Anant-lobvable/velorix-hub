# VeloRix Tournaments — Developer & Agent Resources

This page lists every machine-readable resource VeloRix Tournaments publishes, so agents and developers can integrate without scraping the HTML app shell.

## MCP server (Model Context Protocol)

VeloRix publishes a first-party MCP server over Streamable HTTP.

- Handshake document: [/.well-known/mcp](/.well-known/mcp)
- Transport: Streamable HTTP (JSON-RPC 2.0)
- Authentication: none (public, read-only tools)
- Server name: `velorix-mcp` — title "VeloRix", version 0.1.0

Tools exposed:

- `list_published_pages` — list published VeloRix custom pages (tournaments, announcements, policies) with slug, title and subtitle.
- `get_page` — fetch the full markdown of a published page by `slug`.
- `get_active_apk` — current Android APK version, changelog, size and download path.
- `get_site_status` — whether the site is live or in maintenance, plus the current status message.

## Agent files

- [/llms.txt](/llms.txt) — curated site index with a "when to use" section
- [/llms-full.txt](/llms-full.txt) — full text of all editorial content
- [/ai.txt](/ai.txt) — training, retrieval and attribution policy
- [/robots.txt](/robots.txt) — crawler rules (AI crawlers explicitly allowed)
- [/sitemap.xml](/sitemap.xml) — all public URLs

## Markdown content negotiation

Send `Accept: text/markdown` to `/`, `/about`, `/contact`, `/privacy`, `/terms`, `/download` or `/developers` and the site responds with `text/markdown` and `Vary: Accept, Accept-Encoding`. The same documents are also addressable directly under `/md/`, for example [/md/index.md](/md/index.md) and [/md/about.md](/md/about.md). Appending `?format=md` works as an explicit override.

## Conventions

- Unknown paths return HTTP 404 with a short markdown body pointing at these resources.
- Public content may be quoted with attribution to "VeloRix Tournaments" and a link to the source page.
- Private areas (`/vx-control`, `/crew`) are excluded from crawling and are not part of any public interface.

Contact for integration questions: service.veloxyra@gmail.com
