import { Database, Settings, Shield, Activity, FlaskConical, Users, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { icon: Settings, label: "Bank Configuration", path: "/", active: true },
  { icon: Shield, label: "Action Policies", path: "/policies", active: false },
  { icon: Users, label: "Role Configuration", path: "/roles", active: false },
  { icon: Database, label: "Agents", path: "/agents", active: false },
  { icon: FlaskConical, label: "Simulation", path: "/simulation", active: false },
  { icon: FileText, label: "Audit Log", path: "/audit", active: false },
  { icon: Activity, label: "Monitoring", path: "/monitoring", active: false },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-sidebar transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary">
          <Shield className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-foreground truncate">AgentEdge</p>
            <p className="text-[11px] text-muted-foreground truncate">Control Center</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              item.active
                ? "bg-accent text-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center border-t border-border py-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
};

export default AppSidebar;
