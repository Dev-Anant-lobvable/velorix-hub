import { createFileRoute } from "@tanstack/react-router";
import HelpCenter from "@/pages/HelpCenter";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center | VeloRix Tournaments" },
      { name: "description", content: "Answers on joining Free Fire and BGMI tournaments, payouts, anti-cheat, bans and app installs." },
      { property: "og:title", content: "Help Center | VeloRix Tournaments" },
      { property: "og:description", content: "Answers on joining Free Fire and BGMI tournaments, payouts, anti-cheat, bans and app installs." },
      { name: "twitter:title", content: "Help Center | VeloRix Tournaments" },
      { name: "twitter:description", content: "Answers on joining Free Fire and BGMI tournaments, payouts, anti-cheat, bans and app installs." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/help" }],
  }),
  component: HelpCenter,
});
