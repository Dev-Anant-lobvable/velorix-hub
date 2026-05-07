import { WifiOff } from "lucide-react";
import ErrorTemplate from "@/components/ErrorTemplate";

const Error503 = () => (
  <ErrorTemplate
    code="503"
    badge="Service Unavailable"
    Icon={WifiOff}
    title="Servers are down for maintenance"
    description="We're upgrading the arena. Come back in a bit — we'll be live again soon."
    errorTag="ERROR_CODE: SERVICE_UNAVAILABLE"
    secondaryAction="reload"
    secondaryLabel="Retry"
  />
);

export default Error503;