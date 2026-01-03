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
    <section id="features" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Why Choose <span className="text-primary">VeloXyra</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The premier destination for competitive gamers. Professional-grade tournaments that put your skills to the test.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;