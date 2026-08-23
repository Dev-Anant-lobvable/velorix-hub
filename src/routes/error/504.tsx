import { createFileRoute } from "@tanstack/react-router";
import Error504 from "@/pages/errors/Error504";

export const Route = createFileRoute("/error/504")({
  head: () => ({
    meta: [
      { title: "504 Gateway Timeout | VeloRix Tournaments" },
      { name: "description", content: "An upstream service took too long to respond." },
      { property: "og:title", content: "504 Gateway Timeout | VeloRix Tournaments" },
      { property: "og:description", content: "An upstream service took too long to respond." },
      { name: "twitter:title", content: "504 Gateway Timeout | VeloRix Tournaments" },
      { name: "twitter:description", content: "An upstream service took too long to respond." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/error/504" }],
  }),
  component: Error504,
});
