import { Star } from "lucide-react";
import { motion } from "framer-motion";

const TrustpilotBadge = () => {
  return (
    <motion.a
      href="https://www.trustpilot.com/review/velorix-hub.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-border/40 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Trustpilot Logo */}
      <div className="flex items-center gap-1.5">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M12 1L15.09 7.26L22 8.27L17 13.14L18.18 20.02L12 16.77L5.82 20.02L7 13.14L2 8.27L8.91 7.26L12 1Z" fill="#00B67A" />
        </svg>
        <span className="text-sm font-semibold text-foreground tracking-tight">Trustpilot</span>
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-border/50" />

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-5 h-5 bg-[#00B67A] rounded-[2px] flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-white fill-white" />
          </div>
        ))}
        {/* Half star - last one */}
        <div className="w-5 h-5 rounded-[2px] overflow-hidden flex relative">
          <div className="absolute inset-0 bg-muted/50" />
          <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-[#00B67A]" />
          <Star className="w-3.5 h-3.5 text-white fill-white relative z-10 m-auto" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-foreground">4.5</span>
        <span className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
          1,000+ reviews
        </span>
      </div>
    </motion.a>
  );
};

export default TrustpilotBadge;
