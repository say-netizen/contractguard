'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp, RefreshCw, Download, Shield, Lock } from 'lucide-react';
import { AnalysisResult, RiskClause } from '@/lib/types';

const STRIPE_LINK = 'https://buy.stripe.com/8x29AU5SG6sYgW0fUp9R604';

interface Props {
  results: AnalysisResult;
  fileName: string;
  onReset: () => void;
}

const RISK_CONFIG = {
  HIGH:   { label: 'HIGH',   color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20',    icon: AlertTriangle },
  MEDIUM: { label: 'MEDIUM', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: AlertTriangle },
  LOW:    { label: 'LOW',    color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   icon: Info },
};

function RiskCard({ item, locked }: { item: RiskClause; locked?: boolean }) {
  const [open, setOpen] = useState(item.riskLevel === 'HIGH' && !locked);
  const cfg = RISK_CONFIG[item.riskLevel];
  const Icon = cfg.icon;

  if (locked) {
    return (
      <div className={`border rounded-xl overflow-hidden ${cfg.border} ${cfg.bg} opacity-50 relative`}>
        <div className="w-full flex items-start gap-4 p-5">
          <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${cfg.color}`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                {cfg.label}
              </span>
              <span className="font-semibold">{item.title}</span>
            </div>
            <p className="text-white/50 text-sm">Purchase to view details</p>
          </div>
          <Lock className="w-4 h-4 text-white/30 shrink-0 mt-1" />
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-xl overflow-hidden ${cfg.border} ${cfg.bg}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-white/3 transition-colors"
      >
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${cfg.color}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
              {cfg.label}
            </span>
            <span className="font-semibold">{item.title}</span>
          </div>
          <p className="text-white/50 text-sm truncate">{item.riskReason}</p>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0 mt-1" />
          : <ChevronDown className="w-4 h-4 text-white/30 shrink-0 mt-1" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
          {item.originalText && (
            <div>
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Original clause</p>
              <blockquote className={`text-sm leading-relaxed border-l-2 pl-4 py-1 italic ${cfg.color} border-current opacity-70`}>
                {item.originalText}
              </blockquote>
            </div>
          )}
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">Why it&apos;s risky</p>
            <p className="text-sm text-white/70 leading-relaxed">{item.riskReason}</p>
          </div>
          {item.suggestion && (
            <div>
              <p className="text-xs font-medium text-emerald-400/60 uppercase tracking-wider mb-2">✦ Suggested revision</p>
              <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-lg p-4">
                <p className="text-sm text-emerald-300/80 leading-relaxed">{item.suggestion}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
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

  doc.setDrawColor(50, 50, 50);
  doc.line(MARGIN, y, W - MARGIN, y);
  y += 8;
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
    doc.text(item.title, MARGIN + 20, cy);
    cy += 7;
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

  y += 6;
  doc.setDrawColor(50, 50, 50); doc.line(MARGIN, y, W - MARGIN, y); y += 8;
  addText('Legal Disclaimer', 11, true, [150, 150, 150]);
  addText('This report is for informational purposes only and does not constitute legal advice. Always consult a qualified attorney before signing any contract.', 8, false, [120, 120, 120]);

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(80, 80, 80);
    doc.text(`ContractGuard · contractguard-a3um.vercel.app · Page ${i} of ${pageCount}`, MARGIN, 290);
    doc.text('NOT LEGAL ADVICE', W - MARGIN, 290, { align: 'right' });
  }

  doc.save(`contractguard-report-${Date.now()}.pdf`);
}

export default function StepResults({ results, fileName, onReset }: Props) {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const all    = results.clauses || [];
  const high   = all.filter(i => i.riskLevel === 'HIGH');
  const medium = all.filter(i => i.riskLevel === 'MEDIUM');
  const low    = all.filter(i => i.riskLevel === 'LOW');
  const overallRisk = high.length > 0 ? 'HIGH' : medium.length > 0 ? 'MEDIUM' : 'LOW';
  const overallCfg  = RISK_CONFIG[overallRisk];

  const FREE_LIMIT = 2;
  const visibleClauses = all.slice(0, FREE_LIMIT);
  const lockedClauses  = all.slice(FREE_LIMIT);

  const handlePayment = () => {
    setLoading(true);
    sessionStorage.setItem('cg_results', JSON.stringify(results));
    sessionStorage.setItem('cg_filename', fileName);
    window.location.href = STRIPE_LINK;
  };

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      await generatePDF(results, fileName);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`rounded-2xl border p-6 mb-8 ${overallCfg.border} ${overallCfg.bg}`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${overallCfg.bg}`}>
            <Shield className={`w-6 h-6 ${overallCfg.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold">Analysis Complete</h2>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${overallCfg.bg} ${overallCfg.color}`}>
                Overall: {overallCfg.label}
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{results.summary}</p>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-400" /> High {high.length}
              </span>
              <span className="flex items-center gap-1.5 text-yellow-400">
                <span className="w-2 h-2 rounded-full bg-yellow-400" /> Medium {medium.length}
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-400" /> Low {low.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {all.length === 0 ? (
          <div className="text-center py-12 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <p className="text-lg font-semibold text-emerald-400">No major issues found</p>
            <p className="text-white/40 text-sm mt-1">This contract appears relatively safe.</p>
          </div>
        ) : (
          <>
            {visibleClauses.map((item, i) => <RiskCard key={i} item={item} />)}
            {lockedClauses.length > 0 && (
              <>
                {lockedClauses.map((item, i) => <RiskCard key={i + FREE_LIMIT} item={item} locked />)}
                <div className="text-center py-4 text-white/40 text-sm">
                  🔒 {lockedClauses.length} more issues hidden — purchase to unlock
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="bg-white/3 border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="bg-emerald-500/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Unlock Full Report + PDF</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              See all {lockedClauses.length} hidden issues, suggested revisions, and download a formatted PDF report.
            </p>
          </div>
        </div>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl transition-all text-lg shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-[1.02] disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          {loading ? 'Redirecting...' : 'Unlock Full Report — $2.99'}
        </button>
        <p className="text-center text-white/25 text-xs mt-3">
          Secure payment via Stripe · One-time purchase
        </p>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleDownloadPDF}
          disabled={generating}
          className="text-white/30 hover:text-white/60 text-sm underline underline-offset-2 transition-colors disabled:opacity-30"
        >
          {generating ? 'Generating PDF...' : 'Already paid? Click here to download'}
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 font-medium px-6 py-4 rounded-xl transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Analyze another
        </button>
      </div>

      <div className="mt-8 bg-white/2 border border-white/6 rounded-xl p-5">
        <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Legal Disclaimer & Privacy</h4>
        <p className="text-white/25 text-xs leading-relaxed mb-3">
          <strong className="text-white/40">Not legal advice.</strong> This analysis is generated by AI and is for informational purposes only. Always consult a qualified attorney before signing any contract.
        </p>
        <p className="text-white/25 text-xs leading-relaxed">
          <strong className="text-white/40">Data handling.</strong> Your contract is transmitted directly to Anthropic Claude API. ContractGuard does not store your contract data.
        </p>
      </div>
    </div>
  );
}
