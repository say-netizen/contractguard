'use client';

import { Shield, AlertTriangle, FileText, Zap, CheckCircle, ArrowRight, Lock } from 'lucide-react';

// 1. Propsの型定義を追加
interface LandingPageProps {
  onStart: () => void;
}

// 2. 引数で onStart を受け取るように修正
export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* ...中略... */}
      
      {/* 3. 以前「setShowResult(true)」などにしていたボタンの onClick を onStart に変更 */}
      <button
        onClick={onStart} // page.tsx から渡された関数を実行
        className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-all"
      >
        Try for free
      </button>

      {/* Heroセクションのメインボタンも同様 */}
      <button
        onClick={onStart}
        className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all"
      >
        Analyze a contract now
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* ...以下略... */}
    </div>
  );
}
