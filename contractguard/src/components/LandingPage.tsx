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
            無料で試す
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-sm mb-8">
          <Zap className="w-3.5 h-3.5" />
          AIが契約書の危険な条項を即座に特定
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
          契約書に<br />
          <span className="text-emerald-400">サインする前に</span><br />
          読ませてください。
        </h1>

        <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          フリーランサー・個人開発者向け。契約書をアップロードするだけで、
          AIが危険な条項を発見し、修正案を自動生成します。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStart}
            className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-all"
          >
            今すぐ契約書を分析する
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-white/30 text-sm">自分のClaude APIキーを使用 · サーバーに保存なし</p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold text-center mb-4">使い方は3ステップ</h2>
        <p className="text-white/40 text-center mb-16">難しい設定は不要。すぐに使えます。</p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              icon: <Lock className="w-6 h-6" />,
              title: 'Claude APIキーを入力',
              desc: 'Anthropicで無料取得できるAPIキーを入力。課金はAPIの使用量のみ（1回の分析 ≈ $0.05）',
              detail: 'キーはブラウザにのみ保存。サーバーには送信しません。',
            },
            {
              step: '02',
              icon: <FileText className="w-6 h-6" />,
              title: '契約書をアップロード',
              desc: 'PDF・Wordファイルをドラッグ&ドロップ。または「ファイルを選択」でも可。',
              detail: 'ファイルは分析後に即削除。サーバーに保存されません。',
            },
            {
              step: '03',
              icon: <AlertTriangle className="w-6 h-6" />,
              title: '分析結果を確認',
              desc: '危険な条項が赤・黄・緑でハイライト。各条項の修正案も自動生成。',
              detail: 'レポートはPDFでダウンロード可能。',
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
        <h2 className="text-3xl font-bold text-center mb-4">AIが検出するリスク</h2>
        <p className="text-white/40 text-center mb-16">フリーランサーがよく見落とす危険な条項を自動でチェック</p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: '知的財産権の譲渡', desc: '成果物の著作権がクライアントに移転する条項', risk: 'high' },
            { label: '無制限の修正要求', desc: '修正回数・範囲の制限がない条項', risk: 'high' },
            { label: '支払い条件', desc: '支払いタイミングが不明確・遅延ペナルティがない', risk: 'high' },
            { label: '契約解除条件', desc: '一方的に契約を終了できる条項', risk: 'medium' },
            { label: '競業避止義務', desc: '同業他社との取引を制限する条項', risk: 'medium' },
            { label: '損害賠償の上限なし', desc: '賠償額に上限が設定されていない', risk: 'medium' },
            { label: '秘密保持期間', desc: '期間が不明確または過度に長い', risk: 'low' },
            { label: '準拠法・管轄', desc: '遠隔地の法律・裁判所が指定されている', risk: 'low' },
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
                {item.risk === 'high' ? '高リスク' : item.risk === 'medium' ? '中リスク' : '低リスク'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-bold text-center mb-4">料金</h2>
        <p className="text-white/40 text-center mb-16">シンプルな月額プラン</p>

        <div className="max-w-md mx-auto bg-white/3 border border-emerald-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl font-black mb-2">$20<span className="text-xl font-normal text-white/40">/月</span></div>
          <p className="text-white/40 mb-8">+ APIの実費（1回 ≈ $0.05）</p>
          <ul className="text-left space-y-3 mb-8">
            {[
              '無制限の契約書分析',
              'リスクレベル色分け表示',
              '修正案の自動生成',
              'PDFレポートダウンロード',
              'データはサーバーに保存なし',
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
            今すぐ始める
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 text-center text-white/20 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-white/40 font-semibold">ContractGuard</span>
        </div>
        契約書の内容はClaude APIに送信されます。重要な契約は必ず弁護士にもご相談ください。
      </footer>
    </div>
  );
}
