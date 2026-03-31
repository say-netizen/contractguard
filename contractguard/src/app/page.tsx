'use client';

import { useState } from 'react';
// 実際のファイル名「LandingPage (1)」に合わせてインポートします
import LandingPage from './components/LandingPage';
// もし Analyzing.tsx や AnalysisView.tsx を使うならここに追加
// import { Analyzing } from './components/Analyzing';
// import { AnalysisView } from './components/AnalysisView';

export default function Home() {
  const [step, setStep] = useState<'landing' | 'upload' | 'analyzing' | 'results'>('landing');

  // ボタンが押された時の処理
  const handleStart = () => {
    setStep('upload'); // 次のステップ（アップロード等）へ
  };

  return (
    <main>
      {step === 'landing' && (
        <LandingPage onStart={handleStart} />
      )}

      {step === 'upload' && (
        <div className="min-h-screen bg-[#0a0a0f] text-white p-12 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4 italic text-emerald-400 text-center">
            Upload your contract to begin analysis.
          </h2>
          <div className="border-2 border-dashed border-white/10 p-20 rounded-3xl bg-white/5">
             {/* ここに UploadZone を置くか、簡易ボタンで進める */}
             <button 
               onClick={() => setStep('analyzing')}
               className="bg-emerald-500 text-black px-8 py-3 rounded-xl font-bold"
             >
               (Simulate Upload)
             </button>
          </div>
          <button onClick={() => setStep('landing')} className="mt-8 text-white/20 text-xs">← Back</button>
        </div>
      )}

      {step === 'analyzing' && (
        <div className="min-h-screen bg-[#0a0a0f] text-white p-12 flex flex-col items-center justify-center text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 mb-8"></div>
          <h2 className="text-2xl font-bold italic text-emerald-400">Scanning for Landmines...</h2>
          {/* テスト用ボタン */}
          <button onClick={() => setStep('landing')} className="mt-8 text-white/20 text-xs">Reset</button>
        </div>
      )}
    </main>
  );
}
