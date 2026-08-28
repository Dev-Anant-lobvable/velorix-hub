import { useEffect, useRef, useState } from "react";

/**
 * Google "Add to Preferred Sources" button.
 *
 * The Preferred Sources library (loaded in __root.tsx) scans the DOM for the
 * `google-add-preferred-source-btn` attribute and renders a localized badge —
 * but only for sites Google already recognizes as a news source. Until then
 * (or when the script is blocked), we render our own theme-matching button
 * that deeplinks to the Preferred Sources preference page. If Google ever
 * injects its official badge, we swap to it automatically.
 */
const PREFERRED_SOURCE_DEEPLINK =
  "https://www.google.com/preferences/source?q=velorix-hub.vercel.app";

const GoogleGIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
    />
  </svg>
);

const PreferredSourceButton = () => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [hasOfficialBadge, setHasOfficialBadge] = useState(false);

  // One-time check: if Google's publisher.js injected a badge, prefer it.
  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;

    const check = () => {
      if (el.childElementCount > 0) {
        setHasOfficialBadge(true);
        return true;
      }
      return false;
    };

    if (check()) return;

    // Give the async script a couple of chances, then settle on the fallback.
    const t1 = window.setTimeout(check, 1500);
    const t2 = window.setTimeout(check, 4000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <div className="space-y-2">
      {/* Official Google badge (renders only when Google recognizes the site) */}
      <div
        ref={badgeRef}
        {...{ "google-add-preferred-source-btn": "" }}
        data-theme="dark"
        className={hasOfficialBadge ? "min-h-9" : "hidden"}
        aria-hidden={!hasOfficialBadge}
      />

      {/* Always-available custom fallback */}
      {!hasOfficialBadge && (
        <a
          href={PREFERRED_SOURCE_DEEPLINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <GoogleGIcon />
          Follow VeloRix on Google
        </a>
      )}
    </div>
  );
};

export default PreferredSourceButton;
