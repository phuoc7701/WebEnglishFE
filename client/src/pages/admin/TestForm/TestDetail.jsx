import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const TestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
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

  // Thêm part mới
  const onAddPart = async () => {
    if (!test || !test.parts) return;
    const partTitle = prompt("Nhập tên phần mới:", `Part ${test.parts.length + 1}`);
    if (!partTitle) {
      setMessage("Tên phần không được bỏ trống!");
      return;
    }
    try {
      setMessage('');
      const newPart = {
        partNumber: test.parts.length + 1,
        partTitle: partTitle,
        testId: test.id, // test.id phải là UUID string, giống kiểu UUID trong Java
        questions: []
      };
      await axios.post(
        'http://localhost:8080/engzone/test-parts',
        newPart,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Fetch lại test để cập nhật danh sách phần mới nhất
      const res = await axios.get(`http://localhost:8080/engzone/tests/${test.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTest(res.data);
      setMessage('Đã thêm phần mới!');
    } catch (err) {
      setMessage(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Thêm phần mới thất bại!'
      );
    }
  };

  // Xóa part
  const onDeletePart = async (partId, idx) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa phần này?")) return;
    try {
      setMessage('');
      await axios.delete(`http://localhost:8080/engzone/test-parts/${partId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTest(prev => ({
        ...prev,
        parts: prev.parts.filter((_, i) => i !== idx)
      }));
      setMessage('Đã xóa phần thành công!');
    } catch (err) {
      setMessage('Xóa phần thất bại!');
    }
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
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">{test.title}</h2>
          <span className="badge bg-primary-subtle text-primary-emphasis px-3 py-2 fs-6 mt-2">
            Thời lượng: {test.duration} phút
          </span>
        </div>
        <div>
          <Link to={`/admin/tests/edit/${test.id}`} className="btn btn-outline-primary me-2">
            <i className="bi bi-pencil-square me-1"></i> Chỉnh sửa
          </Link>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-1"></i> Quay lại
          </button>
        </div>
      </div>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <p className="mb-3">
            <i className="bi bi-info-circle text-info me-2"></i>
            <span className="text-muted">{test.description}</span>
          </p>
          <div className="mb-2">
            <span className="badge bg-success-subtle text-success-emphasis fs-6">
              Tổng số câu hỏi:{" "}
              {test.parts
                ? test.parts.reduce((acc, part) => acc + (part.questions ? part.questions.length : 0), 0)
                : (test.questions ? test.questions.length : 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Hiển thị danh sách các phần và câu hỏi */}
      {test.parts && Array.isArray(test.parts) && (
        <div>
          {/* <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-semibold mb-0">Danh sách các phần</h5>
            <button className="btn btn-success" onClick={onAddPart}>
              <i className="bi bi-plus-circle me-1"></i> Thêm phần mới
            </button>
          </div> */}
          <div className="row gy-4">
            {test.parts.map((part, idx) => (
              <div className="col-md-6" key={part.id || idx}>
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <h6 className="mb-0 fw-bold">
                        <Link to={`/admin/tests/part/${part.id}`} className="btn btn-outline-primary me-2">
                          {part.partTitle || "Part " + (idx + 1)}
                        </Link>
                      </h6>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => onDeletePart(part.id, idx)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <div className="mb-2 text-muted">Số câu hỏi: {part.questions?.length || 0}</div>
                    {part.questions && part.questions.length > 0 && (
                      <ul className="list-group list-group-flush small">
                        {part.questions.map((q, qIdx) => (
                          <li className="list-group-item" key={q.id || qIdx}>
                            <i className="bi bi-question-circle me-1 text-primary"></i>
                            {q.content || q.question || "Không có nội dung"}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nếu không chia part mà có trực tiếp test.questions */}
      {test.questions && Array.isArray(test.questions) && (
        <div>
          <h5 className="fw-semibold mb-3">Danh sách câu hỏi</h5>
          <ul className="list-group list-group-flush">
            {test.questions.map((q, qIdx) => (
              <li className="list-group-item" key={q.id || qIdx}>
                <i className="bi bi-question-circle me-1 text-primary"></i>
                {q.content || q.question || "Không có nội dung"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {message && (
        <div className="alert alert-info py-1 px-3 mt-3">{message}</div>
      )}
    </div>
  );
};

export default TestDetail;