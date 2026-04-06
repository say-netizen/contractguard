'use client';
import { useState } from 'react';
import { CheckCircle, Download, ArrowLeft, Upload } from 'lucide-react';
import { AnalysisResult } from '@/lib/types';

async function generatePDF(results: AnalysisResult, fileName: string) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210, MARGIN = 20, COL = W - MARGIN * 2;
  let y = 20;

  const addText = (text: string, size: number, bold: boolean, color: [number,number,number], indent = 0) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, COL - indent);
    lines.forEach((line: string) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(line, MARGIN + indent, y);
      y += size * 0.45;
    });
    y += 2;
  };

  const drawRect = (h: number, r: [number,number,number]) => {
    if (y + h > 275) { doc.addPage(); y = 20; }
    doc.setFillColor(...r);
    doc.roundedRect(MARGIN, y, COL, h, 2, 2, 'F');
  };

  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, 210, 12, 'F');
  doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(0, 0, 0);
  doc.text('CONTRACTGUARD — CONFIDENTIAL ANALYSIS REPORT', MARGIN, 8);
  y = 22;

  addText('Contract Risk Analysis Report', 22, true, [255, 255, 255]);
  addText(`File: ${fileName}`, 9, false, [150, 150, 150]);
  addText(`Generated: ${new Date().toLocaleString('en-US')}`, 9, false, [150, 150, 150]);
  y += 4;

  const overallRisk = results.overallRisk || 'LOW';
  const riskColor: Record<string, [number,number,number]> = { HIGH: [80,20,20], MEDIUM: [80,60,10], LOW: [10,60,40] };
  const riskText: Record<string, [number,number,number]> = { HIGH: [220,80,80], MEDIUM: [220,180,60], LOW: [80,200,130] };
  drawRect(14, riskColor[overallRisk]);
  doc.setFontSize(11); doc.setFont('helvetica', 'bold');
  doc.setTextColor(...riskText[overallRisk]);
  doc.text(`OVERALL RISK: ${overallRisk}`, MARGIN + 4, y + 9);
  y += 18;

  addText('Summary', 13, true, [255, 255, 255]);
  if (results.summary) addText(results.summary, 10, false, [200, 200, 200]);
  y += 4;

  const high = results.clauses?.filter(i => i.riskLevel === 'HIGH').length || 0;
  const med  = results.clauses?.filter(i => i.riskLevel === 'MEDIUM').length || 0;
  const low  = results.clauses?.filter(i => i.riskLevel === 'LOW').length || 0;
  addText(`Issues found: ${high} High · ${med} Medium · ${low} Low`, 10, false, [180, 180, 180]);
  y += 6;

  doc.setDrawColor(50, 50, 50); doc.line(MARGIN, y, W - MARGIN, y); y += 8;
  addText('Detailed Findings', 14, true, [255, 255, 255]);
  y += 2;

  for (const item of (results.clauses || [])) {
    const bgMap: Record<string, [number,number,number]> = { HIGH: [60,15,15], MEDIUM: [60,45,10], LOW: [10,30,50] };
    const textMap: Record<string, [number,number,number]> = { HIGH: [220,80,80], MEDIUM: [220,180,60], LOW: [80,160,220] };
    const cardH = 8 + (item.originalText ? 20 : 0) + 16 + (item.suggestion ? 20 : 0) + 10;
    drawRect(cardH, bgMap[item.riskLevel]);
    let cy = y + 7;
    doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textMap[item.riskLevel]);
    doc.text(`[${item.riskLevel}]`, MARGIN + 3, cy);
    doc.setTextColor(255, 255, 255);
    doc.text(item.title, MARGIN + 20, cy); cy += 7;
    if (item.originalText) {
      doc.setFontSize(8); doc.setFont('helvetica', 'italic'); doc.setTextColor(180, 180, 180);
      const lines = doc.splitTextToSize(`"${item.originalText}"`, COL - 10);
      lines.slice(0, 2).forEach((l: string) => { doc.text(l, MARGIN + 5, cy); cy += 5; });
    }
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(200, 200, 200);
    const descLines = doc.splitTextToSize(item.riskReason, COL - 8);
    descLines.slice(0, 2).forEach((l: string) => { doc.text(l, MARGIN + 5, cy); cy += 5; });
    if (item.suggestion) {
      cy += 2; doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 200, 130);
      doc.text('Suggested revision:', MARGIN + 5, cy); cy += 5;
      doc.setFont('helvetica', 'normal'); doc.setTextColor(150, 220, 180);
      const sugLines = doc.splitTextToSize(item.suggestion, COL - 10);
      sugLines.slice(0, 2).forEach((l: string) => { doc.text(l, MARGIN + 5, cy); cy += 5; });
    }
    y += cardH + 4;
  }

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(80, 80, 80);
    doc.text(`ContractGuard · contractguard-a3um.vercel.app · Page ${i} of ${pageCount}`, MARGIN, 290);
    doc.text('NOT LEGAL ADVICE', W - MARGIN, 290, { align: 'right' });
  }

  doc.save(`contractguard-report-${Date.now()}.pdf`);
}

export default function SuccessPage() {
  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  // まずsessionStorageから試す
  const [hasSession] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !!sessionStorage.getItem('cg_results');
  });

  const handleAutoDownload = async () => {
    setGenerating(true);
    try {
      const saved = sessionStorage.getItem('cg_results');
      const savedFile = sessionStorage.getItem('cg_filename') || 'contract.pdf';
      if (saved) {
        const results = JSON.parse(saved) as AnalysisResult;
        await generatePDF(results, savedFile);
        sessionStorage.removeItem('cg_results');
        sessionStorage.removeItem('cg_filename');
        setDone(true);
      }
    } catch {
      setError('Failed to generate PDF.');
    } finally {
      setGenerating(false);
    }
  };

  const handleReanalyze = async () => {
    if (!file || !apiKey) return;
    setGenerating(true);
    setError('');
    try {
      const { extractTextFromFile } = await import('@/lib/extract');
      const text = await extractTextFromFile(file);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        body: JSON.stringify({
          model: 'claude-opus-4-5',
          max_tokens: 4096,
          system: `You are ContractGuard, an expert contract attorney. Analyze contracts and identify risky clauses. Always respond in English only. Respond ONLY with a valid JSON object. No markdown, no explanation outside the JSON.

JSON structure:
{
  "contractType": "string",
  "overallRisk": "HIGH" | "MEDIUM" | "LOW",
  "summary": "2-3 sentence summary",
  "clauses": [
    {
      "id": "unique string",
      "title": "Short clause title",
      "originalText": "The exact problematic text",
      "riskLevel": "HIGH" | "MEDIUM" | "LOW",
      "riskReason": "Why this is risky",
      "suggestion": "Suggested rewrite",
      "category": "PAYMENT" | "INTELLECTUAL_PROPERTY" | "LIABILITY" | "TERMINATION" | "SCOPE_CREEP" | "CONFIDENTIALITY" | "DISPUTE" | "OTHER"
    }
  ]
}`,
          messages: [{ role: 'user', content: `Analyze this contract:\n\n${text.slice(0, 12000)}` }],
        }),
      });

      const data = await res.json() as { content: Array<{ type: string; text: string }> };
      const rawText = data.content.find(c => c.type === 'text')?.text || '';
      const clean = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const results = JSON.parse(clean) as AnalysisResult;
      await generatePDF(results, file.name);
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate PDF.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-emerald-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Payment Confirmed!</h1>

        {done ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
            <p className="text-emerald-300 text-sm font-medium">✓ PDF downloaded successfully!</p>
          </div>
        ) : hasSession ? (
          <>
            <p className="text-white/50 mb-8">Your PDF report is ready.</p>
            <button
              onClick={handleAutoDownload}
              disabled={generating}
              className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl transition-all text-lg mb-4 disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              {generating ? 'Generating...' : 'Download PDF Report'}
            </button>
          </>
        ) : (
          <>
            <p className="text-white/50 mb-2">Please re-upload your contract to generate your PDF.</p>
<div className="bg-white/3 border border-white/8 rounded-xl p-4 mb-6 text-left">
  <p className="text-white/60 text-sm leading-relaxed mb-2">
    <strong className="text-white/80">Why is this needed?</strong><br />
    For security, your contract and analysis results are never stored on our servers.
    When you were redirected to Stripe&apos;s payment page, your browser session was reset —
    this is normal behavior for cross-site redirects.
  </p>
  <p className="text-white/60 text-sm leading-relaxed">
    <strong className="text-emerald-400">No extra API cost.</strong> We already have your analysis.
    Re-uploading simply rebuilds your PDF from the contract text locally —
    your API key will not be charged again.
  </p>
</div>
            <div className="space-y-4 text-left mb-6">
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">API Key</label>
                <input
                  type="password"
                  placeholder="sk-ant-..."
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">Contract File</label>
                <label className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-6 cursor-pointer hover:bg-white/8 transition-colors">
                  <Upload className="w-5 h-5 text-white/30" />
                  <span className="text-white/50 text-sm">{file ? file.name : 'Upload PDF or DOCX'}</span>
                  <input type="file" accept=".pdf,.docx,.doc,.txt" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button
              onClick={handleReanalyze}
              disabled={generating || !file || !apiKey}
              className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl transition-all text-lg mb-4 disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              {generating ? 'Generating PDF...' : 'Generate & Download PDF'}
            </button>
          </>
        )}

        <a href="/" className="flex items-center justify-center gap-2 text-white/30 hover:text-white/60 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Analyze another contract
        </a>
      </div>
    </div>
  );
}
