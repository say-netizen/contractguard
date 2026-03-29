"use client";

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
      {/* Hero section */}
      <section
        style={{
          paddingTop: "clamp(60px, 10vh, 120px)",
          paddingBottom: "clamp(60px, 8vh, 100px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        <div className="animate-fade-up">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 100,
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: "var(--risk-low)",
                borderRadius: "50%",
                display: "block",
              }}
            />
            <span
              className="font-mono"
              style={{ fontSize: 11, color: "var(--text2)", letterSpacing: "0.05em" }}
            >
              BYOK · No data stored · Free to try
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(38px, 5vw, 62px)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            Your contract
            <br />
            <span style={{ color: "var(--accent)" }}>has landmines.</span>
            <br />
            <span style={{ color: "var(--text2)" }}>We find them.</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 1.5vw, 19px)",
              color: "var(--text2)",
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 460,
            }}
          >
            Upload any freelance contract. AI flags dangerous clauses — unlimited
            revisions, IP grabs, no-pay terminations — and rewrites them in your
            favor.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={onGetStarted}
              style={{
                padding: "14px 32px",
                background: "var(--accent)",
                color: "#0a0b0d",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "'Syne', sans-serif",
                cursor: "pointer",
                transition: "all 0.15s",
                letterSpacing: "-0.01em",
              }}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.background = "var(--accent2)";
                (e.target as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.background = "var(--accent)";
                (e.target as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Analyze a Contract →
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--text3)",
                fontSize: 14,
              }}
            >
              <span>PDF · DOCX · TXT</span>
            </div>
          </div>
        </div>

        {/* Preview card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Mock analysis preview */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
            </div>
            <span className="font-mono" style={{ fontSize: 11, color: "var(--text3)" }}>
              freelance_contract_v2.pdf
            </span>
            <div
              style={{
                padding: "3px 10px",
                background: "var(--risk-high-bg)",
                border: "1px solid var(--risk-high-border)",
                borderRadius: 100,
              }}
            >
              <span className="font-mono" style={{ fontSize: 10, color: "var(--risk-high)" }}>
                HIGH RISK
              </span>
            </div>
          </div>

          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                risk: "HIGH",
                title: "Unlimited Revisions",
                text: "Client may request unlimited changes...",
                color: "var(--risk-high)",
                bg: "var(--risk-high-bg)",
                border: "var(--risk-high-border)",
              },
              {
                risk: "HIGH",
                title: "IP Transfer — All Rights",
                text: "Contractor assigns all intellectual property...",
                color: "var(--risk-high)",
                bg: "var(--risk-high-bg)",
                border: "var(--risk-high-border)",
              },
              {
                risk: "MED",
                title: "Net-60 Payment Terms",
                text: "Payment due within 60 days of invoice...",
                color: "var(--risk-med)",
                bg: "var(--risk-med-bg)",
                border: "var(--risk-med-border)",
              },
              {
                risk: "LOW",
                title: "Termination Notice",
                text: "Either party may terminate with 14 days...",
                color: "var(--risk-low)",
                bg: "var(--risk-low-bg)",
                border: "var(--risk-low-border)",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 14px",
                  background: item.bg,
                  border: `1px solid ${item.border}`,
                  borderRadius: 8,
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    color: item.color,
                    padding: "2px 6px",
                    border: `1px solid ${item.border}`,
                    borderRadius: 4,
                    whiteSpace: "nowrap",
                    marginTop: 2,
                  }}
                >
                  {item.risk}
                </span>
                <div>
                  <div
                    className="font-display"
                    style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text2)" }}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section
        style={{
          paddingBottom: 80,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--border)",
        }}
      >
        {[
          {
            icon: "⚖",
            title: "7 Clause Categories",
            desc: "Payment, IP, Liability, Termination, Scope Creep, NDAs, Disputes",
          },
          {
            icon: "✦",
            title: "Rewrite Suggestions",
            desc: "AI generates balanced alternative clause language you can paste in",
          },
          {
            icon: "⬡",
            title: "BYOK Privacy",
            desc: "Bring your own API key. Your contract never touches our servers",
          },
        ].map((f, i) => (
          <div
            key={i}
            style={{
              background: "var(--surface)",
              padding: "32px 28px",
            }}
          >
            <div
              style={{ fontSize: 28, marginBottom: 16, lineHeight: 1 }}
            >
              {f.icon}
            </div>
            <h3
              className="font-display"
              style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}
            >
              {f.title}
            </h3>
            <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
