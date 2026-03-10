import { Download, Smartphone, UserPlus, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: Download,
    title: "Download App",
    description: "Grab the APK from our site. It's lightweight — around 25 MB.",
  },
  {
    icon: Smartphone,
    title: "Install & Open",
    description: "Tap install, open the app. That's it — no weird permissions or setup screens.",
  },
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Enter your name, pick a username, and you're good to go.",
  },
  {
    icon: Gamepad2,
    title: "Join a Match",
    description: "Browse open tournaments, pick one, and start competing for real rewards.",
  },
];

const HowItWorksSection = () => {
  const { ref, isInView } = useScrollAnimation(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
      
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            How <span className="text-gradient text-glow">It Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Get started in under a minute. No complicated setup — just download, sign up, and you're in.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative group"
            >
              {/* Animated Connector Line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  style={{ originX: 0 }}
                >
                  <div className="h-full bg-gradient-to-r from-primary/50 via-primary/30 to-transparent" />
                </motion.div>
              )}

              <motion.div 
                className="glass-card p-6 h-full neon-border"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Step Number with glow */}
                <motion.div 
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-sm text-primary-foreground shadow-neon"
                  whileHover={{ scale: 1.1 }}
                >
                  {index + 1}
                </motion.div>

                {/* Icon with animation */}
                <motion.div 
                  className="w-16 h-16 rounded-xl bg-accent/80 flex items-center justify-center mb-5 relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <step.icon className="w-8 h-8 text-primary relative z-10" />
                </motion.div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
