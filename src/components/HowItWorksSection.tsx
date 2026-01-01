import { Download, Smartphone, UserPlus, Gamepad2 } from "lucide-react";

const steps = [
  {
    icon: Download,
    title: "Download App",
    description: "Quick and secure download from our official website in a single tap.",
  },
  {
    icon: Smartphone,
    title: "Install App",
    description: "Easy installation process with seamless onboarding. No technical knowledge required.",
  },
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Simple account creation flow in under 30 seconds. Secure and privacy-focused.",
  },
  {
    icon: Gamepad2,
    title: "Start Playing",
    description: "Join matches, compete in tournaments, and earn rewards with VeloXyra.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[200px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How <span className="text-gradient">VeloXyra</span> Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your gaming journey becomes seamless with smart features that players
            already use every day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="glass rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center font-display font-bold text-sm text-background">
                  {index + 1}
                </div>

                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
