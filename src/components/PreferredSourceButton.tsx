/**
 * Google "Add to Preferred Sources" button.
 * The Preferred Sources library (loaded in __root.tsx) scans the DOM for the
 * `google-add-preferred-source-btn` attribute and renders a localized badge.
 * The plain link below is the no-JavaScript deeplink fallback.
 */
const PREFERRED_SOURCE_DEEPLINK =
  "https://www.google.com/preferences/source?q=velorix-hub.vercel.app";

const PreferredSourceButton = () => {
  return (
    <div className="space-y-2">
      <div
        {...{ "google-add-preferred-source-btn": "" }}
        data-theme="dark"
        className="min-h-9"
      />
      <noscript>
        <a
          href={PREFERRED_SOURCE_DEEPLINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          Add VeloRix as a Preferred Source on Google
        </a>
      </noscript>
    </div>
  );
};

export default PreferredSourceButton;
