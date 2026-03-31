'use client';

import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { analyzeContract } from '@/lib/analyze';
import { AnalysisResult } from '@/lib/types';
import { extractTextFromFile } from '@/lib/extract';

interface Props {
  file: File;
  apiKey: string;
  onComplete: (result: AnalysisResult) => void;
  onError: () => void;
}

const STEPS = [
  'Reading file...',
  'Extracting text...',
  'AI is parsing clauses...',
  'Assessing risk levels...',
  'Generating revision suggestions...',
  'Building report...',
];

export default function StepAnalyzing({ file, apiKey, onComplete, onError }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const interval = setInterval(() => {
          setStepIndex((i) => Math.min(i + 1, STEPS.length - 2));
        }, 2000);

        const text = await extractTextFromFile(file);
        const result = await analyzeContract(text, apiKey);

        clearInterval(interval);
        if (!cancelled) {
          setStepIndex(STEPS.length - 1);
          setTimeout(() => onComplete(result), 500);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : 'An error occurred during analysis.';
          setErrorMsg(msg);
        }
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  if (errorMsg) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="bg-red-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Shield className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
        <p className="text-white/50 mb-2 leading-relaxed">{errorMsg}</p>
        <p className="text-white/30 text-sm mb-8">Please check your API key and try again.</p>
        <button
          onClick={onError}
          className="bg-white/8 hover:bg-white/12 border border-white/15 font-medium px-8 py-3 rounded-xl transition-all"
        >
          Go back and retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto text-center py-20">
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-white/5" />
        <div className="absolute inset-0 rounded-full border-2 border-t-emerald-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-3">Analyzing your contract</h2>
      <p className="text-emerald-400 mb-12 h-6 transition-all">{STEPS[stepIndex]}</p>

      <div className="space-y-3 text-left">
        {STEPS.slice(0, -1).map((s, i) => (
          <div key={s} className={`flex items-center gap-3 text-sm transition-all ${
            i < stepIndex ? 'text-white/40' : i === stepIndex ? 'text-white' : 'text-white/15'
          }`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 transition-all ${
              i < stepIndex ? 'bg-emerald-500/20 text-emerald-400' :
              i === stepIndex ? 'bg-emerald-500 text-black font-bold animate-pulse' :
              'bg-white/5'
            }`}>
              {i < stepIndex ? '✓' : i + 1}
            </div>
            {s}
          </div>
        ))}
      </div>

      <p className="text-white/20 text-xs mt-12">
        This usually takes 10–30 seconds depending on contract length.
      </p>
    </div>
  );
}
