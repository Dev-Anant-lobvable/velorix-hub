import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "VeloRix Blog — Free Fire & BGMI Guides, Strategy and Tournament Coverage" },
      { name: "description", content: "In-depth guides on Free Fire sensitivity, BGMI rotations, tournament formats, anti-cheat and building a competitive squad, written by the VeloRix esports team." },
      { property: "og:title", content: "VeloRix Blog — Free Fire & BGMI Guides, Strategy and Tournament Coverage" },
      { property: "og:description", content: "In-depth guides on Free Fire sensitivity, BGMI rotations, tournament formats, anti-cheat and building a competitive squad, written by the VeloRix esports team." },
      { name: "twitter:title", content: "VeloRix Blog — Free Fire & BGMI Guides, Strategy and Tournament Coverage" },
      { name: "twitter:description", content: "In-depth guides on Free Fire sensitivity, BGMI rotations, tournament formats, anti-cheat and building a competitive squad, written by the VeloRix esports team." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/blog" }],
  }),
  component: Blog,
});
