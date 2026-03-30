import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import KPCLProject from "./pages/KPCLProject";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SubmissionDetail from "./pages/admin/SubmissionDetail";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();
const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <ClerkProvider publishableKey={clerkKey}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* ── Public site — wrapped in Layout (navbar + footer) ── */}
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/projects" element={<Layout><Projects /></Layout>} />
            <Route path="/projects/kpcl" element={<Layout><KPCLProject /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />

            {/* ── Admin — no Layout (no navbar/footer) ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/submissions/:id" element={<ProtectedRoute><SubmissionDetail /></ProtectedRoute>} />

            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;