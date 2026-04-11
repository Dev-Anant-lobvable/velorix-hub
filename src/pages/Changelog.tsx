import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Bug, Zap, Shield, Package } from "lucide-react";
import useScrollToTop from "@/hooks/useScrollToTop";

const tagConfig: Record<string, { label: string; icon: typeof Sparkles; color: string }> = {
  feature: { label: "Feature", icon: Sparkles, color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10" },
  fix: { label: "Fix", icon: Bug, color: "text-amber-400 border-amber-400/20 bg-amber-400/10" },
  improvement: { label: "Improvement", icon: Zap, color: "text-sky-400 border-sky-400/20 bg-sky-400/10" },
  security: { label: "Security", icon: Shield, color: "text-red-400 border-red-400/20 bg-red-400/10" },
  release: { label: "Release", icon: Package, color: "text-primary border-primary/20 bg-primary/10" },
};

const changelog = [
  {
    version: "1.0.0",
    date: "April 7, 2026",
    title: "Public Launch 🚀",
    tag: "release",
    items: [
      "Launch of VeloRix Tournaments for Android",
      "Support for Free Fire, BGMI, and COD Mobile tournaments",
      "Real-time match tracking and live leaderboards",
      "UPI and Paytm wallet payouts",
      "Custom tournament creation for organizers",
    ],
  },
  {
    version: "0.9.2",
    date: "March 28, 2026",
    title: "Pre-launch Polish",
    tag: "improvement",
    items: [
      "Improved onboarding flow with step-by-step guide",
      "Reduced APK size from 32 MB to ~25 MB",
      "Faster tournament loading with local caching",
      "Haptic feedback on key interactions",
    ],
  },
  {
    version: "0.9.1",
    date: "March 15, 2026",
    title: "Security Hardening",
    tag: "security",
    items: [
      "End-to-end encryption for wallet transactions",
      "Rate limiting on authentication endpoints",
      "Anti-cheat detection improvements",
      "Session management and forced logout on suspicious activity",
    ],
  },
  {
    version: "0.9.0",
    date: "March 1, 2026",
    title: "Beta Launch",
    tag: "feature",
    items: [
      "Core tournament matchmaking system",
      "In-app wallet with deposit and withdrawal",
      "Push notifications for match reminders",
      "Player profiles with match history and stats",
    ],
  },
  {
    version: "0.8.0",
    date: "February 10, 2026",
    title: "Bug Fixes & Stability",
    tag: "fix",
    items: [
      "Fixed crash on low-RAM devices during matchmaking",
      "Resolved tournament timer sync issues",
      "Fixed duplicate notification bug",
      "Improved error handling for network failures",
    ],
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const Changelog = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10 max-w-3xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-foreground">Changelog</h1>
          <p className="text-muted-foreground text-lg mb-16">What's new and improved in VeloRix.</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border" />

          <div className="space-y-14">
            {changelog.map((entry, i) => {
              const tag = tagConfig[entry.tag];
              const TagIcon = tag.icon;
              return (
                <motion.article
                  key={entry.version}
                  className="relative pl-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-primary bg-background z-10" />

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs text-muted-foreground font-mono">{entry.date}</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${tag.color}`}>
                      <TagIcon className="w-3 h-3" />
                      {tag.label}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-foreground mb-1.5">
                    <span className="text-muted-foreground font-mono text-sm mr-2">v{entry.version}</span>
                    {entry.title}
                  </h2>

                  <ul className="space-y-2 mt-4">
                    {entry.items.map((item, j) => (
                      <motion.li
                        key={j}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + j * 0.04, duration: 0.35, ease }}
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changelog;
