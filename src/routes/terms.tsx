import { createFileRoute } from "@tanstack/react-router";
import TermsOfService from "@/pages/TermsOfService";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | VeloRix Tournaments" },
      { name: "description", content: "The rules for using VeloRix Tournaments, tournament participation, payouts and account conduct." },
      { property: "og:title", content: "Terms of Service | VeloRix Tournaments" },
      { property: "og:description", content: "The rules for using VeloRix Tournaments, tournament participation, payouts and account conduct." },
      { name: "twitter:title", content: "Terms of Service | VeloRix Tournaments" },
      { name: "twitter:description", content: "The rules for using VeloRix Tournaments, tournament participation, payouts and account conduct." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/terms" }],
  }),
  component: TermsOfService,
});
