import React from "react";
import QuestionItem from "./QuestionItem";
type Props = {
  questions: any[];
  answers: { [key: number]: string };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
};
export default function QuestionList({ questions, answers, setAnswers }: Props) {
  if (!questions.length) return <div>Không có câu hỏi cho phần này.</div>;
  return (
    <div>
      {questions.map(q => (
        <QuestionItem
          key={q.number}
          question={q}
          answer={answers[q.number]}
          setAnswer={ans => setAnswers(prev => ({ ...prev, [q.number]: ans }))}
        />
      ))}
    </div>
  );
}