import React, { useState, useEffect } from "react";
import axios from "axios";
import PronunciationModal from "../components/SpeakingPracticeResult";

export default function ToeicSpeaking() {
  const [questionText, setQuestionText] = useState("");
  const [result, setResult] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:8080/engzone/speaking", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestionText(response.data.questionText);
    } catch (error) {
      console.error("Error fetching question:", error);
      setQuestionText("Không thể tải câu hỏi.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("audio")) {
      setAudioFile(file);
      const fileURL = URL.createObjectURL(file);
      setAudioURL(fileURL);
    } else {
      alert("Vui lòng chọn một file âm thanh hợp lệ.");
    }
  };

  const handleSend = async () => {
    if (!audioFile) {
      alert("Bạn chưa chọn file âm thanh!");
      return;
    }

    if (!questionText) {
      alert("Không có câu hỏi gốc để đối chiếu phát âm.");
      return;
    }

    setResult("Đang tải lên và xử lý...");

    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("originalText", questionText); // gửi thêm câu hỏi gốc

    try {
      const res = await axios.post(
        "http://localhost:8080/engzone/speaking/evaluate", // đúng endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const evaluation = res.data.pronunciationEvaluation;
      setResult(evaluation); // để truyền vào modal
    } catch (err) {
      console.error("Upload error:", err);
      setResult("Có lỗi khi tải lên file ghi âm.");
    }
  };

  return (
    <div className="max-w-xll mx-auto p-10 bg-white rounded-md shadow-md mt-10 h-[1000px]">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Luyện Nói (Tải file)
      </h1>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p className="text-gray-800 font-semibold text-[20px]">Câu hỏi:</p>
        <p className="mt-2 text-lg whitespace-pre-line text-[20px]">{questionText}</p>
      </div>

      <div className="mb-6 text-center">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="block mx-auto"
        />
      </div>

      {audioURL && (
        <div className="mb-4 text-center">
          <audio controls src={audioURL} className="mx-auto" />
        </div>
      )}

      <div className="flex justify-center mb-6">
        <button
          onClick={handleSend}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Gửi kiểm tra phát âm
        </button>
      </div>

      <PronunciationModal result={result} onClose={() => setResult(null)} />
    </div>
  );
}
