import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SimpleCarouselItem {
  id: number | string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}

interface Props {
  items: SimpleCarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

const GAP = 16;

const SimpleCarousel = ({ items, autoplay = true, autoplayDelay = 4000 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(280);
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const w = containerRef.current?.clientWidth ?? 320;
      // single card view, leave a small peek on the side
      setItemWidth(Math.min(w - 32, 360));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const controls = animate(x, -index * (itemWidth + GAP), {
      type: "spring",
      stiffness: 220,
      damping: 28,
    });
    return controls.stop;
  }, [index, itemWidth, x]);

  useEffect(() => {
    if (!autoplay || paused) return;
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % items.length);
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, paused, autoplayDelay, items.length]);

  const next = () => setIndex((p) => (p + 1) % items.length);
  const prev = () => setIndex((p) => (p - 1 + items.length) % items.length);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl mx-auto select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="overflow-hidden px-4">
        <motion.div
          className="flex"
          style={{ x, gap: GAP }}
          drag="x"
          dragConstraints={{
            left: -(items.length - 1) * (itemWidth + GAP),
            right: 0,
          }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 || info.velocity.x < -400) next();
            else if (info.offset.x > 50 || info.velocity.x > 400) prev();
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className="shrink-0 liquid-glass rounded-2xl p-7 flex flex-col gap-4"
              style={{ width: itemWidth, minHeight: 260 }}
              animate={{
                scale: i === index ? 1 : 0.92,
                opacity: i === index ? 1 : 0.55,
              }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-xl bg-accent/80 flex items-center justify-center">
                  {item.icon}
                </div>
                {item.badge && (
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
                    {item.badge}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <button
        type="button"
        aria-label="Previous"
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 border border-border backdrop-blur flex items-center justify-center text-foreground hover:bg-primary/20 hover:border-primary transition-colors z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/70 border border-border backdrop-blur flex items-center justify-center text-foreground hover:bg-primary/20 hover:border-primary transition-colors z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;
