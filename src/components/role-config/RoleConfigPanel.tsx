import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Shield, Zap, CheckCircle2, ShieldAlert, FileText,
  AlertTriangle, Info, ClipboardList, Users,
} from "lucide-react";
import type { RoleConfig, AutonomyLevel, RiskLevel } from "@/data/roles";
import { autonomyLabels, riskLabels } from "@/data/roles";

interface RoleConfigPanelProps {
  role: RoleConfig;
}

const RoleConfigPanel = ({ role }: RoleConfigPanelProps) => {
  const allowedActions = role.actionPermissions.filter((a) => a.allowed);
  const approvalText = role.approvalAuthority.length === 0
    ? "Cannot approve actions"
    : `Can approve ${role.approvalAuthority.map((r) => riskLabels[r]).join(", ")} actions`;

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl font-semibold text-foreground">Role Configuration</h2>
          <Badge variant="outline" className="text-xs px-2 py-0.5 border-primary/20 text-primary bg-primary/5">
            {role.name}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{role.description}</p>
      </div>

      {/* Section 1: Allowed Actions */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Allowed Actions</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Define which actions this role is permitted to perform or trigger.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {role.actionPermissions.map((action) => (
              <div
                key={action.actionId}
                className={`flex items-center justify-between rounded-md border px-3 py-2.5 ${
                  action.allowed
                    ? "border-border bg-accent/30"
                    : "border-border bg-background"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{action.actionName}</span>
                  {action.allowed && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-success/30 text-success bg-success/5">
                      <CheckCircle2 className="h-3 w-3 mr-0.5" />
                      Allowed
                    </Badge>
                  )}
                </div>
                <Switch checked={action.allowed} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Autonomy Limits */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Autonomy Limits</CardTitle>
          </div>
          <CardDescription className="text-xs">
            This defines the maximum level of autonomy this role can use. Actual behavior is also constrained by policy settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue={role.maxAutonomy} className="space-y-2">
            {(["suggest-only", "execute-with-approval", "auto-execute"] as AutonomyLevel[]).map((level) => (
              <div key={level} className={`flex items-start gap-3 rounded-md border px-3 py-2.5 ${
                level === "auto-execute" ? "border-destructive/20 bg-destructive/5" : "border-border"
              }`}>
                <RadioGroupItem value={level} id={`autonomy-${role.id}-${level}`} className="mt-0.5" />
                <Label htmlFor={`autonomy-${role.id}-${level}`} className="flex-1 cursor-pointer">
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

      {/* Section 3: Approval Authority */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Approval Authority</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Define which risk levels this role is authorized to approve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {(["low", "medium", "high"] as RiskLevel[]).map((level) => {
              const checked = role.approvalAuthority.includes(level);
              const riskStyles: Record<RiskLevel, string> = {
                low: "border-success/30 text-success bg-success/5",
                medium: "border-warning/30 text-warning bg-warning/5",
                high: "border-destructive/30 text-destructive bg-destructive/5",
              };
              return (
                <div key={level} className="flex items-center gap-3 rounded-md border border-border px-3 py-2.5">
                  <Checkbox checked={checked} id={`approval-${role.id}-${level}`} />
                  <Label htmlFor={`approval-${role.id}-${level}`} className="flex-1 cursor-pointer">
                    <span className="text-sm font-medium">Can approve {riskLabels[level]} actions</span>
                  </Label>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 ${riskStyles[level]}`}>
                    {riskLabels[level]}
                  </Badge>
                </div>
              );
            })}
          </div>
          {role.approvalAuthority.length === 0 && (
            <div className="flex items-start gap-2 mt-3 rounded-md bg-info/5 border border-info/20 px-3 py-2">
              <Info className="h-3.5 w-3.5 text-info shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                This role cannot approve any actions. Requests will be escalated to a higher authority.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 4: Policy Overrides */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Policy Overrides</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Allow controlled flexibility within policy constraints. All overrides are logged and audited.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border border-border px-3 py-2.5">
              <div>
                <span className="text-sm font-medium text-foreground">Allow override requests</span>
                <p className="text-xs text-muted-foreground mt-0.5">User can request an override, subject to approval</p>
              </div>
              <Switch checked={role.allowOverrideRequest} />
            </div>
            <div className="flex items-center justify-between rounded-md border border-border px-3 py-2.5">
              <div>
                <span className="text-sm font-medium text-foreground">Allow temporary exceptions</span>
                <p className="text-xs text-muted-foreground mt-0.5">Temporary policy exception with required approval</p>
              </div>
              <Switch checked={role.allowTempException} />
            </div>
          </div>
          <div className="flex items-start gap-2 mt-3 rounded-md bg-warning/5 border border-warning/20 px-3 py-2">
            <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              All overrides and exceptions are logged in the Audit Log for compliance review.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: User-Level Overrides */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">User-Level Overrides</CardTitle>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">Optional</Badge>
          </div>
          <CardDescription className="text-xs">
            Configure individual user settings within role constraints. User settings cannot exceed role permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-md border border-dashed border-muted-foreground/30 px-3 py-2.5">
              <span className="text-sm text-muted-foreground">Notification preferences</span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">Per user</Badge>
            </div>
            <div className="flex items-center justify-between rounded-md border border-dashed border-muted-foreground/30 px-3 py-2.5">
              <span className="text-sm text-muted-foreground">Personal autonomy limits (within role max)</span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">Per user</Badge>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-3 rounded-md bg-info/5 border border-info/20 px-3 py-2">
            <Info className="h-3.5 w-3.5 text-info shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              User settings cannot exceed role permissions. Any override beyond role constraints requires admin approval.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Summary */}
      <Card className="border-primary/20 bg-primary/[0.02]">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Role Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="font-medium text-foreground w-36 shrink-0">Can perform:</span>
              <div className="flex flex-wrap gap-1.5">
                {allowedActions.length > 0 ? (
                  allowedActions.map((a) => (
                    <Badge key={a.actionId} variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
                      {a.actionName}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground text-xs">No actions assigned</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground w-36 shrink-0">Max autonomy:</span>
              <span className="text-muted-foreground">{autonomyLabels[role.maxAutonomy].label}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground w-36 shrink-0">Approval authority:</span>
              <span className="text-muted-foreground">{approvalText}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground w-36 shrink-0">Override requests:</span>
              <span className="text-muted-foreground">{role.allowOverrideRequest ? "Allowed" : "Not allowed"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System messaging */}
      <div className="flex items-start gap-2 rounded-md bg-info/5 border border-info/20 px-3 py-2">
        <Info className="h-3.5 w-3.5 text-info shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          Agent behavior is constrained by both policy rules and role permissions. Changes here are enforced in real-time during agent execution.
        </p>
      </div>
    </div>
  );
};

export default RoleConfigPanel;
