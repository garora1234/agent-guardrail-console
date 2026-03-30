import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import BankConfigStudio from "./pages/BankConfigStudio";
import ActionPolicyBuilder from "./pages/ActionPolicyBuilder";
import RoleConfiguration from "./pages/RoleConfiguration";
import SimulationHub from "./pages/SimulationHub";
import AuditLog from "./pages/AuditLog";
import NotFound from "./pages/NotFound.tsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BankConfigStudio />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/policies" element={<ActionPolicyBuilder />} />
          <Route path="/roles" element={<RoleConfiguration />} />
          <Route path="/simulation" element={<SimulationHub />} />
          <Route path="/audit" element={<AuditLog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
