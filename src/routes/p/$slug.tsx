import { createFileRoute } from "@tanstack/react-router";
import CustomPageView from "@/pages/CustomPageView";

export const Route = createFileRoute("/p/$slug")({
  component: CustomPageView,
});
