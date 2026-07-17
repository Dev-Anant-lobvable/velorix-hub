import { ReactNode, Children, isValidElement, cloneElement, CSSProperties } from "react";
import "./ScrollStack.css";

interface ScrollStackProps {
  children: ReactNode;
  /** Distance from viewport top each card sticks at (px). */
  topOffset?: number;
  /** Extra top offset added per card index (creates the stacked staircase). */
  stagger?: number;
  /** Vertical gap between card "slots" (px). Larger = more scroll per card. */
  itemSpacing?: number;
  className?: string;
}

interface ItemProps {
  children: ReactNode;
  className?: string;
}

export const ScrollStackItem = ({ children, className = "" }: ItemProps) => (
  <div className={className}>{children}</div>
);

const ScrollStack = ({
  children,
  topOffset = 96,
  stagger = 14,
  itemSpacing = 40,
  className = "",
}: ScrollStackProps) => {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className={`scroll-stack ${className}`}>
      {items.map((child, i) => {
        const top = topOffset + i * stagger;
        // Slight scale reduction on lower cards so upper ones "pop" as they land.
        const scale = 1 - (items.length - 1 - i) * 0.015;
        const style: CSSProperties = {
          top: `${top}px`,
          marginBottom: i === items.length - 1 ? 0 : `${itemSpacing}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center top",
          zIndex: i + 1,
        };
        return (
          <div key={i} className="scroll-stack__item" style={style}>
            {cloneElement(child as React.ReactElement)}
          </div>
        );
      })}
      {/* tail spacer so the last card can settle */}
      <div aria-hidden style={{ height: `${topOffset}px` }} />
    </div>
  );
};

export default ScrollStack;