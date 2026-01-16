import { Users, Trophy, Star, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "4,24,865+", label: "Happy Gamers" },
  { icon: Star, value: "4.5/5", label: "App Rating" },
  { icon: Trophy, value: "1000+", label: "Daily Tournaments" },
  { icon: Headphones, value: "24/7", label: "Support" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center group cursor-default"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="flex justify-center mb-3"
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-glow transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
              </motion.div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 group-hover:text-glow transition-all duration-300">
                {stat.value}
              </div>
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