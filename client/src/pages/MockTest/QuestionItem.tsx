import React from "react";
type Props = {
  question: { number: number; content: string; options: string[] };
  answer?: string;
  setAnswer: (ans: string) => void;
};
export default function QuestionItem({ question, answer, setAnswer }: Props) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: 16, marginBottom: 24, boxShadow: "0 2px 8px #ececec"
    }}>
      <div style={{
        display: "flex", alignItems: "center", marginBottom: 4
      }}>
        <span style={{
          background: "#dbeafe", borderRadius: "50%",
          width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 600, fontSize: 18, color: "#2563eb"
        }}>{question.number}</span>
      </div>
      <div style={{ fontSize: 17, margin: "8px 0 6px 0" }}>{question.content}</div>
      <div>
        {question.options.map(opt => (
          <div key={opt} style={{ margin: "2px 0" }}>
            <label style={{ cursor: "pointer", fontSize: 16 }}>
              <input
                type="radio"
                checked={answer === opt}
                onChange={() => setAnswer(opt)}
                style={{ marginRight: 6 }}
                name={`q${question.number}`}
              />
              {opt}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}