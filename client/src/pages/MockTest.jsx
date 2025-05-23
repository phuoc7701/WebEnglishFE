// File: MockTest.jsx
import React, { useState, useEffect, useRef } from 'react';

const listeningSection = {
  audioUrl: '/audios/toeic-listening.mp3',
  questions: [
    {
      id: 1,
      prompt: "What time does the meeting start?",
      options: ["At 9 AM", "At 10 AM", "At 11 AM", "At noon"],
    },
    {
      id: 2,
      prompt: "Where will they hold the conference?",
      options: ["In the main hall", "In the lobby", "At the café", "On the rooftop"],
    },
    {
      id: 3,
      prompt: "Who is responsible for the presentation?",
      options: ["Mr. Smith", "Ms. Lee", "Dr. Brown", "Mrs. Davis"],
    },
  ],
};

const readingSection = {
  questions: [
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
  ],
};

const MockTest = () => {
  // state lưu đáp án
  const [listeningAnswers, setListeningAnswers] = useState({});
  const [readingAnswers, setReadingAnswers] = useState({});

  // countdown timer
  const TOTAL_TIME = 30 * 60; // 30 phút = 1800s
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(sec => {
        if (sec <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();    // tự động nộp khi về 0
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

  const handleListenChange = (qId, value) => {
    setListeningAnswers(prev => ({ ...prev, [qId]: value }));
  };
  const handleReadChange = (qId, value) => {
    setReadingAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = e => {
    if (e) e.preventDefault();
    clearInterval(timerRef.current);

    // check listening
    const missingListen = listeningSection.questions
      .filter(q => !listeningAnswers[q.id])
      .map(q => q.id);
    const missingRead = readingSection.questions
      .filter(q => !readingAnswers[q.id])
      .map(q => q.id);

    let msg = "";
    if (missingListen.length) {
      msg += `- Chưa chọn đáp án nghe cho câu: ${missingListen.join(", ")}\n`;
    }
    if (missingRead.length) {
      msg += `- Chưa chọn đáp án đọc cho câu: ${missingRead.join(", ")}`;
    }
    if (msg) {
      alert(`Vui lòng hoàn thành:\n${msg}`);
    } else {
      console.log("Listening answers:", listeningAnswers);
      console.log("Reading answers:", readingAnswers);
      alert("Bạn đã nộp bài thành công! Xem console để kiểm tra kết quả.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white rounded-xl p-6 space-y-6"
      >
        {/* Timer */}
        <div className="flex justify-end text-lg font-mono font-semibold text-red-600">
          Thời gian còn lại: {formatTime(secondsLeft)}
        </div>

        <h1 className="text-3xl font-bold text-center">
          Test Listening - Reading
        </h1>

        {/* Listening Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Listening</h2>
          <audio controls className="w-full mb-4">
            <source src={listeningSection.audioUrl} type="audio/mpeg" />
            Trình duyệt không hỗ trợ audio.
          </audio>
          {listeningSection.questions.map(q => (
            <div key={q.id} className="space-y-2">
              <p className="font-medium">{q.id}. {q.prompt}</p>
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
                  >
                    <input
                      type="radio"
                      name={`listen${q.id}`}
                      value={opt}
                      checked={listeningAnswers[q.id] === opt}
                      onChange={() => handleListenChange(q.id, opt)}
                      className="form-radio text-blue-500 h-5 w-5 mr-3"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Reading Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Reading</h2>
          {readingSection.questions.map(q => (
            <div key={q.id} className="space-y-2">
              <p className="font-medium">{q.id}. {q.text}</p>
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition"
                  >
                    <input
                      type="radio"
                      name={`read${q.id}`}
                      value={opt}
                      checked={readingAnswers[q.id] === opt}
                      onChange={() => handleReadChange(q.id, opt)}
                      className="form-radio text-blue-500 h-5 w-5 mr-3"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Nộp Bài
        </button>
      </form>
    </div>
  );
};

export default MockTest;
