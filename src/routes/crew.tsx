import { createFileRoute } from "@tanstack/react-router";
import Crew from "@/pages/Crew";

export const Route = createFileRoute("/crew")({
  head: () => ({
    meta: [
      { title: "Crew Access | VeloRix Tournaments" },
      { name: "description", content: "Restricted crew sign-in for the VeloRix Tournaments operations team." },
      { property: "og:title", content: "Crew Access | VeloRix Tournaments" },
      { property: "og:description", content: "Restricted crew sign-in for the VeloRix Tournaments operations team." },
      { name: "twitter:title", content: "Crew Access | VeloRix Tournaments" },
      { name: "twitter:description", content: "Restricted crew sign-in for the VeloRix Tournaments operations team." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/crew" }],
  }),
  component: Crew,
});
