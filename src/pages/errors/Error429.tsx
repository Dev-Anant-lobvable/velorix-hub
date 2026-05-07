import { Zap } from "lucide-react";
import ErrorTemplate from "@/components/ErrorTemplate";

const Error429 = () => (
  <ErrorTemplate
    code="429"
    badge="Too Many Requests"
    Icon={Zap}
    title="Slow down, champion"
    description="You're firing requests too fast. Take a breather and try again in a moment."
    errorTag="ERROR_CODE: RATE_LIMITED"
    secondaryAction="reload"
    secondaryLabel="Retry"
  />
);

export default Error429;