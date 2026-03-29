"use client";

import { useState, useCallback } from "react";
import { UploadZone } from "@/components/UploadZone";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { AnalysisView } from "@/components/AnalysisView";
import { Analyzing } from "@/components/Analyzing";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { extractTextFromFile } from "@/lib/extract";
import { analyzeContract } from "@/lib/analyze";
import type { AnalysisResult } from "@/lib/types";

type Step = "landing" | "upload" | "analyzing" | "results";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [apiKey, setApiKey] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const handleGetStarted = () => setStep("upload");

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!apiKey.trim()) {
        setApiKeyError("Please enter your Claude API key first.");
        return;
      }
      setApiKeyError("");
      setError("");
      setFileName(file.name);
      setStep("analyzing");

      try {
        const text = await extractTextFromFile(file);
        if (text.trim().length < 100) {
          throw new Error(
            "Could not extract enough text from this file. Make sure the PDF is not scanned/image-only."
          );
        }
        const analysis = await analyzeContract(text, apiKey);
        setResult(analysis);
        setStep("results");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Analysis failed. Please try again.");
        setStep("upload");
      }
    },
    [apiKey]
  );

  const handleReset = () => {
    setStep("upload");
    setResult(null);
    setError("");
    setFileName("");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header onLogoClick={() => setStep("landing")} />

      {step === "landing" && <Hero onGetStarted={handleGetStarted} />}

      {step === "upload" && (
        <main
          className="animate-fade-up"
          style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px" }}
        >
          <div style={{ marginBottom: 40 }}>
            <p
              className="font-display"
              style={{ color: "var(--accent)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}
            >
              Step 1 of 2
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}
            >
              Set your API key
            </h2>
            <p style={{ color: "var(--text2)", fontSize: 15 }}>
              Your key is used client-side only and never stored on our servers.
            </p>
          </div>

          <ApiKeyInput
            value={apiKey}
            onChange={setApiKey}
            error={apiKeyError}
          />

          <div style={{ marginTop: 48, marginBottom: 24 }}>
            <p
              className="font-display"
              style={{ color: "var(--accent)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}
            >
              Step 2 of 2
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}
            >
              Upload your contract
            </h2>
            <p style={{ color: "var(--text2)", fontSize: 15 }}>
              Supports PDF, Word (.docx), and plain text files.
            </p>
          </div>

          <UploadZone onFileSelect={handleFileUpload} />

          {error && (
            <div
              style={{
                marginTop: 16,
                padding: "12px 16px",
                background: "var(--risk-high-bg)",
                border: "1px solid var(--risk-high-border)",
                borderRadius: 8,
                color: "var(--risk-high)",
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          {/* Disclaimer */}
          <div
            style={{
              marginTop: 32,
              padding: "16px 20px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
            }}
          >
            <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }}>
              <span style={{ color: "var(--text2)", fontWeight: 600 }}>⚠ Disclaimer:</span>{" "}
              The content of your uploaded contract will be sent to Anthropic&apos;s Claude API
              for analysis. ContractGuard does not store your contract on our servers.
              This tool provides AI-generated insights and is not a substitute for
              professional legal advice. Always consult a qualified attorney for
              important legal decisions.
            </p>
          </div>
        </main>
      )}

      {step === "analyzing" && <Analyzing fileName={fileName} />}

      {step === "results" && result && (
        <AnalysisView result={result} fileName={fileName} onReset={handleReset} />
      )}
    </div>
  );
}
