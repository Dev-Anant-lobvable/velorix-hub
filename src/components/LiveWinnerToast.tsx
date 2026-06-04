import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "@/lib/icons";

type WinnerEvent = {
  player: string;
  prize: string;
  game: "Free Fire" | "BGMI";
};

const SAMPLE_EVENTS: WinnerEvent[] = [
  { player: "Arjun_OP", prize: "₹500", game: "Free Fire" },
  { player: "GhostRider", prize: "₹1,200", game: "BGMI" },
  { player: "NoobMaster69", prize: "₹250", game: "Free Fire" },
  { player: "Veer_Yodha", prize: "₹2,000", game: "BGMI" },
  { player: "ShadowSniper", prize: "₹750", game: "Free Fire" },
  { player: "RajaGaming", prize: "₹350", game: "BGMI" },
  { player: "PROplayer_IN", prize: "₹1,500", game: "Free Fire" },
];

const LiveWinnerToast = () => {
  const [event, setEvent] = useState<WinnerEvent | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on small viewports to avoid covering content
    if (window.matchMedia("(max-width: 640px)").matches) return;

    let mounted = true;
    let hideTimer: number;

    const show = () => {
      if (!mounted) return;
      setEvent(SAMPLE_EVENTS[index % SAMPLE_EVENTS.length]);
      setIndex((i) => i + 1);
      hideTimer = window.setTimeout(() => mounted && setEvent(null), 4500);
    };

    const initial = window.setTimeout(show, 6000);
    const interval = window.setInterval(show, 14000);

    return () => {
      mounted = false;
      window.clearTimeout(initial);
      window.clearTimeout(hideTimer);
      window.clearInterval(interval);
    };
  }, [index]);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none hidden sm:block">
      <AnimatePresence>
        {event && (
          <motion.div
            initial={{ opacity: 0, x: -40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="liquid-glass flex items-center gap-3 rounded-full border border-primary/20 px-4 py-2.5 shadow-xl"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/15">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-foreground">
                {event.player} just won {event.prize}
              </div>
              <div className="text-muted-foreground">
                {event.game} tournament · live
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveWinnerToast;