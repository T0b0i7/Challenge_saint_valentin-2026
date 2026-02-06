import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ValentinePreloader } from "@/components/valentine/ValentinePreloader";
import LandingPage from "@/components/common/LandingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    const handleAnimationEnd = () => {
      setShowLanding(true);
    };

    window.addEventListener('valentineAnimationEnd', handleAnimationEnd);
    
    return () => {
      window.removeEventListener('valentineAnimationEnd', handleAnimationEnd);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                {!showLanding && <ValentinePreloader onAnimationEnd={() => {
                  window.dispatchEvent(new CustomEvent('valentineAnimationEnd'));
                }} />}
                {showLanding && <LandingPage />}
              </>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
