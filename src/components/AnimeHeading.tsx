import { useEffect, useRef, useState } from "react";

export interface AnimeHeadingPart {
  text: string;
  /** Optional classes applied to every character in this part */
  className?: string;
}

interface AnimeHeadingProps {
  parts: AnimeHeadingPart[];
  className?: string;
}

/**
 * Per-character heading reveal using a GPU-friendly CSS keyframe.
 *
 * Characters are fully visible by default — the reveal only plays once the
 * heading scrolls into view, so text can never get stuck invisible if the
 * animation never starts (reduced motion, JS off, SSR).
 */
const AnimeHeading = ({ parts, className }: AnimeHeadingProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          setPlay(true);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  let charIndex = 0;

  return (
    <span ref={ref} className={className}>
      {parts.map((part, partIndex) => (
        <span key={`${part.text}-${partIndex}`}>
          {Array.from(part.text).map((char, i) =>
            char === " " ? (
              <span key={`space-${partIndex}-${i}`}> </span>
            ) : (
              <span
                key={`char-${partIndex}-${i}`}
                className={`inline-block ${play ? "char-reveal" : ""} ${part.className ?? ""}`}
                style={play ? { animationDelay: `${charIndex++ * 26}ms` } : undefined}
              >
                {char}
              </span>
            ),
          )}
        </span>
      ))}
    </span>
  );
};

export default AnimeHeading;
