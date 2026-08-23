import { createFileRoute } from "@tanstack/react-router";
import DownloadPage from "@/pages/Download";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download the VeloRix Tournaments App (Free APK) | Android" },
      { name: "description", content: "Download the free VeloRix Tournaments Android app and join daily Free Fire and BGMI tournaments with real cash prizes." },
      { property: "og:title", content: "Download the VeloRix Tournaments App (Free APK) | Android" },
      { property: "og:description", content: "Download the free VeloRix Tournaments Android app and join daily Free Fire and BGMI tournaments with real cash prizes." },
      { name: "twitter:title", content: "Download the VeloRix Tournaments App (Free APK) | Android" },
      { name: "twitter:description", content: "Download the free VeloRix Tournaments Android app and join daily Free Fire and BGMI tournaments with real cash prizes." },
    ],
    links: [{ rel: "canonical", href: "https://velorix-hub.vercel.app/download" }],
  }),
  component: DownloadPage,
});
