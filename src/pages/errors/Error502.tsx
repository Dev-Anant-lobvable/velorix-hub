import { Cable } from "lucide-react";
import ErrorTemplate from "@/components/ErrorTemplate";

const Error502 = () => (
  <ErrorTemplate
    code="502"
    badge="Bad Gateway"
    Icon={Cable}
    title="Connection between squads broke"
    description="One of our upstream servers gave us a bad response. We're rerouting now."
    errorTag="ERROR_CODE: BAD_GATEWAY"
    secondaryAction="reload"
    secondaryLabel="Retry"
  />
);

export default Error502;