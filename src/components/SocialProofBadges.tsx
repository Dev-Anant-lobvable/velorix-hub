import { motion } from "framer-motion";
import trustpilotIcon from "@/assets/logos/google.png";
import googlePlayIcon from "@/assets/logos/google-play.png";
import appStoreIcon from "@/assets/logos/app-store.png";

const badges = [
  {
    label: "Trustpilot",
    rating: "4.5",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 1L15.09 7.26L22 8.27L17 13.14L18.18 20.02L12 16.77L5.82 20.02L7 13.14L2 8.27L8.91 7.26L12 1Z" fill="#00B67A" />
      </svg>
    ),
    stars: 4.5,
    starColor: "#00B67A",
    href: "https://www.trustpilot.com/review/velorix-hub.vercel.app",
  },
  {
    label: "Google Play",
    rating: "4.6",
    iconImg: googlePlayIcon,
    stars: 4.6,
    starColor: "#EA4335",
  },
  {
    label: "App Store",
    rating: "4.7",
    iconImg: appStoreIcon,
    stars: 4.7,
    starColor: "#007AFF",
  },
];

const Stars = ({ count, color }: { count: number; color: string }) => (
  <div className="flex gap-[2px]">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 0.5L7.545 3.63L11 4.135L8.5 6.57L9.09 10L6 8.38L2.91 10L3.5 6.57L1 4.135L4.455 3.63L6 0.5Z"
          fill={i <= Math.floor(count) ? color : "hsl(0 0% 25%)"}
          opacity={i <= count ? 1 : 0.3}
        />
      </svg>
    ))}
  </div>
);

const SocialProofBadges = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
          {badges.map((b, i) => {
            const inner = (
              <motion.div
                className="flex items-center gap-2 group"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                {b.icon ? b.icon : (
                  <img src={b.iconImg} alt={b.label} className="w-[18px] h-[18px] object-contain" />
                )}
                <span className="text-[13px] font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                  {b.label}
                </span>
                <Stars count={b.stars} color={b.starColor} />
                <span className="text-[13px] font-semibold text-foreground/90">{b.rating}</span>
              </motion.div>
            );

            return b.href ? (
              <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div key={b.label}>{inner}</div>
            );
          })}
        </div>

        <motion.p
          className="text-center text-[13px] text-muted-foreground mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Trusted by <span className="text-foreground font-semibold">4,24,000+</span> players across India
        </motion.p>
      </div>
    </section>
  );
};

export default SocialProofBadges;
