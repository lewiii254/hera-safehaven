import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Detect from "./pages/Detect";
import Support from "./pages/Support";
import Auth from "./pages/Auth";
import EvidenceLocker from "./pages/EvidenceLocker";
import CommunityForum from "./pages/CommunityForum";
import AdminDashboard from "./pages/AdminDashboard";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { DecoyScreen } from "./components/DecoyScreen";
import { SOSButton } from "./components/SOSButton";

const queryClient = new QueryClient();

const App = () => {
  const [sosActive, setSosActive] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {sosActive && <DecoyScreen onExit={() => setSosActive(false)} />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/detect" element={<Detect />} />
            <Route path="/support" element={<Support />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/evidence" element={<EvidenceLocker />} />
            <Route path="/forum" element={<CommunityForum />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SOSButton onActivate={() => setSosActive(true)} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
