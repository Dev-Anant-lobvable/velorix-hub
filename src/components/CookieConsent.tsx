import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "@/lib/icons";
import { Link } from "@/lib/router-compat";
import { AnimatedButton } from "@/components/ui/animated-button";

const STORAGE_KEY = "velorix-cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = window.setTimeout(() => setVisible(true), 1500);
      return () => window.clearTimeout(t);
    }
  }, []);

  const handleChoice = (choice: "accept" | "reject") => {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 sm:right-auto sm:max-w-md z-[9999]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="liquid-glass relative rounded-2xl border border-border/40 p-5 shadow-2xl">
            <button
              onClick={() => handleChoice("reject")}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                <Cookie className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">We use cookies</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  We use essential cookies to run the site and analytics to improve your experience. As per India's DPDP Act 2023, we ask for your consent. Read our{" "}
                  <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
                </p>
                <div className="mt-4 flex gap-2">
                  <AnimatedButton
                    variant="hero"
                    size="sm"
                    onClick={() => handleChoice("accept")}
                    className="flex-1"
                  >
                    Accept All
                  </AnimatedButton>
                  <AnimatedButton
                    variant="heroOutline"
                    size="sm"
                    onClick={() => handleChoice("reject")}
                    className="flex-1"
                  >
                    Essential Only
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;