"use client";

import { useState, useCallback } from "react";
// components フォルダの場所を正確に指定してください
import { Hero } from "./components/LandingPage"; 
import { UploadZone } from "./components/UploadZone";
import { ApiKeyInput } from "./components/ApiKeyInput";
import { AnalysisView } from "./components/AnalysisView";
import { Analyzing } from "./components/Analyzing";
import { Header } from "./components/Header";

// ...以下、元のロジック（stepの管理など）は変更なし...

export default function Home() {
  const [step, setStep] = useState("landing");
  // ...省略...

  return (
    <div>
      {/* 共通ヘッダー */}
      <Header onLogoClick={() => setStep("landing")} />

      {step === "landing" && (
        <Hero onGetStarted={() => setStep("upload")} />
      )}

      {/* ...その他のstepの条件分岐... */}
    </div>
  );
}
