import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";

// Browser-safe env read: `process` only exists in the Deno edge runtime where
// the MCP plugin bundles this file. In any accidental client bundle it falls
// back to Vite's inlined env so the module never throws at import time.
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
const SUPABASE_URL = env.SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  env.SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = () =>
  createClient(SUPABASE_URL!, SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

export default defineTool({
  name: "list_published_pages",
  title: "List VeloRix pages",
  description: "List all published VeloRix custom pages (tournaments, announcements, policies) with slug, title and subtitle.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const { data, error } = await supabase()
      .from("custom_pages")
      .select("slug,title,subtitle,updated_at")
      .eq("published", true)
      .order("updated_at", { ascending: false });
    if (error) {
      return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { pages: data ?? [] },
    };
  },
});