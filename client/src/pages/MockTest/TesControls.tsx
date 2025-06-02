import React from "react";
type Props = {
  parts: { partNumber: number }[];
  currentPart: number;
  setCurrentPart: (idx: number) => void;
  highlight: boolean;
  setHighlight: (h: boolean) => void;
};
export default function TestControls({ parts, currentPart, setCurrentPart, highlight, setHighlight }: Props) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <label style={{ fontStyle: "italic" }}>
          <input
            type="checkbox"
            checked={highlight}
            onChange={() => setHighlight(!highlight)}
            style={{ marginRight: 6 }}
          />
          Highlight nội dung
        </label>
        <span style={{
          marginLeft: 8,
          color: "#888",
          fontSize: 14,
          cursor: "pointer"
        }}>ⓘ</span>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {parts.map((p, idx) => (
          <button
            key={p.partNumber}
            onClick={() => setCurrentPart(idx)}
            style={{
              padding: "6px 18px",
              borderRadius: 16,
              border: "none",
              background: idx === currentPart ? "#b3d4fc" : "#e2e8f0",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: 16
            }}
          >
          Part  {p.partNumber}
          </button>
        ))}
      </div>
    </>
  );
}