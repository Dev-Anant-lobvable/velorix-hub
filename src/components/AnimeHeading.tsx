import { useEffect, useRef } from "react";

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
 * anime.js v4 per-character reveal.
 *
 * Runs ONCE when the heading scrolls into view, animates only GPU-friendly
 * properties (opacity + transform), then cleans up. anime.js is loaded
 * dynamically so it never lands in the SSR bundle or the critical path, and
 * reduced-motion users get the static heading immediately.
 */
const AnimeHeading = ({ parts, className }: AnimeHeadingProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const chars = Array.from(
      root.querySelectorAll<HTMLElement>("[data-anime-char]"),
    );
    if (chars.length === 0) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      chars.forEach((char) => {
        char.style.opacity = "1";
        char.style.transform = "none";
      });
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const { animate, stagger } = await import("animejs");
        if (cancelled) return;
        animate(chars, {
          opacity: [0, 1],
          translateY: [
            { to: "0.6em", duration: 0 },
            { to: "0em" },
          ],
          rotateZ: [
            { to: -6, duration: 0 },
            { to: 0 },
          ],
          duration: 620,
          ease: "outExpo",
          delay: stagger(26),
        });
      } catch {
        chars.forEach((char) => {
          char.style.opacity = "1";
          char.style.transform = "none";
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void run();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(root);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [parts]);

  return (
    <span ref={ref} className={className}>
      {parts.map((part, partIndex) => (
        <span key={`${part.text}-${partIndex}`}>
          {Array.from(part.text).map((char, charIndex) =>
            char === " " ? (
              <span key={`space-${partIndex}-${charIndex}`}> </span>
            ) : (
              <span
                key={`char-${partIndex}-${charIndex}`}
                data-anime-char
                className={`inline-block will-change-transform opacity-0 ${part.className ?? ""}`}
              >
                {char}
              </span>
            ),
          )}
        </span>
      ))}
      <span className="sr-only">
        {parts.map((part) => part.text).join("")}
      </span>
    </span>
  );
};

export default AnimeHeading;
