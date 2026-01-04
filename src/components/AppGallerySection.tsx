import phoneMockup from "@/assets/phone-mockup-new.png";

const AppGallerySection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">App </span>
            <span className="text-primary">Screenshots</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the power of VeloXyra Tournaments with our sleek and intuitive interface
          </p>
        </div>

        {/* Gallery Display */}
        <div className="relative flex justify-center items-center">
          {/* Glow effect behind */}
          <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
          
          {/* Main phone display - large and centered */}
          <div className="relative group">
            {/* Phone glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            <img
              src={phoneMockup}
              alt="VeloXyra App Interface"
              className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Feature highlights below gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { title: "Live Tournaments", desc: "Join real-time competitions" },
            { title: "Leaderboards", desc: "Track your ranking" },
            { title: "Rewards", desc: "Win exciting prizes" },
            { title: "Community", desc: "Connect with gamers" },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300"
            >
              <h3 className="text-foreground font-semibold mb-1">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppGallerySection;
