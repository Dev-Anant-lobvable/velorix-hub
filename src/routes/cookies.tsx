import { createFileRoute } from "@tanstack/react-router";
import CookiePolicy from "@/pages/CookiePolicy";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | VeloRix Tournaments" },
      { name: "description", content: "Which cookies VeloRix Tournaments uses, what they do and how to control them." },
      { property: "og:title", content: "Cookie Policy | VeloRix Tournaments" },
      { property: "og:description", content: "Which cookies VeloRix Tournaments uses, what they do and how to control them." },
      { name: "twitter:title", content: "Cookie Policy | VeloRix Tournaments" },
      { name: "twitter:description", content: "Which cookies VeloRix Tournaments uses, what they do and how to control them." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/cookies" }],
  }),
  component: CookiePolicy,
});
