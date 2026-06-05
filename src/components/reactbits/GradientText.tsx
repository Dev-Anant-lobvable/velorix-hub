import { useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#5227FF", "#FF9FFC", "#B497CF"],
  animationSpeed = 8,
  showBorder = false,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animDur = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (isPaused) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const dt = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += dt;
    if (yoyo) {
      const full = animDur * 2;
      const t = elapsedRef.current % full;
      if (t < animDur) progress.set((t / animDur) * 100);
      else progress.set(100 - ((t - animDur) / animDur) * 100);
    } else {
      progress.set((elapsedRef.current / animDur) * 100);
    }
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed, yoyo, progress]);

  const backgroundPosition = useTransform(progress, (p) => {
    if (direction === "horizontal") return `${p}% 50%`;
    if (direction === "vertical") return `50% ${p}%`;
    return `${p}% 50%`;
  });

  const onEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);
  const onLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const angle =
    direction === "horizontal" ? "to right" : direction === "vertical" ? "to bottom" : "to bottom right";
  const gradientColors = [...colors, colors[0]].join(", ");
  const gradientStyle = {
    backgroundImage: `linear-gradient(${angle}, ${gradientColors})`,
    backgroundSize:
      direction === "horizontal" ? "300% 100%" : direction === "vertical" ? "100% 300%" : "300% 300%",
    backgroundRepeat: "repeat",
  };

  return (
    <motion.span
      className={`relative inline-flex max-w-fit items-center justify-center font-medium overflow-hidden ${
        showBorder ? "py-1 px-2 rounded-[1.25rem]" : ""
      } ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {showBorder && (
        <motion.span
          className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem]"
          style={{ ...gradientStyle, backgroundPosition }}
        >
          <span
            className="absolute bg-background rounded-[1.15rem] z-[-1]"
            style={{ inset: 1 }}
          />
        </motion.span>
      )}
      <motion.span
        className="inline-block relative z-[2] text-transparent bg-clip-text"
        style={{ ...gradientStyle, backgroundPosition, WebkitBackgroundClip: "text" }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}