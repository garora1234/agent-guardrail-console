import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Plus, Shield, CheckCircle2 } from "lucide-react";
import type { RoleConfig } from "@/data/roles";

interface RoleListProps {
  roles: RoleConfig[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const RoleList = ({ roles, selectedId, onSelect }: RoleListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Roles</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Select a role to configure its permissions and constraints.
        </p>
      </div>

      <div className="px-3 py-2 border-b border-border">
        <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs h-8">
          <Plus className="h-3 w-3" />
          Add Role
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {roles.map((role) => {
          const allowedCount = role.actionPermissions.filter((a) => a.allowed).length;
          return (
            <button
              key={role.id}
              onClick={() => onSelect(role.id)}
              className={cn(
                "w-full text-left px-4 py-3 border-l-2 transition-colors",
                selectedId === role.id
                  ? "bg-accent border-l-primary"
                  : "border-l-transparent hover:bg-accent/50"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{role.name}</span>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 border-primary/20 text-primary bg-primary/5">
                  <Shield className="h-3 w-3 mr-0.5" />
                  {allowedCount} actions
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{role.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoleList;
