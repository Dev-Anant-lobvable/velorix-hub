import { Download, Smartphone } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";

const DownloadCTA = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-primary rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-glow"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex justify-center mb-6"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary-foreground">
            Download VeloRix Now
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of competitive gamers. Download the app and start
            winning tournaments today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton 
              size="xl" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download for Android
            </AnimatedButton>
          </div>

          <p className="text-sm text-primary-foreground/70 mt-6">
            Available for Android devices. iOS coming soon!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadCTA;