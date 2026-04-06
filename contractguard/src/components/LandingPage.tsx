'use client';
import { Shield, AlertTriangle, FileText, Zap, CheckCircle, ArrowRight, Lock } from 'lucide-react';

interface Props { onStart: () => void; }

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden font-sans">
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg tracking-tighter">ContractGuard</span>
          </div>
          <button onClick={onStart} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-5 py-2 rounded-lg text-sm transition-all">
            Try for free
          </button>
        </div>
      </header>

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
        <button onClick={onStart} className="group inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black px-10 py-5 rounded-2xl text-2xl transition-all hover:scale-105">
          Analyze a contract now
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-black text-center mb-16 tracking-tight">Three steps. No setup.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n:'01', icon:<Lock className="w-6 h-6"/>, title:'Paste your API key', desc:'Enter your Anthropic Claude API key. You only pay for API usage (~$0.05 per analysis).', note:'Stays in your browser only. Never sent to our servers.' },
            { n:'02', icon:<FileText className="w-6 h-6"/>, title:'Upload your contract', desc:'Drag and drop a PDF or Word file. Your contract is analyzed then immediately discarded.', note:'Never stored. Deleted right after analysis.' },
            { n:'03', icon:<AlertTriangle className="w-6 h-6"/>, title:'Get your risk report', desc:'Dangerous clauses flagged in red, yellow, green. Rewrite suggestions included.', note:'Download as PDF for $9 per report.' },
          ].map((s) => (
            <div key={s.n} className="relative bg-white/3 border border-white/8 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
              <div className="text-6xl font-black text-white/5 absolute top-6 right-8">{s.n}</div>
              <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 mb-5">{s.icon}</div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-white/50 mb-4 leading-relaxed">{s.desc}</p>
              <p className="text-emerald-400/70 text-sm flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />{s.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-xl mx-auto px-6 py-20">
        <div className="bg-white/3 border border-white/10 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to scan?</h2>
          <p className="text-white/50 mb-8">Get a full risk report with actionable revision suggestions for just $9 per analysis.</p>
          <button onClick={onStart} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            Get Started
          </button>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="bg-white/3 border border-white/8 rounded-2xl p-8 text-white/40 text-sm leading-relaxed space-y-4">
          <h3 className="text-white/60 font-semibold text-base">Disclaimer & Privacy</h3>
          <p><strong className="text-white/50">Not Legal Advice.</strong> ContractGuard is an AI-powered tool designed to help you identify potentially risky clauses in contracts. The analysis provided is for informational purposes only and does not constitute legal advice. Always consult a qualified attorney before signing any contract.</p>
          <p><strong className="text-white/50">How your data is handled.</strong> Your contract is sent directly from your browser to Anthropic&apos;s Claude API for analysis. ContractGuard does not store, log, or retain any contract content on its own servers. Your Anthropic API key is stored only in your browser&apos;s local storage and is never transmitted to ContractGuard&apos;s servers.</p>
          <p><strong className="text-white/50">Third-party transmission.</strong> By using this service, you acknowledge that your contract content will be transmitted to Anthropic&apos;s API. Please review Anthropic&apos;s privacy policy at anthropic.com/privacy before uploading sensitive documents.</p>
          <p><strong className="text-white/50">Limitation of Liability.</strong> ContractGuard and its operators shall not be liable for any damages arising from reliance on AI-generated analysis. Use at your own discretion.</p>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-12 text-center text-white/20 text-[10px] uppercase tracking-widest font-mono">
  <p>&copy; 2026 ContractGuard // AI Contract Risk Detection // Not Legal Advice</p>
  <div className="flex items-center justify-center gap-6 mt-4">
    <a href="/terms" className="hover:text-white/40 transition-colors">Terms of Service</a>
    <a href="/privacy" className="hover:text-white/40 transition-colors">Privacy Policy</a>
    <a href="mailto:aeoseiya@gmail.com" className="hover:text-white/40 transition-colors">Contact</a>
  </div>
</footer>
    </div>
  );
}
