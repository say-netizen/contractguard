"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Extracting text from document...",
  "Identifying clause boundaries...",
  "Analyzing payment terms...",
  "Checking IP & ownership clauses...",
  "Scanning liability provisions...",
  "Assessing termination conditions...",
  "Generating revision suggestions...",
  "Compiling risk report...",
];

interface AnalyzingProps {
  fileName: string;
}

export function Analyzing({ fileName }: AnalyzingProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        {/* Animated scanner */}
        <div
          style={{
            width: 96,
            height: 96,
            margin: "0 auto 32px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid var(--border)",
              borderRadius: 16,
              background: "var(--surface)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
              <rect x="2" y="2" width="36" height="44" rx="4" stroke="var(--accent)" strokeWidth="1.5"/>
              <path d="M9 14H31M9 20H31M9 26H24M9 32H20" stroke="var(--border2)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {/* Scan line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 2,
                background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                animation: "scan 1.8s ease-in-out infinite",
              }}
            />
          </div>
          {/* Orbit ring */}
          <div
            style={{
              position: "absolute",
              inset: -12,
              border: "1px solid var(--border)",
              borderRadius: "50%",
              borderTopColor: "var(--accent)",
              animation: "spin 1.5s linear infinite",
            }}
          />
        </div>

        <h2
          className="font-display"
          style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}
        >
          Analyzing your contract
        </h2>

        <p
          className="font-mono"
          style={{
            fontSize: 12,
            color: "var(--text3)",
            marginBottom: 32,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {fileName}
        </p>

        {/* Step progress */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "20px 24px",
            textAlign: "left",
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "5px 0",
                opacity: i > stepIndex ? 0.25 : 1,
                transition: "opacity 0.3s",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background:
                    i < stepIndex
                      ? "var(--risk-low)"
                      : i === stepIndex
                      ? "var(--accent)"
                      : "var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.3s",
                }}
              >
                {i < stepIndex && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                )}
                {i === stepIndex && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#0a0b0d",
                      animation: "pulse 1s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
              <span
                className="font-mono"
                style={{
                  fontSize: 12,
                  color: i === stepIndex ? "var(--text)" : "var(--text2)",
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 20, fontSize: 13, color: "var(--text3)" }}>
          Usually takes 10–30 seconds
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes scan {
          0% { top: 0; }
          50% { top: calc(100% - 2px); }
          100% { top: 0; }
        }
      `}</style>
    </main>
  );
}
