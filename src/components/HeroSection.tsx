import { Download, ChevronDown, Smartphone, HardDrive } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { playDownloadSound } from "@/hooks/useSoundEffect";
import phoneMockup from "@/assets/phone-mockup-new.png";

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

  const phoneVariants = {
    hidden: { opacity: 0, x: 100, rotateY: -20 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.4 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-36"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-mesh-gradient" />

      {/* Static ambient glow - no animation, pure CSS */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center lg:text-left"
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
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6"
              variants={itemVariants}
            >
              India's go-to app for Free Fire & BGMI tournaments. Play daily
              matches, win real rewards, and climb the leaderboard.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-8"
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
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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

          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={phoneVariants}
            initial="hidden"
            animate="visible"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Static glow behind phone */}
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75 pointer-events-none" />

              <ImageWithSkeleton
                src={phoneMockup}
                alt="VeloRix Tournaments App"
                width={384}
                height={768}
                loading="eager"
                decoding="async"
                className="relative z-10 w-72 sm:w-80 lg:w-96 drop-shadow-2xl phone-float"
                skeletonClassName="w-72 sm:w-80 lg:w-96 aspect-[1/2] rounded-3xl"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-sm text-muted-foreground">Scroll Down</span>
          <div className="chevron-bounce">
            <ChevronDown className="w-5 h-5 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
