import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ContractGuard — AI契約書リスク分析',
  description: '契約書をアップロードするだけでAIが危険な条項を特定・修正案を生成。フリーランサー・個人開発者向け。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
