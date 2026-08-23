import { Link } from "@/lib/router-compat";
import { motion } from "framer-motion";
import { Home, RotateCcw, LucideIcon } from "@/lib/icons";
import { AnimatedButton } from "@/components/ui/animated-button";

export interface ErrorTemplateProps {
  code: string;
  badge: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  errorTag: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryAction?: "back" | "reload";
  secondaryLabel?: string;
  accentHue?: number; // optional override (HSL hue)
}

const ErrorTemplate = ({
  code,
  badge,
  Icon,
  title,
  description,
  errorTag,
  primaryHref = "/",
  primaryLabel = "Respawn at Home",
  secondaryAction = "back",
  secondaryLabel = "Go Back",
}: ErrorTemplateProps) => {
  const handleSecondary = () => {
    if (secondaryAction === "reload") window.location.reload();
    else window.history.back();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />
      <div className="scan-lines pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-primary mb-8">
            <Icon className="w-3.5 h-3.5" />
            {badge}
          </div>

          <h1 className="text-[7rem] sm:text-[10rem] leading-none font-black text-gradient text-glow tracking-tighter">
            {code}
          </h1>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">{description}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={primaryHref}>
              <AnimatedButton variant="hero" size="lg" className="pulse-glow w-full sm:w-auto">
                <Home className="w-4 h-4" />
                {primaryLabel}
              </AnimatedButton>
            </Link>
            <button onClick={handleSecondary}>
              <AnimatedButton variant="heroOutline" size="lg" className="w-full sm:w-auto">
                <RotateCcw className="w-4 h-4" />
                {secondaryLabel}
              </AnimatedButton>
            </button>
          </div>

          <p className="mt-10 text-xs text-muted-foreground/60 font-mono">{errorTag}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorTemplate;