export type RiskLevel = "low" | "medium" | "high";
export type AutonomyLevel = "suggest-only" | "execute-with-approval" | "auto-execute";
export type PolicySource = "imported" | "manual";
export type ConditionLogic = "AND" | "OR";
export type ConditionOrigin = "imported" | "custom";

export interface PolicyCondition {
  id: string;
  text: string;
  logic?: ConditionLogic;
  origin: ConditionOrigin;
  enabled?: boolean;
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

export interface PolicyContext {
  sourceDocument: string;
  approvalStatus: "approved" | "pending";
  extractedDate: string;
  extractedRulesCount: number;
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
  policyContext?: PolicyContext;
}

export const mockActions: ActionPolicy[] = [
  {
    id: "waive-fee",
    name: "Waive Fee",
    description: "Allow agent to waive account fees based on customer eligibility criteria",
    status: "configured",
    activePolicies: 3,
    conditions: [
      { id: "c1", text: "Amount < $50", origin: "imported", enabled: true },
      { id: "c2", text: "Customer tenure > 12 months", logic: "AND", origin: "imported", enabled: true },
      { id: "c3", text: "No waiver in last 90 days", logic: "AND", origin: "imported", enabled: true },
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
    policyContext: {
      sourceDocument: "Fee_Waiver_Policy_2026.pdf",
      approvalStatus: "approved",
      extractedDate: "2026-03-15",
      extractedRulesCount: 3,
    },
  },
  {
    id: "change-address",
    name: "Change Address",
    description: "Update customer mailing or residential address after identity verification",
    status: "configured",
    activePolicies: 2,
    conditions: [
      { id: "c4", text: "Identity verification completed", origin: "imported", enabled: true },
      { id: "c5", text: "No fraud flag on account", logic: "AND", origin: "imported", enabled: true },
      { id: "c6", text: "Address change limit ≤ 3 per year", logic: "AND", origin: "custom", enabled: true },
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
    source: "imported",
    sourceDocument: "address-change-procedures.pdf",
    policyContext: {
      sourceDocument: "Address_Change_Procedures.pdf",
      approvalStatus: "approved",
      extractedDate: "2026-03-12",
      extractedRulesCount: 2,
    },
  },
  {
    id: "close-account",
    name: "Close Account",
    description: "Initiate and process account closure requests",
    status: "configured",
    activePolicies: 4,
    conditions: [
      { id: "c7", text: "Account balance = $0", origin: "imported", enabled: true },
      { id: "c8", text: "No pending transactions", logic: "AND", origin: "imported", enabled: true },
      { id: "c9", text: "Customer-initiated request", logic: "AND", origin: "imported", enabled: true },
      { id: "c10", text: "Retention offer presented", logic: "AND", origin: "custom", enabled: false },
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
    policyContext: {
      sourceDocument: "Account_Closure_Guidelines.pdf",
      approvalStatus: "approved",
      extractedDate: "2026-03-10",
      extractedRulesCount: 3,
    },
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
