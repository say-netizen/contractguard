'use client';

import { useState } from 'react';
import { Key, ExternalLink, Eye, EyeOff, ChevronRight, Shield, AlertCircle } from 'lucide-react';

interface Props {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onNext: () => void;
}

export default function StepApiKey({ apiKey, onApiKeyChange, onNext }: Props) {
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!apiKey.trim()) {
      setError('APIキーを入力してください');
      return;
    }
    if (!apiKey.startsWith('sk-ant-')) {
      setError('Claude APIキーは "sk-ant-" で始まります。正しいキーを入力してください。');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Key className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Claude APIキーを入力</h1>
        <p className="text-white/50 leading-relaxed">
          ContractGuardはあなた自身のAPIキーを使用します。<br />
          キーはブラウザにのみ保存され、サーバーには送信されません。
        </p>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-white/60 mb-2">APIキー</label>
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => { onApiKeyChange(e.target.value); setError(''); }}
            placeholder="sk-ant-api03-..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pr-12 font-mono text-sm placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {error && (
          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}
      </div>

      {/* Security notice */}
      <div className="flex items-start gap-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4 mb-8">
        <Shield className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
        <p className="text-emerald-400/80 text-sm leading-relaxed">
          キーはlocalStorageに保存され、このブラウザからのみアクセスできます。
          AnalyticsやサーバーログにAPIキーが記録されることはありません。
        </p>
      </div>

      {/* How to get */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-6 mb-8">
        <h3 className="font-semibold mb-4 text-white/80">APIキーの取得方法</h3>
        <ol className="space-y-3">
          {[
            { step: '1', text: 'console.anthropic.com にアクセス' },
            { step: '2', text: '「API Keys」メニューを開く' },
            { step: '3', text: '「Create Key」をクリック' },
            { step: '4', text: '表示されたキーをコピーして上に貼り付け' },
          ].map((item) => (
            <li key={item.step} className="flex items-start gap-3 text-sm text-white/50">
              <span className="bg-white/10 text-white/60 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">
                {item.step}
              </span>
              {item.text}
            </li>
          ))}
        </ol>
        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Anthropicコンソールを開く
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <button
        onClick={handleNext}
        className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all group"
      >
        次へ：契約書をアップロード
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <p className="text-center text-white/20 text-xs mt-4">
        1回の分析コスト: 約$0.03〜$0.10（契約書の長さによる）
      </p>
    </div>
  );
}
