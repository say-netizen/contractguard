# ContractGuard

AI-powered contract risk analyzer for freelancers and independent contractors.

## Overview

Upload a PDF, DOCX, or TXT contract → AI identifies dangerous clauses → Risk levels + revision suggestions.

**BYOK model**: Users bring their own Claude API key. No contracts stored on servers.

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS
- Claude API (via Anthropic) — user-supplied key
- pdfjs-dist (PDF extraction, client-side)
- mammoth (Word extraction, client-side)

## Getting Started (Local)

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B — GitHub + Vercel Dashboard

1. Push this repo to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/contractguard.git
   git push -u origin master
   ```
2. Go to https://vercel.com/new
3. Import the GitHub repo → Click **Deploy**

> No environment variables needed for MVP.  
> The Claude API key is entered by the user in the browser and never touches the server.

## Architecture

- **Client-side only** — contracts never touch ContractGuard servers
- API calls: browser → Anthropic's API directly
- No database required for MVP

## File Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main app (upload → analyze → results)
│   └── globals.css      # Design system
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx         # Landing page
│   ├── ApiKeyInput.tsx  # BYOK key input
│   ├── UploadZone.tsx   # Drag-and-drop file upload
│   ├── Analyzing.tsx    # Loading state
│   └── AnalysisView.tsx # Results + risk cards
└── lib/
    ├── types.ts         # TypeScript interfaces
    ├── extract.ts       # PDF/Word text extraction
    └── analyze.ts       # Claude API integration
```

## Roadmap

- [x] MVP: Upload → Analyze → Results
- [x] Deploy-ready (Vercel)
- [ ] Stripe subscription ($20/month)
- [ ] Firebase auth + subscription gating
- [ ] PDF report download (formatted)

## Security & Privacy

- Contract text is sent directly to Anthropic's Claude API (not through ContractGuard servers)
- API keys held in React state only — never written to localStorage
- No server-side storage of any contract data
- Disclaimer shown in UI before every upload
