import { Download, Smartphone } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { playDownloadSound } from "@/hooks/useSoundEffect";

const DownloadCTA = () => {
  const navigate = useNavigate();
  const handleDownload = () => {
    playDownloadSound();
    navigate("/download");
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-primary rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-glow relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated shimmer overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/5 to-transparent skew-x-12"
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
          />

          <motion.div
            className="flex justify-center mb-6 relative z-10"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary-foreground relative z-10">
            Ready to Play?
          </h2>
          <p className="text-primary-foreground text-lg max-w-2xl mx-auto mb-8 relative z-10">
            Grab the app, join a tournament, and see how you stack up.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <AnimatedButton
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/95 shadow-lg"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5" />
              Download for Android
            </AnimatedButton>
          </div>

          <p className="text-sm text-primary-foreground/80 mt-6 relative z-10">
            Android only for now. iOS is on the way.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadCTA;
