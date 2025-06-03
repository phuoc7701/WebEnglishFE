import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LessonView = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [activeTab, setActiveTab] = useState("lesson");

  const apiBackendUrl = "http://localhost:8080/engzone";
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchLessonAndComments = async () => {
      try {
        setLoading(true);
        setError(null);

        const lessonResponse = await axios.get(`${apiBackendUrl}/lessons/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLesson(lessonResponse.data);

        const commentsResponse = await axios.get(
          `${apiBackendUrl}/comments/reference/${id}/LESSON`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(commentsResponse.data);

        // Dữ liệu mẫu bài tập
        setExercises([
          {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correctAnswer: "Paris",
          },
          {
            question: "Which one is a mammal?",
            options: ["Shark", "Dolphin", "Octopus", "Eagle"],
            correctAnswer: "Dolphin",
          },
          {
            question: "Choose the correct past tense of 'go'",
            options: ["goed", "goes", "went", "going"],
            correctAnswer: "went",
          },
          {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "22"],
            correctAnswer: "4",
          },
          {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Venus", "Mars", "Jupiter"],
            correctAnswer: "Mars",
          },
        ]);
      } catch (err) {
        setError("Không thể tải dữ liệu: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLessonAndComments();
    } else {
      setError("Thiếu ID bài học trong URL");
      setLoading(false);
    }
  }, [id]);

  const handleAnswerChange = (questionIndex, answer) => {
    if (submitted) return;
    setUserAnswers({ ...userAnswers, [questionIndex]: answer });
  };

  const handleSubmitAnswers = () => {
    setSubmitted(true);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await axios.post(
        `${apiBackendUrl}/comments`,
        {
          content: comment,
          userId: userId,
          referenceId: id,
          commentType: "LESSON",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, response.data]);
      setComment("");
    } catch (err) {
      setError(
        "Không thể gửi bình luận: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editingContent.trim()) return;

    try {
      const response = await axios.put(
        `${apiBackendUrl}/comments/${commentId}`,
        { content: editingContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(
        comments.map((c) => (c.commentId === commentId ? response.data : c))
      );
      setEditingCommentId(null);
      setEditingContent("");
    } catch (err) {
      setError("Không thể cập nhật bình luận: " + err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${apiBackendUrl}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(comments.filter((c) => c.commentId !== commentId));
    } catch (err) {
      setError("Không thể xóa bình luận: " + err.message);
    }
  };

  if (loading) {
    return <div className="container-fluid px-0 text-center py-5">Đang tải...</div>;
  }

  if (error) {
    return (
      <div className="container-fluid px-0 text-center py-5 text-red-600">
        {error}
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container-fluid px-0 text-center py-5">
        Không tìm thấy bài học
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center text-3xl font-bold">{lesson.title}</h1>

      <div className="tabs mb-6 flex space-x-6 border-b">
        <button
          className={`py-2 px-4 text-lg font-semibold border-b-2 ${
            activeTab === "lesson" ? "border-blue-500 text-blue-600" : "border-transparent"
          }`}
          onClick={() => setActiveTab("lesson")}
        >
          Học bài & Bình luận
        </button>
        <button
          className={`py-2 px-4 text-lg font-semibold border-b-2 ${
            activeTab === "exercises" ? "border-blue-500 text-blue-600" : "border-transparent"
          }`}
          onClick={() => setActiveTab("exercises")}
        >
          Bài tập
        </button>
      </div>

      {/* Tab học bài */}
      {activeTab === "lesson" && (
        <>
          <div className="mb-8 flex justify-center">
            {lesson.videoUrl ? (
              <video
                controls
                style={{
                  width: "90%",
                  height: "85vh",
                  objectFit: "contain",
                  backgroundColor: "black",
                }}
                className="aspect-video"
              >
                <source src={lesson.videoUrl} type="video/mp4" />
                Trình duyệt không hỗ trợ video.
              </video>
            ) : (
              <div className="bg-gray-800 text-white flex items-center justify-center w-full max-w-4xl h-96 rounded-lg">
                <div className="text-center">
                  <i className="bi bi-play-circle text-5xl mb-3"></i>
                  <h5>Không có video</h5>
                </div>
              </div>
            )}
          </div>

          {/* Bình luận */}
          <div className="max-w-4xl mx-auto">
            <h3 className="mb-4 text-2xl font-semibold">Bình luận</h3>
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                className="form-control w-full p-3 border rounded-lg mb-3"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Nhập bình luận của bạn..."
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Gửi bình luận
              </button>
            </form>
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500">Chưa có bình luận nào.</p>
              ) : (
                comments.map((c) => (
                  <div key={c.commentId} className="border p-4 rounded-lg">
                    {editingCommentId === c.commentId ? (
                      <>
                        <textarea
                          className="form-control w-full p-3 border rounded-lg mb-2"
                          rows="3"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                        ></textarea>
                        <button
                          className="btn btn-success mr-2"
                          onClick={() => handleEditComment(c.commentId)}
                        >
                          Lưu
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditingContent("");
                          }}
                        >
                          Hủy
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <span className="font-semibold">{c.username}</span>
                            <span className="text-gray-500 text-sm ml-2">
                              {new Date(c.createdAt).toLocaleString()}
                            </span>
                          </div>
                          {c.userId === userId && (
                            <div>
                              <button
                                className="btn btn-sm btn-outline-primary mr-2"
                                onClick={() => {
                                  setEditingCommentId(c.commentId);
                                  setEditingContent(c.content);
                                }}
                              >
                                Sửa
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteComment(c.commentId)}
                              >
                                Xóa
                              </button>
                            </div>
                          )}
                        </div>
                        <p>{c.content}</p>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Tab bài tập */}
      {activeTab === "exercises" && (
        <div className="max-w-4xl mx-auto">
          <h3 className="mb-6 text-2xl font-semibold">Bài tập trắc nghiệm</h3>
          {exercises.slice(0, 5).map((exercise, index) => {
            const selected = userAnswers[index];
            const isCorrect = selected === exercise.correctAnswer;

            return (
              <div
                key={index}
                className={`mb-6 p-4 border rounded-lg shadow ${
                  submitted ? (isCorrect ? "border-green-500" : "border-red-500") : ""
                }`}
              >
                <h4 className="text-lg font-bold mb-2">
                  Câu {index + 1}: {exercise.question}
                </h4>
                <div className="space-y-2">
                  {exercise.options.map((option, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-center cursor-pointer ${
                        submitted && option === exercise.correctAnswer
                          ? "text-green-600 font-semibold"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        disabled={submitted}
                        checked={userAnswers[index] === option}
                        onChange={() => handleAnswerChange(index, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {submitted && (
                  <p className={`mt-2 ${isCorrect ? "text-green-600" : "text-red-500"}`}>
                    {isCorrect ? "✅ Chính xác" : `❌ Sai. Đáp án đúng: ${exercise.correctAnswer}`}
                  </p>
                )}
              </div>
            );
          })}

          {!submitted && exercises.length > 0 && (
            <button
              className="btn btn-success mt-4"
              onClick={handleSubmitAnswers}
            >
              Nộp bài
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonView;
