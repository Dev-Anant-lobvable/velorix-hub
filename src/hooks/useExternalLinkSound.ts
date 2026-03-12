import { useEffect } from "react";
import { playExternalLinkSound } from "./useSoundEffect";

/** Plays a sound whenever an external link (target="_blank") is clicked anywhere on the page. */
const useExternalLinkSound = () => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.("a");
      if (anchor && anchor.target === "_blank") {
        playExternalLinkSound();
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);
};

export default useExternalLinkSound;
