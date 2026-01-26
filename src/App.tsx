import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Sisteme from "./pages/Sisteme";
import Felicity from "./pages/Felicity";
import Proiecte from "./pages/Proiecte";
import Contact from "./pages/Contact";
import Preturi from "./pages/Preturi";
import NotFound from "./pages/NotFound";

type RouterWrapper = (props: { children: ReactNode }) => ReactNode;

const createQueryClient = () => new QueryClient();

const App = ({ Router }: { Router: RouterWrapper }) => {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sisteme" element={<Sisteme />} />
            <Route path="/felicity" element={<Felicity />} />
            <Route path="/proiecte" element={<Proiecte />} />
            <Route path="/preturi" element={<Preturi />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
