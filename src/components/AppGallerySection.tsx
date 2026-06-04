import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { ChevronLeft, ChevronRight } from "@/lib/icons";
import { playSound } from "@/hooks/useSoundEffect";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";

const galleryImages = [
  { src: gallery1, alt: "Tournament Events Interface" },
  { src: gallery2, alt: "Esports Championship Design" },
  { src: gallery3, alt: "Mobile App Dashboard" },
  { src: gallery4, alt: "Chat & Community Features" },
  { src: gallery5, alt: "Messaging Interface" },
  { src: gallery6, alt: "Storage & Features" },
];

const features = [
  { title: "Live Tournaments", desc: "Join real-time competitions" },
  { title: "Leaderboards", desc: "Track your ranking" },
  { title: "Rewards", desc: "Win exciting prizes" },
  { title: "Community", desc: "Connect with gamers" },
];

const AppGallerySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [allowAutoplay, setAllowAutoplay] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { ref, isInView } = useScrollAnimation(0.1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncAutoplay = () => {
      setAllowAutoplay(mediaQuery.matches && !document.hidden);
    };

    syncAutoplay();
    document.addEventListener("visibilitychange", syncAutoplay);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncAutoplay);
    } else {
      mediaQuery.addListener(syncAutoplay);
    }

    return () => {
      document.removeEventListener("visibilitychange", syncAutoplay);

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", syncAutoplay);
      } else {
        mediaQuery.removeListener(syncAutoplay);
      }
    };
  }, []);

  useEffect(() => {
    if (!allowAutoplay || shouldReduceMotion || !isInView) return;

    const interval = window.setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [allowAutoplay, isInView, shouldReduceMotion]);

  const slideVariants = {
    enter: (slideDirection: number) => ({
      x: shouldReduceMotion ? 0 : slideDirection > 0 ? 180 : -180,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (slideDirection: number) => ({
      zIndex: 0,
      x: shouldReduceMotion ? 0 : slideDirection < 0 ? 180 : -180,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
    }),
  };

  const navigate = useCallback((dir: number) => {
    playSound("/sounds/external-link.mp3", 0.2);
    setDirection(dir);
    setCurrentSlide((prev) => {
      const next = prev + dir;
      return next < 0 ? galleryImages.length - 1 : next % galleryImages.length;
    });
  }, []);

  return (
    <section className="relative py-24 overflow-x-hidden overflow-y-visible" ref={ref}>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
      <div className="section-top-blur absolute inset-x-0 -top-20 h-40 pointer-events-none sm:-top-24 sm:h-48" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">App </span>
            <span className="text-gradient text-glow">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our stunning interface designs and features
          </p>
        </motion.div>

        <motion.div
          className="relative h-[60vh] max-h-[600px] mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass w-12 h-12 rounded-full flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all group"
          >
            <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass w-12 h-12 rounded-full flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all group"
          >
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>

          <div className="relative h-full flex items-center justify-center overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={
                  shouldReduceMotion
                    ? { duration: 0.18 }
                    : {
                        x: { type: "spring", stiffness: 220, damping: 30 },
                        opacity: { duration: 0.18 },
                        scale: { duration: 0.18 },
                      }
                }
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <ImageWithSkeleton
                    src={galleryImages[currentSlide].src}
                    alt={galleryImages[currentSlide].alt}
                    width={400}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 max-h-[55vh] w-auto object-contain rounded-xl shadow-2xl"
                    skeletonClassName="w-[300px] h-[55vh] rounded-xl"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  playSound("/sounds/external-link.mp3", 0.15);
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-primary w-8 shadow-neon"
                    : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
              className="group"
            >
              <div className="text-center p-5 rounded-xl glass hover:border-primary/40 transition-all duration-300 hover:shadow-soft">
                <h3 className="text-foreground font-semibold mb-1 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AppGallerySection;
