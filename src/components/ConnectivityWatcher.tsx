import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Offline from "@/pages/errors/Offline";

const MAINTENANCE_POLL_MS = 60_000;

const ConnectivityWatcher = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const navigate = useNavigate();
  const location = useLocation();

  // Online/offline listeners
  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  // Maintenance flag polling
  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const res = await fetch(`/maintenance.json?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const onMaintenancePage = location.pathname === "/maintenance";
        if (data.enabled && !onMaintenancePage) {
          navigate("/maintenance", { replace: true });
        } else if (!data.enabled && onMaintenancePage) {
          navigate("/", { replace: true });
        }
      } catch {
        // Network errors handled by online/offline watcher
      }
    };

    check();
    const id = window.setInterval(check, MAINTENANCE_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [location.pathname, navigate]);

  if (!isOnline && location.pathname !== "/offline") {
    return <Offline />;
  }

  return <>{children}</>;
};

export default ConnectivityWatcher;