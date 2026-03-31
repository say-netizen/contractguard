'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, FileText, Zap, CheckCircle, ArrowRight, Lock, Download, RefreshCw } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  // 画面を切り替えるための「モード」
  const [showResult, setShowResult] = useState(false);

  // ダミーの診断結果（本番はここをAIの結果に入れ替える）
  const mockResults = [
    { label: 'IP Ownership Transfer', desc: 'この条項は、あなたが作成したすべての著作権をクライアントに無償で譲渡することを強制しています。', risk: 'high', suggestion: '著作権は維持し、使用ライセンスのみを付与する条項に変更してください。' },
    { label: 'Unlimited Revisions', desc: '修正回数に制限がなく、際限のない作業を強いられるリスクがあります。', risk: 'high', suggestion: '「最大2回まで」などの具体的な回数制限を追加してください。' },
    { label: 'Net-90 Payment', desc: '支払いが納品から90日後となっており、キャッシュフローが悪化します。', risk: 'medium', suggestion: 'Net-30（30日以内支払い）への変更を交渉してください。' }
  ];

  // --- 【1】もし「結果表示モード」ならこれを出す ---
  if (showResult) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-12 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-2 font-bold tracking-widest text-sm uppercase">Analysis Complete</div>
              <h1 className="text-4xl font-black italic">Contract <span className="text-emerald-400 font-black">Audit Report</span></h1>
            </div>
            <button onClick={() => setShowResult(false)} className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm border border-white/10 flex items-center gap-2 transition-all">
              <RefreshCw className="w-4 h-4" /> New Audit
            </button>
          </div>

          <div className="space-y-6">
            {mockResults.map((item, i) => (
              <div key={i} className={`bg-white/3 border ${item.risk === 'high' ? 'border-red-500/30' : 'border-yellow-500/30'} rounded-2xl p-6`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.risk === 'high' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-yellow-500 shadow-[0_0_10px_#f59e0b]'}`} />
                    <h3 className="text-xl font-bold">{item.label}</h3>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded border ${item.risk === 'high' ? 'text-red-400 border-red-500/50 bg-red-500/10' : 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10'}`}>
                    {item.risk.toUpperCase()} RISK
                  </span>
                </div>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">{item.desc}</p>
                <div className="bg-[#0f0f1a] border border-white/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-emerald-400 mb-1">Recommended Revision:</p>
                  <p className="text-emerald-400 text-sm italic">"{item.suggestion}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* 最後にStripeへ飛ばす場所（ボタン例） */}
          <div className="mt-12 text-center border-t border-white/5 pt-12">
            <button 
              onClick={() => window.location.href = 'あなたのStripeリンク'} 
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-10 py-5 rounded-2xl text-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
              Get Full PDF Report - $9
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 【2】通常時は元のLPを出す（ここから下は元のコードと同じ） ---
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg tracking-tight">ContractGuard</span>
          </div>
          <button
            onClick={() => setShowResult(true)} // テスト用に結果画面へ
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-all"
          >
            Try for free
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center font-sans">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm mb-8 italic">
          <Zap className="w-3.5 h-3.5" />
          AI instantly identifies dangerous clauses
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
          Your contract<br />
          <span className="text-emerald-400">has landmines.</span><br />
          We find them.
        </h1>

        <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-light italic">
          Built for freelancers and independent contractors. Upload any contract —
          AI flags dangerous clauses and generates revision suggestions instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setShowResult(true)} // 本番はここで決済 or 分析へ
            className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-10 py-5 rounded-2xl text-2xl transition-all hover:scale-105"
          >
            Analyze a contract now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-white/30 text-sm italic">Use your own Claude API key · Nothing stored on our servers</p>
        </div>
      </section>

      {/* 以下、元のLPの「How it works」「Pricing」などが続く... */}
      <footer className="border-t border-white/5 px-6 py-8 text-center text-white/20 text-[10px] uppercase tracking-widest font-mono">
        &copy; 2026 ContractGuard // AI Legal Intel
      </footer>
    </div>
  );
}
