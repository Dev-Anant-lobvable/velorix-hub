import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const supabase = () =>
  createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

export default defineTool({
  name: "get_page",
  title: "Get VeloRix page",
  description: "Fetch the full markdown content of a published VeloRix custom page by slug.",
  inputSchema: {
    slug: z.string().min(1).describe("Page slug, e.g. 'diwali-cup' or 'refund-policy'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }) => {
    const { data, error } = await supabase()
      .from("custom_pages")
      .select("slug,title,subtitle,content,updated_at")
      .eq("published", true)
      .eq("slug", slug.toLowerCase())
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: `Error: ${error.message}` }], isError: true };
    if (!data) return { content: [{ type: "text", text: `No published page found for slug '${slug}'.` }], isError: true };
    return {
      content: [{ type: "text", text: `# ${data.title}\n\n${data.subtitle ?? ""}\n\n${data.content}` }],
      structuredContent: { page: data },
    };
  },
});