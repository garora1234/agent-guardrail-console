import { Database, Package, FileText, ShieldCheck, Check } from "lucide-react";

interface Step {
  label: string;
  icon: React.ElementType;
  description: string;
}

const steps: Step[] = [
  { label: "Data Sources", icon: Database, description: "Connect banking systems" },
  { label: "Products & Workflows", icon: Package, description: "Define catalog & processes" },
  { label: "Policy Ingestion", icon: FileText, description: "Upload & extract rules" },
  { label: "Review & Approval", icon: ShieldCheck, description: "Validate & approve policies" },
];

interface SetupStepperProps {
  currentStep: number;
}

const SetupStepper = ({ currentStep }: SetupStepperProps) => {
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div key={step.label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center h-9 w-9 rounded-full border-2 shrink-0 transition-colors ${
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground bg-secondary/30"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <StepIcon className="h-4 w-4" />
                )}
              </div>
              <div className="hidden md:block">
                <p
                  className={`text-sm font-medium leading-tight ${
                    isCurrent ? "text-foreground" : isCompleted ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-4 ${
                  isCompleted ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SetupStepper;
