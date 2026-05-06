import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, RotateCcw, Crosshair } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />
      <div className="scan-lines pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-primary mb-8">
            <Crosshair className="w-3.5 h-3.5" />
            Match Not Found
          </div>

          <h1 className="text-[7rem] sm:text-[10rem] leading-none font-black text-gradient text-glow tracking-tighter">
            404
          </h1>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">
            You've been eliminated from this page
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Looks like this lobby doesn't exist or the match already ended. Let's get you back into the game.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <AnimatedButton variant="hero" size="lg" className="pulse-glow w-full sm:w-auto">
                <Home className="w-4 h-4" />
                Respawn at Home
              </AnimatedButton>
            </Link>
            <button onClick={() => window.history.back()}>
              <AnimatedButton variant="heroOutline" size="lg" className="w-full sm:w-auto">
                <RotateCcw className="w-4 h-4" />
                Go Back
              </AnimatedButton>
            </button>
          </div>

          <p className="mt-10 text-xs text-muted-foreground/60 font-mono">
            ERROR_CODE: ROUTE_NOT_FOUND · {location.pathname}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
