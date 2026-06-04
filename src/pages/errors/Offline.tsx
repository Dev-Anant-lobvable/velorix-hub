import { CloudOff } from "@/lib/icons";
import ErrorTemplate from "@/components/ErrorTemplate";

const Offline = () => (
  <ErrorTemplate
    code="OFF"
    badge="No Connection"
    Icon={CloudOff}
    title="You're offline"
    description="We can't reach the servers. Check your internet connection and try again."
    errorTag="STATUS: NETWORK_OFFLINE"
    secondaryAction="reload"
    secondaryLabel="Retry"
  />
);

export default Offline;