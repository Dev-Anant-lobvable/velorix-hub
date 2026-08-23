import { createFileRoute } from "@tanstack/react-router";
import Error500 from "@/pages/errors/Error500";

export const Route = createFileRoute("/error/500")({
  head: () => ({
    meta: [
      { title: "500 Internal Server Error | VeloRix Tournaments" },
      { name: "description", content: "Something broke on our side. The team has been alerted." },
      { property: "og:title", content: "500 Internal Server Error | VeloRix Tournaments" },
      { property: "og:description", content: "Something broke on our side. The team has been alerted." },
      { name: "twitter:title", content: "500 Internal Server Error | VeloRix Tournaments" },
      { name: "twitter:description", content: "Something broke on our side. The team has been alerted." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/error/500" }],
  }),
  component: Error500,
});
