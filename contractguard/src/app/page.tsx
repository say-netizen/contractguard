'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import AppShell from '@/components/AppShell';

export default function Home() {
  const [started, setStarted] = useState(false);

  if (started) return <AppShell onBack={() => setStarted(false)} />;
  return <LandingPage onStart={() => setStarted(true)} />;
}
