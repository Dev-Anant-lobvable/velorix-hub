import { createFileRoute } from "@tanstack/react-router";
import Error403 from "@/pages/errors/Error403";

export const Route = createFileRoute("/error/403")({
  head: () => ({
    meta: [
      { title: "403 Forbidden | VeloRix Tournaments" },
      { name: "description", content: "You do not have clearance to access this resource." },
      { property: "og:title", content: "403 Forbidden | VeloRix Tournaments" },
      { property: "og:description", content: "You do not have clearance to access this resource." },
      { name: "twitter:title", content: "403 Forbidden | VeloRix Tournaments" },
      { name: "twitter:description", content: "You do not have clearance to access this resource." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/error/403" }],
  }),
  component: Error403,
});
