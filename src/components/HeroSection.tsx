import { Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import phoneMockup from "@/assets/phone-mockup.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-primary-foreground">
              VeloXyra
              <br />
              <span className="opacity-90">Tournaments</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8">
              The ultimate esports tournament platform. Compete in daily
              tournaments, win rewards, and rise through the ranks to prove
              your dominance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Download className="w-5 h-5" />
                Download App
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
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
          <span className="text-sm text-primary-foreground/70">Scroll Down</span>
          <ChevronDown className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;