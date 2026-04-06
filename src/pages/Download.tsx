import { Download as DownloadIcon, FileArchive, Info, ExternalLink } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { playDownloadSound } from "@/hooks/useSoundEffect";
import useExternalLinkSound from "@/hooks/useExternalLinkSound";

const STORAGE_BASE = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/apk-files`;
const GOOGLE_DRIVE_LINK = "https://drive.google.com/file/d/1nDBuhioBdBs4SOJ6iJr5ct6bJ6IUZ3J3/view?usp=drivesdk";

const fileParts = [
  { name: "velorix-app.zip.001", size: "10 MB" },
  { name: "velorix-app.zip.002", size: "10 MB" },
  { name: "velorix-app.zip.003", size: "10 MB" },
  { name: "velorix-app.zip.004", size: "10 MB" },
  { name: "velorix-app.zip.005", size: "10 MB" },
  { name: "velorix-app.zip.006", size: "10 MB" },
  { name: "velorix-app.zip.007", size: "~7 MB" },
];

const DownloadPage = () => {
  useExternalLinkSound();

  const handlePartDownload = (partName: string) => {
    playDownloadSound();
    const a = document.createElement("a");
    a.href = `${STORAGE_BASE}/${partName}`;
    a.download = partName;
    a.click();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-dark-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-60 pointer-events-none" />
      <div className="download-page-glow absolute inset-x-0 top-20 h-80 pointer-events-none" />
      <div className="download-page-grid absolute inset-0 pointer-events-none" />

      <Navbar />
      <main className="container relative z-10 mx-auto px-4 pt-32 pb-20">
        <BackButton />
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Download <span className="text-gradient">VeloRix</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose your preferred download method below.
          </p>
        </motion.div>

        {/* Direct Download Option */}
        <motion.div
          className="max-w-2xl mx-auto glass rounded-xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-1">Option 1 — Direct Download</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Single APK file (~120 MB). Fastest way to get started.
          </p>
          <a
            href={GOOGLE_DRIVE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playDownloadSound()}
            className="flex items-center justify-between p-4 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all group"
          >
            <div className="flex items-center gap-3">
              <DownloadIcon className="w-5 h-5 text-primary" />
              <div>
                <span className="text-sm font-medium text-foreground">VeloRix APK</span>
                <span className="text-xs text-muted-foreground ml-2">~120 MB</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </motion.div>

        {/* Split Packages Option */}
        <motion.div
          className="max-w-2xl mx-auto glass rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-1">Option 2 — Split Packages</h2>
          <p className="text-sm text-muted-foreground mb-4">
            7 smaller parts (~67 MB total). Use if you have a slow connection.
          </p>

          <div className="flex items-start gap-3 mb-5 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">How to install:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Download all 7 parts below</li>
                <li>Place them in the same folder</li>
                <li>Extract Part 1 using ZArchiver, WinRAR, or 7-Zip</li>
                <li>Install the APK from the extracted file</li>
              </ol>
            </div>
          </div>

          <div className="space-y-3">
            {fileParts.map((part, index) => (
              <motion.button
                key={part.name}
                onClick={() => handlePartDownload(part.name)}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <div className="flex items-center gap-3">
                  <FileArchive className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-sm font-medium text-foreground">Part {index + 1}</span>
                    <span className="text-xs text-muted-foreground ml-2">{part.size}</span>
                  </div>
                </div>
                <DownloadIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.button>
            ))}
          </div>

          <div className="mt-4 text-center">
            <AnimatedButton
              variant="hero"
              size="default"
              className="pulse-glow"
              onClick={() => {
                playDownloadSound();
                fileParts.forEach((part, i) => {
                  setTimeout(() => {
                    const a = document.createElement("a");
                    a.href = `${STORAGE_BASE}/${part.name}`;
                    a.download = part.name;
                    a.click();
                  }, i * 1000);
                });
              }}
            >
              <DownloadIcon className="w-4 h-4" />
              Download All Parts
            </AnimatedButton>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadPage;
