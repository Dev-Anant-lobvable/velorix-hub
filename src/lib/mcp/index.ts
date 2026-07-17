import { defineMcp } from "@lovable.dev/mcp-js";
import listPublishedPages from "./tools/list-published-pages";
import getPage from "./tools/get-page";
import getActiveApk from "./tools/get-active-apk";
import getSiteStatus from "./tools/get-site-status";

export default defineMcp({
  name: "velorix-mcp",
  title: "VeloRix",
  version: "0.1.0",
  instructions:
    "Public tools for VeloRix — India's Free Fire / BGMI tournament platform. Use `list_published_pages` to discover tournaments, announcements and policy pages, `get_page` to read one, `get_active_apk` to get the current Android APK download info, and `get_site_status` to check if the site is live.",
  tools: [listPublishedPages, getPage, getActiveApk, getSiteStatus],
});