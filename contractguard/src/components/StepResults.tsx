'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp, RefreshCw, Download, Shield } from 'lucide-react';
import { AnalysisResult, RiskItem } from '@/lib/types';

interface Props {
  results: AnalysisResult;
  fileName: string;
  onReset: () => void;
}

const RISK_CONFIG = {
  high: { label: '高リスク', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: AlertTriangle },
  medium: { label: '中リスク', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: AlertTriangle },
  low: { label: '低リスク', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Info },
};

function RiskCard({ item }: { item: RiskItem }) {
  const [open, setOpen] = useState(item.risk === 'high');
  const cfg = RISK_CONFIG[item.risk];
  const Icon = cfg.icon;

  return (
    <div className={`border rounded-xl overflow-hidden ${cfg.border} ${cfg.bg}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-white/3 transition-colors"
      >
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${cfg.color}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
              {cfg.label}
            </span>
            <span className="font-semibold">{item.title}</span>
          </div>
          <p className="text-white/50 text-sm truncate">{item.description}</p>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-white/30 shrink-0 mt-1" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
          {item.excerpt && (
            <div>
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">問題のある条文</p>
              <blockquote className={`text-sm leading-relaxed border-l-2 pl-4 py-1 italic ${cfg.color}/70 border-current`}>
                {item.excerpt}
              </blockquote>
            </div>
          )}
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">問題点</p>
            <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
          </div>
          {item.suggestion && (
            <div>
              <p className="text-xs font-medium text-emerald-400/60 uppercase tracking-wider mb-2">✦ 修正案</p>
              <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-lg p-4">
                <p className="text-sm text-emerald-300/80 leading-relaxed">{item.suggestion}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function StepResults({ results, fileName, onReset }: Props) {
  const high = results.items.filter((i) => i.risk === 'high');
  const medium = results.items.filter((i) => i.risk === 'medium');
  const low = results.items.filter((i) => i.risk === 'low');

  const overallRisk = high.length > 0 ? 'high' : medium.length > 0 ? 'medium' : 'low';
  const overallCfg = RISK_CONFIG[overallRisk];

  const handleDownload = () => {
    const lines = [
      `ContractGuard 分析レポート`,
      `ファイル: ${fileName}`,
      `分析日時: ${new Date().toLocaleString('ja-JP')}`,
      `総合リスク: ${overallCfg.label}`,
      ``,
      `概要: ${results.summary}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      ...results.items.map((item) => [
        `[${RISK_CONFIG[item.risk].label}] ${item.title}`,
        `問題点: ${item.description}`,
        item.excerpt ? `条文: ${item.excerpt}` : '',
        item.suggestion ? `修正案: ${item.suggestion}` : '',
        ``,
      ].filter(Boolean).join('\n')),
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contractguard-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Summary card */}
      <div className={`rounded-2xl border p-6 mb-8 ${overallCfg.border} ${overallCfg.bg}`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${overallCfg.bg}`}>
            <Shield className={`w-6 h-6 ${overallCfg.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold">分析完了</h2>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${overallCfg.bg} ${overallCfg.color}`}>
                総合{overallCfg.label}
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{results.summary}</p>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-red-400"><span className="w-2 h-2 rounded-full bg-red-400" /> 高リスク {high.length}件</span>
              <span className="flex items-center gap-1.5 text-yellow-400"><span className="w-2 h-2 rounded-full bg-yellow-400" /> 中リスク {medium.length}件</span>
              <span className="flex items-center gap-1.5 text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-400" /> 低リスク {low.length}件</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3 mb-8">
        {results.items.length === 0 ? (
          <div className="text-center py-12 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <p className="text-lg font-semibold text-emerald-400">問題は見つかりませんでした</p>
            <p className="text-white/40 text-sm mt-1">この契約書は一般的なリスクを含んでいません</p>
          </div>
        ) : (
          <>
            {high.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-red-400 uppercase tracking-wider mb-3">高リスク項目</h3>
                <div className="space-y-3">{high.map((item, i) => <RiskCard key={i} item={item} />)}</div>
              </div>
            )}
            {medium.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-yellow-400 uppercase tracking-wider mb-3">中リスク項目</h3>
                <div className="space-y-3">{medium.map((item, i) => <RiskCard key={i} item={item} />)}</div>
              </div>
            )}
            {low.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">低リスク項目</h3>
                <div className="space-y-3">{low.map((item, i) => <RiskCard key={i} item={item} />)}</div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 font-medium px-6 py-4 rounded-xl transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          別の契約書を分析
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl transition-all"
        >
          <Download className="w-5 h-5" />
          レポートをダウンロード
        </button>
      </div>

      <p className="text-center text-white/20 text-xs mt-6">
        このレポートは法的アドバイスではありません。重要な契約は弁護士にご相談ください。
      </p>
    </div>
  );
}
