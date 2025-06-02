import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";


const EditTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchTest = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/engzone/tests/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTest(res.data);
      } catch (err) {
        setMessage("Không lấy được thông tin bài test.");
      }
      setLoading(false);
    };
    fetchTest();
  }, [id, token]);

  const handleChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const cleanedParts = test.parts.map((part, idx) => ({
      ...(part.id ? { id: part.id } : {}), // giữ lại id nếu có
      partNumber: idx + 1,
      partTitle: part.partTitle,
      questions: part.questions.map((q) => ({
        ...(q.id ? { id: q.id } : {}),
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
    }));

    const dataToSend = {
      title: test.title,
      description: test.description,
      duration: test.duration,
      parts: cleanedParts,
    };

    console.log("DATA SENT TO BACKEND", JSON.stringify(dataToSend, null, 2));

    try {
      await axios.put(
        `http://localhost:8080/engzone/tests/${id}`,
        dataToSend,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Đã cập nhật thành công!");
      setTimeout(() => navigate("/admin/tests"), 1200);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Cập nhật thất bại!"
      );
      console.error("BACKEND ERROR", err.response?.data);
    }
    setSaving(false);
  };
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 300 }}>
        <div className="spinner-border text-primary" />
      </div>
    );
  if (!test)
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{message || "Không tìm thấy bài test."}</div>
      </div>
    );

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2 className="fw-bold mb-0">
          <i className="bi bi-pencil-square me-2 text-primary"></i>Chỉnh sửa Bài Test
        </h2>
        <Link to={`/admin/tests/${test.id}`} className="btn btn-outline-secondary">
          <i className="bi bi-eye me-1"></i> Xem chi tiết
        </Link>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-3">
              <label className="form-label fw-semibold">Tiêu đề</label>
              <input
                className="form-control"
                name="title"
                value={test.title || ""}
                onChange={handleChange}
                required
                maxLength={100}
                placeholder="Nhập tiêu đề bài test"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Mô tả</label>
              <textarea
                className="form-control"
                name="description"
                value={test.description || ""}
                onChange={handleChange}
                rows={3}
                required
                placeholder="Nhập mô tả bài test"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Thời lượng (phút)</label>
              <input
                className="form-control"
                name="duration"
                type="number"
                min={1}
                value={test.duration || ""}
                onChange={handleChange}
                required
                placeholder="Nhập thời lượng"
              />
            </div>
            {/* Thêm các trường khác nếu muốn ở đây */}
            <div className="d-flex gap-2 align-items-center">
              <button
                className="btn btn-primary px-4"
                type="submit"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="bi bi-save me-2"></i>Lưu thay đổi
                  </>
                )}
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => navigate(-1)}
                disabled={saving}
              >
                <i className="bi bi-arrow-left me-1"></i> Quay lại
              </button>
            </div>
            {message && (
              <div className={`alert mt-3 ${message.includes('thành công') ? "alert-success" : "alert-danger"}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTest;