import { useState } from "react";
import { FileText, Upload, Download, CheckCircle2, Pencil, X, Sparkles, AlertTriangle, ExternalLink, Info } from "lucide-react";
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
  sourceSnippet: string;
  status: "pending" | "approved" | "rejected";
}

const documents: PolicyDocument[] = [
  { id: "1", name: "Fee_Waiver_Policy_2024.pdf", type: "PDF", uploadedAt: "Mar 15, 2026", status: "processed" },
  { id: "2", name: "Account_Closure_Guidelines.pdf", type: "PDF", uploadedAt: "Mar 18, 2026", status: "processed" },
  { id: "3", name: "Credit_Limit_Rules.txt", type: "Text", uploadedAt: "Mar 20, 2026", status: "processing" },
];

const initialSuggestions: PolicySuggestion[] = [
  {
    id: "1",
    action: "Waive Fee",
    conditions: ["Amount < $50", "Customer tenure > 1 year", "No prior waiver in 90 days"],
    confidence: "high",
    source: "Fee_Waiver_Policy_2024.pdf",
    sourceSnippet: "\"Fees under $50 may be waived for customers with more than one year of account history, provided no waiver has been issued in the prior 90-day period.\"",
    status: "pending",
  },
  {
    id: "2",
    action: "Waive Fee",
    conditions: ["Amount < $100", "Customer tenure > 5 years", "Account in good standing"],
    confidence: "medium",
    source: "Fee_Waiver_Policy_2024.pdf",
    sourceSnippet: "\"Long-standing customers (5+ years) with accounts in good standing may qualify for fee waivers up to $100 at agent discretion.\"",
    status: "pending",
  },
  {
    id: "3",
    action: "Close Account",
    conditions: ["Balance = $0", "No pending transactions", "Customer-initiated request"],
    confidence: "high",
    source: "Account_Closure_Guidelines.pdf",
    sourceSnippet: "\"Accounts with a zero balance and no pending transactions may be closed immediately upon customer request without supervisor approval.\"",
    status: "pending",
  },
  {
    id: "4",
    action: "Close Account",
    conditions: ["Balance > $0", "Supervisor approval required"],
    confidence: "low",
    source: "Account_Closure_Guidelines.pdf",
    sourceSnippet: "\"Closure of accounts with remaining balances requires… [additional conditions may apply per branch policy].\"",
    status: "pending",
  },
];

const confidenceConfig = {
  high: { label: "High", className: "text-success border-success/30 bg-success/10", guidance: null },
  medium: { label: "Medium", className: "text-warning border-warning/30 bg-warning/10", guidance: "Review recommended" },
  low: { label: "Low", className: "text-destructive border-destructive/30 bg-destructive/10", guidance: "Manual validation required" },
};

interface PolicySourcesSectionProps {
  onPolicyApproved?: () => void;
}

const PolicySourcesSection = ({ onPolicyApproved }: PolicySourcesSectionProps) => {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleApprove = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" as const } : s))
    );
    onPolicyApproved?.();
  };

  const handleReject = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "rejected" as const } : s))
    );
  };

  const pendingSuggestions = suggestions.filter((s) => s.status === "pending");
  const approvedCount = suggestions.filter((s) => s.status === "approved").length;

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
        {/* Upload Section */}
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

        {/* Extracted Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium text-foreground">AI-Extracted Policy Suggestions</h4>
            </div>
            {approvedCount > 0 && (
              <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                {approvedCount} approved
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Review each suggested rule. Approve to operationalize, edit to refine, or reject to discard.
          </p>

          <div className="space-y-3">
            {pendingSuggestions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center rounded-lg border border-border bg-secondary/10">
                <CheckCircle2 className="h-6 w-6 text-success mb-2" />
                <p className="text-sm text-muted-foreground">All suggestions have been reviewed.</p>
              </div>
            ) : (
              pendingSuggestions.map((suggestion) => {
                const conf = confidenceConfig[suggestion.confidence];
                return (
                  <div
                    key={suggestion.id}
                    className="rounded-lg border border-border bg-secondary/20 p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-foreground">{suggestion.action}</span>
                          <Badge variant="outline" className={conf.className}>
                            {conf.label} Confidence
                          </Badge>
                          {conf.guidance && (
                            <span className="flex items-center gap-1 text-xs text-warning">
                              <AlertTriangle className="h-3 w-3" />
                              {conf.guidance}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">Source: {suggestion.source}</p>
                      </div>
                    </div>

                    {/* Source Snippet */}
                    <div className="rounded-md border border-border bg-background/50 px-3 py-2">
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        {suggestion.sourceSnippet}
                      </p>
                      <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-1.5 transition-colors">
                        <ExternalLink className="h-3 w-3" />
                        View in Document
                      </button>
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
                      <Button size="sm" className="gap-1.5 h-8" onClick={() => handleApprove(suggestion.id)}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5 h-8">
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 h-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleReject(suggestion.id)}
                      >
                        <X className="h-3.5 w-3.5" />
                        Reject
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* System messaging */}
        <div className="flex items-start gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2.5">
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Approved policies will be used to govern agent behavior in the <span className="text-foreground font-medium">Action Policy Builder</span>. This step operationalizes your bank's rules into enforceable agent guardrails.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicySourcesSection;
