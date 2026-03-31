'use client';

import { useState } from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import StepApiKey from './StepApiKey';
import StepUpload from './StepUpload';
import StepAnalyzing from './StepAnalyzing';
import StepResults from './StepResults';
import { AnalysisResult } from '@/lib/types';

type Step = 'apikey' | 'upload' | 'analyzing' | 'results';

interface Props {
  onBack: () => void;
}

export default function AppShell({ onBack }: Props) {
  const [step, setStep] = useState<Step>('apikey');
  const [apiKey, setApiKey] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const steps = ['apikey', 'upload', 'analyzing', 'results'];
  const stepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white/30 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="font-bold tracking-tight">ContractGuard</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {['API Key', 'Upload', 'Analyzing', 'Results'].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs font-medium ${
                  i === stepIndex ? 'text-emerald-400' :
                  i < stepIndex ? 'text-white/30' : 'text-white/15'
                }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    i < stepIndex ? 'bg-emerald-500/20 text-emerald-400' :
                    i === stepIndex ? 'bg-emerald-500 text-black font-bold' :
                    'bg-white/5 text-white/20'
                  }`}>
                    {i < stepIndex ? '✓' : i + 1}
                  </div>
                  <span className="hidden sm:block">{label}</span>
                </div>
                {i < 3 && <div className={`w-8 h-px ${i < stepIndex ? 'bg-emerald-500/40' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {step === 'apikey' && (
          <StepApiKey apiKey={apiKey} onApiKeyChange={setApiKey} onNext={() => setStep('upload')} />
        )}
        {step === 'upload' && (
          <StepUpload file={file} onFileChange={setFile} onNext={() => setStep('analyzing')} onBack={() => setStep('apikey')} />
        )}
        {step === 'analyzing' && file && (
          <StepAnalyzing file={file} apiKey={apiKey}
            onComplete={(result) => { setResults(result); setStep('results'); }}
            onError={() => setStep('upload')}
          />
        )}
        {step === 'results' && results && (
          <StepResults results={results} fileName={file?.name || ''}
            onReset={() => { setFile(null); setResults(null); setStep('upload'); }}
          />
        )}
      </main>
    </div>
  );
}
