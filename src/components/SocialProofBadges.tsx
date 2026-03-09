import { Star, Shield, Download, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const StarRating = ({ rating, color }: { rating: number; color: string }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className="w-3.5 h-3.5"
        style={{
          fill: i <= Math.floor(rating) ? color : i - rating < 1 ? color : 'hsl(var(--muted))',
          color: i <= Math.floor(rating) ? color : i - rating < 1 ? color : 'hsl(var(--muted))',
          opacity: i <= rating ? 1 : i - rating < 1 ? 0.7 : 0.3,
        }}
      />
    ))}
  </div>
);

const badges = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path d="M12 1L15.09 7.26L22 8.27L17 13.14L18.18 20.02L12 16.77L5.82 20.02L7 13.14L2 8.27L8.91 7.26L12 1Z" fill="#00B67A" />
      </svg>
    ),
    label: "Trustpilot",
    rating: 4.5,
    ratingColor: "#00B67A",
    detail: "1,000+ reviews",
    href: "https://www.trustpilot.com/review/velorix-hub.vercel.app",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
        <path d="M3.609 1.814L13.792 12l-10.183 10.186.925.814L15.642 12 4.534 1 3.61 1.814zM20.5 1h-1.5v22h1.5V1z" fill="#48FF48"/>
      </svg>
    ),
    label: "Google Play",
    rating: 4.6,
    ratingColor: "#48FF48",
    detail: "50K+ downloads",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#A2AAAD"/>
      </svg>
    ),
    label: "App Store",
    rating: 4.7,
    ratingColor: "#FFB800",
    detail: "Editor's Choice",
  },
  {
    icon: <Shield className="w-5 h-5 text-[#4285F4] shrink-0" />,
    label: "Google Certified",
    rating: 0,
    ratingColor: "",
    detail: "Best FF Tournament Site",
    badge: true,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const SocialProofBadges = () => {
  return (
    <section className="py-10">
      <motion.div
        className="container mx-auto px-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {badges.map((b) => {
            const Wrapper = b.href ? motion.a : motion.div;
            const wrapperProps = b.href
              ? { href: b.href, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Wrapper
                key={b.label}
                {...(wrapperProps as any)}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border/40 hover:border-primary/30 transition-all duration-300 group cursor-default"
                variants={item}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Icon + Label */}
                <div className="flex items-center gap-1.5">
                  {b.icon}
                  <span className="text-sm font-semibold text-foreground tracking-tight">
                    {b.label}
                  </span>
                </div>

                <div className="w-px h-4 bg-border/40" />

                {/* Rating or Badge */}
                {b.badge ? (
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#4285F4]" />
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground/70 transition-colors">
                      {b.detail}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <StarRating rating={b.rating} color={b.ratingColor} />
                    <span className="text-sm font-bold text-foreground">{b.rating}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors hidden sm:inline">
                      {b.detail}
                    </span>
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>

        {/* Download count banner */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-5"
          variants={item}
        >
          <Download className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Trusted by <span className="font-bold text-foreground">4,24,000+</span> gamers across India
          </span>
          <Award className="w-4 h-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SocialProofBadges;
