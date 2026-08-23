# Dependency Update Plan

Short answer: the core stack is already modern (React 19, Vite 8, Tailwind v4, TanStack Start/Router), but 26 packages have newer releases — 12 of them are major-version jumps that can break the site if applied blindly.

## Tier 1 — Safe updates (do now)

Patch/minor bumps, no breaking changes expected:

- TanStack Router 1.170.18 -> 1.170.31, Start 1.168.32 -> 1.168.48, Router plugin 1.168.23 -> 1.168.34
- TanStack Query 5.101 -> 5.102
- Vite 8.1.5 -> 8.2.2, Nitro beta -> latest beta
- three 0.184 -> 0.185 (matches the already-installed @types/three 0.185)
- framer-motion 12.38 -> 12.43 (stay on v12)
- @types/node 22 -> 26, @lovable.dev/mcp-js 0.23 -> 0.27
- next-themes 0.3 -> 0.4 (minor; used in one file)
- eslint-plugin-react-refresh 0.4 -> 0.5

## Tier 2 — Majors worth taking (with code fixes)

- @vercel/analytics 1 -> 2 and @vercel/speed-insights 1 -> 2: used in one file each, import path check only.
- recharts 2 -> 3: one file uses it (the chart UI wrapper); v3 changes some prop/typing internals, so this needs a build + visual check of any chart.
- react-day-picker 9 -> 10: one file (`calendar.tsx`); the classNames API shifts again, same kind of fix already done during migration.
- eslint 9 -> 10, @eslint/js 9 -> 10, globals 15 -> 17, eslint-plugin-react-hooks 5 -> 7: lint-only, cannot break the running site, but the flat config may need small edits.

## Tier 3 — Hold back deliberately

These majors are riskier than they are useful right now, and I recommend skipping unless you want them:

- zod 3 -> 4: only one file imports it, but the site's form/validation types and `@hookform/resolvers` pairing make this a churn-for-nothing change.
- lucide-react 0.575 -> 1.x: 21 files import it (the Iconsax shim also re-exports from it). A v1 icon rename would be a wide, risky sweep.
- framer-motion 12 -> 13: used in 32 files including all React Bits animations and ScrollStack. High regression risk on the mobile-performance work.
- TypeScript 5.9 -> 7.0: brand-new compiler generation; the migration already relaxed several strict flags, so this can surface a wave of new type errors.

## Cleanup found while checking

- `mathjs` is installed but imported nowhere — remove it to cut bundle/install weight.

## Verification after each tier

1. `bun run build` must stay green (production build, not dev).
2. `tsgo` typecheck: 0 errors.
3. `bun run test` (agent-readiness suite, 49 tests) must pass.
4. Load the preview and confirm: theme/colors intact, hero + ScrollStack animations smooth, admin panel at `/vx-control` loads, status page health checks run.

If a package breaks the build or tests, it gets reverted to its current version rather than patched around.

## Technical notes

- `vite` is pinned exactly and there is a `rolldown: 1.2.1` override; the Vite bump keeps that override in place.
- TanStack packages are pinned exactly (no `^`), so each one is bumped explicitly and kept pinned.
- Tailwind 4.2.1, React 19.2, Supabase JS 2.105 and all Radix packages are already at latest — no action.
