import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FlaskConical,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Shield,
  Users,
} from "lucide-react";

interface RuleResult {
  text: string;
  passed: boolean;
}

interface SimulationResult {
  outcome: "allowed" | "requires-approval" | "blocked";
  summary: string;
  reason: string;
  policyName: string;
  policySource: string;
  rules: RuleResult[];
  role: string;
  rolePermissions: string[];
  roleExplanation: string;
  approvalFlow: string[];
}

const mockResult: SimulationResult = {
  outcome: "requires-approval",
  summary:
    "Fee waiver request of $75 exceeds the allowed threshold of $50. Customer meets tenure and history requirements. Supervisor approval is required.",
  reason:
    "Amount exceeds allowed threshold and requires supervisor approval.",
  policyName: "Waive Fee Policy",
  policySource: "Fee_Waiver_Policy_2024.pdf",
  rules: [
    { text: "Amount < $50", passed: false },
    { text: "Customer tenure > 12 months", passed: true },
    { text: "No waiver in last 90 days", passed: true },
  ],
  role: "CSR",
  rolePermissions: [
    "Can execute with approval",
    "Cannot approve actions exceeding $50",
  ],
  roleExplanation:
    "CSR cannot approve this action. Request is escalated to Supervisor.",
  approvalFlow: ["CSR", "Supervisor"],
};

const actions = [
  { id: "waive-fee", name: "Waive Fee" },
  { id: "change-address", name: "Change Address" },
  { id: "close-account", name: "Close Account" },
];

const outcomeStyles = {
  allowed: {
    label: "Allowed",
    icon: CheckCircle2,
    badge: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/30",
    card: "border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/5",
  },
  "requires-approval": {
    label: "Requires Approval",
    icon: AlertTriangle,
    badge: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30",
    card: "border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/5",
  },
  blocked: {
    label: "Blocked",
    icon: XCircle,
    badge: "bg-destructive/10 text-destructive border-destructive/30",
    card: "border-destructive/30 bg-destructive/5",
  },
};

const SimulationHub = () => {
  const [scenario, setScenario] = useState(
    "Customer requests fee waiver of $75 with 2-year tenure"
  );
  const [actionId, setActionId] = useState("waive-fee");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setResult(null);
    setTimeout(() => {
      setResult(mockResult);
      setIsRunning(false);
    }, 1200);
  };

  const handleReset = () => {
    setResult(null);
  };

  const style = result ? outcomeStyles[result.outcome] : null;
  const OutcomeIcon = style?.icon;

  return (
    <AppLayout>
      <div className="px-8 py-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            Evaluation &amp; Simulation Hub
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Test how AI agents will behave under different scenarios before
            deploying policies.
          </p>
        </div>

        {/* Scenario Input */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Scenario Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Describe the scenario</Label>
              <Textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                placeholder='e.g., "Waive $75 fee for customer with 2-year tenure"'
                className="min-h-[80px] resize-none"
              />
            </div>
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label>Action to simulate</Label>
                <Select value={actionId} onValueChange={setActionId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {actions.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleRun}
                disabled={!scenario.trim() || isRunning}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                {isRunning ? "Running…" : "Run Simulation"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading */}
        {isRunning && (
          <div className="flex items-center justify-center py-12 text-muted-foreground text-sm gap-2">
            <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Simulating agent behavior…
          </div>
        )}

        {/* Empty state */}
        {!result && !isRunning && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FlaskConical className="h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              No Simulation Run
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Enter a scenario and run a simulation to see how agent behavior is
              governed by your policies.
            </p>
          </div>
        )}

        {/* Result */}
        {result && !isRunning && style && OutcomeIcon && (
          <div className="space-y-4">
            {/* Outcome banner */}
            <Card className={style.card}>
              <CardContent className="flex items-center gap-4 py-5">
                <OutcomeIcon className="h-8 w-8 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-semibold">Outcome:</span>
                    <Badge variant="outline" className={style.badge}>
                      {style.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.summary}
                  </p>
                  <p className="text-sm font-medium text-foreground mt-2">
                    Reason: {result.reason}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Policy Evaluation */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Policy Evaluation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Policy applied: </span>
                  <span className="font-medium text-foreground">{result.policyName}</span>
                  <span className="text-muted-foreground ml-2">({result.policySource})</span>
                </div>
                <div className="space-y-2">
                  {result.rules.map((rule, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 rounded-md border px-3 py-2 text-sm ${
                        rule.passed
                          ? "border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/5"
                          : "border-destructive/20 bg-destructive/5"
                      }`}
                    >
                      {rule.passed ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
                      ) : (
                        <XCircle className="h-4 w-4 shrink-0 text-destructive" />
                      )}
                      <span>{rule.text}</span>
                      <Badge
                        variant="outline"
                        className="ml-auto text-[10px] px-1.5"
                      >
                        {rule.passed ? "Passed" : "Failed"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  These rules are derived from approved policies in Action Policies.
                </p>
              </CardContent>
            </Card>

            {/* Role Impact */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Role Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Current role: </span>
                  <Badge variant="outline" className="ml-1">{result.role}</Badge>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">Permissions</p>
                  {result.rolePermissions.map((perm, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {perm}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground border-t border-border pt-3">
                  {result.roleExplanation}
                </p>
              </CardContent>
            </Card>

            {/* Approval flow */}
            {result.approvalFlow.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Approval Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    {result.approvalFlow.map((role, i) => (
                      <div key={role} className="flex items-center gap-2">
                        <span className="rounded-md border bg-accent px-3 py-1.5 text-sm font-medium text-foreground">
                          {role}
                        </span>
                        {i < result.approvalFlow.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reset */}
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" /> Run Another Simulation
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SimulationHub;
