import { Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadCTA = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-magenta/20 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-strong rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center glow-cyan">
              <Smartphone className="w-10 h-10 text-background" />
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Download <span className="text-gradient">VeloXyra</span> Now
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Join thousands of competitive gamers. Download the app and start
            winning tournaments today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="group">
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download for Android
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Available for Android devices. iOS coming soon!
          </p>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;
