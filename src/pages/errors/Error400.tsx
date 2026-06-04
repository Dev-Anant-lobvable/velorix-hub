import { AlertTriangle } from "@/lib/icons";
import ErrorTemplate from "@/components/ErrorTemplate";

const Error400 = () => (
  <ErrorTemplate
    code="400"
    badge="Bad Request"
    Icon={AlertTriangle}
    title="Your move didn't register"
    description="Something in your request was malformed. Check your input and try again."
    errorTag="ERROR_CODE: BAD_REQUEST"
    secondaryAction="reload"
    secondaryLabel="Retry"
  />
);

export default Error400;