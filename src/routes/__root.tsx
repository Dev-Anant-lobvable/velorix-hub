import { ReactNode, useEffect, useState } from "react";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadingSplash from "@/components/LoadingSplash";
import CookieConsent from "@/components/CookieConsent";
import RouteProgress from "@/components/RouteProgress";
import LiveWinnerToast from "@/components/LiveWinnerToast";
import ConnectivityWatcher from "@/components/ConnectivityWatcher";
import ClickSpark from "@/components/reactbits/ClickSpark";
import NotFound from "@/pages/NotFound";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import appCss from "../styles.css?url";

const SPLASH_STORAGE_KEY = "velorix-splash-shown";

const SITE_URL = "https://velorix-hub.vercel.app";
const SITE_TITLE =
  "VeloRix Tournaments - Free Fire, BGMI & Esports Tournament App | Play & Win";
const SITE_DESCRIPTION =
  "Join VeloRix Tournaments - India's best Free Fire, BGMI & esports tournament app. Compete in daily Free Fire tournaments, win real cash prizes, and climb the leaderboard. Download free!";
const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/efb86e98-8388-4987-9dcd-0586104a044f";

const GTM_ID = "GTM-T9XSDVX6";

const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

const mobileApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "VeloRix Tournaments",
  operatingSystem: "Android 7.0+",
  applicationCategory: "GameApplication",
  description:
    "The ultimate esports tournament platform for Free Fire, BGMI, Call of Duty Mobile & more. Compete in daily tournaments, win real cash prizes.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    ratingCount: "1000",
  },
  author: { "@type": "Organization", name: "VeloRix", url: SITE_URL },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is VeloRix Tournaments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VeloRix Tournaments is a competitive gaming platform for Free Fire, BGMI, and other eSports. Participate in daily tournaments, compete for real cash prizes, and connect with gamers.",
      },
    },
    {
      "@type": "Question",
      name: "How do I join a Free Fire tournament?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Download the VeloRix app, create your account, browse available Free Fire tournaments, and register. You'll receive notifications about match schedules and results.",
      },
    },
    {
      "@type": "Question",
      name: "Is the tournament app free to download?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! VeloRix Tournaments is completely free to download and use. Some premium tournaments may have entry fees, but there are plenty of free tournaments available.",
      },
    },
    {
      "@type": "Question",
      name: "What games are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We support BGMI, Free Fire, Call of Duty Mobile, Valorant, and many more popular esports titles.",
      },
    },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "VeloRix Tournaments",
  alternateName: "VeloRix",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/velorix-favicon.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.png`,
  description:
    "India-focused mobile esports tournament platform for Free Fire, BGMI and Call of Duty Mobile. Skill-based tournaments with real cash prizes.",
  email: "service.veloxyra@gmail.com",
  foundingDate: "2026",
  areaServed: { "@type": "Country", name: "India" },
  sameAs: [
    "https://www.instagram.com/velorix_tournaments",
    "https://x.com/VeloRix",
  ],
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  knowsAbout: [
    "Free Fire tournaments",
    "BGMI tournaments",
    "mobile esports",
    "anti-cheat",
    "clash squad",
    "esports tournament formats",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "service.veloxyra@gmail.com",
      url: `${SITE_URL}/contact`,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: "service.veloxyra@gmail.com",
      url: `${SITE_URL}/developers`,
      availableLanguage: ["en"],
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "VeloRix Tournaments",
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SPLASH_STORAGE_KEY) === "1") return;

    window.sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    setShowSplash(true);
    const timer = window.setTimeout(() => setShowSplash(false), 1700);

    return () => window.clearTimeout(timer);
  }, []);

  // ported from main.tsx — offline/slow-network runtime caching (production only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !import.meta.env.PROD) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Silent fail — offline support just won't be available
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouteProgress />
        <ClickSpark
          sparkColor="hsl(350 85% 65%)"
          sparkCount={10}
          sparkRadius={18}
          sparkSize={12}
          duration={500}
        >
          <ConnectivityWatcher>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
            <CookieConsent />
            <LiveWinnerToast />
          </ConnectivityWatcher>
        </ClickSpark>
        <AnimatePresence>{showSplash ? <LoadingSplash /> : null}</AnimatePresence>
        <Analytics />
        <SpeedInsights />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function RootErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        This page didn&apos;t load
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Something broke on our side. Try again — if it keeps happening, head back
        to the home page.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      {
        name: "keywords",
        content:
          "free fire tournament, free fire tournament app, BGMI tournament, esports tournament app, gaming tournament India, free fire competition, online gaming tournament, mobile esports, free fire custom room, BGMI custom room, tournament app download, competitive gaming app, free fire diamond, esports India, VeloRix, Call of Duty Mobile tournament, Valorant tournament, gaming cash prizes, free entry tournament, daily tournament app",
      },
      { name: "author", content: "VeloRix Tournaments" },
      {
        name: "robots",
        content:
          "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { name: "google-adsense-account", content: "ca-pub-3064459777007630" },
      {
        name: "google-site-verification",
        content: "WWfNXAaKIjBPh61UtDgFYzshFicSoPwLWAV4H-IKKpM",
      },
      {
        name: "trustpilot-one-time-domain-verification-id",
        content: "ff962865-ca0f-4d17-81be-c6b338f05ed3",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "VeloRix Tournaments" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "640" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@VeloRix" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", type: "image/png", href: "/velorix-favicon.png" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/velorix-favicon.png",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "alternate",
        type: "text/plain",
        href: "/llms.txt",
        title: "llms.txt (AI content index)",
      },
      {
        rel: "alternate",
        type: "text/plain",
        href: "/llms-full.txt",
        title: "llms-full.txt (full text for AI)",
      },
      {
        rel: "alternate",
        type: "text/markdown",
        href: "/md/index.md",
        title: "Markdown version of this page",
      },
    ],
    scripts: [
      { children: GTM_SNIPPET },
      {
        src: "https://news.google.com/swg/js/v1/publisher.js",
        async: true,
      },
      {
        src: "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js",
        async: true,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(mobileApplicationJsonLd),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd),
      },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootErrorComponent,
});
