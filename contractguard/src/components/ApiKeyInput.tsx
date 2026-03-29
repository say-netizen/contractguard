"use client";

import { useState } from "react";

interface ApiKeyInputProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export function ApiKeyInput({ value, onChange, error }: ApiKeyInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div
      style={{
        background: "var(--surface)",
        border: `1px solid ${error ? "var(--risk-high)" : "var(--border)"}`,
        borderRadius: 12,
        padding: 20,
        transition: "border-color 0.15s",
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="7" width="14" height="8" rx="2" stroke="var(--accent)" strokeWidth="1.2" />
            <path d="M4 7V5a4 4 0 018 0v2" stroke="var(--accent)" strokeWidth="1.2" fill="none" />
            <circle cx="8" cy="11" r="1.5" fill="var(--accent)" />
          </svg>
        </div>
        <div>
          <div className="font-display" style={{ fontWeight: 600, fontSize: 15 }}>
            Anthropic Claude API Key
          </div>
          <div style={{ fontSize: 12, color: "var(--text3)" }}>
            Never stored · Client-side only
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="sk-ant-api03-..."
          spellCheck={false}
          autoComplete="off"
          style={{
            width: "100%",
            padding: "10px 48px 10px 14px",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            color: "var(--text)",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            outline: "none",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "var(--accent)";
          }}
          onBlur={(e) => {
            (e.target as HTMLInputElement).style.borderColor = "var(--border)";
          }}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text3)",
            padding: 4,
          }}
        >
          {show ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M2 2L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          )}
        </button>
      </div>

      {error && (
        <p style={{ marginTop: 8, fontSize: 13, color: "var(--risk-high)" }}>{error}</p>
      )}

      <p style={{ marginTop: 12, fontSize: 12, color: "var(--text3)", lineHeight: 1.5 }}>
        Don&apos;t have an API key?{" "}
        <a
          href="https://console.anthropic.com/settings/keys"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", textDecoration: "none" }}
        >
          Get one at console.anthropic.com →
        </a>
      </p>
    </div>
  );
}
