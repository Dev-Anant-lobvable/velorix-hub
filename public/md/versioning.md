# VeloRix Tournaments API — rate limits, versioning and deprecation policy

Applies to the VeloRix Tournaments public REST API (`https://velorix-hub.vercel.app/api/v1`),
described by the OpenAPI 3.1 document at <https://velorix-hub.vercel.app/openapi.json>,
and to the VeloRix MCP server at <https://velorix-hub.vercel.app/mcp>.

Contact: service.veloxyra@gmail.com · Developer index: <https://velorix-hub.vercel.app/developers>

## Rate limits

- Quota: **120 requests per 60 second window, per client IP.** No API key or account is required.
- Every response carries the RFC 9331 style headers:
  - `RateLimit-Policy: "default";q=120;w=60` — the advertised policy.
  - `RateLimit: "default";r=<remaining>;t=<seconds until reset>` — live quota state.
  - Legacy mirrors: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
- When the quota is exhausted the API returns **HTTP 429** with:
  - `Retry-After: <seconds>`
  - an `application/problem+json` body whose `error.code` is `rate_limited` and whose
    `error.retry_after` repeats the wait in seconds.
- Agents should self-throttle from `RateLimit` instead of retrying blindly. Retries must use
  exponential backoff and must honour `Retry-After`.
- `503 backend_unavailable` also carries `Retry-After`.
- **Static documents** (HTML pages, `/md/*.md`, `/openapi.json`, `/llms.txt`, `/.well-known/*`) are served from
  the CDN under a separate advertised policy, `"static";q=600;w=60`. Those responses repeat
  `RateLimit-Policy: "static";q=600;w=60, "default";q=120;w=60` together with `RateLimit`, the
  `X-RateLimit-*` mirrors and `X-API-Version`, so an agent can read the policy before it ever calls
  `/api/v1`. Only `/api/v1` responses carry a live per-IP remaining counter; on static documents the
  values state the burst budget, not a live count.

## Error model

Every non-2xx response is an RFC 9457 problem document with `Content-Type: application/problem+json`:

```json
{
  "type": "https://velorix-hub.vercel.app/developers#page_not_found",
  "title": "page_not_found",
  "status": 404,
  "detail": "No published page exists with slug 'nope'.",
  "instance": "/api/v1/pages/nope",
  "error": {
    "code": "page_not_found",
    "message": "No published page exists with slug 'nope'.",
    "hint": "Call GET /api/v1/pages to list valid slugs.",
    "slug": "nope"
  }
}
```

Stable error codes: `bad_request`, `page_not_found`, `no_active_release`, `endpoint_not_found`,
`method_not_allowed`, `rate_limited`, `upstream_error`, `backend_unavailable`, `internal_error`.
The full enum is published in the OpenAPI document under `components.schemas.Error`.

## Predictable resource URLs

- `/developers`, `/docs`, `/api-docs` — developer and agent resource index (HTML)
- `/developers.md`, `/md/developers.md` — the same index in Markdown
- `/openapi.json`, `/api/openapi.json`, `/.well-known/openapi.json`, `/velorix-openapi.json` — OpenAPI 3.1 document
- `/api`, `/api/v1` — REST API index
- `/.well-known/mcp`, `/mcp.json` — MCP manifest (`GET`) and live handshake (`POST`)
- `/mcp` — Streamable HTTP MCP endpoint
- `/llms.txt`, `/.well-known/llms.txt`, `/llms-full.txt`, `/ai.txt` — agent index, full text export, usage policy

## Versioning

- Scheme: **URL path versioning.** The current version is `v1` at `/api/v1`.
- Every response includes `X-API-Version: v1`.
- Additive, backwards-compatible changes (new endpoints, new optional query parameters, new
  response fields) ship inside the current version without notice. Clients must ignore unknown
  fields.
- Breaking changes (removing or renaming a field, changing a type, changing an error code, changing
  required parameters) only ship in a new version path, for example `/api/v2`.

## Deprecation and sunset

- A version scheduled for removal is announced on this page and signalled on **every response** of
  the affected version:
  - `Deprecation: @<unix-timestamp>` (RFC 9745) — when the version became deprecated.
  - `Sunset: <HTTP-date>` (RFC 8594) — when the version stops responding.
  - `Link: <https://velorix-hub.vercel.app/md/versioning.md>; rel="deprecation-policy"` — this page,
    present on every response at all times.
- **Minimum support window: 180 days** between the `Deprecation` announcement and the `Sunset` date.
- After the sunset date the version returns `410 Gone` with the `endpoint_not_found` error code and a
  hint naming the successor version.
- Current status: **`v1` is active. No deprecation is scheduled, so no `Deprecation` or `Sunset`
  header is sent today.**

## MCP server

The MCP server (`/mcp`, Streamable HTTP, JSON-RPC 2.0, no auth) follows the same policy: tool names
and input schemas are additive within a protocol version, tool removals are announced here with the
same 180 day window. The handshake document is at <https://velorix-hub.vercel.app/.well-known/mcp>
(`GET` returns the manifest, `POST` is proxied to the live MCP endpoint).
