import type { AnalysisResult } from "./types";

const SYSTEM_PROMPT = `You are ContractGuard, an expert contract attorney specializing in freelancer and independent contractor agreements. Your job is to analyze contracts and identify clauses that are risky or unfavorable to the freelancer/contractor.

IMPORTANT: Always respond in English only, regardless of the language of the contract.

Analyze the contract and respond ONLY with a valid JSON object. No markdown, no explanation outside the JSON.

JSON structure:
{
  "contractType": "string (e.g. 'Freelance Service Agreement', 'NDA', 'Employment Contract')",
  "overallRisk": "HIGH" | "MEDIUM" | "LOW",
  "summary": "2-3 sentence summary of the contract and main risks (in English)",
  "clauses": [
    {
      "id": "unique string",
      "title": "Short clause title (in English)",
      "originalText": "The exact problematic text from the contract (quote it)",
      "riskLevel": "HIGH" | "MEDIUM" | "LOW",
      "riskReason": "Why this is risky for the freelancer (1-2 sentences, in English)",
      "suggestion": "Specific rewritten version of this clause that protects the freelancer (in English)",
      "category": "PAYMENT" | "INTELLECTUAL_PROPERTY" | "LIABILITY" | "TERMINATION" | "SCOPE_CREEP" | "CONFIDENTIALITY" | "DISPUTE" | "OTHER"
    }
  ]
}

Focus on:
- Payment terms (net-90, no kill fee, unlimited revisions)
- IP ownership (work-for-hire clauses that take all rights)
- Liability (unlimited liability, indemnification overreach)
- Termination (unilateral termination without payment)
- Non-compete / non-solicitation overreach
- Scope creep (vague deliverables)
- Confidentiality (overly broad NDAs)

Be thorough. Identify 4-8 specific clauses. If the contract is generally fair, still flag any clauses that could be improved.`;

export async function analyzeContract(
  contractText: string,
  apiKey: string
): Promise<AnalysisResult> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-opus-4-5",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Please analyze this contract and identify all risky clauses. Respond in English only:\n\n${contractText.slice(0, 12000)}`,
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
    const parsed = JSON.parse(text) as Omit<AnalysisResult, "analyzedAt">;
    return {
      ...parsed,
      analyzedAt: new Date().toISOString(),
    };
  } catch {
    throw new Error("Failed to parse AI response. Please try again.");
  }
}
