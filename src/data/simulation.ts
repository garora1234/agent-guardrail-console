export type SimulationOutcome = "allowed" | "requires-approval" | "blocked";

export interface RuleResult {
  id: string;
  text: string;
  passed: boolean;
}

export interface SimulationResult {
  outcome: SimulationOutcome;
  summary: string;
  policyApplied: string;
  policyId: string;
  rulesTriggered: RuleResult[];
  roleImpact: string;
  approvalFlow: string[];
  explanations: {
    decision: string;
    failedConditions: string[];
    passedConditions: string[];
    driver: "policy" | "role" | "both";
  };
  suggestions: string[];
}

export const mockSimulationResult: SimulationResult = {
  outcome: "requires-approval",
  summary:
    "Fee waiver request exceeds the allowed threshold of $50. The customer meets tenure and history requirements. Supervisor approval is required before execution.",
  policyApplied: "Fee Waiver Policy (Fee_Waiver_Policy_2026.pdf)",
  policyId: "waive-fee",
  rulesTriggered: [
    { id: "r1", text: "Amount < $50", passed: false },
    { id: "r2", text: "Customer tenure > 12 months", passed: true },
    { id: "r3", text: "No waiver in last 90 days", passed: true },
  ],
  roleImpact:
    "CSR cannot approve actions exceeding the $50 threshold. Request escalated to Supervisor for approval.",
  approvalFlow: ["CSR", "Supervisor"],
  explanations: {
    decision:
      "The fee waiver amount of $75 exceeds the policy threshold of $50. While the customer meets tenure and history requirements, the amount triggers mandatory supervisor approval per the fee waiver policy.",
    failedConditions: ["Amount $75 exceeds maximum auto-approve threshold of $50"],
    passedConditions: [
      "Customer tenure of 2 years exceeds 12-month minimum",
      "No fee waiver issued in the last 90 days",
    ],
    driver: "both",
  },
  suggestions: [
    "Policy threshold of $50 may be too strict — 68% of fee waiver requests exceed this limit",
    "Consider tiered thresholds based on customer tenure (e.g., $100 for 3+ year customers)",
    "High escalation rate for this scenario — evaluate auto-approval for amounts under $75",
  ],
};
