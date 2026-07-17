import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";

const supabase = () =>
  createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

export default defineTool({
  name: "get_site_status",
  title: "Get VeloRix site status",
  description: "Check whether the VeloRix site is live or in maintenance mode, with the current status message.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const { data } = await supabase()
      .from("site_config")
      .select("value")
      .eq("key", "maintenance")
      .maybeSingle();
    const cfg = (data?.value ?? {}) as { enabled?: boolean; message?: string };
    const enabled = Boolean(cfg.enabled);
    const status = enabled ? "maintenance" : "live";
    const message = cfg.message ?? "VeloRix is live.";
    return {
      content: [{ type: "text", text: `Status: ${status}\n${message}` }],
      structuredContent: { status, maintenance: enabled, message },
    };
  },
});