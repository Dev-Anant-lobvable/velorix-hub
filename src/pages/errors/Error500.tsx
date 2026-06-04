import { ServerCrash } from "@/lib/icons";
import ErrorTemplate from "@/components/ErrorTemplate";

const Error500 = () => (
  <ErrorTemplate
    code="500"
    badge="Server Error"
    Icon={ServerCrash}
    title="Our servers got knocked out"
    description="Something broke on our end. Our team is already on it. Try again in a moment."
    errorTag="ERROR_CODE: INTERNAL_SERVER_ERROR"
    secondaryAction="reload"
    secondaryLabel="Retry"
  />
);

export default Error500;