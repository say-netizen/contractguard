"use client";

import { useCallback, useState, useRef } from "react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const processFile = (file: File) => {
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    const validExts = [".pdf", ".docx", ".doc", ".txt"];
    const hasValidExt = validExts.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!validTypes.includes(file.type) && !hasValidExt) {
      alert("Please upload a PDF, Word (.docx), or text file.");
      return;
    }
    setSelected(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleAnalyze = () => {
    if (selected) onFileSelect(selected);
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? "var(--accent)" : selected ? "var(--risk-low)" : "var(--border2)"}`,
          borderRadius: 12,
          padding: "48px 32px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "rgba(200,169,110,0.04)" : selected ? "var(--risk-low-bg)" : "var(--surface)",
          transition: "all 0.2s",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt"
          onChange={handleChange}
          style={{ display: "none" }}
        />

        {selected ? (
          <div>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
            <p className="font-display" style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
              {selected.name}
            </p>
            <p style={{ fontSize: 13, color: "var(--text3)" }}>
              {(selected.size / 1024).toFixed(1)} KB · Click to change
            </p>
          </div>
        ) : (
          <div>
            <div
              style={{
                width: 64,
                height: 64,
                margin: "0 auto 16px",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 18V8M14 8L10 12M14 8L18 12" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 22H22" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="2" y="2" width="24" height="24" rx="6" stroke="var(--border2)" strokeWidth="1.2"/>
              </svg>
            </div>
            <p className="font-display" style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
              Drop your contract here
            </p>
            <p style={{ fontSize: 14, color: "var(--text2)" }}>
              or click to browse
            </p>
            <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 8 }}>
              PDF · DOCX · TXT · Max 10MB
            </p>
          </div>
        )}
      </div>

      {selected && (
        <button
          onClick={handleAnalyze}
          style={{
            marginTop: 16,
            width: "100%",
            padding: "14px",
            background: "var(--accent)",
            color: "#0a0b0d",
            border: "none",
            borderRadius: 8,
            fontFamily: "'Syne', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.15s",
            letterSpacing: "-0.01em",
          }}
          onMouseOver={(e) => {
            (e.target as HTMLElement).style.background = "var(--accent2)";
          }}
          onMouseOut={(e) => {
            (e.target as HTMLElement).style.background = "var(--accent)";
          }}
        >
          Analyze Contract →
        </button>
      )}
    </div>
  );
}
