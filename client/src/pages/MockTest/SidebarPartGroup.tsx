import React from "react";
type Props = {
  name: string;
  from: number;
  to: number;
  answers: { [key: number]: string };
  currentQuestion: number;
  onQuestionClick: (num: number) => void;
  onPartClick: () => void;
};
export default function SidebarPartGroup({ name, from, to, answers, currentQuestion, onQuestionClick, onPartClick }: Props) {
  if (typeof from !== "number" || typeof to !== "number") return null;

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontWeight: 600, marginBottom: 8, cursor: "pointer" }} onClick={onPartClick}>{name}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {Array.from({ length: to - from + 1 }, (_, i) => from + i).map(num => (
          <div
            key={num}
            style={{
              border: "1px solid #222",
              borderRadius: 4,
              width: 34,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: currentQuestion === num
                ? "#48bb78" // xanh khi chọn
                : answers[num] ? "#bee3f8" : "#fff",
              cursor: "pointer",
              fontWeight: 500,
              color: currentQuestion === num ? "#fff" : "#222"
            }}
            onClick={() => onQuestionClick(num)}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}