import { useState, useEffect } from "react";
import phoneMockup from "@/assets/phone-mockup-new.png";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";

const AppGallerySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const galleryImages = [
    { src: gallery1, alt: "Tournament Events Interface" },
    { src: gallery2, alt: "Esports Championship Design" },
    { src: gallery3, alt: "Mobile App Dashboard" },
    { src: gallery4, alt: "Chat & Community Features" },
    { src: gallery5, alt: "Messaging Interface" },
    { src: gallery6, alt: "Storage & Features" },
  ];

  // Auto-scroll carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Full-width phone mockup - fits screen */}
      <div className="relative z-10 mb-16">
        <div className="relative w-full flex justify-center">
          {/* Glow effect behind */}
          <div className="absolute inset-0 bg-primary/15 blur-[120px] rounded-full" />
          
          {/* Main phone display - full width fitting */}
          <div className="relative w-full px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl" />
            <img
              src={phoneMockup}
              alt="VeloXyra App Interface"
              className="relative z-10 w-full h-auto object-contain max-h-[90vh] mx-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Gallery Section with Auto Carousel */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">App </span>
            <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our stunning interface designs and features
          </p>
        </div>

        {/* Auto-scrolling Carousel */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Carousel container */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="min-w-full flex-shrink-0"
              >
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-50" />
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="relative z-10 w-full h-auto max-h-[70vh] object-contain rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
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
