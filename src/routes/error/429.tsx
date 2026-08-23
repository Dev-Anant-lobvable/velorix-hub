import { createFileRoute } from "@tanstack/react-router";
import Error429 from "@/pages/errors/Error429";

export const Route = createFileRoute("/error/429")({
  head: () => ({
    meta: [
      { title: "429 Too Many Requests | VeloRix Tournaments" },
      { name: "description", content: "You have sent too many requests. Slow down and try again." },
      { property: "og:title", content: "429 Too Many Requests | VeloRix Tournaments" },
      { property: "og:description", content: "You have sent too many requests. Slow down and try again." },
      { name: "twitter:title", content: "429 Too Many Requests | VeloRix Tournaments" },
      { name: "twitter:description", content: "You have sent too many requests. Slow down and try again." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/error/429" }],
  }),
  component: Error429,
});
