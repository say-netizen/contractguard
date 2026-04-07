import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ContractGuard — AI Contract Risk Analyzer',
  description: 'Upload any contract. AI identifies dangerous clauses, assigns risk levels, and generates revision suggestions instantly.',
  verification: {
    google: '7b69bbd8b09c39ee',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
