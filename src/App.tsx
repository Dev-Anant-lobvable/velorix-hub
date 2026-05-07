import { ReactNode, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSplash from "@/components/LoadingSplash";
import CookieConsent from "@/components/CookieConsent";
import RouteProgress from "@/components/RouteProgress";
import LiveWinnerToast from "@/components/LiveWinnerToast";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";
import DownloadPage from "./pages/Download";
import StatusPage from "./pages/Status";
import Changelog from "./pages/Changelog";
import Blog from "./pages/Blog";
import Error400 from "./pages/errors/Error400";
import Error401 from "./pages/errors/Error401";
import Error403 from "./pages/errors/Error403";
import Error408 from "./pages/errors/Error408";
import Error429 from "./pages/errors/Error429";
import Error500 from "./pages/errors/Error500";
import Error502 from "./pages/errors/Error502";
import Error503 from "./pages/errors/Error503";
import Error504 from "./pages/errors/Error504";
import Maintenance from "./pages/errors/Maintenance";
import Offline from "./pages/errors/Offline";

const queryClient = new QueryClient();
const SPLASH_STORAGE_KEY = "velorix-splash-shown";

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

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants}>
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
        <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
        <Route path="/terms" element={<PageWrapper><TermsOfService /></PageWrapper>} />
        <Route path="/cookies" element={<PageWrapper><CookiePolicy /></PageWrapper>} />
        <Route path="/help" element={<PageWrapper><HelpCenter /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/download" element={<PageWrapper><DownloadPage /></PageWrapper>} />
        <Route path="/status" element={<PageWrapper><StatusPage /></PageWrapper>} />
        <Route path="/changelog" element={<PageWrapper><Changelog /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/error/400" element={<PageWrapper><Error400 /></PageWrapper>} />
        <Route path="/error/401" element={<PageWrapper><Error401 /></PageWrapper>} />
        <Route path="/error/403" element={<PageWrapper><Error403 /></PageWrapper>} />
        <Route path="/error/408" element={<PageWrapper><Error408 /></PageWrapper>} />
        <Route path="/error/429" element={<PageWrapper><Error429 /></PageWrapper>} />
        <Route path="/error/500" element={<PageWrapper><Error500 /></PageWrapper>} />
        <Route path="/error/502" element={<PageWrapper><Error502 /></PageWrapper>} />
        <Route path="/error/503" element={<PageWrapper><Error503 /></PageWrapper>} />
        <Route path="/error/504" element={<PageWrapper><Error504 /></PageWrapper>} />
        <Route path="/maintenance" element={<PageWrapper><Maintenance /></PageWrapper>} />
        <Route path="/offline" element={<PageWrapper><Offline /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(SPLASH_STORAGE_KEY) !== "1";
  });

  useEffect(() => {
    if (!showSplash || typeof window === "undefined") return;

    window.sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    const timer = window.setTimeout(() => setShowSplash(false), 1700);

    return () => window.clearTimeout(timer);
  }, [showSplash]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteProgress />
          <AnimatedRoutes />
          <CookieConsent />
          <LiveWinnerToast />
        </BrowserRouter>
        <AnimatePresence>{showSplash ? <LoadingSplash /> : null}</AnimatePresence>
        <Analytics />
        <SpeedInsights />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
