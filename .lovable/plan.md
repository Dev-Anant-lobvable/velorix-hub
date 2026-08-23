# Make the Vercel deploy actually work on TanStack Start

## Short answer on your screenshot

The settings are fine. Framework Preset = TanStack Start with all four Override toggles OFF is exactly right:

- Build Command -> `vite build` (our `npm run build`)
- Output Directory -> handled by the framework preset, not `dist`
- Install / Dev Command -> defaults are correct

The build itself also auto-detects Vercel and produces a Vercel server bundle, so no config change is needed there.

## What is actually broken

The repo still carries the old Vite single-page-app deployment files from before the migration. They were correct then and are wrong now:

1. `vercel.json` rewrites ~20 routes (`/about`, `/blog/:slug`, `/status`, `/vx-control`, ...) to `/index.html`. That file no longer exists in a TanStack Start build, so on Vercel those pages will 404 or return an empty shell instead of server-rendered HTML.
2. `middleware.ts` (Vercel Edge) keeps its own hardcoded list of "known paths" and returns a synthetic 404 for anything else. It will now fight the real router and can 404 valid routes.
3. `/docs`, `/api-docs`, `/developers` rewrite to `/developers/index.html`, another artifact that no longer exists.

Everything that is not SPA-shell related (API/MCP proxies to the backend, markdown mirrors, rate-limit and content-type headers, `.well-known` files) is still valid and will be kept.

## The plan

1. Strip every `-> /index.html` and `-> /developers/index.html` rewrite from `vercel.json`. TanStack Start serves those routes itself.
2. Keep in `vercel.json`: the `/api`, `/api/v1/*`, `/mcp`, `/mcp.json` proxies, the `/llms.txt` / `openapi.json` / `api-catalog` aliases, and all the header blocks.
3. Rewrite `middleware.ts` to do only the two things the framework cannot: Accept-header markdown negotiation for the mirrored pages, and forwarding POST `/.well-known/mcp` to the live MCP server. Delete the known-paths 404 logic and narrow the matcher to just those paths, so normal navigation never touches middleware.
4. Pin the server target explicitly with `nitro: { preset: "vercel" }` in `vite.config.ts`, so a Vercel build never silently falls back to the Cloudflare default. Lovable's own publish pipeline overrides this, so the Lovable URL keeps working.
5. Confirm the `/developers` and `/plans` routes exist under `src/routes/`; create the missing one as a real route rather than a rewrite target.
6. Verify with a production build plus SSR requests to `/`, `/about`, `/blog/<slug>`, `/developers`, `/api/v1`, and a bogus path (must be a real 404 page), and check the markdown negotiation still returns `text/markdown`.

## Notes

- Also worth fixing in the same pass: `agent-readiness.test.ts` still asserts against the old `index.html`, so it fails against the new stack.
- After deploying, the first Vercel build is the real test of items 1-3; I will flag anything that only shows up there.
