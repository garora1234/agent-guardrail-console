import { SimulationResult } from "@/data/simulation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface SuggestionsPanelProps {
  result: SimulationResult;
}

const SuggestionsPanel = ({ result }: SuggestionsPanelProps) => {
  if (!result.suggestions.length) return null;

  return (
    <Card className="border-[hsl(var(--info))]/20 bg-[hsl(var(--info))]/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-[hsl(var(--info))]" />
          Optimization Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {result.suggestions.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--info))]" />
              {s}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SuggestionsPanel;
