import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | VeloRix Tournaments" },
      { name: "description", content: "How VeloRix Tournaments collects, uses and protects your data across the app and website." },
      { property: "og:title", content: "Privacy Policy | VeloRix Tournaments" },
      { property: "og:description", content: "How VeloRix Tournaments collects, uses and protects your data across the app and website." },
      { name: "twitter:title", content: "Privacy Policy | VeloRix Tournaments" },
      { name: "twitter:description", content: "How VeloRix Tournaments collects, uses and protects your data across the app and website." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/privacy" }],
  }),
  component: PrivacyPolicy,
});
