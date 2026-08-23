import { createFileRoute } from "@tanstack/react-router";
import Error502 from "@/pages/errors/Error502";

export const Route = createFileRoute("/error/502")({
  head: () => ({
    meta: [
      { title: "502 Bad Gateway | VeloRix Tournaments" },
      { name: "description", content: "An upstream service returned an invalid response." },
      { property: "og:title", content: "502 Bad Gateway | VeloRix Tournaments" },
      { property: "og:description", content: "An upstream service returned an invalid response." },
      { name: "twitter:title", content: "502 Bad Gateway | VeloRix Tournaments" },
      { name: "twitter:description", content: "An upstream service returned an invalid response." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/error/502" }],
  }),
  component: Error502,
});
