export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface RiskClause {
  id: string;
  title: string;
  originalText: string;
  riskLevel: RiskLevel;
  riskReason: string;
  suggestion: string;
  category: string;
}

export interface AnalysisResult {
  contractType: string;
  overallRisk: RiskLevel;
  summary: string;
  clauses: RiskClause[];
}
