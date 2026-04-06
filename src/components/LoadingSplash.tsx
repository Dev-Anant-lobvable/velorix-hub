import { motion } from "framer-motion";
import velorixLogo from "@/assets/velorix-logo.png";

const LoadingSplash = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" as const } }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-dark-gradient" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-70" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-5 px-6 text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } }}
        exit={{ opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" as const } }}
      >
        <div className="loading-splash-mark">
          <img
            src={velorixLogo}
            alt="VeloRix"
            width={90}
            height={90}
            className="loading-splash-logo"
          />
        </div>

        <div className="space-y-1">
          <p className="text-gradient text-2xl font-semibold uppercase tracking-[0.26em] sm:text-3xl">
            VeloRix
          </p>
          <p className="text-xs uppercase tracking-[0.38em] text-muted-foreground">
            Loading the arena
          </p>
        </div>

        <div className="loading-splash-bar">
          <span />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingSplash;