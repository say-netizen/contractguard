"use client";

interface HeaderProps {
  onLogoClick: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10, 11, 13, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        <button
          onClick={onLogoClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 0,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: "var(--accent)",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L2 4V9C2 12.3 4.7 15 8 15C11.3 15 14 12.3 14 9V4L8 1Z"
                stroke="#0a0b0d"
                strokeWidth="1.5"
                fill="none"
              />
              <path d="M5.5 8L7.5 10L11 6" stroke="#0a0b0d" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: 17,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            ContractGuard
          </span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a
            href="https://console.anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13,
              color: "var(--text2)",
              textDecoration: "none",
              padding: "6px 14px",
              border: "1px solid var(--border)",
              borderRadius: 6,
              transition: "all 0.15s",
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--border2)";
              (e.target as HTMLElement).style.color = "var(--text)";
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.borderColor = "var(--border)";
              (e.target as HTMLElement).style.color = "var(--text2)";
            }}
          >
            Get API Key →
          </a>
        </div>
      </div>
    </header>
  );
}
