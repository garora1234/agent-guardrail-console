import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink, CheckCircle2, ArrowRight, Info } from "lucide-react";
import type { ActionPolicy } from "@/data/action-policies";

interface PolicyContextSectionProps {
  action: ActionPolicy;
}

const PolicyContextSection = ({ action }: PolicyContextSectionProps) => {
  if (!action.policyContext) return null;

  const { policyContext } = action;
  const importedConditions = action.conditions.filter((c) => c.origin === "imported");

  return (
    <Card className="border-primary/20 bg-primary/[0.02]">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Policy Context</h3>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-success/30 text-success bg-success/5">
              <CheckCircle2 className="h-3 w-3 mr-0.5" />
              Imported Policy (Approved)
            </Badge>
          </div>
          <button className="flex items-center gap-1 text-xs text-primary hover:underline font-medium">
            <ExternalLink className="h-3 w-3" />
            View Source Document
          </button>
        </div>

        <div className="text-xs text-muted-foreground mb-3 space-y-1">
          <p>
            <span className="font-medium text-foreground">Source:</span>{" "}
            {policyContext.sourceDocument}
          </p>
          <p>
            <span className="font-medium text-foreground">Approved:</span>{" "}
            {new Date(policyContext.extractedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="mb-3">
          <p className="text-xs font-medium text-foreground mb-1.5">
            Extracted Rules ({importedConditions.length})
          </p>
          <div className="space-y-1">
            {importedConditions.map((condition) => (
              <div
                key={condition.id}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <ArrowRight className="h-3 w-3 text-primary shrink-0" />
                <code className="font-mono">{condition.text}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-md bg-info/5 border border-info/20 px-3 py-2">
          <Info className="h-3.5 w-3.5 text-info shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Policies are ingested and approved in Configuration Studio, then refined here into enforceable agent behavior.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicyContextSection;
