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

## Public JSON API

VeloRix publishes a read-only REST API described by an OpenAPI 3.1 document.

- OpenAPI specification: [/openapi.json](/openapi.json) (also at [/api/openapi.json](/api/openapi.json))
- Base URL: `https://velorix-hub.vercel.app/api/v1`
- Authentication: none (public, read-only)
- Errors: `application/problem+json` with `status` and an `error` object carrying `code`, `message` and `hint`

Operations (unique `operationId`, typed parameters and response schemas in the spec):

- `getApiIndex` — `GET /api/v1` — API metadata and operation list.
- `listPages` — `GET /api/v1/pages` — published pages with slug, title, subtitle, updated_at.
- `getPage` — `GET /api/v1/pages/{slug}` — full markdown of one published page.
- `getActiveApk` — `GET /api/v1/apk/active` — active Android release: version, size, changelog, path.
- `getSiteStatus` — `GET /api/v1/status` — live or maintenance, with the current status message.

## Agent files

- [/llms.txt](/llms.txt) — curated site index with a "when to use" section
- [/llms-full.txt](/llms-full.txt) — full text of all editorial content
- [/ai.txt](/ai.txt) — training, retrieval and attribution policy
- [/robots.txt](/robots.txt) — crawler rules (AI crawlers explicitly allowed)
- [/sitemap.xml](/sitemap.xml) — all public URLs

## Markdown content negotiation

Send `Accept: text/markdown` to `/`, `/about`, `/contact`, `/privacy`, `/terms`, `/download` or `/developers` and the site responds with `text/markdown` and `Vary: Accept, Accept-Encoding`. The same documents are also addressable directly under `/md/`, for example [/md/index.md](/md/index.md) and [/md/about.md](/md/about.md). Appending `?format=md` works as an explicit override.

Additional markdown-only fact sheets (no HTML equivalent): [/md/pricing.md](/md/pricing.md), [/md/features.md](/md/features.md), [/md/compare.md](/md/compare.md).

## Conventions

- Unknown paths return HTTP 404 with a short markdown body pointing at these resources.
- Public content may be quoted with attribution to "VeloRix Tournaments" and a link to the source page.
- Private areas (`/vx-control`, `/crew`) are excluded from crawling and are not part of any public interface.

Contact for integration questions: service.veloxyra@gmail.com
