export type RiskLevel = "low" | "medium" | "high";
export type AutonomyLevel = "suggest-only" | "execute-with-approval" | "auto-execute";
export type PolicySource = "imported" | "manual";
export type ConditionLogic = "AND" | "OR";

export interface PolicyCondition {
  id: string;
  text: string;
  logic?: ConditionLogic;
}

export interface ApprovalStep {
  id: string;
  role: string;
  optional?: boolean;
}

export interface Guardrail {
  id: string;
  text: string;
}

export interface ActionPolicy {
  id: string;
  name: string;
  description: string;
  status: "configured" | "not-configured" | "draft";
  activePolicies: number;
  conditions: PolicyCondition[];
  conditionLogic: ConditionLogic;
  riskLevel: RiskLevel;
  autonomyLevel: AutonomyLevel;
  approvalFlow: ApprovalStep[];
  guardrails: Guardrail[];
  source: PolicySource;
  sourceDocument?: string;
}

export const mockActions: ActionPolicy[] = [
  {
    id: "waive-fee",
    name: "Waive Fee",
    description: "Allow agent to waive account fees based on customer eligibility criteria",
    status: "configured",
    activePolicies: 3,
    conditions: [
      { id: "c1", text: "Amount < $50" },
      { id: "c2", text: "Customer tenure > 12 months", logic: "AND" },
      { id: "c3", text: "No waiver in last 90 days", logic: "AND" },
    ],
    conditionLogic: "AND",
    riskLevel: "low",
    autonomyLevel: "execute-with-approval",
    approvalFlow: [
      { id: "a1", role: "CSR" },
      { id: "a2", role: "Supervisor" },
    ],
    guardrails: [
      { id: "g1", text: "Never override compliance policies" },
      { id: "g2", text: "Block waivers above defined thresholds" },
    ],
    source: "imported",
    sourceDocument: "fee-waiver-policy-2026.pdf",
  },
  {
    id: "change-address",
    name: "Change Address",
    description: "Update customer mailing or residential address after identity verification",
    status: "configured",
    activePolicies: 2,
    conditions: [
      { id: "c4", text: "Identity verification completed" },
      { id: "c5", text: "No fraud flag on account", logic: "AND" },
    ],
    conditionLogic: "AND",
    riskLevel: "medium",
    autonomyLevel: "execute-with-approval",
    approvalFlow: [
      { id: "a3", role: "CSR" },
      { id: "a4", role: "Supervisor" },
    ],
    guardrails: [
      { id: "g3", text: "Require human confirmation for flagged accounts" },
      { id: "g4", text: "Log all address changes for audit trail" },
    ],
    source: "manual",
  },
  {
    id: "close-account",
    name: "Close Account",
    description: "Initiate and process account closure requests",
    status: "configured",
    activePolicies: 4,
    conditions: [
      { id: "c6", text: "Account balance = $0" },
      { id: "c7", text: "No pending transactions", logic: "AND" },
      { id: "c8", text: "Customer-initiated request", logic: "AND" },
    ],
    conditionLogic: "AND",
    riskLevel: "high",
    autonomyLevel: "suggest-only",
    approvalFlow: [
      { id: "a5", role: "CSR" },
      { id: "a6", role: "Supervisor" },
      { id: "a7", role: "Compliance", optional: true },
    ],
    guardrails: [
      { id: "g5", text: "Never close accounts with positive balances" },
      { id: "g6", text: "Require human confirmation for high-risk actions" },
      { id: "g7", text: "Block closure if regulatory hold exists" },
    ],
    source: "imported",
    sourceDocument: "account-closure-guidelines.pdf",
  },
  {
    id: "credit-limit-adjustment",
    name: "Credit Limit Adjustment",
    description: "Adjust credit limits based on customer profile and risk assessment",
    status: "not-configured",
    activePolicies: 0,
    conditions: [],
    conditionLogic: "AND",
    riskLevel: "medium",
    autonomyLevel: "suggest-only",
    approvalFlow: [],
    guardrails: [],
    source: "manual",
  },
];
