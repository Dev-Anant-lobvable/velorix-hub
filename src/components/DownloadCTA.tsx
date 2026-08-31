import PrizeCrest from "@/components/three/PrizeCrest";
import { Download, Smartphone } from "@/lib/icons";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { useNavigate } from "@/lib/router-compat";
import { playDownloadSound } from "@/hooks/useSoundEffect";
import ShinyText from "@/components/reactbits/ShinyText";

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
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          whileHover={{ scale: 1.02 }}
        >
          {/* CSS shimmer — no JS animation */}
          <div className="absolute inset-0 cta-shimmer pointer-events-none" />

          {/* three.js wireframe crest — code-split, paused off-screen */}
          <PrizeCrest className="absolute inset-0 opacity-60 pointer-events-none" />

          <div className="flex justify-center mb-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary-foreground relative z-10">
            <ShinyText
              text="Ready to Play?"
              color="hsl(var(--primary-foreground))"
              shineColor="#ffffff"
              speed={3}
            />
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
