import { Download as DownloadIcon, FileArchive, Info } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const STORAGE_BASE = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/apk-files`;

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
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
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
            The app is split into 7 parts (~67 MB total). Download all parts, then extract using any zip tool.
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto glass rounded-xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-3 mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
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
              <motion.a
                key={part.name}
                href={`${STORAGE_BASE}/${part.name}`}
                download
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all group"
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
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatedButton
            variant="hero"
            size="xl"
            className="pulse-glow"
            onClick={() => {
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
            <DownloadIcon className="w-5 h-5" />
            Download All Parts
          </AnimatedButton>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Download;
