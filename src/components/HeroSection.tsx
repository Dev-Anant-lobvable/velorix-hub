import { Download, ChevronDown, Smartphone, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import phoneMockup from "@/assets/phone-mockup-new.png";

const HeroSection = () => {
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
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const phoneVariants = {
    hidden: { opacity: 0, x: 100, rotateY: -20 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        delay: 0.4,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* AMOLED black background with mesh gradient */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-mesh-gradient" />
      
      {/* Animated glow orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
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
              <span className="text-gradient text-glow">VeloXyra</span>
              <br />
              <span className="text-foreground">Tournaments</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6"
              variants={itemVariants}
            >
              The ultimate esports tournament platform. Compete in daily
              tournaments, win rewards, and rise through the ranks to prove
              your dominance.
            </motion.p>

            {/* APK Details */}
            <motion.div 
              className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-8"
              variants={itemVariants}
            >
              <div className="glass flex items-center gap-2 px-4 py-2 rounded-full text-sm text-muted-foreground hover:border-primary/30 transition-colors">
                <Smartphone className="w-4 h-4 text-primary" />
                <span>VeloXyra v1.0.0</span>
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
              <Button 
                variant="hero" 
                size="xl"
                className="group relative overflow-hidden pulse-glow"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download App
                </span>
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl"
                onClick={scrollToFeatures}
                className="group glass hover:border-primary/50 transition-all"
              >
                <span className="group-hover:text-primary transition-colors">Learn More</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup with 3D effect */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            variants={phoneVariants}
            initial="hidden"
            animate="visible"
            style={{ perspective: "1000px" }}
          >
            <motion.div 
              className="relative"
              whileHover={{ 
                rotateY: 10, 
                rotateX: -5,
                scale: 1.05,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Layered glow behind phone */}
              <div className="absolute inset-0 bg-primary/30 blur-[80px] rounded-full scale-75" />
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-100" />
              
              {/* Floating particles */}
              <motion.div 
                className="absolute -top-8 -left-8 w-4 h-4 bg-primary/50 rounded-full blur-sm"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute top-1/2 -right-8 w-3 h-3 bg-primary/40 rounded-full blur-sm"
                animate={{
                  y: [0, 15, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="absolute -bottom-8 left-1/4 w-2 h-2 bg-primary/60 rounded-full blur-sm"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              
              <img
                src={phoneMockup}
                alt="VeloXyra Tournaments App"
                className="relative z-10 w-72 sm:w-80 lg:w-96 animate-float drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-sm text-muted-foreground">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
