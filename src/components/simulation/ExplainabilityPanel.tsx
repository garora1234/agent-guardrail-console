import { SimulationResult } from "@/data/simulation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Brain } from "lucide-react";

interface ExplainabilityPanelProps {
  result: SimulationResult;
}

const driverLabels = {
  policy: "Policy-Driven",
  role: "Role-Driven",
  both: "Policy & Role-Driven",
};

const ExplainabilityPanel = ({ result }: ExplainabilityPanelProps) => {
  const { explanations } = result;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          Decision Explainability
          <Badge variant="outline" className="ml-auto text-[10px]">
            {driverLabels[explanations.driver]}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground leading-relaxed">{explanations.decision}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-destructive">Failed Conditions</p>
            {explanations.failedConditions.map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <XCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                <span className="text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-[hsl(var(--success))]">Passed Conditions</p>
            {explanations.passedConditions.map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(var(--success))] mt-0.5" />
                <span className="text-muted-foreground">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExplainabilityPanel;
