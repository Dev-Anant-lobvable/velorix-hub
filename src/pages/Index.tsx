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
import GradualBlur from "@/components/reactbits/GradualBlur";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";
import PlayerVoices from "@/components/PlayerVoices";

const Index = () => {
  useExternalLinkSound();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Lightweight scan lines overlay for techy vibe */}
      <div className="scan-lines" />
      
      {/* Global fixed reddish blur at bottom edge */}
      <div className="global-bottom-glow" aria-hidden="true" />

      <Navbar />
      <main id="main-content">
        <HeroSection />
        <Reveal><AppGallerySection /></Reveal>
        <Reveal><StatsSection /></Reveal>
        <Reveal><SocialProofBadges /></Reveal>
        <Reveal><PlayerVoices /></Reveal>
        <Reveal><PartnersRow /></Reveal>
        <Reveal><HowItWorksSection /></Reveal>
        <Reveal><FeaturesSection /></Reveal>
        <Reveal><FAQSection /></Reveal>
        <Reveal><DownloadCTA /></Reveal>
      </main>
      <Footer />

      <BackToTop />

      {/* Global page-level gradual blur at the bottom viewport edge */}
      <GradualBlur
        target="page"
        position="bottom"
        height="4.5rem"
        strength={1.8}
        divCount={5}
        curve="ease-out"
        opacity={0.9}
      />
    </div>
  );
};

export default Index;
