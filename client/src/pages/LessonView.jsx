import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LessonView = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:8080/engzone/lessons/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLesson(response.data);
      } catch (err) {
        setError("Không thể tải bài học: " + err.message);
      }
    };

    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/engzone/lessons/${id}/exercises`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExercises(response.data);
      } catch (err) {
        setError("Không thể tải bài tập: " + err.message);
      }
    };

    if (id) {
      Promise.all([fetchLesson(), fetchExercises()]).finally(() =>
        setLoading(false)
      );
    } else {
      setError("Thiếu ID bài học trong URL");
      setLoading(false);
    }
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Nhận xét:", comment);
    setComment("");
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!lesson) {
    return <div className="text-center py-10">Không tìm thấy bài học</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center py-6 px-4">
        <div className="w-full max-w-5xl">
          <div className="tabs mb-6 flex space-x-6 border-b">
            <button
              className={`py-2 px-4 text-lg font-semibold border-b-2 ${
                true ? "border-blue-500 text-blue-600" : "border-transparent"
              }`}
            >
              Học bài & Nhận xét
            </button>
            <button
              className={`py-2 px-4 text-lg font-semibold border-b-2 ${
                false ? "border-blue-500 text-blue-600" : "border-transparent"
              }`}
            >
              Bài tập
            </button>
          </div>

          {/* Lesson Section */}
          <h1 className="text-3xl font-bold text-center mb-6">{lesson.title}</h1>

          {/* Video */}
          <div className="flex justify-center mb-8">
            {lesson.videoUrl ? (
              <video
                controls
                className="w-full max-w-4xl h-[70vh] bg-black object-contain rounded-xl shadow"
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
              </video>
            ) : (
              <div className="w-full h-[70vh] flex justify-center items-center bg-gray-800 text-white text-center rounded-xl">
                <div>
                  <div className="text-4xl mb-2">▶</div>
                  <p>Không có video</p>
                </div>
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">Nhận xét</h3>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Nhập nhận xét của bạn về bài học..."
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Gửi nhận xét
              </button>
            </form>
          </div>

          {/* Exercises */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">Danh sách bài tập</h3>
            {exercises.length > 0 ? (
              <ul className="space-y-4">
                {exercises.map((exercise, index) => (
                  <li
                    key={index}
                    className="p-4 bg-white border rounded-lg shadow"
                  >
                    <h5 className="text-xl font-bold">{exercise.title}</h5>
                    <p className="text-gray-700">{exercise.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Không có bài tập nào cho bài học này.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
