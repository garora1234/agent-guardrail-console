import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ShieldAlert, Zap, GitBranch, ShieldCheck,
  Save, Rocket, FlaskConical, Plus, ArrowRight,
  AlertTriangle,
} from "lucide-react";
import type { ActionPolicy, RiskLevel, AutonomyLevel } from "@/data/action-policies";
import PolicySourceRulesSection from "./PolicySourceRulesSection";

interface ActionConfigPanelProps {
  action: ActionPolicy;
}

const riskLabels: Record<RiskLevel, { label: string; className: string }> = {
  low: { label: "Low Risk", className: "border-success/30 text-success bg-success/5" },
  medium: { label: "Medium Risk", className: "border-warning/30 text-warning bg-warning/5" },
  high: { label: "High Risk", className: "border-destructive/30 text-destructive bg-destructive/5" },
};

const autonomyLabels: Record<AutonomyLevel, { label: string; description: string }> = {
  "suggest-only": { label: "Suggest Only", description: "Agent recommends action, human executes" },
  "execute-with-approval": { label: "Execute with Approval", description: "Agent executes after human approval" },
  "auto-execute": { label: "Auto-Execute", description: "No approval required — restricted to low-risk only" },
};

const ActionConfigPanel = ({ action }: ActionConfigPanelProps) => {
  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl font-semibold text-foreground">Policy Configuration</h2>
          <Badge variant="outline" className={riskLabels[action.riskLevel].className}>
            {riskLabels[action.riskLevel].label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{action.name}</span> — {action.description}
        </p>
      </div>

      {/* Unified: Policy Source & Rules */}
      <PolicySourceRulesSection action={action} />

      {/* Risk Classification */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Risk Classification</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Risk level influences required approvals and allowed autonomy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue={action.riskLevel} className="space-y-2">
            {(["low", "medium", "high"] as RiskLevel[]).map((level) => (
              <div key={level} className="flex items-center gap-3 rounded-md border border-border px-3 py-2.5">
                <RadioGroupItem value={level} id={`risk-${level}`} />
                <Label htmlFor={`risk-${level}`} className="flex-1 cursor-pointer">
                  <span className="text-sm font-medium">{riskLabels[level].label}</span>
                </Label>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 ${riskLabels[level].className}`}>
                  {level === "low" ? "Standard" : level === "medium" ? "Enhanced review" : "Full oversight"}
                </Badge>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Autonomy Level */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Autonomy Level</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Autonomy is constrained by risk level and role permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue={action.autonomyLevel} className="space-y-2">
            {(["suggest-only", "execute-with-approval", "auto-execute"] as AutonomyLevel[]).map((level) => (
              <div key={level} className={`flex items-start gap-3 rounded-md border px-3 py-2.5 ${
                level === "auto-execute" ? "border-destructive/20 bg-destructive/5" : "border-border"
              }`}>
                <RadioGroupItem value={level} id={`autonomy-${level}`} className="mt-0.5" />
                <Label htmlFor={`autonomy-${level}`} className="flex-1 cursor-pointer">
                  <span className="text-sm font-medium flex items-center gap-1.5">
                    {autonomyLabels[level].label}
                    {level === "auto-execute" && <AlertTriangle className="h-3 w-3 text-destructive" />}
                  </span>
                  <span className="text-xs text-muted-foreground block mt-0.5">
                    {autonomyLabels[level].description}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Approval Flow */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Approval Flow</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="gap-1 text-xs h-7">
              <Plus className="h-3 w-3" /> Add Step
            </Button>
          </div>
          <CardDescription className="text-xs">
            Define the chain of approvals required before this action executes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {action.approvalFlow.length === 0 ? (
            <div className="flex flex-col items-center py-6 text-center">
              <GitBranch className="h-6 w-6 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No approval steps defined.</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {action.approvalFlow.map((step, idx) => (
                <div key={step.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-medium text-foreground">{step.role}</span>
                    {step.optional && (
                      <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">Optional</Badge>
                    )}
                  </div>
                  {idx < action.approvalFlow.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Guardrails */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <CardTitle className="text-base">Guardrails</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="gap-1 text-xs h-7">
              <Plus className="h-3 w-3" /> Add Guardrail
            </Button>
          </div>
          <CardDescription className="text-xs">
            Non-negotiable system constraints that override all other configurations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {action.guardrails.length === 0 ? (
            <div className="flex flex-col items-center py-6 text-center">
              <ShieldCheck className="h-6 w-6 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No guardrails defined yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {action.guardrails.map((guardrail) => (
                <div
                  key={guardrail.id}
                  className="flex items-center gap-2.5 rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2.5"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-destructive shrink-0" />
                  <span className="text-sm text-foreground">{guardrail.text}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button variant="outline" className="gap-1.5">
          <Save className="h-3.5 w-3.5" />
          Save Draft
        </Button>
        <Button className="gap-1.5">
          <Rocket className="h-3.5 w-3.5" />
          Publish Policy
        </Button>
        <Button variant="secondary" className="gap-1.5">
          <FlaskConical className="h-3.5 w-3.5" />
          Test in Simulation
        </Button>
      </div>
    </div>
  );
};

export default ActionConfigPanel;
