import { FileText, Upload, Download, CheckCircle2, Pencil, X, Sparkles, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PolicyDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: "processed" | "processing" | "failed";
}

interface PolicySuggestion {
  id: string;
  action: string;
  conditions: string[];
  confidence: "high" | "medium" | "low";
  source: string;
  status: "pending" | "approved" | "rejected";
}

const documents: PolicyDocument[] = [
  { id: "1", name: "Fee_Waiver_Policy_2024.pdf", type: "PDF", uploadedAt: "Mar 15, 2026", status: "processed" },
  { id: "2", name: "Account_Closure_Guidelines.pdf", type: "PDF", uploadedAt: "Mar 18, 2026", status: "processed" },
  { id: "3", name: "Credit_Limit_Rules.txt", type: "Text", uploadedAt: "Mar 20, 2026", status: "processing" },
];

const suggestions: PolicySuggestion[] = [
  {
    id: "1",
    action: "Waive Fee",
    conditions: ["Amount < $50", "Customer tenure > 1 year", "No prior waiver in 90 days"],
    confidence: "high",
    source: "Fee_Waiver_Policy_2024.pdf",
    status: "pending",
  },
  {
    id: "2",
    action: "Waive Fee",
    conditions: ["Amount < $100", "Customer tenure > 5 years", "Account in good standing"],
    confidence: "medium",
    source: "Fee_Waiver_Policy_2024.pdf",
    status: "pending",
  },
  {
    id: "3",
    action: "Close Account",
    conditions: ["Balance = $0", "No pending transactions", "Customer-initiated request"],
    confidence: "high",
    source: "Account_Closure_Guidelines.pdf",
    status: "pending",
  },
  {
    id: "4",
    action: "Close Account",
    conditions: ["Balance > $0", "Supervisor approval required"],
    confidence: "low",
    source: "Account_Closure_Guidelines.pdf",
    status: "pending",
  },
];

const confidenceConfig = {
  high: { label: "High", className: "text-success border-success/30 bg-success/10" },
  medium: { label: "Medium", className: "text-warning border-warning/30 bg-warning/10" },
  low: { label: "Low", className: "text-destructive border-destructive/30 bg-destructive/10" },
};

const PolicySourcesSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Policy Sources</CardTitle>
        </div>
        <CardDescription>
          Upload policy documents for AI extraction. Review and approve suggested rules before they become active.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subsection A: Upload */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Upload / Connect Policies</h4>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Upload className="h-3.5 w-3.5" />
              Upload Document
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Import from System
            </Button>
          </div>

          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-md border border-border bg-secondary/30 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">Uploaded {doc.uploadedAt}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    doc.status === "processed"
                      ? "text-success border-success/30 bg-success/10"
                      : doc.status === "processing"
                      ? "text-warning border-warning/30 bg-warning/10"
                      : "text-destructive border-destructive/30 bg-destructive/10"
                  }
                >
                  {doc.status === "processed" ? "Processed" : doc.status === "processing" ? "Processing…" : "Failed"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Subsection B & C: Extracted Policy Suggestions with Review Controls */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-medium text-foreground">AI-Extracted Policy Suggestions</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Review each suggested rule. Approve to operationalize, edit to refine, or reject to discard.
          </p>

          <div className="space-y-3">
            {suggestions.map((suggestion) => {
              const conf = confidenceConfig[suggestion.confidence];
              return (
                <div
                  key={suggestion.id}
                  className="rounded-lg border border-border bg-secondary/20 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{suggestion.action}</span>
                        <Badge variant="outline" className={conf.className}>
                          {conf.label} Confidence
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Source: {suggestion.source}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Conditions</p>
                    <ul className="space-y-1">
                      {suggestion.conditions.map((condition, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                          <code className="font-mono text-xs bg-secondary/50 px-1.5 py-0.5 rounded">{condition}</code>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button size="sm" className="gap-1.5 h-8">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 h-8">
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1.5 h-8 text-muted-foreground hover:text-destructive">
                      <X className="h-3.5 w-3.5" />
                      Reject
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicySourcesSection;
