import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ContractGuard — AI Contract Risk Analyzer',
  description: 'Upload any contract. AI identifies dangerous clauses, assigns risk levels, and generates revision suggestions instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="UnrUm_vb50Qz0N4ne5zpDEzY35hGdNZFQP_76NbTlJc" />
      </head>
      <body>{children}</body>
    </html>
  );
}
