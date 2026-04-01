'use client';
import { useState } from 'react';

// 「@/」を使うことで、src/components フォルダを直接参照するように統一します
import Header from '@/components/Header';
import Analyzing from '@/components/Analyzing';
import AnalysisView from '@/components/AnalysisView';
// ファイル名が LandingPage.tsx の場合はこちら
import LandingPage from '@/components/LandingPage'; 
// もしファイル名が Hero.tsx なら、上の行を消してこちらを活かしてください
// import LandingPage from '@/components/Hero'; 

export default function Home() {
  const [step, setStep] = useState<'landing' | 'upload' | 'analyzing' | 'results'>('landing');

  const handleStart = () => {
    setStep('upload');
  };

  return (
    <main>
      {/* 共通のヘッダーを表示したい場合はここに入れる */}
      <Header />

      {step === 'landing' && (
        <LandingPage onStart={handleStart} />
      )}

      {step === 'upload' && (
        <div className="min-h-screen bg-[#0a0a0f] text-white p-12 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4 italic text-emerald-400 text-center">
            Upload your contract to begin analysis.
          </h2>
          <div className="border-2 border-dashed border-white/10 p-20 rounded-3xl bg-white/5">
             <button 
               onClick={() => setStep('analyzing')}
               className="bg-emerald-500 text-black px-8 py-3 rounded-xl font-bold"
             >
               (Simulate Upload)
             </button>
          </div>
        </div>
      )}

      {step === 'analyzing' && (
        <Analyzing />
      )}

      {step === 'results' && (
        <AnalysisView />
      )}
    </main>
  );
}
