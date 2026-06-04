import { Clock } from "@/lib/icons";
import ErrorTemplate from "@/components/ErrorTemplate";

const Error408 = () => (
  <ErrorTemplate
    code="408"
    badge="Request Timeout"
    Icon={Clock}
    title="The match timed out"
    description="Server didn't get your request in time. Check your connection and try again."
    errorTag="ERROR_CODE: REQUEST_TIMEOUT"
    secondaryAction="reload"
    secondaryLabel="Retry"
  />
);

export default Error408;