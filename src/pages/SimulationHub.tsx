import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ScenarioInput from "@/components/simulation/ScenarioInput";
import SimulationResultPanel from "@/components/simulation/SimulationResultPanel";
import ExplainabilityPanel from "@/components/simulation/ExplainabilityPanel";
import SuggestionsPanel from "@/components/simulation/SuggestionsPanel";
import { mockSimulationResult, SimulationResult } from "@/data/simulation";
import { Button } from "@/components/ui/button";
import { FlaskConical, Shield, Users, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SimulationHub = () => {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  const handleRun = (_scenario: string, _actionId: string) => {
    setIsRunning(true);
    setResult(null);
    setTimeout(() => {
      setResult(mockSimulationResult);
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => setResult(null);

  return (
    <AppLayout>
      <div className="px-8 py-6 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            Evaluation &amp; Simulation Hub
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Test how AI agents will behave under different scenarios before deploying policies.
          </p>
        </div>

        <ScenarioInput onRun={handleRun} isRunning={isRunning} />

        {isRunning && (
          <div className="flex items-center justify-center py-12 text-muted-foreground text-sm gap-2">
            <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Simulating agent behavior…
          </div>
        )}

        {!result && !isRunning && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FlaskConical className="h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No Simulation Run</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Enter a scenario and run a simulation to see how agent behavior is governed by your policies and role configurations.
            </p>
          </div>
        )}

        {result && !isRunning && (
          <>
            <SimulationResultPanel result={result} />
            <ExplainabilityPanel result={result} />
            <SuggestionsPanel result={result} />

            <div className="flex items-center gap-3 pt-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/policies")}>
                <Shield className="h-4 w-4" /> Edit Policy
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/roles")}>
                <Users className="h-4 w-4" /> Adjust Role Permissions
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" /> Run Another Simulation
              </Button>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default SimulationHub;
