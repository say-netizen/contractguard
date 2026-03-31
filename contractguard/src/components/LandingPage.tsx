'use client';

import { Shield, AlertTriangle, FileText, Zap, CheckCircle, ArrowRight, Lock, Scale, Search, FileCheck } from 'lucide-react';

const STRIPE_CG_LINK = "あなたのStripe決済リンクURL"; // $9のリンク

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
      <header className="border-b border-white/5 px-6 py-4 backdrop-blur-md sticky top-0 z-50 bg-[#0a0a0f]/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg tracking-tight font-sans">ContractGuard</span>
          </div>
          <button
            onClick={handlePayment}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-5 py-2 rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            Get $9 Pass
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm mb-8 animate-pulse">
          <Zap className="w-3.5 h-3.5" />
          AI-Powered Contract Audit for Freelancers
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
          Don't sign your<br />
          <span className="text-emerald-400 text-glow">rights away.</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          Built for the independent economy. Our AI scans your contract for predatory clauses, 
          unbalanced liability, and hidden landmines in seconds.
        </p>

        <div className="flex flex-col gap-6 justify-center items-center">
          <button
            onClick={handlePayment}
            className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-10 py-5 rounded-2xl text-xl transition-all hover:scale-105"
          >
            Start Risk Analysis - $9
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-4 text-white/30 text-sm">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> No Subscription</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Secure & Private</span>
          </div>
        </div>
      </section>

      {/* How it works (Full Detail) */}
      <section className="max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Three steps. Absolute clarity.</h2>
          <p className="text-white/40">From "I'm not sure" to "I'm protected" in 30 seconds.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              step: '01',
              icon: <Lock className="w-8 h-8 text-emerald-400" />,
              title: 'Connect API',
              desc: 'Enter your Anthropic API key. We process everything client-side, meaning your key and contract never touch our servers.',
            },
            {
              step: '02',
              icon: <FileText className="w-8 h-8 text-emerald-400" />,
              title: 'Upload Docs',
              desc: 'Drop your PDF, Word, or plain text. Our AI reads the legal jargon so you don\'t have to.',
            },
            {
              step: '03',
              icon: <Search className="w-8 h-8 text-emerald-400" />,
              title: 'Identify Risks',
              desc: 'Get an instant report highlighting high-risk clauses with specific rewrite suggestions to send to your client.',
            },
          ].map((item) => (
            <div key={item.step} className="relative group">
              <div className="text-8xl font-black text-white/[0.03] absolute -top-10 -left-4 group-hover:text-emerald-500/[0.05] transition-colors">{item.step}</div>
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Detection Section (The "Value" Section) */}
      <section className="bg-white/[0.02] border-y border-white/5 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">What our AI hunts for</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Intellectual Property', desc: 'Checks if you are accidentally handing over all copyrights forever.', icon: <Scale /> },
              { title: 'Unlimited Revisions', desc: 'Identifies vague "satisfaction guaranteed" clauses that kill your profit.', icon: <Zap /> },
              { title: 'Payment Delay Tactics', desc: 'Detects "Pay-when-paid" or missing late fee penalties.', icon: <FileCheck /> },
              { title: 'Non-Compete Traps', desc: 'Flags overly broad restrictions that stop you from working with others.', icon: <AlertTriangle /> },
              { title: 'Indemnification', desc: 'Warns you if you are taking on 100% of the legal risk for the client.', icon: <Shield /> },
              { title: 'Vague Scope', desc: 'Alerts you to "and other duties as assigned" scope creep.', icon: <Search /> },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 transition-all group">
                <div className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Pricing Section (The Paywall) */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tight">PROTECT YOUR WORK.</h2>
          <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto font-light">
            Don't let a single bad clause cost you thousands in legal fees or lost rights. Get a full audit now.
          </p>

          <div className="flex flex-col items-center">
            <div className="text-7xl font-black mb-8">$9<span className="text-xl text-emerald-400"> /per analysis</span></div>
            
            <button
              onClick={handlePayment}
              className="w-full max-w-sm bg-emerald-500 hover:bg-emerald-400 text-black font-black py-6 rounded-2xl text-2xl transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:-translate-y-1"
            >
              Get Full Report Now
            </button>
            
            <ul className="mt-10 grid grid-cols-2 gap-4 text-sm text-white/40 text-left">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Full Risk Score</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Clause Highlighting</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Rewrite Suggestions</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> PDF/Text Export</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-12 text-center text-white/20 text-xs tracking-widest uppercase font-mono">
        &copy; 2026 ContractGuard // AI Legal Intelligence // Not a substitute for legal advice
      </footer>

      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 30px rgba(52, 211, 153, 0.4);
        }
      `}</style>
    </div>
  );
}
