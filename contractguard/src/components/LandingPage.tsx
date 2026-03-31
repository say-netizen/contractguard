'use client';

import { Shield, AlertTriangle, FileText, Zap, CheckCircle, ArrowRight, Lock } from 'lucide-react';

// ここで型を定義
interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden font-sans">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg tracking-tighter">ContractGuard</span>
          </div>
          <button
            onClick={onStart}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-5 py-2 rounded-lg text-sm transition-all"
          >
            Try for free
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm mb-8 italic">
          <Zap className="w-3.5 h-3.5" />
          AI instantly identifies dangerous clauses
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none italic">
          Your contract<br />
          <span className="text-emerald-400">has landmines.</span><br />
          We find them.
        </h1>

        <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Built for freelancers and independent contractors. Upload any contract —
          AI flags dangerous clauses and generates revision suggestions instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStart}
            className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-10 py-5 rounded-2xl text-2xl transition-all hover:scale-105"
          >
            Analyze a contract now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Pricing / CTA Section */}
      <section className="max-w-xl mx-auto px-6 py-20">
        <div className="bg-white/3 border border-white/10 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to scan?</h2>
          <p className="text-white/50 mb-8">Get a full risk report with actionable revision suggestions for just $9 per analysis.</p>
          <button
            onClick={onStart}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            Get Started
          </button>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-12 text-center text-white/20 text-[10px] uppercase tracking-widest font-mono">
        &copy; 2026 ContractGuard // AI Predator Detection
      </footer>
    </div>
  );
}
