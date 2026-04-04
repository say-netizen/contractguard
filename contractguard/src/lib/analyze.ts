import type { AnalysisResult } from "./types";

const SYSTEM_PROMPT = `You are ContractGuard, an expert contract attorney specializing in freelancer and independent contractor agreements. Your job is to analyze contracts and identify clauses that are risky or unfavorable to the freelancer/contractor.

IMPORTANT: Always respond in English only, regardless of the language of the contract.

Analyze the contract and respond ONLY with a valid JSON object. No markdown, no explanation outside the JSON.

JSON structure:
{
  "contractType": "string (e.g. 'Freelance Service Agreement')",
  "overallRisk": "HIGH" | "MEDIUM" | "LOW",
  "summary": "2-3 sentence summary of the contract and main risks (in English)",
  "clauses": [
    {
      "id": "unique string",
      "title": "Short clause title (in English)",
      "originalText": "The exact problematic text from the contract",
      "riskLevel": "HIGH" | "MEDIUM" | "LOW",
      "riskReason": "Why this is risky for the freelancer (in English)",
      "suggestion": "Specific rewritten version that protects the freelancer (in English)",
      "category": "PAYMENT" | "INTELLECTUAL_PROPERTY" | "LIABILITY" | "TERMINATION" | "SCOPE_CREEP" | "CONFIDENTIALITY" | "DISPUTE" | "OTHER"
    }
  ]
}

Focus on: payment terms, IP ownership, liability, termination, non-compete, scope creep, confidentiality.
Identify 4-8 specific clauses.`;

export async function analyzeContract(
  contractText: string,
  apiKey: string
): Promise<AnalysisResult> {
  // Use Next.js API route as proxy to avoid CORS
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      model: "claude-opus-4-5",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyze this contract and identify all risky clauses. Respond in English only:\n\n${contractText.slice(0, 12000)}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = (err as { error?: { message?: string } }).error?.message || response.statusText;
    throw new Error(`Claude API error: ${msg}`);
  }

  const data = await response.json() as {
    content: Array<{ type: string; text: string }>;
  };
  const text = data.content.find((c) => c.type === "text")?.text || "";

  try {
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const parsed = JSON.parse(clean) as AnalysisResult;
  return parsed;
} catch {
  throw new Error("Failed to parse AI response. Please try again.");
}
}
