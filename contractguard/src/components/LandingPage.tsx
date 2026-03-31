'use client';

import { Shield, AlertTriangle, FileText, Zap, CheckCircle, ArrowRight, Lock } from 'lucide-react';

const STRIPE_CG_LINK = "https://buy.stripe.com/4gMcN62Gug3ycFK6jP9R603"; 

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  const handlePayment = () => {
    window.location.href = STRIPE_CG_LINK;
  };

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
            onClick={handlePayment}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-all"
          >
            Get Access - $9
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
          <button
            onClick={handlePayment}
            className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all"
          >
            Analyze a contract now - $9
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-white/30 text-sm">One-time payment · Use your own Claude key</p>
        </div>
      </section>

      {/* How it works: ここは絶対に見せるべき信頼のセクション */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold text-center mb-4">Three steps. No setup.</h2>
        <p className="text-white/40 text-center mb-16">Get your risk report in under 30 seconds.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white/3 border border-white/8 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
            <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Paste API key</h3>
            <p className="text-white/50 mb-4">Your key stays in the browser. We never see it.</p>
          </div>
          {/* Step 2 */}
          <div className="bg-white/3 border border-white/8 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
            <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 mb-5">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Upload PDF/Word</h3>
            <p className="text-white/50 mb-4">AI reads every line to find hidden risks.</p>
          </div>
          {/* Step 3 */}
          <div className="bg-white/3 border border-white/8 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
            <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 mb-5">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Fix Landmines</h3>
            <p className="text-white/50 mb-4">Get specific text to send back to the client.</p>
          </div>
        </div>
      </section>

      {/* What we detect: ここも見せて「必要性」を確信させる */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold text-center mb-16">What we detect</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
           {/* IP Ownership, Payment Terms など以前のリストをここに復活させる */}
           <div className="bg-white/3 border border-white/8 rounded-xl p-5">
             <div className="font-semibold text-red-400">IP Ownership</div>
             <div className="text-white/40 text-sm">Full copyright transfer checks</div>
           </div>
           <div className="bg-white/3 border border-white/8 rounded-xl p-5">
             <div className="font-semibold text-yellow-400">Liability Caps</div>
             <div className="text-white/40 text-sm">Unlimited damage risk detection</div>
           </div>
           <div className="bg-white/3 border border-white/8 rounded-xl p-5">
             <div className="font-semibold text-blue-400">Payment Terms</div>
             <div className="text-white/40 text-sm">Net-30/60 and late fee checks</div>
           </div>
        </div>
      </section>

      {/* Final CTA: 最後に念押し */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center border-t border-white/5">
        <h2 className="text-4xl font-bold mb-8">Ready to sign with confidence?</h2>
        <button
          onClick={handlePayment}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-12 py-5 rounded-xl text-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          Get My $9 Pass Now
        </button>
      </section>
    </div>
  );
}
