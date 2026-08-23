import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VeloRix Tournaments — Who We Are" },
      { name: "description", content: "VeloRix Tournaments is an India-based skill-based esports platform for Free Fire, BGMI and other mobile titles. Learn who runs it, how it works and what we stand for." },
      { property: "og:title", content: "About VeloRix Tournaments — Who We Are" },
      { property: "og:description", content: "VeloRix Tournaments is an India-based skill-based esports platform for Free Fire, BGMI and other mobile titles. Learn who runs it, how it works and what we stand for." },
      { name: "twitter:title", content: "About VeloRix Tournaments — Who We Are" },
      { name: "twitter:description", content: "VeloRix Tournaments is an India-based skill-based esports platform for Free Fire, BGMI and other mobile titles. Learn who runs it, how it works and what we stand for." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/about" }],
  }),
  component: About,
});
