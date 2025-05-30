import React, { useState } from "react";
import Header from "./MockTest/Header";
import TestControls from "./MockTest/TesControls";
import QuestionList from "./MockTest/QuestionList";
import Sidebar from "./MockTest/Sidebar";

// Data mẫu (bạn có thể lấy từ API)
const PARTS = [
  { name: "Part 1", from: 1, to: 25 },
  { name: "Part 2", from: 26, to: 146 },
  { name: "Part 3", from: 147, to: 151 },
  { name: "Part 5", from: 101, to: 130 },
  { name: "Part 6", from: 131, to: 146 },
  { name: "Part 7", from: 147, to: 151 },
];
const QUESTIONS = [
  {
    number: 101,
    content: "When filling out the order form, please ____ your address clearly to prevent delays.",
    options: [
      "A. fix",
      "B. write",
      "C. send",
      "D. direct",
    ],
  },
  {
    number: 102,
    content: "Ms. Morgan recruited the individuals that the company ____ for the next three months.",
    options: [
      "A. will employ",
      "B. to employ",
      "C. has been employed",
      "D. employ",
    ],
  },
  {
    number: 103,
    content: "The contractor had a fifteen-percent ____ in his business after advertising in the local newspaper.",
    options: [
      "A. experience",
      "B. growth",
      "C. formula",
      "D. incentive",
    ],
  },
  {
    number: 104,
    content: "The free clinic was founded by a group of doctors to give ____ for various medical conditions.",
    options: [
      "A. treatment",
      "B. benefit",
      "C. value",
      "D. appointment",
    ],
  },
  {
    number: 131,
    content: "The report ____ by the manager yesterday was very informative.",
    options: [
      "A. prepare",
      "B. prepared",
      "C. preparation",
      "D. preparing"
    ],
  },
  // ... các câu tiếp theo của Part 6
  // Câu hỏi Part 7 (147-151)
  {
    number: 147,
    content: "Read the following email and answer the question: ...",
    options: [
      "A. Option 1",
      "B. Option 2",
      "C. Option 3",
      "D. Option 4"
    ],
  },
  // ... các câu tiếp theo của Part 7
];


export default function ToeicTestPage() {
  const [currentPart, setCurrentPart] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [highlight, setHighlight] = useState(true);
  const [timer, setTimer] = useState(45 * 60); // 45 phút
  const part = PARTS[currentPart];
  const partQuestions = QUESTIONS.filter(
    q => q.number >= part.from && q.number <= part.to
  );

  React.useEffect(() => {
    if (timer === 0) return;
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fafbfc" }}>
      <div style={{ flex: 1, padding: 16 }}>
        <Header />
        <TestControls
          parts={PARTS}
          currentPart={currentPart}
          setCurrentPart={setCurrentPart}
          highlight={highlight}
          setHighlight={setHighlight}
        />
      
        <QuestionList
          questions={partQuestions}
          answers={answers}
          setAnswers={setAnswers}
        />
       
      </div>
      <Sidebar
        parts={PARTS}
        answers={answers}
        timer={timer}
        setCurrentPart={setCurrentPart}
      />
    </div>
  );
}