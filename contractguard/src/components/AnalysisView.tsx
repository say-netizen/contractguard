"use client";

import { useState } from "react";
import type { AnalysisResult, RiskClause, RiskLevel } from "@/lib/types";

interface AnalysisViewProps {
  result: AnalysisResult;
  fileName: string;
  onReset: () => void;
}

const RISK_CONFIG = {
  HIGH: {
    color: "var(--risk-high)",
    bg: "var(--risk-high-bg)",
    border: "var(--risk-high-border)",
    label: "HIGH RISK",
    dot: "#e85555",
  },
  MEDIUM: {
    color: "var(--risk-med)",
    bg: "var(--risk-med-bg)",
    border: "var(--risk-med-border)",
    label: "MEDIUM",
    dot: "#e8a255",
  },
  LOW: {
    color: "var(--risk-low)",
    bg: "var(--risk-low-bg)",
    border: "var(--risk-low-border)",
    label: "LOW",
    dot: "#55b87a",
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  PAYMENT: "Payment",
  INTELLECTUAL_PROPERTY: "Intellectual Property",
  LIABILITY: "Liability",
  TERMINATION: "Termination",
  SCOPE_CREEP: "Scope Creep",
  CONFIDENTIALITY: "Confidentiality",
  DISPUTE: "Dispute Resolution",
  OTHER: "Other",
};

function RiskCard({ clause }: { clause: RiskClause }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const cfg = RISK_CONFIG[clause.riskLevel];

  const copyFix = () => {
    navigator.clipboard.writeText(clause.suggestion).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="risk-card"
      style={{
        background: "var(--surface)",
        border: `1px solid var(--border)`,
        borderLeft: `3px solid ${cfg.color}`,
        borderRadius: 10,
        overflow: "hidden",
        transition: "border-color 0.15s",
      }}
    >
      {/* Card header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          padding: "16px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: 9,
            padding: "3px 8px",
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            color: cfg.color,
            borderRadius: 4,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
            marginTop: 2,
          }}
        >
          {cfg.label}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="font-display"
            style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}
          >
            {clause.title}
          </div>
          <div style={{ fontSize: 13, color: "var(--text3)" }}>
            {CATEGORY_LABELS[clause.category] || clause.category}
          </div>
        </div>

        <span
          style={{
            color: "var(--text3)",
            fontSize: 18,
            transform: expanded ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          ▾
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "16px 20px" }}>
          {/* Original text */}
          <div style={{ marginBottom: 16 }}>
            <p
              className="font-mono"
              style={{
                fontSize: 10,
                color: "var(--text3)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Original Clause
            </p>
            <div
              style={{
                padding: "12px 14px",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                fontSize: 13,
                color: "var(--text2)",
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              &ldquo;{clause.originalText}&rdquo;
            </div>
          </div>

          {/* Risk reason */}
          <div style={{ marginBottom: 16 }}>
            <p
              className="font-mono"
              style={{
                fontSize: 10,
                color: "var(--text3)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Why It&apos;s Risky
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--text2)",
                lineHeight: 1.65,
                padding: "10px 14px",
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                borderRadius: 6,
              }}
            >
              {clause.riskReason}
            </p>
          </div>

          {/* Suggestion */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <p
                className="font-mono"
                style={{
                  fontSize: 10,
                  color: "var(--text3)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Suggested Revision
              </p>
              <button
                onClick={copyFix}
                style={{
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 11,
                  color: copied ? "var(--risk-low)" : "var(--text2)",
                  cursor: "pointer",
                  fontFamily: "'IBM Plex Mono', monospace",
                  transition: "all 0.15s",
                }}
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <div
              style={{
                padding: "12px 14px",
                background: "var(--risk-low-bg)",
                border: "1px solid var(--risk-low-border)",
                borderRadius: 6,
                fontSize: 13,
                color: "var(--text)",
                lineHeight: 1.7,
              }}
            >
              {clause.suggestion}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AnalysisView({ result, fileName, onReset }: AnalysisViewProps) {
  const [filter, setFilter] = useState<RiskLevel | "ALL">("ALL");

  const counts = {
    HIGH: result.clauses.filter((c) => c.riskLevel === "HIGH").length,
    MEDIUM: result.clauses.filter((c) => c.riskLevel === "MEDIUM").length,
    LOW: result.clauses.filter((c) => c.riskLevel === "LOW").length,
  };

  const filtered =
    filter === "ALL" ? result.clauses : result.clauses.filter((c) => c.riskLevel === filter);

  const overallCfg = RISK_CONFIG[result.overallRisk];

  const handleDownload = () => {
    const lines: string[] = [
      "ContractGuard Analysis Report",
      "==============================",
      `File: ${fileName}`,
      `Analyzed: ${new Date(result.analyzedAt).toLocaleString()}`,
      `Contract Type: ${result.contractType}`,
      `Overall Risk: ${result.overallRisk}`,
      "",
      "Summary",
      "-------",
      result.summary,
      "",
      `Flagged Clauses (${result.clauses.length} total)`,
      "-------------------------------",
    ];

    result.clauses.forEach((clause, i) => {
      lines.push(
        ``,
        `${i + 1}. [${clause.riskLevel}] ${clause.title}`,
        `Category: ${CATEGORY_LABELS[clause.category]}`,
        `Original: "${clause.originalText}"`,
        `Risk: ${clause.riskReason}`,
        `Suggested Fix: ${clause.suggestion}`
      );
    });

    lines.push("", "---", "Generated by ContractGuard · Not legal advice.");
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contractguard-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main
      className="animate-fade-up"
      style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <p
            className="font-mono"
            style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}
          >
            {fileName}
          </p>
          <h2
            className="font-display"
            style={{ fontSize: 22, fontWeight: 700 }}
          >
            Contract Analysis Report
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleDownload}
            style={{
              padding: "8px 18px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 7,
              color: "var(--text2)",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              transition: "all 0.15s",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border2)"; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >
            ↓ Download
          </button>
          <button
            onClick={onReset}
            style={{
              padding: "8px 18px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 7,
              color: "var(--text2)",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              transition: "all 0.15s",
            }}
          >
            New Analysis
          </button>
        </div>
      </div>

      {/* Overall risk + summary */}
      <div
        style={{
          background: "var(--surface)",
          border: `1px solid ${overallCfg.border}`,
          borderRadius: 12,
          padding: "24px 28px",
          marginBottom: 28,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 12,
              background: overallCfg.bg,
              border: `2px solid ${overallCfg.border}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <span style={{ fontSize: 22 }}>
              {result.overallRisk === "HIGH" ? "⚠" : result.overallRisk === "MEDIUM" ? "△" : "✓"}
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 9, color: overallCfg.color, letterSpacing: "0.05em" }}
            >
              {result.overallRisk}
            </span>
          </div>
          <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
            {result.contractType}
          </p>
        </div>

        <div>
          <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
            {(["HIGH", "MEDIUM", "LOW"] as RiskLevel[]).map((r) => (
              <div key={r} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: RISK_CONFIG[r].dot,
                    display: "block",
                  }}
                />
                <span className="font-mono" style={{ fontSize: 11, color: "var(--text2)" }}>
                  {counts[r]} {r.toLowerCase()}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>
            {result.summary}
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 20,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: 4,
        }}
      >
        {(["ALL", "HIGH", "MEDIUM", "LOW"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              flex: 1,
              padding: "7px 12px",
              borderRadius: 6,
              border: "none",
              background: filter === f ? "var(--surface2)" : "none",
              color: filter === f ? "var(--text)" : "var(--text3)",
              fontSize: 12,
              fontFamily: "'IBM Plex Mono', monospace",
              cursor: "pointer",
              transition: "all 0.15s",
              fontWeight: filter === f ? 500 : 400,
            }}
          >
            {f === "ALL" ? `All (${result.clauses.length})` : `${f} (${counts[f as RiskLevel]})`}
          </button>
        ))}
      </div>

      {/* Clause cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text3)", padding: 32 }}>
            No clauses in this category.
          </p>
        ) : (
          filtered.map((clause) => <RiskCard key={clause.id} clause={clause} />)
        )}
      </div>

      {/* Legal disclaimer */}
      <div
        style={{
          marginTop: 40,
          padding: "14px 18px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 8,
        }}
      >
        <p style={{ fontSize: 11, color: "var(--text3)", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text2)" }}>Legal Disclaimer:</strong> This analysis is
          generated by AI and is for informational purposes only. It does not constitute
          legal advice. Always consult a qualified attorney before signing any contract.
        </p>
      </div>
    </main>
  );
}
