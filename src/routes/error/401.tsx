import { createFileRoute } from "@tanstack/react-router";
import Error401 from "@/pages/errors/Error401";

export const Route = createFileRoute("/error/401")({
  head: () => ({
    meta: [
      { title: "401 Unauthorized | VeloRix Tournaments" },
      { name: "description", content: "Authentication is required to view this resource." },
      { property: "og:title", content: "401 Unauthorized | VeloRix Tournaments" },
      { property: "og:description", content: "Authentication is required to view this resource." },
      { name: "twitter:title", content: "401 Unauthorized | VeloRix Tournaments" },
      { name: "twitter:description", content: "Authentication is required to view this resource." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/error/401" }],
  }),
  component: Error401,
});
