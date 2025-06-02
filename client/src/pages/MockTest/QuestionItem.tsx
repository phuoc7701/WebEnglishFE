import React from "react";

interface Question {
  number: number;
  content: string;
  options: string[];
}

type Props = {
  question: Question;
  number: number;
  answer?: string;
  setAnswer: (ans: string) => void;
  isCurrent?: boolean;
};

const QuestionItem = React.forwardRef<HTMLDivElement, Props>(
  ({ question, answer, setAnswer, number, isCurrent }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 16,
          marginBottom: 24,
          boxShadow: "0 2px 8px #ececec",
          border: isCurrent ? "2px solid #2563eb" : undefined,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <span style={{
            background: "#dbeafe",
            borderRadius: "50%",
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 18,
            color: "#2563eb"
          }}>{number}</span>
        </div>
        <div style={{ fontSize: 17, margin: "8px 0 6px 0" }}>{question.content}</div>
        <div>
          {question.options.map((opt, idx) => {
            const inputId = `q${question.number}_opt${idx}`;
            return (
              <div key={opt} style={{ margin: "2px 0" }}>
                <input
                  id={inputId}
                  type="radio"
                  checked={answer === opt}
                  onChange={() => setAnswer(opt)}
                  name={`q${question.number}`}
                  style={{ marginRight: 6 }}
                />
                <label htmlFor={inputId} style={{ cursor: "pointer", fontSize: 16 }}>
                  {opt}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default QuestionItem;