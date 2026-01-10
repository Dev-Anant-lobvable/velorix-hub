import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AppGallerySection from "@/components/AppGallerySection";
import StatsSection from "@/components/StatsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <Navbar />
      <HeroSection />
      <AppGallerySection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FAQSection />
      <DownloadCTA />
      <Footer />
      
      {/* Bottom screen glow effect */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-50"
        style={{
          background: 'linear-gradient(to top, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.15) 40%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />
      <div 
        className="fixed bottom-0 left-0 right-0 h-16 pointer-events-none z-50"
        style={{
          background: 'linear-gradient(to top, hsl(var(--primary) / 0.6) 0%, transparent 100%)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  );
};

export default Index;
