import { createFileRoute } from "@tanstack/react-router";
import RefundPolicy from "@/pages/RefundPolicy";

const TITLE = "Refund & Cancellation Policy | VeloRix Tournaments";
const DESCRIPTION =
  "VeloRix Tournaments refund and cancellation rules for entry fees, cancelled matches and wallet payouts, plus Grievance Officer contact details for India.";

export const Route = createFileRoute("/refunds")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: "https://velorix-hub.vercel.app/refunds" },
    ],
  }),
  component: RefundPolicy,
});
