import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LessonView = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const apiBackendUrl = "http://localhost:8080/engzone";
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchLessonAndComments = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get Lesson
        const lessonResponse = await axios.get(
          `${apiBackendUrl}/lessons/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLesson(lessonResponse.data);

        // Get List Comment
        const commentsResponse = await axios.get(
          `${apiBackendUrl}/comments/reference/${id}/LESSON`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(commentsResponse.data);
      } catch (err) {
        setError("Không thể tải dữ liệu: " + err.message);
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
      console.error("Error response:", err.response?.data);
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
    return (
      <div className="container-fluid px-0 text-center py-5">Đang tải...</div>
    );
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

      {/* Video */}
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

      {/* Comments */}
      <div className="max-w-4xl mx-auto">
        <h3 className="mb-4 text-2xl font-semibold">Bình luận</h3>

        {/* Form gửi bình luận */}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <div className="mb-3">
            <textarea
              className="form-control w-full p-3 border rounded-lg"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập bình luận của bạn..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Gửi bình luận
          </button>
        </form>

        {/* Danh sách bình luận */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">Chưa có bình luận nào.</p>
          ) : (
            comments.map((c) => (
              <div key={c.commentId} className="border p-4 rounded-lg">
                {editingCommentId === c.commentId ? (
                  <div>
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
                  </div>
                ) : (
                  <div>
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
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonView;
