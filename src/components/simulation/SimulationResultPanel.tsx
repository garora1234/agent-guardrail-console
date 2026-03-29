import { SimulationResult } from "@/data/simulation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimulationResultPanelProps {
  result: SimulationResult;
}

const outcomeConfig = {
  allowed: {
    label: "Allowed",
    icon: CheckCircle2,
    color: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20",
    badgeClass: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/30",
  },
  "requires-approval": {
    label: "Requires Approval",
    icon: AlertTriangle,
    color: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/20",
    badgeClass: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30",
  },
  blocked: {
    label: "Blocked",
    icon: XCircle,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

const SimulationResultPanel = ({ result }: SimulationResultPanelProps) => {
  const config = outcomeConfig[result.outcome];
  const OutcomeIcon = config.icon;

  return (
    <div className="space-y-4">
      {/* Outcome Banner */}
      <Card className={cn("border", config.color)}>
        <CardContent className="flex items-center gap-4 py-5">
          <OutcomeIcon className="h-8 w-8 shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-semibold">Outcome:</span>
              <Badge variant="outline" className={config.badgeClass}>{config.label}</Badge>
            </div>
            <p className="text-sm opacity-80">{result.summary}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Rules Triggered */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Rules Triggered
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.rulesTriggered.map((rule) => (
              <div
                key={rule.id}
                className={cn(
                  "flex items-center gap-3 rounded-md border px-3 py-2 text-sm",
                  rule.passed
                    ? "border-[hsl(var(--success))]/20 bg-[hsl(var(--success))]/5"
                    : "border-destructive/20 bg-destructive/5"
                )}
              >
                {rule.passed ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-destructive" />
                )}
                <span className={rule.passed ? "text-foreground" : "text-destructive"}>
                  {rule.text}
                </span>
                <Badge variant="outline" className="ml-auto text-[10px] px-1.5">
                  {rule.passed ? "Passed" : "Failed"}
                </Badge>
              </div>
            ))}
            <p className="text-xs text-muted-foreground pt-1">
              Policy: {result.policyApplied}
            </p>
          </CardContent>
        </Card>

        {/* Role Impact & Approval Flow */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Role Impact &amp; Approval Flow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{result.roleImpact}</p>
            {result.approvalFlow.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Approval Chain</p>
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimulationResultPanel;
