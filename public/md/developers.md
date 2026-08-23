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

## VeloRix API rate limits

- Quota: 120 requests per 60 second window per client IP. No key, no account.
- Headers on every response: `RateLimit-Policy: "default";q=120;w=60`, `RateLimit: "default";r=<remaining>;t=<reset>`,
  plus `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` and `X-API-Version`.
- On 429: `Retry-After: <seconds>` and error code `rate_limited`. Self-throttle from `RateLimit`.

## VeloRix API error model

Every non-2xx response is `application/problem+json` (RFC 9457) with `type`, `title`, `status`, `detail`, `instance`
and an `error` object carrying `code`, `message` and `hint`. Stable codes: `bad_request`, `page_not_found`,
`no_active_release`, `endpoint_not_found`, `method_not_allowed`, `rate_limited`, `upstream_error`,
`backend_unavailable`, `internal_error`. Every OpenAPI operation references this schema for 4xx, 5xx and `default`.

## VeloRix API versioning and deprecation

URL path versioning (`/api/v1`), `X-API-Version` on every response, `Deprecation` + `Sunset` headers with a minimum
180 day window before a version is removed, and `Link; rel="deprecation-policy"` on every response. Full policy:
https://velorix-hub.vercel.app/md/versioning.md

## VeloRix MCP live handshake

`POST` a JSON-RPC 2.0 `initialize` request to https://velorix-hub.vercel.app/.well-known/mcp (or /mcp) for a live
Streamable HTTP handshake. `GET` on the same URL returns the manifest document.

## Predictable VeloRix developer URLs

- /developers, /docs, /api-docs — this page (HTML)
- /md/developers.md — this page (Markdown)
- /openapi.json, /api/openapi.json, /.well-known/openapi.json — OpenAPI 3.1 spec
- /.well-known/api-catalog — RFC 9727 linkset
- /.well-known/mcp — MCP manifest + live handshake
- /md/versioning.md — rate limit, error and deprecation policy
- /developers.md — this page (Markdown, alias of /md/developers.md)
- /api, /api/v1 — REST API index
- /mcp.json — MCP manifest alias
- /velorix-openapi.json — OpenAPI spec alias
- /.well-known/llms.txt — llms.txt alias

## VeloRix static-document rate limit headers

Every VeloRix response — including HTML pages, `/md/*.md`, `/openapi.json` and `/.well-known/*` — carries
`RateLimit-Policy: "static";q=600;w=60, "default";q=120;w=60`, `RateLimit`, `X-RateLimit-Limit`,
`X-RateLimit-Remaining`, `X-RateLimit-Reset`, `X-API-Version: v1` and a `Link` header advertising
`rel="deprecation-policy"`, `rel="service-desc"`, `rel="api-catalog"` and `rel="help"`. Live per-IP counters
appear on `/api/v1` responses; static responses advertise the burst budget.
