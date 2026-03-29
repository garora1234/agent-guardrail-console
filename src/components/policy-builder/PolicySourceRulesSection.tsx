import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  FileText, ExternalLink, CheckCircle2, Info,
  Trash2, Import, PenLine, Pencil, X,
} from "lucide-react";
import type { ActionPolicy } from "@/data/action-policies";

interface PolicySourceRulesSectionProps {
  action: ActionPolicy;
}

const PolicySourceRulesSection = ({ action }: PolicySourceRulesSectionProps) => {
  const [ruleStatus, setRuleStatus] = useState<"pending" | "approved" | "rejected">("pending");

  const importedConditions = action.conditions.filter((c) => c.origin === "imported");
  const customConditions = action.conditions.filter((c) => c.origin === "custom");
  const isImported = action.source === "imported";

  return (
    <Card className="border-primary/20 bg-primary/[0.02]">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Policy Source & Rules</h3>
            {isImported ? (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-success/30 text-success bg-success/5">
                <CheckCircle2 className="h-3 w-3 mr-0.5" />
                Imported Policy
              </Badge>
            ) : (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-muted-foreground/30 text-muted-foreground">
                <PenLine className="h-3 w-3 mr-0.5" />
                Custom Policy
              </Badge>
            )}
          </div>
          {isImported && action.sourceDocument && (
            <button className="flex items-center gap-1 text-xs text-primary hover:underline font-medium">
              <ExternalLink className="h-3 w-3" />
              View Source Document
            </button>
          )}
        </div>

        {/* Source info */}
        <div className="text-xs text-muted-foreground mb-4 space-y-1">
          <p>
            <span className="font-medium text-foreground">Source:</span>{" "}
            {isImported && action.policyContext
              ? action.policyContext.sourceDocument
              : "Manually Created"}
          </p>
          {isImported && action.policyContext && (
            <p>
              <span className="font-medium text-foreground">Extracted:</span>{" "}
              {new Date(action.policyContext.extractedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>

        {/* Rules */}
        {action.conditions.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-center">
            <FileText className="h-6 w-6 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No conditions defined yet.</p>
            <p className="text-xs text-muted-foreground">Import policies from Configuration Studio or add custom rules.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-4">
            {/* Pending Imported Rules — need review */}
            {pendingImported.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Import className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Imported Rules — Pending Review
                    </span>
                  </div>
                  {approvedCount > 0 && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-success/30 text-success bg-success/10">
                      {approvedCount} approved
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Review each extracted rule. Approve to operationalize, edit to refine, or reject to discard.
                </p>
                <div className="space-y-2">
                  {pendingImported.map((condition, idx) => (
                    <div key={condition.id} className="rounded-md border border-border bg-secondary/20 p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono flex-1 text-foreground">
                          {condition.text}
                        </code>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-primary/20 text-primary bg-primary/5 shrink-0">
                          Imported
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-1.5 h-7 text-xs" onClick={() => handleApprove(condition.id)}>
                          <CheckCircle2 className="h-3 w-3" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1.5 h-7 text-xs">
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1.5 h-7 text-xs text-muted-foreground hover:text-destructive"
                          onClick={() => handleReject(condition.id)}
                        >
                          <X className="h-3 w-3" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Approved Imported Rules */}
            {approvedImported.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="h-3 w-3 text-success" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Approved Rules
                  </span>
                </div>
                <div className="space-y-2">
                  {approvedImported.map((condition, idx) => (
                    <div key={condition.id}>
                      {idx > 0 && condition.logic && (
                        <div className="flex items-center gap-2 py-1">
                          <Badge variant="secondary" className="text-[10px] font-mono px-2 py-0 h-5">
                            {condition.logic}
                          </Badge>
                          <Separator className="flex-1" />
                        </div>
                      )}
                      <div className="flex items-center gap-3 rounded-md border border-success/20 bg-success/5 px-3 py-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                        <code className="text-sm font-mono flex-1 text-foreground">
                          {condition.text}
                        </code>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-success/30 text-success bg-success/5 shrink-0">
                          Approved
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All reviewed message */}
            {pendingImported.length === 0 && importedConditions.length > 0 && (
              <div className="flex items-center gap-2 rounded-md border border-success/20 bg-success/5 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <p className="text-xs text-muted-foreground">All imported rules have been reviewed.</p>
              </div>
            )}

            {/* Custom Rules */}
            {customConditions.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <PenLine className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Custom Rules
                  </span>
                </div>
                <div className="space-y-2">
                  {customConditions.map((condition) => (
                    <div key={condition.id}>
                      {condition.logic && (
                        <div className="flex items-center gap-2 py-1">
                          <Badge variant="secondary" className="text-[10px] font-mono px-2 py-0 h-5">
                            {condition.logic}
                          </Badge>
                          <Separator className="flex-1" />
                        </div>
                      )}
                      <div className={`flex items-center gap-3 rounded-md border px-3 py-2 ${
                        condition.enabled === false
                          ? "border-dashed border-border bg-muted/30 opacity-60"
                          : "border-dashed border-muted-foreground/30 bg-background"
                      }`}>
                        <Checkbox checked={condition.enabled !== false} className="shrink-0" />
                        <code className={`text-sm font-mono flex-1 ${
                          condition.enabled === false ? "line-through text-muted-foreground" : "text-foreground"
                        }`}>
                          {condition.text}
                        </code>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-muted-foreground/20 text-muted-foreground shrink-0">
                          Custom
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Helper text */}
        <div className="flex items-start gap-2 rounded-md bg-info/5 border border-info/20 px-3 py-2">
          <Info className="h-3.5 w-3.5 text-info shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            These rules originate from approved bank policies and can be refined for execution.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicySourceRulesSection;
