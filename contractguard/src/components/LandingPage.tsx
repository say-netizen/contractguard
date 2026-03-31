'use client';

import { Shield, AlertTriangle, FileText, Zap, CheckCircle, ArrowRight, Lock } from 'lucide-react';

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
          <button
            onClick={onStart}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-all"
          >
            Try for free
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
          Built for freelancers and independent contractors. Upload any contract —
          AI flags dangerous clauses and generates revision suggestions instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStart}
            className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all"
          >
            Analyze a contract now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-white/30 text-sm">Use your own Claude API key · Nothing stored on our servers</p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold text-center mb-4">Three steps. No setup.</h2>
        <p className="text-white/40 text-center mb-16">Upload your contract and get a risk report in under 30 seconds.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              icon: <Lock className="w-6 h-6" />,
              title: 'Paste your API key',
              desc: 'Enter your Anthropic Claude API key. You only pay for API usage (~$0.05 per analysis).',
              detail: 'Your key stays in the browser. Never sent to our servers.',
            },
            {
              step: '02',
              icon: <FileText className="w-6 h-6" />,
              title: 'Upload your contract',
              desc: 'Drag and drop a PDF or Word file. Plain text works too.',
              detail: 'Your file is discarded immediately after analysis.',
            },
            {
              step: '03',
              icon: <AlertTriangle className="w-6 h-6" />,
              title: 'Review the risks',
              desc: 'Dangerous clauses are highlighted in red, yellow, and green. Rewrite suggestions included.',
              detail: 'Download the full report as a text file.',
            },
          ].map((item) => (
            <div key={item.step} className="relative bg-white/3 border border-white/8 rounded-2xl p-8 hover:border-emerald-500/30 transition-all">
              <div className="text-6xl font-black text-white/5 absolute top-6 right-8">{item.step}</div>
              <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 mb-5">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-white/50 mb-4 leading-relaxed">{item.desc}</p>
              <p className="text-emerald-400/70 text-sm flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What AI detects */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold text-center mb-4">What we detect</h2>
        <p className="text-white/40 text-center mb-16">The clauses freelancers miss most — automatically flagged.</p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'IP Ownership Transfer', desc: 'Clauses that transfer full copyright of your work to the client', risk: 'high' },
            { label: 'Unlimited Revisions', desc: 'No cap on the number or scope of revision requests', risk: 'high' },
            { label: 'Payment Terms', desc: 'Vague payment timing or no late payment penalties', risk: 'high' },
            { label: 'Termination Rights', desc: 'Client can end the contract unilaterally without paying you', risk: 'medium' },
            { label: 'Non-Compete Clause', desc: 'Restrictions on working with similar clients in the future', risk: 'medium' },
            { label: 'Unlimited Liability', desc: 'No cap on damages you could be required to pay', risk: 'medium' },
            { label: 'NDA Duration', desc: 'Confidentiality period is unclear or excessively long', risk: 'low' },
            { label: 'Governing Law & Jurisdiction', desc: 'Disputes must be handled in a distant or unfavorable court', risk: 'low' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 bg-white/3 border border-white/8 rounded-xl p-5">
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                item.risk === 'high' ? 'bg-red-400' :
                item.risk === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
              }`} />
              <div>
                <div className="font-semibold mb-1">{item.label}</div>
                <div className="text-white/40 text-sm">{item.desc}</div>
              </div>
              <div className={`ml-auto text-xs font-medium px-2 py-1 rounded-full shrink-0 ${
                item.risk === 'high' ? 'bg-red-500/10 text-red-400' :
                item.risk === 'medium' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-blue-500/10 text-blue-400'
              }`}>
                {item.risk === 'high' ? 'HIGH' : item.risk === 'medium' ? 'MEDIUM' : 'LOW'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold text-center mb-4">Pricing</h2>
        <p className="text-white/40 text-center mb-16">One simple plan.</p>

        <div className="max-w-md mx-auto bg-white/3 border border-emerald-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl font-black mb-2">$20<span className="text-xl font-normal text-white/40">/mo</span></div>
          <p className="text-white/40 mb-8">+ API usage (~$0.05 per analysis)</p>
          <ul className="text-left space-y-3 mb-8">
            {[
              'Unlimited contract analyses',
              'HIGH / MEDIUM / LOW risk scoring',
              'AI-generated revision suggestions',
              'Download report as text file',
              'Your data never stored on our servers',
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/70">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={onStart}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all"
          >
            Get started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 text-center text-white/20 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-white/40 font-semibold">ContractGuard</span>
        </div>
        Contract contents are sent to the Claude API for analysis. For important legal matters, always consult a qualified attorney.
      </footer>
    </div>
  );
}
