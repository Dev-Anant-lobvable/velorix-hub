import { useEffect, useState } from "react";
import { Wrench } from "lucide-react";
import ErrorTemplate from "@/components/ErrorTemplate";
import { DEFAULT_MAINTENANCE_MESSAGE, normalizeMaintenance, publicDb } from "@/lib/adminControl";

const Maintenance = () => {
  const [message, setMessage] = useState(DEFAULT_MAINTENANCE_MESSAGE);

  useEffect(() => {
    publicDb.from("site_config").select("value").eq("key", "maintenance").maybeSingle().then(({ data }) => {
      setMessage(normalizeMaintenance(data?.value).message);
    });
  }, []);

  return (
    <ErrorTemplate
      code="503"
      badge="Scheduled Maintenance"
      Icon={Wrench}
      title="VeloRix is leveling up"
      description={message}
      errorTag="STATUS: MAINTENANCE_MODE"
      secondaryAction="reload"
      secondaryLabel="Check Again"
    />
  );
};

export default Maintenance;