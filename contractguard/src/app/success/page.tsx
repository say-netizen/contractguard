'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
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
  const riskColor: Record<string, [number,number,number]> = {
    HIGH: [80, 20, 20], MEDIUM: [80, 60, 10], LOW: [10, 60, 40]
  };
  const riskText: Record<string, [number,number,number]> = {
    HIGH: [220, 80, 80], MEDIUM: [220, 180, 60], LOW: [80, 200, 130]
  };
  doc.setFillColor(...riskColor[overallRisk]);
  doc.roundedRect(MARGIN, y, COL, 14, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
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
    const bgMap: Record<string, [number,number,number]> = {
      HIGH: [60, 15, 15], MEDIUM: [60, 45, 10], LOW: [10, 30, 50]
    };
    const textMap: Record<string, [number,number,number]> = {
      HIGH: [220, 80, 80], MEDIUM: [220, 180, 60], LOW: [80, 160, 220]
    };
    const cardH = 8 + (item.originalText ? 20 : 0) + 16 + (item.suggestion ? 20 : 0) + 10;
    if (y + cardH > 275) { doc.addPage(); y = 20; }
    doc.setFillColor(...bgMap[item.riskLevel]);
    doc.roundedRect(MARGIN, y, COL, cardH, 2, 2, 'F');
    let cy = y + 7;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...textMap[item.riskLevel]);
    doc.text(`[${item.riskLevel}]`, MARGIN + 3, cy);
    doc.setTextColor(255, 255, 255);
    doc.text(item.title, MARGIN + 20, cy);
    cy += 7;
    if (item.originalText) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(180, 180, 180);
      const lines = doc.splitTextToSize(`"${item.originalText}"`, COL - 10);
      lines.slice(0, 2).forEach((l: string) => { doc.text(l, MARGIN + 5, cy); cy += 5; });
    }
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 200, 200);
    const descLines = doc.splitTextToSize(item.riskReason, COL - 8);
    descLines.slice(0, 2).forEach((l: string) => { doc.text(l, MARGIN + 5, cy); cy += 5; });
    if (item.suggestion) {
      cy += 2;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(80, 200, 130);
      doc.text('Suggested revision:', MARGIN + 5, cy);
      cy += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(150, 220, 180);
      const sugLines = doc.splitTextToSize(item.suggestion, COL - 10);
      sugLines.slice(0, 2).forEach((l: string) => { doc.text(l, MARGIN + 5, cy); cy += 5; });
    }
    y += cardH + 4;
  }

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`ContractGuard · contractguard-a3um.vercel.app · Page ${i} of ${pageCount}`, MARGIN, 290);
    doc.text('NOT LEGAL ADVICE', W - MARGIN, 290, { align: 'right' });
  }

  doc.save(`contractguard-report-${Date.now()}.pdf`);
}

export default function SuccessPage() {
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState('');
  const [generating, setGenerating] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('cg_results');
    const savedFile = sessionStorage.getItem('cg_filename');
    if (saved) {
      try {
        setResults(JSON.parse(saved) as AnalysisResult);
        setFileName(savedFile || 'contract.pdf');
      } catch {
        setNoData(true);
      }
    } else {
      setNoData(true);
    }
  }, []);

  const handleDownload = async () => {
    if (!results) return;
    setGenerating(true);
    try {
      await generatePDF(results, fileName);
      sessionStorage.removeItem('cg_results');
      sessionStorage.removeItem('cg_filename');
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
        <p className="text-white/50 mb-8">Your PDF report is ready to download.</p>

        {noData ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm">Session expired. Please go back and analyze your contract again.</p>
          </div>
        ) : (
          <button
            onClick={handleDownload}
            disabled={generating || !results}
            className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl transition-all text-lg mb-4 disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            {generating ? 'Generating PDF...' : 'Download PDF Report'}
          </button>
        )}

        
          <a href="/"
          className="flex items-center justify-center gap-2 text-white/30 hover:text-white/60 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Analyze another contract
        </a>
      </div>
    </div>
  );
}
