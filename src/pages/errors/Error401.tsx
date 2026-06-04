import { Lock } from "@/lib/icons";
import ErrorTemplate from "@/components/ErrorTemplate";

const Error401 = () => (
  <ErrorTemplate
    code="401"
    badge="Unauthorized"
    Icon={Lock}
    title="You need to log in to enter this lobby"
    description="This area is for verified players only. Sign in to continue your session."
    errorTag="ERROR_CODE: UNAUTHORIZED"
    primaryLabel="Back to Home"
  />
);

export default Error401;