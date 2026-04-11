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
          <AnimatedRoutes />
        </BrowserRouter>
        <AnimatePresence>{showSplash ? <LoadingSplash /> : null}</AnimatePresence>
        <Analytics />
        <SpeedInsights />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
