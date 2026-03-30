export type AuditOutcome = "allowed" | "requires-approval" | "blocked";
export type AuditStatus = "completed" | "pending-approval" | "rejected";
export type RiskLevel = "low" | "medium" | "high";

export interface AuditRuleResult {
  text: string;
  passed: boolean;
}

export interface ApprovalStep {
  role: string;
  user: string;
  action: "approved" | "pending" | "rejected";
  timestamp: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actionType: string;
  user: string;
  userRole: string;
  outcome: AuditOutcome;
  status: AuditStatus;
  riskLevel: RiskLevel;
  scenarioDescription: string;
  policyName: string;
  policySource: "imported" | "custom";
  policyVersion: string;
  executionMode: string;
  rules: AuditRuleResult[];
  roleImpact: string;
  approvalChain: ApprovalStep[];
  decisionExplanation: string;
  finalApprover: string | null;
}

export const mockAuditEvents: AuditEvent[] = [
  {
    id: "AUD-001",
    timestamp: "2026-03-29 14:32:10",
    actionType: "Waive Fee",
    user: "John Mitchell",
    userRole: "CSR",
    outcome: "requires-approval",
    status: "completed",
    riskLevel: "low",
    scenarioDescription: "Customer requested fee waiver of $75 for overdraft charge. Customer has 2-year tenure with no previous waivers in 90 days.",
    policyName: "Waive Fee Policy",
    policySource: "imported",
    policyVersion: "v2.1",
    executionMode: "Execute with Approval",
    rules: [
      { text: "Amount < $50", passed: false },
      { text: "Customer tenure > 12 months", passed: true },
      { text: "No waiver in last 90 days", passed: true },
    ],
    roleImpact: "CSR cannot approve actions exceeding $50 threshold. Request escalated to Supervisor.",
    approvalChain: [
      { role: "CSR", user: "John Mitchell", action: "pending", timestamp: "2026-03-29 14:32:10" },
      { role: "Supervisor", user: "Sarah Chen", action: "approved", timestamp: "2026-03-29 14:45:22" },
    ],
    decisionExplanation: "The requested fee amount of $75 exceeded the automatic approval threshold of $50. Based on policy rules, supervisor approval was required and subsequently granted. The customer met all other eligibility criteria.",
    finalApprover: "Sarah Chen (Supervisor)",
  },
  {
    id: "AUD-002",
    timestamp: "2026-03-29 13:18:45",
    actionType: "Change Address",
    user: "Emily Rodriguez",
    userRole: "CSR",
    outcome: "allowed",
    status: "completed",
    riskLevel: "low",
    scenarioDescription: "Customer requested address change to a verified domestic address.",
    policyName: "Address Change Policy",
    policySource: "imported",
    policyVersion: "v1.3",
    executionMode: "Auto-Execute",
    rules: [
      { text: "Address is domestic", passed: true },
      { text: "Identity verified", passed: true },
      { text: "No pending transactions at old address", passed: true },
    ],
    roleImpact: "CSR is authorized to auto-execute address changes for verified domestic addresses.",
    approvalChain: [],
    decisionExplanation: "All policy conditions were met. The address is domestic, identity was verified, and no pending transactions exist. The action was auto-executed without escalation.",
    finalApprover: null,
  },
  {
    id: "AUD-003",
    timestamp: "2026-03-29 11:05:33",
    actionType: "Close Account",
    user: "David Park",
    userRole: "CSR",
    outcome: "blocked",
    status: "rejected",
    riskLevel: "high",
    scenarioDescription: "Customer requested account closure. Account has outstanding balance of $1,200.",
    policyName: "Account Closure Policy",
    policySource: "custom",
    policyVersion: "v1.0",
    executionMode: "Suggest Only",
    rules: [
      { text: "Outstanding balance = $0", passed: false },
      { text: "No pending transactions", passed: false },
      { text: "Regulatory hold cleared", passed: true },
    ],
    roleImpact: "CSR cannot process account closures with outstanding balances. Action blocked by policy.",
    approvalChain: [],
    decisionExplanation: "Account closure was blocked because the account has an outstanding balance of $1,200 and pending transactions. Policy requires zero balance and no pending activity before closure can proceed.",
    finalApprover: null,
  },
  {
    id: "AUD-004",
    timestamp: "2026-03-28 16:42:08",
    actionType: "Waive Fee",
    user: "John Mitchell",
    userRole: "CSR",
    outcome: "allowed",
    status: "completed",
    riskLevel: "low",
    scenarioDescription: "Customer requested fee waiver of $25 for monthly service charge. Customer has 5-year tenure.",
    policyName: "Waive Fee Policy",
    policySource: "imported",
    policyVersion: "v2.1",
    executionMode: "Auto-Execute",
    rules: [
      { text: "Amount < $50", passed: true },
      { text: "Customer tenure > 12 months", passed: true },
      { text: "No waiver in last 90 days", passed: true },
    ],
    roleImpact: "CSR is authorized to auto-execute fee waivers under $50 for qualifying customers.",
    approvalChain: [],
    decisionExplanation: "All conditions were satisfied. The fee waiver amount of $25 is under the $50 threshold, customer tenure exceeds 12 months, and no recent waivers exist. Action auto-executed.",
    finalApprover: null,
  },
  {
    id: "AUD-005",
    timestamp: "2026-03-28 10:15:20",
    actionType: "Credit Limit Adjustment",
    user: "Sarah Chen",
    userRole: "Supervisor",
    outcome: "requires-approval",
    status: "pending-approval",
    riskLevel: "medium",
    scenarioDescription: "Request to increase credit limit by $5,000 for business account holder with 3-year relationship.",
    policyName: "Credit Limit Policy",
    policySource: "custom",
    policyVersion: "v1.2",
    executionMode: "Execute with Approval",
    rules: [
      { text: "Increase < $2,000", passed: false },
      { text: "Account in good standing", passed: true },
      { text: "No delinquencies in 12 months", passed: true },
    ],
    roleImpact: "Supervisor can approve up to $3,000 increases. Amount exceeds authority — escalated to Admin.",
    approvalChain: [
      { role: "Supervisor", user: "Sarah Chen", action: "approved", timestamp: "2026-03-28 10:15:20" },
      { role: "Admin", user: "—", action: "pending", timestamp: "—" },
    ],
    decisionExplanation: "Credit limit increase of $5,000 exceeds both the auto-approve threshold and supervisor authority. Awaiting admin approval.",
    finalApprover: null,
  },
];
