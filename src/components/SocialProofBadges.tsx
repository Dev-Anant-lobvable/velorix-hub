import { motion } from "framer-motion";

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
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path d="M3.609 1.814L13.792 12l-10.183 10.186.925.814L15.642 12 4.534 1 3.61 1.814zM20.5 1h-1.5v22h1.5V1z" fill="#34A853"/>
      </svg>
    ),
    stars: 4.6,
    starColor: "#34A853",
  },
  {
    label: "App Store",
    rating: "4.7",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#A2AAAD"/>
      </svg>
    ),
    stars: 4.7,
    starColor: "#FBBF24",
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
        {/* Rating badges - compact row */}
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
                {b.icon}
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

        {/* Player count - subtle, no icons */}
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
