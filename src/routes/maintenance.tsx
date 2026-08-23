import { createFileRoute } from "@tanstack/react-router";
import Maintenance from "@/pages/errors/Maintenance";

export const Route = createFileRoute("/maintenance")({
  head: () => ({
    meta: [
      { title: "Scheduled Maintenance | VeloRix Tournaments" },
      { name: "description", content: "VeloRix Tournaments is briefly down for scheduled maintenance." },
      { property: "og:title", content: "Scheduled Maintenance | VeloRix Tournaments" },
      { property: "og:description", content: "VeloRix Tournaments is briefly down for scheduled maintenance." },
      { name: "twitter:title", content: "Scheduled Maintenance | VeloRix Tournaments" },
      { name: "twitter:description", content: "VeloRix Tournaments is briefly down for scheduled maintenance." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/maintenance" }],
  }),
  component: Maintenance,
});
