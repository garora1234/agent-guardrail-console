import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Play, FlaskConical } from "lucide-react";

interface ScenarioInputProps {
  onRun: (scenario: string, actionId: string) => void;
  isRunning: boolean;
}

const actions = [
  { id: "waive-fee", name: "Waive Fee" },
  { id: "change-address", name: "Change Address" },
  { id: "close-account", name: "Close Account" },
  { id: "credit-limit-adjustment", name: "Credit Limit Adjustment" },
];

const ScenarioInput = ({ onRun, isRunning }: ScenarioInputProps) => {
  const [scenario, setScenario] = useState("Customer requests fee waiver of $75 with 2-year tenure");
  const [actionId, setActionId] = useState("waive-fee");

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-primary" />
          Scenario Input
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Describe the scenario</Label>
          <Textarea
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder='e.g., "Waive $75 fee for customer with 2-year tenure"'
            className="min-h-[80px] resize-none"
          />
        </div>
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <Label>Action to simulate</Label>
            <Select value={actionId} onValueChange={setActionId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {actions.map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => onRun(scenario, actionId)}
            disabled={!scenario.trim() || isRunning}
            className="gap-2"
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Running…" : "Run Simulation"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioInput;
