import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Search,
  Filter,
  X,
  Shield,
  Users,
  Download,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { mockAuditEvents, AuditEvent } from "@/data/audit-logs";

const formatUser = (event: AuditEvent) => {
  if (event.executionMode === "Auto-Execute") {
    return `Executed by Agent (on behalf of ${event.userRole} — ${event.user})`;
  }
  return `${event.userRole} — ${event.user}`;
};

const outcomeBadge = {
  allowed: { label: "Allowed", class: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/30" },
  "requires-approval": { label: "Approval Required", class: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30" },
  blocked: { label: "Blocked", class: "bg-destructive/10 text-destructive border-destructive/30" },
};

const statusBadge = {
  completed: { label: "Completed", class: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" },
  "pending-approval": { label: "Pending Approval", class: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" },
  rejected: { label: "Rejected", class: "bg-destructive/10 text-destructive" },
};

const riskBadge = {
  low: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]",
  medium: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
  high: "bg-destructive/10 text-destructive",
};

const AuditLog = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState("all");
  const [filterOutcome, setFilterOutcome] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  const filtered = mockAuditEvents.filter((e) => {
    if (filterAction !== "all" && e.actionType !== filterAction) return false;
    if (filterOutcome !== "all" && e.outcome !== filterOutcome) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        e.user.toLowerCase().includes(q) ||
        e.actionType.toLowerCase().includes(q) ||
        e.scenarioDescription.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (selectedEvent) {
    return (
      <AppLayout>
        <div className="px-8 py-6 max-w-4xl mx-auto space-y-5">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
              ← Back to Audit Log
            </Button>
            <Badge variant="outline" className="text-xs">{selectedEvent.id}</Badge>
          </div>

          {/* Action Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Action Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Action: </span>
                  <span className="font-medium">{selectedEvent.actionType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">User: </span>
                  <span className="font-medium">{selectedEvent.userRole} — {selectedEvent.user}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Timestamp: </span>
                  <span className="font-medium">{selectedEvent.timestamp}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Risk Level: </span>
                  <Badge variant="outline" className={riskBadge[selectedEvent.riskLevel]}>
                    {selectedEvent.riskLevel.charAt(0).toUpperCase() + selectedEvent.riskLevel.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Scenario / Input</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">{selectedEvent.scenarioDescription}</p>
            </CardContent>
          </Card>

          {/* Outcome */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Outcome</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Decision:</span>
                <Badge variant="outline" className={outcomeBadge[selectedEvent.outcome].class}>
                  {outcomeBadge[selectedEvent.outcome].label}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="outline" className={statusBadge[selectedEvent.status].class}>
                  {statusBadge[selectedEvent.status].label}
                </Badge>
              </div>
              {selectedEvent.finalApprover && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Approved by: </span>
                  <span className="font-medium">{selectedEvent.finalApprover}</span>
                </div>
              )}
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
                <span className="text-muted-foreground">Policy: </span>
                <span className="font-medium">{selectedEvent.policyName}</span>
              </div>
              <div className="space-y-2">
                {selectedEvent.rules.map((rule, i) => (
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
                    <Badge variant="outline" className="ml-auto text-[10px] px-1.5">
                      {rule.passed ? "Passed" : "Failed"}
                    </Badge>
                  </div>
                ))}
              </div>
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
            <CardContent>
              <p className="text-sm text-muted-foreground">{selectedEvent.roleImpact}</p>
            </CardContent>
          </Card>

          {/* Approval Chain */}
          {selectedEvent.approvalChain.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Approval Chain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedEvent.approvalChain.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="rounded-md border bg-accent px-3 py-1.5 text-sm">
                        <span className="font-medium">{step.role}</span>
                        <span className="text-muted-foreground ml-1">— {step.user}</span>
                        <Badge
                          variant="outline"
                          className={`ml-2 text-[10px] ${
                            step.action === "approved"
                              ? "text-[hsl(var(--success))]"
                              : step.action === "rejected"
                              ? "text-destructive"
                              : "text-[hsl(var(--warning))]"
                          }`}
                        >
                          {step.action === "approved" ? "Approved" : step.action === "rejected" ? "Rejected" : "Pending"}
                        </Badge>
                        {step.timestamp !== "—" && (
                          <span className="text-xs text-muted-foreground ml-2">{step.timestamp}</span>
                        )}
                      </div>
                      {i < selectedEvent.approvalChain.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Decision Explanation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Decision Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground leading-relaxed">{selectedEvent.decisionExplanation}</p>
            </CardContent>
          </Card>

          {/* System Metadata */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">System Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Policy Version: </span>
                  <span className="font-medium">{selectedEvent.policyVersion}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Policy Type: </span>
                  <Badge variant="outline" className="text-[10px]">
                    {selectedEvent.policySource === "imported" ? "Imported" : "Custom"}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Execution Mode: </span>
                  <span className="font-medium">{selectedEvent.executionMode}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2 pb-6">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/policies")}>
              <Shield className="h-4 w-4" /> View Policy
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/roles")}>
              <Users className="h-4 w-4" /> View Role Configuration
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export Record
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-8 py-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Audit &amp; Compliance Ledger
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete, traceable record of all agent actions, decisions, and approvals.
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-end gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px] space-y-2">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Search className="h-3 w-3" /> Search
                </Label>
                <Input
                  placeholder="Search by user, action, or ID…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-[180px] space-y-2">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Filter className="h-3 w-3" /> Action Type
                </Label>
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="Waive Fee">Waive Fee</SelectItem>
                    <SelectItem value="Change Address">Change Address</SelectItem>
                    <SelectItem value="Close Account">Close Account</SelectItem>
                    <SelectItem value="Credit Limit Adjustment">Credit Limit Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px] space-y-2">
                <Label className="text-xs text-muted-foreground">Outcome</Label>
                <Select value={filterOutcome} onValueChange={setFilterOutcome}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Outcomes</SelectItem>
                    <SelectItem value="allowed">Allowed</SelectItem>
                    <SelectItem value="requires-approval">Approval Required</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(search || filterAction !== "all" || filterOutcome !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-muted-foreground"
                  onClick={() => { setSearch(""); setFilterAction("all"); setFilterOutcome("all"); }}
                >
                  <X className="h-3 w-3" /> Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px]">Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No audit events match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((event) => (
                    <TableRow
                      key={event.id}
                      className="cursor-pointer hover:bg-accent/50"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <TableCell className="text-xs text-muted-foreground font-mono">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {event.timestamp}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-sm">{event.actionType}</TableCell>
                      <TableCell className="text-sm">
                        <span className="text-muted-foreground">{event.userRole}</span> — {event.user}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={outcomeBadge[event.outcome].class + " text-[11px]"}>
                          {outcomeBadge[event.outcome].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusBadge[event.status].class + " text-[11px]"}>
                          {statusBadge[event.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={riskBadge[event.riskLevel] + " text-[11px]"}>
                          {event.riskLevel.charAt(0).toUpperCase() + event.riskLevel.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AuditLog;
