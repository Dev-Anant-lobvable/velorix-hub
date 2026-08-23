import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VeloRix Tournaments - Free Fire, BGMI & Esports Tournament App | Play & Win" },
      { name: "description", content: "Join VeloRix Tournaments - India's best Free Fire, BGMI & esports tournament app. Compete in daily Free Fire tournaments, win real cash prizes, and climb the leaderboard. Download free!" },
      { property: "og:title", content: "VeloRix Tournaments - Free Fire, BGMI & Esports Tournament App | Play & Win" },
      { property: "og:description", content: "Join VeloRix Tournaments - India's best Free Fire, BGMI & esports tournament app. Compete in daily Free Fire tournaments, win real cash prizes, and climb the leaderboard. Download free!" },
      { name: "twitter:title", content: "VeloRix Tournaments - Free Fire, BGMI & Esports Tournament App | Play & Win" },
      { name: "twitter:description", content: "Join VeloRix Tournaments - India's best Free Fire, BGMI & esports tournament app. Compete in daily Free Fire tournaments, win real cash prizes, and climb the leaderboard. Download free!" },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app" }],
  }),
  component: Index,
});
