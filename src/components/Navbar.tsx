import { Download, Menu, X } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { playDownloadSound } from "@/hooks/useSoundEffect";
import velorixLogo from "@/assets/velorix-logo.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Blog", href: "/blog", isRoute: true },
  { name: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateScrollState = () => {
      scrollFrameRef.current = null;
      const nextValue = window.scrollY > 100;
      setIsScrolled((prev) => (prev === nextValue ? prev : nextValue));
    };

    const handleScroll = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDownload = () => {
    playDownloadSound();
    navigate("/download");
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-border/20 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.img
              src={velorixLogo}
              alt="VeloRix"
              width={120}
              height={80}
              loading="eager"
              decoding="async"
              className="h-[4.5rem] sm:h-24 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const Component = (link as any).isRoute ? Link : "a";
              const props = (link as any).isRoute ? { to: link.href } : { href: link.href };
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Component
                    {...props}
                    className="relative text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
                  </Component>
                </motion.div>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <AnimatedButton variant="hero" size="default" className="pulse-glow" onClick={handleDownload}>
              <Download className="w-4 h-4" />
              Download
            </AnimatedButton>
          </div>

          <motion.button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 pt-4 mobile-menu-glass rounded-2xl px-4 -mx-2"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  const Component = (link as any).isRoute ? Link : "a";
                  const props = (link as any).isRoute ? { to: link.href } : { href: link.href };
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Component
                        {...props}
                        className="block text-muted-foreground hover:text-primary transition-colors text-sm py-2 hover:translate-x-2 transition-transform duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Component>
                    </motion.div>
                  );
                })}
                <AnimatedButton variant="hero" size="default" className="w-full pulse-glow" onClick={() => { handleDownload(); setIsOpen(false); }}>
                  <Download className="w-4 h-4" />
                  Download APK
                </AnimatedButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
