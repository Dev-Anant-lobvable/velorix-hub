import { Users, Trophy, Star, Headphones } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { icon: Users, value: 424865, label: "Happy Gamers", suffix: "+", format: true },
  { icon: Star, value: 4.5, label: "App Rating", suffix: "/5", format: false },
  { icon: Trophy, value: 1000, label: "Daily Tournaments", suffix: "+", format: true },
  { icon: Headphones, value: 24, label: "Support", suffix: "/7", format: false, displayAs: "24" },
];

const AnimatedCounter = ({ value, suffix, format, displayAs }: { value: number; suffix: string; format: boolean; displayAs?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    if (displayAs) { setCount(value); return; }

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value, displayAs]);

  const display = displayAs
    ? displayAs
    : format
    ? count.toLocaleString("en-IN")
    : Number.isInteger(value)
    ? count.toString()
    : count.toFixed(1);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl font-bold text-primary mb-1 group-hover:text-glow transition-all duration-300">
      {display}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center group cursor-default"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex justify-center mb-3"
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  <stat.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
              </motion.div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} format={stat.format} displayAs={stat.displayAs} />
              <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
