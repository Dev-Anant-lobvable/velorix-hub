import { Users, Trophy, Star, Headphones } from "@/lib/icons";
import { motion } from "framer-motion";
import CountUp from "@/components/reactbits/CountUp";

const stats = [
  { icon: Users, value: 424865, label: "Happy Gamers", suffix: "+", format: true },
  { icon: Star, value: 4.5, label: "App Rating", suffix: "/5", format: false },
  { icon: Trophy, value: 1000, label: "Daily Tournaments", suffix: "+", format: true },
  { icon: Headphones, value: 24, label: "Support", suffix: "/7", format: false, displayAs: "24" },
];

const AnimatedCounter = ({
  value,
  suffix,
  format,
  displayAs,
}: {
  value: number;
  suffix: string;
  format: boolean;
  displayAs?: string;
}) => {
  return (
    <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 group-hover:text-glow transition-all duration-300">
      {displayAs ? (
        <>{displayAs}</>
      ) : (
        <CountUp to={value} duration={2} separator={format ? "," : ""} />
      )}
      {suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 bg-background relative">
      {/* Subtle top separator line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center group cursor-default"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
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
