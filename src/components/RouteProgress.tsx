import { useEffect, useState } from "react";
import { useLocation } from "@/lib/router-compat";

const RouteProgress = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(15);
    const t1 = window.setTimeout(() => setProgress(60), 80);
    const t2 = window.setTimeout(() => setProgress(90), 220);
    const t3 = window.setTimeout(() => setProgress(100), 380);
    const t4 = window.setTimeout(() => setVisible(false), 600);
    const t5 = window.setTimeout(() => setProgress(0), 750);

    return () => {
      [t1, t2, t3, t4, t5].forEach(window.clearTimeout);
    };
  }, [location.pathname]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-primary to-primary/40 shadow-[0_0_10px_hsl(var(--primary)/0.8)] transition-[width,opacity] ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          transitionDuration: visible ? "300ms" : "200ms",
        }}
      />
    </div>
  );
};

export default RouteProgress;