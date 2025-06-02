import React, { useRef, useEffect } from "react";
import QuestionItem from "./QuestionItem";

interface Question {
  id: string;
  number: number;
  content: string;
  options: string[];
  correctAnswer?: string;
  partNumber?: number;
}

type Props = {
  questions: Question[];
  answers: { [key: number]: string };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  currentQuestion: number;
  setCurrentQuestion: (num: number) => void;
};

export default function QuestionList({ questions, answers, setAnswers, currentQuestion, setCurrentQuestion }: Props) {
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const ref = questionRefs.current[currentQuestion];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentQuestion]);

  if (!questions.length) return <div>Không có câu hỏi cho phần này.</div>;

  return (
    <div>
      {questions.map((q) => (
        
        <QuestionItem
          key={q.id}
          ref={el => questionRefs.current[q.number] = el}
          question={q}
          number={q.number}
          answer={answers[q.number]}
          setAnswer={(ans) =>
            setAnswers((prev) => ({
              ...prev,
              [q.number]: ans,
            }))
          }
          isCurrent={currentQuestion === q.number}
        />
      ))}
    </div>
  );
}