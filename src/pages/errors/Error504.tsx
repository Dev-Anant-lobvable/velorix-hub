import { Hourglass } from "lucide-react";
import ErrorTemplate from "@/components/ErrorTemplate";

const Error504 = () => (
  <ErrorTemplate
    code="504"
    badge="Gateway Timeout"
    Icon={Hourglass}
    title="The server took too long to respond"
    description="Our gateway gave up waiting. Network might be congested — try again."
    errorTag="ERROR_CODE: GATEWAY_TIMEOUT"
    secondaryAction="reload"
    secondaryLabel="Retry"
  />
);

export default Error504;