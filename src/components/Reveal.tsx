import { ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
  children: ReactNode;
  /** Extra delay in ms, useful for staggering siblings */
  delay?: number;
  className?: string;
}

/**
 * GPU-only scroll reveal. Uses IntersectionObserver + a CSS class swap,
 * so there is no JS animation loop — stays smooth on mid-range Androids.
 */
const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${shown ? " is-revealed" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;