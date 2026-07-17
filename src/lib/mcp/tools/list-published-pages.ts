import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";

declare const process: { env: Record<string, string | undefined> };

const supabase = () =>
  createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

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