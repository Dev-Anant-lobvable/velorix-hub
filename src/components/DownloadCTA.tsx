import { Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadCTA = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-hero-gradient rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary-foreground">
            Download VeloXyra Now
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of competitive gamers. Download the app and start
            winning tournaments today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download for Android
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/70 mt-6">
            Available for Android devices. iOS coming soon!
          </p>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;