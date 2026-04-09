import { Download, ChevronDown, Smartphone, HardDrive } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { playDownloadSound } from "@/hooks/useSoundEffect";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleDownload = () => {
    playDownloadSound();
    navigate("/download");
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center justify-center overflow-x-hidden overflow-y-visible pt-32 pb-24 sm:pt-36 sm:pb-28"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-mesh-gradient" />

      {/* Static ambient glow - no animation, pure CSS */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="hero-bottom-fade absolute inset-x-0 bottom-0 h-56 pointer-events-none sm:h-64" aria-hidden="true" />
      <div className="hero-bottom-edge absolute inset-x-0 bottom-0 h-28 pointer-events-none sm:h-32" aria-hidden="true" />
      <div className="hero-bottom-haze absolute left-1/2 bottom-[-3.5rem] h-56 w-[128%] max-w-7xl -translate-x-1/2 pointer-events-none sm:bottom-[-4.5rem] sm:h-72" aria-hidden="true" />
      <div className="hero-bottom-haze-secondary absolute left-1/2 bottom-[-1.25rem] h-32 w-[96%] max-w-5xl -translate-x-1/2 pointer-events-none sm:h-40" aria-hidden="true" />
      <div className="hero-bottom-seam absolute inset-x-0 bottom-[-4rem] h-24 pointer-events-none sm:bottom-[-4.5rem] sm:h-32" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            variants={itemVariants}
          >
            <span className="text-gradient text-glow glitch-text" data-text="VeloRix">VeloRix</span>
            <br />
            <span className="text-foreground">Tournaments</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6"
            variants={itemVariants}
          >
            India's go-to app for Free Fire & BGMI tournaments. Play daily
            matches, win real rewards, and climb the leaderboard.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 justify-center mb-8"
            variants={itemVariants}
          >
            <div className="glass flex items-center gap-2 px-4 py-2 rounded-full text-sm text-muted-foreground hover:border-primary/30 transition-colors">
              <Smartphone className="w-4 h-4 text-primary" />
              <span>VeloRix v1.0.0</span>
            </div>
            <div className="glass flex items-center gap-2 px-4 py-2 rounded-full text-sm text-muted-foreground hover:border-primary/30 transition-colors">
              <HardDrive className="w-4 h-4 text-primary" />
              <span>~25 MB</span>
            </div>
            <div className="glass px-4 py-2 rounded-full text-sm text-muted-foreground hover:border-primary/30 transition-colors">
              Android 7.0+
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <AnimatedButton
              variant="hero"
              size="xl"
              className="pulse-glow"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5" />
              Download App
            </AnimatedButton>
            <AnimatedButton
              variant="heroOutline"
              size="xl"
              onClick={scrollToFeatures}
              className="glass hover:border-primary/50 transition-all"
            >
              Learn More
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 sm:bottom-8">
        <motion.button
          type="button"
          onClick={scrollToFeatures}
          className="hero-scroll-cue"
          aria-label="Scroll to features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="hero-scroll-label">Scroll down</span>
          <span className="hero-scroll-dot" />
          <div className="chevron-bounce">
            <ChevronDown className="w-5 h-5 text-primary" />
          </div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
