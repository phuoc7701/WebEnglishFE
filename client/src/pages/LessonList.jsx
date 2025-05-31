import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PAGE_SIZE = 12;

const LessonList = () => {
  const { type, level } = useParams();
  const [page, setPage] = useState(1);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(lessons.length / PAGE_SIZE);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:8080/engzone/lessons/type/${type}/level/${level}`,
          {
            headers: {
              Authorization: "Bearer your-token-here",
            },
          }
        );
        setLessons(response.data);
      } catch (err) {
        setError("Không thể tải danh sách bài học: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (type && level) {
      fetchLessons();
    } else {
      setError("Thiếu tham số type hoặc level trong URL");
      setLoading(false);
    }
  }, [type, level]);

  const startIdx = (page - 1) * PAGE_SIZE;
  const currentLessons = lessons.slice(startIdx, startIdx + PAGE_SIZE);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 text-center">Đang tải...</div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        {getTypeText(type)} - {getLevelText(level)}
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentLessons.map((lesson) => (
          <a
            key={lesson.lessonId}
            href={`http://localhost:5000/engzone/lessons/${lesson.lessonId}`}
            className="block bg-white rounded-xl overflow-hidden border hover:shadow-lg transition no-underline"
          >
            <div className="h-40 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
              <span className="text-lg font-semibold text-gray-800 underline">
                {lesson.title.toUpperCase()}
              </span>
            </div>
            <div className="p-4">
              <p className="text-center text-xl font-bold text-gray-900">
                {lesson.title.toUpperCase()}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-white border disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`
              px-4 py-2 rounded border
              ${
                page === num
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }
            `}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded bg-white border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const getTypeText = (type) => {
  switch (type?.toUpperCase()) {
    case "GRAMMAR":
      return "Ngữ pháp";
    case "VOCABULARY":
      return "Từ vựng";
    default:
      return type || "Không xác định";
  }
};

const getLevelText = (level) => {
  switch (level?.toUpperCase()) {
    case "BEGINNER":
      return "Sơ cấp";
    case "INTERMEDIATE":
      return "Trung cấp";
    case "ADVANCE":
      return "Cao cấp";
    default:
      return level || "Không xác định";
  }
};

export default LessonList;
