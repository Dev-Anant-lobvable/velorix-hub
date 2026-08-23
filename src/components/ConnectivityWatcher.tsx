import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@/lib/router-compat";
import Offline from "@/pages/errors/Offline";
import { normalizeMaintenance, publicDb, withTimeout } from "@/lib/adminControl";

const MAINTENANCE_POLL_MS = 60_000;

const ConnectivityWatcher = ({ children }: { children: React.ReactNode }) => {
  // Always assume online for the first (server-rendered) paint: on SSR runtimes
  // `navigator` exists but `navigator.onLine` is undefined, which would render
  // the offline screen into the HTML crawlers and agents receive.
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Online/offline listeners
  useEffect(() => {
    if (typeof navigator.onLine === "boolean") setIsOnline(navigator.onLine);
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  // Maintenance flag from live backend
  useEffect(() => {
    let cancelled = false;

    const applyMaintenance = (enabled: boolean) => {
      if (cancelled) return;
      const onMaintenancePage = location.pathname === "/maintenance";
      const isAdminArea = location.pathname === "/crew" || location.pathname === "/vx-control";
      if (enabled && !onMaintenancePage && !isAdminArea) {
        navigate("/maintenance", { replace: true });
      } else if (!enabled && onMaintenancePage) {
        navigate("/", { replace: true });
      }
    };

    const check = async () => {
      const { data } = await withTimeout(
        publicDb.from("site_config").select("value").eq("key", "maintenance").maybeSingle(),
        "Maintenance check timed out."
      ).catch(() => ({ data: null }));
      applyMaintenance(normalizeMaintenance(data?.value).enabled);
    };

    check();
    const id = window.setInterval(check, MAINTENANCE_POLL_MS);
    const channel = publicDb
      .channel("vx-maintenance-watch")
      .on("postgres_changes", { event: "*", schema: "public", table: "site_config", filter: "key=eq.maintenance" }, (payload) => {
        applyMaintenance(normalizeMaintenance((payload.new as { value?: unknown } | null)?.value).enabled);
      })
      .subscribe();

    return () => {
      cancelled = true;
      window.clearInterval(id);
      publicDb.removeChannel(channel);
    };
  }, [location.pathname, navigate]);

  if (!isOnline && location.pathname !== "/offline") {
    return <Offline />;
  }

  return <>{children}</>;
};

export default ConnectivityWatcher;