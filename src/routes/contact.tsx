import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact VeloRix Tournaments | Support & Partnerships" },
      { name: "description", content: "Reach the VeloRix Tournaments team for player support, payout questions, partnerships and press." },
      { property: "og:title", content: "Contact VeloRix Tournaments | Support & Partnerships" },
      { property: "og:description", content: "Reach the VeloRix Tournaments team for player support, payout questions, partnerships and press." },
      { name: "twitter:title", content: "Contact VeloRix Tournaments | Support & Partnerships" },
      { name: "twitter:description", content: "Reach the VeloRix Tournaments team for player support, payout questions, partnerships and press." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/contact" }],
  }),
  component: Contact,
});
