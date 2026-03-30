import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  Activity,
  ArrowRight,
  FileText,
  FlaskConical,
  Shield,
  Clock,
  XCircle,
} from "lucide-react";

const metrics = [
  {
    label: "Actions Automated",
    value: "65%",
    description: "Auto-executed without escalation",
    icon: TrendingUp,
    trend: "stable",
  },
  {
    label: "Escalation Rate",
    value: "30%",
    description: "Requiring approval this period",
    icon: AlertTriangle,
    trend: "up",
  },
  {
    label: "Policy Violations",
    value: "2",
    description: "In the last 24 hours",
    icon: ShieldAlert,
    trend: "attention",
  },
  {
    label: "Total Actions",
    value: "47",
    description: "Processed in last 24 hours",
    icon: Activity,
    trend: "stable",
  },
];

const alerts = [
  {
    severity: "warning" as const,
    message: "High number of escalations for Fee Waiver action",
    detail: "30% of fee waiver requests required supervisor approval in the last 24 hours.",
  },
  {
    severity: "critical" as const,
    message: "Policy conflict detected in Credit Limit Adjustment",
    detail: "Overlapping thresholds between auto-execute and approval-required rules.",
  },
  {
    severity: "warning" as const,
    message: "Increased number of blocked actions",
    detail: "Account Closure actions blocked 3 times due to outstanding balances.",
  },
];

const recentActivity = [
  {
    id: "AUD-001",
    action: "Waive Fee",
    user: "CSR — John Mitchell",
    outcome: "requires-approval" as const,
    timestamp: "14:32",
  },
  {
    id: "AUD-002",
    action: "Change Address",
    user: "CSR — Emily Rodriguez",
    outcome: "allowed" as const,
    timestamp: "13:18",
  },
  {
    id: "AUD-003",
    action: "Close Account",
    user: "CSR — David Park",
    outcome: "blocked" as const,
    timestamp: "11:05",
  },
  {
    id: "AUD-004",
    action: "Waive Fee",
    user: "CSR — John Mitchell",
    outcome: "allowed" as const,
    timestamp: "Yesterday",
  },
  {
    id: "AUD-005",
    action: "Credit Limit Adjustment",
    user: "Supervisor — Sarah Chen",
    outcome: "requires-approval" as const,
    timestamp: "Yesterday",
  },
];

const outcomeBadge = {
  allowed: {
    label: "Allowed",
    class: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/30",
  },
  "requires-approval": {
    label: "Approval Required",
    class: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30",
  },
  blocked: {
    label: "Blocked",
    class: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Monitoring
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            System overview and trust indicators
          </p>
        </div>

        {/* Section 1: System Status */}
        <Card className="border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/5">
          <CardContent className="flex items-center gap-4 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--success))]/15">
              <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">
                  System Status: Active
                </span>
                <Badge
                  variant="outline"
                  className="bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/30 text-xs"
                >
                  Operational
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Agent system is operating within defined policies and role constraints.
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              <Clock className="inline h-3 w-3 mr-1" />
              Updated 2 min ago
            </span>
          </CardContent>
        </Card>

        {/* Section 2: Key Metrics */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="py-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-semibold text-foreground mt-1">
                        {metric.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {metric.description}
                      </p>
                    </div>
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        metric.trend === "attention"
                          ? "bg-[hsl(var(--warning))]/10"
                          : "bg-muted"
                      }`}
                    >
                      <metric.icon
                        className={`h-4 w-4 ${
                          metric.trend === "attention"
                            ? "text-[hsl(var(--warning))]"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 3: Alerts & Risk Signals */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Alerts & Risk Signals
          </h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <Card
                key={index}
                className={
                  alert.severity === "critical"
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/5"
                }
              >
                <CardContent className="flex items-start gap-3 py-4">
                  {alert.severity === "critical" ? (
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-[hsl(var(--warning))] mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {alert.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {alert.detail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 4: Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Recent Activity
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={() => navigate("/audit")}
            >
              View All
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentActivity.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate("/audit")}
                    className="flex items-center justify-between w-full px-5 py-3.5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-sm font-medium text-foreground w-44 truncate">
                        {item.action}
                      </span>
                      <span className="text-sm text-muted-foreground truncate">
                        {item.user}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <Badge
                        variant="outline"
                        className={`text-xs ${outcomeBadge[item.outcome].class}`}
                      >
                        {outcomeBadge[item.outcome].label}
                      </Badge>
                      <span className="text-xs text-muted-foreground w-16 text-right">
                        {item.timestamp}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 5: Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate("/audit")}
            >
              <FileText className="h-4 w-4" />
              View Audit Log
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate("/policies")}
            >
              <Shield className="h-4 w-4" />
              Edit Policies
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate("/simulation")}
            >
              <FlaskConical className="h-4 w-4" />
              Run Simulation
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
