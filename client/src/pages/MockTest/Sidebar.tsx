import React from "react";
import SidebarPartGroup from "./SidebarPartGroup";
type Props = {
  parts: { partNumber?: number; name: string; from: number; to: number }[];
  answers: { [key: number]: string };
  timer: number;
  setCurrentPart: (idx: number) => void;
  currentQuestion: number; // thêm dòng này
  setCurrentQuestion: (num: number) => void; // thêm dòng này
  onSubmit: () => void; // thêm dòng này
};
export default function Sidebar({ parts, answers, timer, setCurrentPart, currentQuestion, setCurrentQuestion, onSubmit }: Props) {
  return (
    <div style={{
      width: 320, background: "#fff", padding: 20,
      borderLeft: "1px solid #eee", minHeight: "100vh"
    }}>
      <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 12 }}>
        Thời gian làm bài:
      </div>
      <div style={{
        fontSize: 22, fontWeight: 700, color: "#2563eb", marginBottom: 12
      }}>
        {`${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`}
      </div>
      <button style={{
        width: "100%", background: "#2563eb", color: "#fff",
        border: "none", borderRadius: 7, fontWeight: 600, fontSize: 18,
        padding: "8px 0", marginBottom: 12, cursor: "pointer"
      }}
      onClick={onSubmit}
      >NỘP BÀI</button>
      {parts.map((part, idx) =>
        <SidebarPartGroup
          key={part.partNumber || part.name || idx}
          name={part.name}
          from={part.from}
          to={part.to}
          answers={answers}
          currentQuestion={currentQuestion}
          onQuestionClick={setCurrentQuestion}
          onPartClick={() => setCurrentPart(idx)}
        />
      )}
    </div>
  );
}