import { ShieldCheck, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ApprovedPolicy {
  id: string;
  action: string;
  conditions: string;
  approvedAt: string;
}

const approvedPolicies: ApprovedPolicy[] = [
  { id: "1", action: "Waive Fee", conditions: "Amount < $50 · Tenure > 1yr · No waiver in 90d", approvedAt: "Mar 22, 2026" },
  { id: "2", action: "Close Account", conditions: "Balance = $0 · No pending txns · Customer-initiated", approvedAt: "Mar 22, 2026" },
];

const ApprovedPoliciesSection = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Approved Policies</CardTitle>
          </div>
          <CardDescription className="mt-1">
            These policies will be passed into the Action Policy Builder for enforcement.
          </CardDescription>
        </div>
        <Button size="sm" className="gap-1.5">
          Open Policy Builder
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>
      <CardContent>
        {approvedPolicies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShieldCheck className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No approved policies yet.</p>
            <p className="text-xs text-muted-foreground">Review AI-extracted suggestions above to get started.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Key Conditions</TableHead>
                <TableHead>Approved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>
                    <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 font-medium">
                      {policy.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="font-mono text-xs text-muted-foreground">{policy.conditions}</code>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{policy.approvedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ApprovedPoliciesSection;
