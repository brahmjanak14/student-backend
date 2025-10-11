import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import BottomNavigation from "@/components/BottomNavigation";

// Import main pages
import Landing from "@/pages/Landing";
import EligibilityForm from "@/pages/EligibilityForm";
import Result from "@/pages/Result";
import LeadCapture from "@/pages/LeadCapture";
import DownloadShare from "@/pages/DownloadShare";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

// Import component examples for development
import NavbarExample from "@/components/examples/Navbar";
import HeroExample from "@/components/examples/Hero";
import CardExample from "@/components/examples/Card";
import ButtonExample from "@/components/examples/Button";
import LandingExample from "@/pages/examples/Landing";
import EligibilityFormExample from "@/pages/examples/EligibilityForm";
import ResultExample from "@/pages/examples/Result";
import LeadCaptureExample from "@/pages/examples/LeadCapture";
import DownloadShareExample from "@/pages/examples/DownloadShare";

// Import admin pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";

function Router() {
  return (
    <Switch>
      {/* Main Application Routes */}
      <Route path="/" component={Landing} />
      <Route path="/eligibility" component={EligibilityForm} />
      <Route path="/result" component={Result} />
      <Route path="/lead-capture" component={LeadCapture} />
      <Route path="/download-share" component={DownloadShare} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/users" component={AdminUsers} />
      
      {/* Component Examples for Development */}
      <Route path="/examples/navbar" component={NavbarExample} />
      <Route path="/examples/hero" component={HeroExample} />
      <Route path="/examples/card" component={CardExample} />
      <Route path="/examples/button" component={ButtonExample} />
      <Route path="/examples/landing" component={LandingExample} />
      <Route path="/examples/eligibility-form" component={EligibilityFormExample} />
      <Route path="/examples/result" component={ResultExample} />
      <Route path="/examples/lead-capture" component={LeadCaptureExample} />
      <Route path="/examples/download-share" component={DownloadShareExample} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="min-h-screen bg-white pb-16 md:pb-0">
      <Router />
      {!isAdminRoute && <BottomNavigation />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
