'use client';

import { useState } from 'react';
import LandingPage from './components/LandingPage';
// 他のコンポーネント（AppShellなど）がある場合はここに追加

export default function Home() {
  const [started, setStarted] = useState(false);

  // もし started が true なら、解析用画面（AppShell等）を表示
  if (started) {
    // ここで AppShell や、アップロード画面を表示
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white p-12">
        <button onClick={() => setStarted(false)} className="text-emerald-400 mb-8">← Back</button>
        <h1 className="text-2xl font-bold">Upload your contract to begin analysis.</h1>
        {/* ここに UploadZone や ApiKeyInput を配置 */}
      </div>
    );
  }

  // 最初は LandingPage を表示
  return <LandingPage onStart={() => setStarted(true)} />;
}
