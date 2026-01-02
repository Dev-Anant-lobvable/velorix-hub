import { Users, Trophy, Star, Headphones } from "lucide-react";

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
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;