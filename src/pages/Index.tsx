import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AppGallerySection from "@/components/AppGallerySection";
import StatsSection from "@/components/StatsSection";
import SocialProofBadges from "@/components/SocialProofBadges";
import PartnersRow from "@/components/PartnersRow";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";
import useExternalLinkSound from "@/hooks/useExternalLinkSound";

const Index = () => {
  useExternalLinkSound();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Lightweight scan lines overlay for techy vibe */}
      <div className="scan-lines" />

      <Navbar />
      <main>
        <HeroSection />
        <AppGallerySection />
        <StatsSection />
        <SocialProofBadges />
        <PartnersRow />
        <HowItWorksSection />
        <FeaturesSection />
        <FAQSection />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
