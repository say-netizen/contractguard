export type RiskLevel = 'high' | 'medium' | 'low';

export interface RiskItem {
  title: string;
  risk: RiskLevel;
  description: string;
  excerpt?: string;
  suggestion?: string;
}

export interface AnalysisResult {
  summary: string;
  items: RiskItem[];
}
