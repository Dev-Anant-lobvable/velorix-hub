// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Vercel is the primary host: pin the server build target so a Vercel build
  // never falls back to the Cloudflare default. Lovable's own publish pipeline
  // pins LOVABLE_NITRO_PRESET and overrides this, so the .lovable.app URL is
  // unaffected.
  nitro: { preset: process.env["NITRO_PRESET"] ?? "vercel" },
  vite: {
    plugins: [mcpPlugin()],
    // three + animejs are loaded lazily (PrizeCrest / AnimeHeading), so Vite only
    // discovers them mid-session and then force-reloads the page, which aborts the
    // in-flight SSR request ("Error: aborted"). Pre-bundle them at dev startup.
    optimizeDeps: { include: ["three", "animejs"] },
  },
});
