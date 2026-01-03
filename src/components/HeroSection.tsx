import { Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import phoneMockup from "@/assets/phone-mockup-new.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-dark-gradient" />
      
      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-primary">VeloXyra</span>
              <br />
              <span className="text-foreground">Tournaments</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              The ultimate esports tournament platform. Compete in daily
              tournaments, win rewards, and rise through the ranks to prove
              your dominance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="xl"
              >
                <Download className="w-5 h-5" />
                Download App
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-75" />
              <img
                src={phoneMockup}
                alt="VeloXyra Tournaments App"
                className="relative z-10 w-72 sm:w-80 lg:w-96 animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
          <span className="text-sm text-muted-foreground">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
