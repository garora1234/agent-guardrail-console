import { GitBranch, Plus, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Workflow {
  id: string;
  name: string;
  products: string[];
  status: "active" | "draft";
}

const workflows: Workflow[] = [
  { id: "1", name: "Fee Waiver", products: ["Personal Checking", "Business Checking"], status: "active" },
  { id: "2", name: "Address Change", products: ["All Products"], status: "active" },
  { id: "3", name: "Account Closure", products: ["Personal Checking", "Business Checking"], status: "active" },
  { id: "4", name: "Credit Limit Adjustment", products: ["Visa Platinum", "Secured Card"], status: "draft" },
  { id: "5", name: "Late Payment Reversal", products: ["Auto Loan", "Home Mortgage"], status: "draft" },
];

const WorkflowMappingSection = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Workflow Mapping</CardTitle>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Add Workflow
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workflow</TableHead>
              <TableHead>Associated Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell className="font-medium">{workflow.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {workflow.products.map((p) => (
                      <Badge key={p} variant="secondary" className="text-xs font-normal">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      workflow.status === "active"
                        ? "text-success border-success/30 bg-success/10"
                        : "text-muted-foreground border-border"
                    }
                  >
                    {workflow.status === "active" ? "Active" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WorkflowMappingSection;
