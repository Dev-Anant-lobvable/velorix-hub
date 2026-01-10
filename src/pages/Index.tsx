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
      
      {/* Subtle bottom blur */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none z-50 backdrop-blur-md"
        style={{
          maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default Index;
