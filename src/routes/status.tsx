import { createFileRoute } from "@tanstack/react-router";
import StatusPage from "@/pages/Status";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Service Status | VeloRix Tournaments" },
      { name: "description", content: "Live health of the VeloRix Tournaments app, API, database and downloads." },
      { property: "og:title", content: "Service Status | VeloRix Tournaments" },
      { property: "og:description", content: "Live health of the VeloRix Tournaments app, API, database and downloads." },
      { name: "twitter:title", content: "Service Status | VeloRix Tournaments" },
      { name: "twitter:description", content: "Live health of the VeloRix Tournaments app, API, database and downloads." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/status" }],
  }),
  component: StatusPage,
});
