import { createFileRoute } from "@tanstack/react-router";
import AdminPanel from "@/pages/AdminPanel";

export const Route = createFileRoute("/vx-control")({
  head: () => ({
    meta: [
      { title: "Control Room | VeloRix Tournaments" },
      { name: "description", content: "Internal VeloRix Tournaments control room." },
      { property: "og:title", content: "Control Room | VeloRix Tournaments" },
      { property: "og:description", content: "Internal VeloRix Tournaments control room." },
      { name: "twitter:title", content: "Control Room | VeloRix Tournaments" },
      { name: "twitter:description", content: "Internal VeloRix Tournaments control room." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/vx-control" }],
  }),
  component: AdminPanel,
});
