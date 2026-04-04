'use client';
import { useState, useEffect } from 'react';
import LandingPage from '@/components/LandingPage';
import AppShell from '@/components/AppShell';

export default function Home() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === 'true') {
      setStarted(true);
    }
  }, []);

  if (started) return <AppShell onBack={() => setStarted(false)} />;
  return <LandingPage onStart={() => setStarted(true)} />;
}
