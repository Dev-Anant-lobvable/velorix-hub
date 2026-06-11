import { Download, Smartphone, UserPlus, Gamepad2 } from "@/lib/icons";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SimpleCarousel from "@/components/reactbits/SimpleCarousel";
import GradualBlur from "@/components/reactbits/GradualBlur";

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

  const carouselItems = steps.map((s, i) => ({
    id: i + 1,
    title: `${String(i + 1).padStart(2, "0")}. ${s.title}`,
    description: s.description,
    badge: `Step ${i + 1}`,
    icon: <s.icon className="w-7 h-7 text-primary" />,
  }));

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
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            How <span className="text-gradient text-glow">It Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Get started in under a minute. No complicated setup — just download, sign up, and you're in.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SimpleCarousel items={carouselItems} autoplay autoplayDelay={4500} />
        </motion.div>
      </div>

      {/* Soft gradual blur fade into next section */}
      <GradualBlur target="parent" position="bottom" height="5rem" strength={1.5} divCount={4} opacity={0.85} />
    </section>
  );
};

export default HowItWorksSection;
