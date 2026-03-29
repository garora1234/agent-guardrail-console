import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ActionList from "@/components/policy-builder/ActionList";
import ActionConfigPanel from "@/components/policy-builder/ActionConfigPanel";
import { mockActions } from "@/data/action-policies";
import { Shield } from "lucide-react";

const ActionPolicyBuilder = () => {
  const [selectedActionId, setSelectedActionId] = useState<string | null>("waive-fee");

  const selectedAction = mockActions.find((a) => a.id === selectedActionId) ?? null;

  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Left: Action List */}
        <div className="w-72 shrink-0 border-r border-border bg-card overflow-hidden">
          <ActionList
            actions={mockActions}
            selectedId={selectedActionId}
            onSelect={setSelectedActionId}
          />
        </div>

        {/* Right: Configuration Panel */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {selectedAction ? (
            <ActionConfigPanel action={selectedAction} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Shield className="h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-1">
                No Action Selected
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Start by selecting an action from the library to define its behavior, conditions, and approval policies.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ActionPolicyBuilder;
