import { useState } from "react";
import axios from "axios";

const TopicWriting = ({ setTopic, isLoading, setIsLoading }) => {
  const [inputTopic, setInputTopic] = useState("");

  const generateTopic = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Bật loading
    try {
      const response = await axios.post(
        "http://localhost:8080/engzone/writing/generate-topic",
        inputTopic ? inputTopic : "",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTopic(response.data);
      setInputTopic(response.data);
    } catch (error) {
      console.error("Error generating topic:", error);
      alert(error.response?.data?.message || "Không thể tạo đề bài.");
    } finally {
      setIsLoading(false); // Tắt loading
    }
  };

  return (
    <div>
      <form onSubmit={generateTopic}>
        <textarea
          rows="3"
          value={inputTopic}
          onChange={(e) => setInputTopic(e.target.value)}
          placeholder="Nhập đề bài hoặc tạo đề bài với AI bằng nút phía dưới"
          className="w-full p-3 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isLoading} // Vô hiệu hóa khi loading
        />
        <button
          type="submit"
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2 disabled:opacity-50"
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
              d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z"
              clipRule="evenodd"
            />
            <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z" />
          </svg>
          Tạo đề bài ngẫu nhiên
        </button>
      </form>
    </div>
  );
};

export default TopicWriting;
