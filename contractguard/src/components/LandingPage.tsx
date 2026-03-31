'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, FileText, Zap, CheckCircle, ArrowRight, Lock, RefreshCw } from 'lucide-react';

export default function LandingPage() {
  const [showResult, setShowResult] = useState(false);

  // --- REPORT VIEW (Analysis Result) ---
  if (showResult) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-12 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 mb-2 font-bold tracking-widest text-sm uppercase">
                <Shield className="w-5 h-5" /> Analysis Complete
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic tracking-tight">
                Contract <span className="text-emerald-400">Audit Report</span>
              </h1>
            </div>
            <button 
              onClick={() => setShowResult(false)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm transition-all"
            >
              <RefreshCw className="w-4 h-4" /> New Audit
            </button>
          </div>

          <div className="space-y-6">
            {[
              { label: 'Full IP Transfer', desc: 'This clause assigns all intellectual property rights to the client immediately upon creation.', risk: 'high', suggestion: 'Change to "Transfer upon full payment" to ensure you get paid before losing rights.' },
              { label: 'Unlimited Revisions', desc: 'No limit on revision rounds, which can lead to "scope creep" and unpaid labor.', risk: 'high', suggestion: 'Limit to 2 rounds of revisions and define a fee for additional requests.' },
              { label: 'Net-90 Payment Terms', desc: 'The payment window is excessively long, causing potential cash flow issues.', risk: 'medium', suggestion: 'Negotiate for Net-30 or a 50% upfront deposit.' }
            ].map((item, i) => (
              <div key={i} className={`bg-white/3 border ${item.risk === 'high' ? 'border-red-500/30' : 'border-yellow-500/30'} rounded-2xl p-6 transition-all hover:bg-white/5`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.risk === 'high' ? 'bg-red-400 shadow-[0_0_10px_#ef4444]' : 'bg-yellow-400 shadow-[0_0_10px_#f59e0b]'}`} />
                    <h3 className="text-xl font-bold">{item.label}</h3>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded border ${item.risk === 'high' ? 'text-red-400 border-red-500/50 bg-red-500/10' : 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10'}`}>
                    {item.risk.toUpperCase()} RISK
                  </span>
                </div>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">{item.desc}</p>
                <div className="bg-[#0f0f1a] border border-white/5 rounded-xl p-5">
                  <p className="text-[10px] font-bold text-emerald-400 mb-1 uppercase tracking-tighter">Recommended Revision:</p>
                  <p className="text-emerald-400 text-sm italic leading-relaxed">"{item.suggestion}"</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-12 py-5 rounded-2xl text-xl transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:-translate-y-1">
              Download Full PDF Report - $9
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- LANDING PAGE VIEW ---
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden font-sans">
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg tracking-tight tracking-tighter">ContractGuard</span>
          </div>
          <button onClick={() => setShowResult(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-5 py-2 rounded-lg text-sm transition-all">
            Try for free
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-xs font-bold mb-8 uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" /> BYOK · No data stored · Free to start
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] italic">
              Your contract<br />
              <span className="text-emerald-400">has landmines.</span><br />
              <span className="text-white/40 text-4xl md:text-6xl">We find them.</span>
            </h1>
            <p className="text-xl text-white/50 mb-10 leading-relaxed max-w-lg">
              Upload any freelance contract. AI flags dangerous clauses — unlimited revisions, IP grabs, no-pay terminations — and rewrites them in your favor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button 
                onClick={() => setShowResult(true)}
                className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-10 py-5 rounded-2xl text-xl transition-all hover:scale-105"
              >
                Analyze a contract now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-white/30 text-sm font-mono tracking-tighter">PDF · DOCX · TXT</span>
            </div>
          </div>

          {/* Right Side: Mock Preview (Inspired by Hero.tsx) */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-[#12121a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Mock Header */}
              <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <span className="text-[10px] text-white/30 font-mono">freelance_agreement_v2.pdf</span>
                <div className="bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-[9px] text-red-400 font-black tracking-widest uppercase">
                  High Risk
                </div>
              </div>
              {/* Mock Content */}
              <div className="p-4 space-y-3 opacity-80">
                {[
                  { risk: 'HIGH', title: 'Unlimited Revisions', text: 'Client may request unlimited changes...', color: 'text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/20' },
                  { risk: 'HIGH', title: 'Full IP Transfer', text: 'Contractor assigns all IP to client...', color: 'text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/20' },
                  { risk: 'MED', title: 'Net-60 Payment', text: 'Payment due within 60 days of invoice...', color: 'text-yellow-400', bg: 'bg-yellow-500/5', border: 'border-yellow-500/20' },
                ].map((item, i) => (
                  <div key={i} className={`${item.bg} border ${item.border} rounded-lg p-3 flex gap-3 items-start scale-95 origin-left`}>
                    <span className={`text-[8px] font-black ${item.color} border ${item.border} px-1.5 py-0.5 rounded shrink-0`}>{item.risk}</span>
                    <div>
                      <div className="text-[11px] font-bold mb-0.5">{item.title}</div>
                      <div className="text-[10px] text-white/40 leading-tight">{item.text}</div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 flex justify-center">
                  <div className="h-1 w-24 bg-white/5 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Feature Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-1 border border-white/10 bg-white/10 rounded-2xl overflow-hidden">
          {[
            { n: '01', title: 'Paste API Key', desc: 'Use your own Claude API key. Stays in browser, never our servers.' },
            { n: '02', title: 'Drop Contract', desc: 'Upload PDF or Word. Analyzed and discarded immediately.' },
            { n: '03', title: 'Review Risks', desc: 'AI highlights clauses in red/yellow with rewrite suggestions.' },
          ].map((s, i) => (
            <div key={i} className="bg-[#0a0a0f] p-10 hover:bg-white/[0.02] transition-colors">
              <div className="text-emerald-400 font-mono text-xs font-bold mb-4 tracking-widest">{s.n}</div>
              <h3 className="text-xl font-bold mb-3 italic">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed tracking-tight">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-12 text-center text-white/20 text-[10px] uppercase tracking-[0.3em] font-mono">
        &copy; 2026 ContractGuard // AI Predator Detection
      </footer>
    </div>
  );
}
