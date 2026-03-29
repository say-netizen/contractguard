export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export interface RiskClause {
  id: string;
  title: string;
  originalText: string;
  riskLevel: RiskLevel;
  riskReason: string;
  suggestion: string;
  category: ClauseCategory;
}

export type ClauseCategory =
  | "PAYMENT"
  | "INTELLECTUAL_PROPERTY"
  | "LIABILITY"
  | "TERMINATION"
  | "SCOPE_CREEP"
  | "CONFIDENTIALITY"
  | "DISPUTE"
  | "OTHER";

export interface AnalysisResult {
  summary: string;
  overallRisk: RiskLevel;
  clauses: RiskClause[];
  contractType: string;
  analyzedAt: string;
}
