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
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AppGallerySection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FAQSection />
      <DownloadCTA />
      <Footer />
    </div>
  );
};

export default Index;
