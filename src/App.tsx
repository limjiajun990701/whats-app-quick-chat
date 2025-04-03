
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Index from "./pages/Index";
import Telegram from "./pages/Telegram";
import NotFound from "./pages/NotFound";

// Lazy load both background components
const TelegramBackground3D = lazy(() => import("./components/TelegramBackground3D"));
const WhatsAppBackground3D = lazy(() => import("./components/WhatsAppBackground3D"));

// Background manager component
const BackgroundManager = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  
  useEffect(() => {
    // Update the current path
    setCurrentPath(location.pathname);
    
    // Preload the other background
    if (location.pathname === '/') {
      // Preload Telegram background when on WhatsApp page
      import("./components/TelegramBackground3D").catch(() => {
        console.warn("Failed to preload Telegram background");
      });
    } else if (location.pathname === '/telegram') {
      // Preload WhatsApp background when on Telegram page
      import("./components/WhatsAppBackground3D").catch(() => {
        console.warn("Failed to preload WhatsApp background");
      });
    }
  }, [location.pathname]);
  
  return (
    <Suspense fallback={
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-gray-900 to-gray-800" />
    }>
      {currentPath === '/' && <WhatsAppBackground3D />}
      {currentPath === '/telegram' && <TelegramBackground3D />}
    </Suspense>
  );
};

const AppRoutes = () => {
  return (
    <>
      <BackgroundManager />
      <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center">Loading...</div>}>
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
