// File: ReadingPractice.jsx
import React, { useState, useEffect, useRef } from 'react';

const questions = [
  {
    id: 1,
    text: "The manager asked all staff to ______ the report by Friday.",
    options: ["complete", "completed", "completing", "completion"],
  },
  {
    id: 2,
    text: "If you need help, please _____ to our support team.",
    options: ["contact", "contacts", "contacting", "contacted"],
  },
  {
    id: 3,
    text: "They _____ in this company since 2010.",
    options: ["work", "worked", "have worked", "working"],
  },
  // ... thêm câu hỏi tuỳ ý
];

const ReadingPractice = ({ totalTimeSec = 600 }) => {
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(totalTimeSec);
  const timerRef = useRef(null);

  // Bắt đầu countdown
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(sec => {
        if (sec <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();       // tự nộp khi về 0
          return 0;
        }
        return sec - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = sec => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = e => {
    if (e) e.preventDefault();
    // nếu có interval thì clear
    clearInterval(timerRef.current);

    // kiểm tra thiếu đáp án
    const missing = questions.filter(q => !answers[q.id]);
    if (missing.length > 0) {
      alert(`Hết giờ hoặc chưa chọn đủ! Câu thiếu: ${missing.map(m => m.id).join(', ')}`);
    } else {
      alert("Nộp bài thành công!");
    }
    console.log("Kết quả làm bài:", answers);
    // TODO: chuyển page, gửi server, ...
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-xl p-6 space-y-6"
      >
        {/* Timer */}
        <div className="flex justify-end text-lg font-mono font-semibold text-red-600">
          Thời gian còn lại: {formatTime(secondsLeft)}
        </div>

        <h1 className="text-2xl font-bold text-center">READING PRACTICE</h1>

        {questions.map(q => (
          <div key={q.id} className="space-y-3">
            <h6 className="font-semibold">Câu {q.id}. {q.text}</h6>
            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                    className="form-radio text-blue-500 h-5 w-5 mr-3"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Nộp bài
        </button>
      </form>
    </div>
  );
};

export default ReadingPractice;
