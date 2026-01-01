import { Shield, Zap, Bell, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Fair Play",
    description:
      "All matches are conducted fairly. Everyone gets rewards based on their performance.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description:
      "Built with the latest technology for lightning-fast gameplay and smooth experience.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Never miss a tournament! Get instant notifications for matches and rewards.",
  },
  {
    icon: Award,
    title: "Instant Rewards",
    description:
      "Win tournaments and receive your rewards instantly. No waiting, no delays.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient">VeloXyra</span> Tournaments
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              The premier destination for competitive gamers. We host
              professional-grade tournaments that give you the chance to put
              your skills to the test and earn amazing rewards.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="glass rounded-xl p-5 group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Decorative Element */}
          <div className="relative flex justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Animated Circles */}
              <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-pulse" />
              <div className="absolute inset-4 border-2 border-secondary/30 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute inset-8 border-2 border-accent/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
              
              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center glow-cyan">
                  <span className="font-display text-5xl font-bold text-background">V</span>
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 glass rounded-lg p-3 animate-float">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 glass rounded-lg p-3 animate-float" style={{ animationDelay: "1s" }}>
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 glass rounded-lg p-3 animate-float" style={{ animationDelay: "2s" }}>
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 glass rounded-lg p-3 animate-float" style={{ animationDelay: "3s" }}>
                <Bell className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
