import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import RoleList from "@/components/role-config/RoleList";
import RoleConfigPanel from "@/components/role-config/RoleConfigPanel";
import { mockRoles } from "@/data/roles";
import { Users } from "lucide-react";

const RoleConfiguration = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>("csr");

  const selectedRole = mockRoles.find((r) => r.id === selectedRoleId) ?? null;

  return (
    <AppLayout>
      <div className="flex h-full">
        {/* Left: Role List */}
        <div className="w-72 shrink-0 border-r border-border bg-card overflow-hidden">
          <RoleList
            roles={mockRoles}
            selectedId={selectedRoleId}
            onSelect={setSelectedRoleId}
          />
        </div>

        {/* Right: Configuration Panel */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {selectedRole ? (
            <RoleConfigPanel role={selectedRole} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Users className="h-10 w-10 text-muted-foreground mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-1">
                No Role Selected
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Select a role to configure its permissions, autonomy limits, and approval authority.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default RoleConfiguration;
