import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PronunciationModal from "../components/SpeakingPracticeResult"

export default function ToeicSpeaking() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [result, setResult] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:8080/engzone/speaking",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response)
      setQuestionText(response.data.questionText);
      console.log("Question text:", response.data.questionText);
    } catch (error) {
      console.error("Error fetching question:", error);
      setQuestionText("Không thể tải câu hỏi.");
    }
  };

  const startRecording = async () => {
    setResult(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Trình duyệt không hỗ trợ thu âm");
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setAudioBlob(audioBlob); // Lưu lại blob
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleSend = async () => {
    if (!audioBlob) {
      alert("Bạn chưa thu âm!");
      return;
    }

    setResult("Đang gửi và phân tích...");

    const formData = new FormData();
    formData.append("file", audioBlob); // Lấy từ state
    formData.append("originalText", questionText);

    // Gửi lên backend
    try {
      const res = await axios.post(
        "http://localhost:8080/engzone/speaking/evaluate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );
      let evalRaw = res.data.pronunciationEvaluation;
      let evalObj = null;
      try {
        evalObj = JSON.parse(evalRaw);
      } catch (e) {
        // Nếu không phải JSON, giữ dạng string
      }
      setResult(evalObj || evalRaw);
      // ================
    } catch (err) {
      console.error("Evaluation error:", err);
      setResult("Có lỗi khi gửi dữ liệu.");
    }
  };

  return (
    <div className="max-w-xll mx-auto p-10 bg-white rounded-md shadow-md mt-10 h-[1000px]">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Luyện Nói
      </h1>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p className="text-gray-800 font-semibold text-[20px]">Câu hỏi:</p>
        <p className="mt-2 text-lg whitespace-pre-line text-[20px]">{questionText} </p>

      </div>

      <div className="flex justify-center space-x-4 mb-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Bắt đầu thu âm
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Dừng thu âm
          </button>
        )}
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