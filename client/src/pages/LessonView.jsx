import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LessonView = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:8080/engzone/lessons/${id}`,
          {
            headers: {
              Authorization: "Bearer your-token-here", // Thay bằng token thực
            },
          }
        );
        setLesson(response.data);
      } catch (err) {
        setError("Không thể tải bài học: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLesson();
    } else {
      setError("Thiếu ID bài học trong URL");
      setLoading(false);
    }
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi nhận xét (có thể gọi API POST ở đây)
    console.log("Nhận xét:", comment);
    setComment("");
  };

  if (loading) {
    return (
      <div className="container-fluid px-0 text-center py-5">Đang tải...</div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid px-0 text-center py-5 text-red-500">
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
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="p-4">
          <h1 className="mb-4 text-center">{lesson.title}</h1>

          {/* Video */}
          <div className="mb-4 d-flex align-items-center justify-content-center">
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
              <div
                className="bg-dark d-flex align-items-center justify-content-center text-white"
                style={{ height: "100vh" }}
              >
                <div className="text-center">
                  <i className="bi bi-play-circle fs-1 mb-3"></i>
                  <h5>Không có video</h5>
                </div>
              </div>
            )}
          </div>

          {/* Comments */}
          <div>
            <h3 className="mb-4">Nhận xét</h3>
            <form onSubmit={handleCommentSubmit}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Nhập nhận xét của bạn về bài học..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Gửi nhận xét
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
