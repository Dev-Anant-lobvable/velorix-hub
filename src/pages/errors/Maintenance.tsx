import { useEffect, useState } from "react";
import { Wrench, ShieldCheck } from "@/lib/icons";
import { Link } from "react-router-dom";
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
    <>
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
      <Link
        to="/vx-control"
        aria-label="Admin"
        className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/70 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md hover:bg-primary/10 transition-colors"
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        Admin
      </Link>
    </>
  );
};

export default Maintenance;