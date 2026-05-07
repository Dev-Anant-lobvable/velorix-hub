import { ShieldAlert } from "lucide-react";
import ErrorTemplate from "@/components/ErrorTemplate";

const Error403 = () => (
  <ErrorTemplate
    code="403"
    badge="Forbidden"
    Icon={ShieldAlert}
    title="Access denied, soldier"
    description="You don't have clearance to enter this zone. Contact support if you think this is a mistake."
    errorTag="ERROR_CODE: FORBIDDEN"
  />
);

export default Error403;