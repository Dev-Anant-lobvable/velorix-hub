import { createFileRoute } from "@tanstack/react-router";
import Error408 from "@/pages/errors/Error408";

export const Route = createFileRoute("/error/408")({
  head: () => ({
    meta: [
      { title: "408 Request Timeout | VeloRix Tournaments" },
      { name: "description", content: "The request took too long and timed out." },
      { property: "og:title", content: "408 Request Timeout | VeloRix Tournaments" },
      { property: "og:description", content: "The request took too long and timed out." },
      { name: "twitter:title", content: "408 Request Timeout | VeloRix Tournaments" },
      { name: "twitter:description", content: "The request took too long and timed out." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/error/408" }],
  }),
  component: Error408,
});
