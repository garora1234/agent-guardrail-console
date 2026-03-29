export type AutonomyLevel = "suggest-only" | "execute-with-approval" | "auto-execute";
export type RiskLevel = "low" | "medium" | "high";

export interface RoleActionPermission {
  actionId: string;
  actionName: string;
  allowed: boolean;
}

export interface RoleConfig {
  id: string;
  name: string;
  description: string;
  actionPermissions: RoleActionPermission[];
  maxAutonomy: AutonomyLevel;
  approvalAuthority: RiskLevel[];
  allowOverrideRequest: boolean;
  allowTempException: boolean;
}

export const autonomyLabels: Record<AutonomyLevel, { label: string; description: string }> = {
  "suggest-only": { label: "Suggest Only", description: "Agent recommends, human executes" },
  "execute-with-approval": { label: "Execute with Approval", description: "Agent executes after human approval" },
  "auto-execute": { label: "Auto-Execute", description: "No approval required — restricted" },
};

export const riskLabels: Record<RiskLevel, string> = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
};

const allActions: RoleActionPermission[] = [
  { actionId: "waive-fee", actionName: "Waive Fee", allowed: false },
  { actionId: "change-address", actionName: "Change Address", allowed: false },
  { actionId: "close-account", actionName: "Close Account", allowed: false },
  { actionId: "credit-limit-adjustment", actionName: "Credit Limit Adjustment", allowed: false },
];

function withActions(allowedIds: string[]): RoleActionPermission[] {
  return allActions.map((a) => ({ ...a, allowed: allowedIds.includes(a.actionId) }));
}

export const mockRoles: RoleConfig[] = [
  {
    id: "csr",
    name: "CSR",
    description: "Handles customer requests and performs routine account operations",
    actionPermissions: withActions(["waive-fee", "change-address"]),
    maxAutonomy: "execute-with-approval",
    approvalAuthority: [],
    allowOverrideRequest: false,
    allowTempException: false,
  },
  {
    id: "supervisor",
    name: "Supervisor",
    description: "Oversees CSR activity and approves escalated actions",
    actionPermissions: withActions(["waive-fee", "change-address", "close-account", "credit-limit-adjustment"]),
    maxAutonomy: "execute-with-approval",
    approvalAuthority: ["low", "medium"],
    allowOverrideRequest: true,
    allowTempException: true,
  },
  {
    id: "admin",
    name: "Admin",
    description: "Full system access with ability to configure and override all settings",
    actionPermissions: withActions(["waive-fee", "change-address", "close-account", "credit-limit-adjustment"]),
    maxAutonomy: "auto-execute",
    approvalAuthority: ["low", "medium", "high"],
    allowOverrideRequest: true,
    allowTempException: true,
  },
];
