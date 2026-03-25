import { useState } from "react";

const SAMPLES = [
  { label: "AI (Wikipedia)", url: "https://en.wikipedia.org/wiki/Artificial_intelligence" },
  { label: "Climate Change", url: "https://en.wikipedia.org/wiki/Climate_change" },
  { label: "Quantum Computing", url: "https://en.wikipedia.org/wiki/Quantum_computing" },
];

interface Props {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export function URLInput({ onSubmit, loading }: Props) {
  const [value, setValue] = useState(SAMPLES[0].url);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 10,
      padding: "16px 24px",
      background: "linear-gradient(to bottom, rgba(10,10,15,0.95), transparent)",
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.05em", color: "#a78bfa" }}>
        ◈ 3D Word Cloud
      </h1>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {SAMPLES.map((s) => (
          <button key={s.url} onClick={() => setValue(s.url)} style={{
            padding: "4px 10px", fontSize: 12, borderRadius: 999,
            border: "1px solid #4b5563",
            background: value === s.url ? "#4b5563" : "transparent",
            color: "#d1d5db", cursor: "pointer",
          }}>
            {s.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://..."
          style={{
            flex: 1, padding: "9px 14px", borderRadius: 8,
            border: "1px solid #374151", background: "#111827",
            color: "#f9fafb", fontSize: 14, outline: "none",
          }}
        />
        <button
          onClick={() => onSubmit(value.trim())}
          disabled={loading || !value.trim()}
          style={{
            padding: "9px 20px", borderRadius: 8, fontWeight: 600,
            fontSize: 14, background: loading ? "#6d28d9" : "#7c3aed",
            color: "#fff", border: "none",
            cursor: loading ? "default" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </div>
    </div>
  );
}