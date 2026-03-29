import { AnalysisResult } from './types';

export async function analyzeContract(text: string, apiKey: string): Promise<AnalysisResult> {
  const truncated = text.slice(0, 15000);

  const prompt = `あなたは契約書リスク分析の専門家です。以下の契約書を分析し、フリーランサーや個人開発者にとってのリスクを特定してください。

契約書の内容:
---
${truncated}
---

以下のJSON形式で回答してください。JSONのみを返し、前後に説明文を付けないでください:

{
  "summary": "この契約書の総合的なリスク評価（2〜3文で）",
  "items": [
    {
      "title": "リスク項目のタイトル（例：知的財産権の一方的譲渡）",
      "risk": "high" または "medium" または "low",
      "description": "なぜこれがリスクなのかの説明（1〜2文）",
      "excerpt": "問題のある条文の引用（ない場合は省略）",
      "suggestion": "修正案または交渉のヒント（1〜2文）"
    }
  ]
}

チェック項目：
- 知的財産権・著作権の帰属
- 支払い条件・支払いタイミング
- 無制限の修正要求・スコープクリープ
- 契約解除条件と違約金
- 競業避止義務・秘密保持
- 損害賠償の上限
- 準拠法・管轄裁判所
- その他フリーランサーに不利な条項

リスクが見つからない場合は items を空配列にしてください。`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = (err as { error?: { message?: string } })?.error?.message || response.statusText;
    if (response.status === 401) throw new Error('APIキーが無効です。正しいキーを入力してください。');
    if (response.status === 429) throw new Error('APIのレート制限に達しました。しばらく待ってから再試行してください。');
    throw new Error(`API エラー: ${msg}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text || '';

  // Parse JSON from response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AIの応答を解析できませんでした。再試行してください。');

  const parsed = JSON.parse(jsonMatch[0]) as AnalysisResult;
  return parsed;
}
