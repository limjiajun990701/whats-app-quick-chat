
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Telegram from "./pages/Telegram";
import NotFound from "./pages/NotFound";
import { Suspense, lazy, useEffect } from "react";

// Preload both background components
const TelegramBackground3D = lazy(() => import("./components/TelegramBackground3D"));
const WhatsAppBackground3D = lazy(() => import("./components/WhatsAppBackground3D"));

// Preloader component to handle preloading backgrounds
const BackgroundPreloader = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Preload the other background based on current route
    if (location.pathname === '/') {
      // Preload Telegram background when on WhatsApp page
      const preloadTelegram = import("./components/TelegramBackground3D");
      return () => {
        // Clean up preloaded module if needed
        preloadTelegram.catch(() => {});
      };
    } else if (location.pathname === '/telegram') {
      // Preload WhatsApp background when on Telegram page
      const preloadWhatsApp = import("./components/WhatsAppBackground3D");
      return () => {
        // Clean up preloaded module if needed
        preloadWhatsApp.catch(() => {});
      };
    }
  }, [location]);
  
  return null;
};

const AppRoutes = () => {
  return (
    <>
      <BackgroundPreloader />
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/telegram" element={<Telegram />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
