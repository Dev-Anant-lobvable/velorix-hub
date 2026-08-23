import { createFileRoute } from "@tanstack/react-router";
import Error400 from "@/pages/errors/Error400";

export const Route = createFileRoute("/error/400")({
  head: () => ({
    meta: [
      { title: "400 Bad Request | VeloRix Tournaments" },
      { name: "description", content: "The request could not be understood by the server." },
      { property: "og:title", content: "400 Bad Request | VeloRix Tournaments" },
      { property: "og:description", content: "The request could not be understood by the server." },
      { name: "twitter:title", content: "400 Bad Request | VeloRix Tournaments" },
      { name: "twitter:description", content: "The request could not be understood by the server." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/error/400" }],
  }),
  component: Error400,
});
