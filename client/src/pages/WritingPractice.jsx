import React, { useState } from "react";
import axios from "axios";
import TopicWriting from "../components/TopicWriting";
import Countdown from "../components/Countdown";

const WritingPractice = () => {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [resultHtml, setResultHtml] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [score, setScore] = useState(null);
  const [isTiming, setIsTiming] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
  const duration = 30 * 60; // 30 phút (giây)

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handleSubmit = async () => {
    if (!topic || !content) {
      alert("Vui lòng nhập đề bài và bài viết.");
      return;
    }
    setIsLoading(true); // Bật loading
    try {
      const response = await axios.post(
        "http://localhost:8080/engzone/writing/evaluate",
        { topic, writing: content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setResultHtml(response.data.formatted_html);
      setReviewComment(response.data.review_comment_vi);
      setScore(response.data.score || 0);
    } catch (error) {
      console.error("Error evaluating essay:", error);
      alert(error.response?.data?.message || "Không thể chấm bài.");
    } finally {
      setIsLoading(false); // Tắt loading
    }
  };

  const handleTimeout = () => {
    setIsTiming(false);
    alert("Hết thời gian làm bài!");
    handleSubmit();
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Luyện Viết Tiếng Anh
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Cải thiện kỹ năng viết tiếng Anh với các bài tập thực hành và nhận xét
          chi tiết.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form viết bài */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm relative">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-10">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <TopicWriting
              setTopic={setTopic}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <div className="mt-4">
              <textarea
                rows="12"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập bài viết của bạn tại đây..."
                className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading} // Vô hiệu hóa khi loading
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>Số từ: {wordCount}</span>
                {isTiming && (
                  <Countdown duration={duration} onTimeout={handleTimeout} />
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                disabled={isLoading}
              >
                Nộp bài
              </button>
              <button
                onClick={() => setIsTiming(!isTiming)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                disabled={isLoading}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
                {isTiming ? "Dừng tính giờ" : "Bắt đầu tính giờ"}
              </button>
            </div>
          </div>
          {resultHtml && (
            <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Kết quả chấm bài</h2>
              <p className="text-sm text-gray-500 mb-2">
                Thời gian nộp:{" "}
                {new Date()
                  .toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour12: false,
                  })
                  .replace(
                    /(\d+):(\d+), (\d+)\/(\d+)\/(\d+)/,
                    "$1:$2 $3/$4/$5"
                  )}
              </p>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: resultHtml }}
              />
            </div>
          )}
        </div>

        {/* Điểm số và nhận xét */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
              Kết quả
            </h3>
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">
              {score !== null ? `${score} / 30` : "0 / 30"}
            </h1>
            <p className="text-center text-gray-500 mb-4 italic">
              {score !== null ? "(+/- 3)" : ""}
            </p>
            <div className="border-t border-gray-300 mb-4"></div>
            {reviewComment ? (
              <p className="text-gray-700">
                <span className="font-bold">Nhận xét:</span> {reviewComment}
              </p>
            ) : (
              <p className="text-gray-500 italic">
                Chưa có nhận xét. Hãy nộp bài để nhận đánh giá.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPractice;
