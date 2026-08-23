import { createFileRoute } from "@tanstack/react-router";
import Error503 from "@/pages/errors/Error503";

export const Route = createFileRoute("/error/503")({
  head: () => ({
    meta: [
      { title: "503 Service Unavailable | VeloRix Tournaments" },
      { name: "description", content: "The service is temporarily unavailable." },
      { property: "og:title", content: "503 Service Unavailable | VeloRix Tournaments" },
      { property: "og:description", content: "The service is temporarily unavailable." },
      { name: "twitter:title", content: "503 Service Unavailable | VeloRix Tournaments" },
      { name: "twitter:description", content: "The service is temporarily unavailable." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/error/503" }],
  }),
  component: Error503,
});
