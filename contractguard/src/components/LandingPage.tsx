'use client';

import { Shield, AlertTriangle, FileText, Zap, CheckCircle, ArrowRight, Lock } from 'lucide-react';

// --- 1. ここにStripeの $9 決済リンクを貼る ---
const STRIPE_CG_LINK = "あなたのStripe決済リンクURL"; 

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg tracking-tight">ContractGuard</span>
          </div>
          {/* Headerのボタンも決済へ飛ばす */}
          <button
            onClick={() => window.location.href = STRIPE_CG_LINK}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-all"
          >
            Get Started - $9
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm mb-8">
          <Zap className="w-3.5 h-3.5" />
          AI instantly identifies dangerous clauses in your contract
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
          Your contract<br />
          <span className="text-emerald-400">has landmines.</span><br />
          We find them.
        </h1>

        <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Built for freelancers. Upload any contract —
          AI flags dangerous clauses and generates revision suggestions instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* メインの決済ボタン */}
          <button
            onClick={() => window.location.href = STRIPE_CG_LINK}
            className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all"
          >
            Analyze a contract now - $9
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-white/30 text-sm">One-time payment · Use your own Claude key</p>
        </div>
      </section>

      {/* How it works, What AI detects はそのまま表示して価値を伝える */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5 opacity-80">
        <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
           {/* ...省略（既存の01-03のステップを表示）... */}
        </div>
      </section>

      {/* Pricing / Final CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="max-w-md mx-auto bg-white/3 border border-emerald-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl font-black mb-2">$9<span className="text-xl font-normal text-white/40">/pass</span></div>
          <p className="text-white/40 mb-8">Full Analysis + Revision Suggestions</p>
          <button
            onClick={() => window.location.href = STRIPE_CG_LINK}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all"
          >
            Get Access Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 text-center text-white/20 text-sm">
        ContractGuard is an AI tool, not a law firm. Always consult an attorney for final legal decisions.
      </footer>
    </div>
  );
}
