import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2, AlertCircle } from "lucide-react";
import type { ActionPolicy } from "@/data/action-policies";

interface ActionListProps {
  actions: ActionPolicy[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ActionList = ({ actions, selectedId, onSelect }: ActionListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Action Library</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Select an action to configure its policies and behavior.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onSelect(action.id)}
            className={cn(
              "w-full text-left px-4 py-3 border-l-2 transition-colors",
              selectedId === action.id
                ? "bg-accent border-l-primary"
                : "border-l-transparent hover:bg-accent/50"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground">{action.name}</span>
              {action.status === "configured" ? (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-success/30 text-success bg-success/5">
                  <CheckCircle2 className="h-3 w-3 mr-0.5" />
                  Configured
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-warning/30 text-warning bg-warning/5">
                  <AlertCircle className="h-3 w-3 mr-0.5" />
                  Not Configured
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{action.description}</p>
            {action.activePolicies > 0 && (
              <p className="text-[11px] text-muted-foreground mt-1">
                {action.activePolicies} active {action.activePolicies === 1 ? "policy" : "policies"}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionList;
