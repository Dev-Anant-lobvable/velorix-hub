import { Wrench } from "lucide-react";
import ErrorTemplate from "@/components/ErrorTemplate";

const Maintenance = () => (
  <ErrorTemplate
    code="503"
    badge="Scheduled Maintenance"
    Icon={Wrench}
    title="VeloRix is leveling up"
    description="We're rolling out improvements right now. Hang tight — we'll be back stronger."
    errorTag="STATUS: MAINTENANCE_MODE"
    secondaryAction="reload"
    secondaryLabel="Check Again"
  />
);

export default Maintenance;