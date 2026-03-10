import { Shield, Zap, Bell, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Shield,
    title: "Fair Play",
    description:
      "No rigged matches. Your rank, your rewards — all based on how you actually play.",
  },
  {
    icon: Zap,
    title: "Runs Smooth",
    description:
      "We tested on budget phones too. The app stays quick even on low-end Android devices.",
  },
  {
    icon: Bell,
    title: "Match Alerts",
    description:
      "Get a ping before your tournament starts. No more missing matches because you forgot.",
  },
  {
    icon: Award,
    title: "Quick Payouts",
    description:
      "Won a match? Your winnings hit your wallet right after the results are out.",
  },
];

const FeaturesSection = () => {
  const { ref, isInView } = useScrollAnimation(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="features" className="py-24 bg-secondary relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Why <span className="text-gradient text-glow">VeloRix</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built by gamers who were tired of scammy tournament apps. Here's what makes us different.
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="glass-card h-full p-6 hover:border-primary/40 transition-all duration-300 neon-border hover:shadow-glow">
                {/* Icon container with glow */}
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-accent/80 flex items-center justify-center mb-5 relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <feature.icon className="w-7 h-7 text-primary relative z-10" />
                </motion.div>
                
                <h3 className="font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
