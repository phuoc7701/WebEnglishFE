// File: ListeningPractice.jsx
import React, { useState } from 'react';

const listeningData = {
  audioUrl: '/audios/toeic-listening.mp3', // đường dẫn đến file audio
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
    // ... bạn có thể thêm câu hỏi
  ],
};

const ListeningPractice = () => {
  const { audioUrl, questions } = listeningData;
  const [answers, setAnswers] = useState({});

  const handleChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const missing = questions.filter(q => !answers[q.id]).map(q => q.id);
    if (missing.length) {
      return alert(`Vui lòng chọn đáp án cho câu: ${missing.join(', ')}`);
    }
    console.log("Kết quả Listening:", answers);
    alert("Bạn đã nộp bài nghe! Kết quả xem console.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-xl p-6 space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">LISTENING PRACTICE</h1>

        {/* Audio Player */}
        <div className="flex justify-center mb-4">
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Trình duyệt của bạn không hỗ trợ thẻ audio.
          </audio>
        </div>

        {/* Questions */}
        {questions.map(q => (
          <div key={q.id} className="space-y-3">
            <h6 className="font-semibold">Câu {q.id}. {q.prompt}</h6>
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

        {/* Submit */}
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

export default ListeningPractice;
