import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminLessons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState(null); // Thông báo thành công/lỗi
  const pageSize = 10;

  // Lấy danh sách bài học từ API
  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://localhost:8080/engzone/admin/lessons",
          {
            params: {
              page: page - 1, // API bắt đầu từ 0
              size: pageSize,
            },
            headers: {
              Authorization: "Bearer <your-token>", // Thay bằng token thực tế
            },
          }
        );
        setLessons(response.data.content || response.data);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        setError(
          err.response?.data?.message || "Không tải được danh sách bài học"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [page]);

  // Xử lý xóa bài học
  const handleDelete = async (lessonId) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài học này?")) return;

    setLoading(true);
    setMessage(null);
    try {
      await axios.delete(
        `http://localhost:8080/engzone/admin/lessons/${lessonId}`,
        {
          headers: {
            Authorization: "Bearer <your-token>", // Thay bằng token thực tế
          },
        }
      );
      // Cập nhật danh sách bài học
      setLessons(lessons.filter((lesson) => lesson.lessonId !== lessonId));
      setMessage({ type: "success", text: "Xóa bài học thành công!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Không xóa được bài học",
      });
    } finally {
      setLoading(false);
    }
  };

  // Lọc bài học theo search term
  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-2">Quản lý bài học</h1>
          <p className="text-muted">Tạo, chỉnh sửa và quản lý bài học.</p>
        </div>
        <Link to="/admin/lessons/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Thêm bài học mới
        </Link>
      </div>

      {/* Search */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm bài học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Thông báo */}
      {message && (
        <div
          className={`alert alert-${
            message.type === "success" ? "success" : "danger"
          } mb-4`}
        >
          {message.text}
        </div>
      )}

      {/* Lessons Table */}
      <div className="card mb-4">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger m-3">{error}</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="ps-4">
                      STT
                    </th>
                    <th scope="col">bài học</th>
                    <th scope="col">Trình độ</th>
                    <th scope="col">Loại</th>
                    <th scope="col">Yêu cầu gói</th>
                    <th scope="col" className="text-end pe-4">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLessons.length > 0 ? (
                    filteredLessons.map((lesson, index) => (
                      <tr key={lesson.lessonId}>
                        <td className="ps-4">
                          {(page - 1) * pageSize + index + 1}
                        </td>
                        <td>
                          <div>
                            <h6 className="mb-0 fw-bold">{lesson.title}</h6>
                            <small className="text-muted">
                              {lesson.description.substring(0, 60)}...
                            </small>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge bg-${getLevelColorClass(
                              lesson.level
                            )}-subtle text-${getLevelColorClass(
                              lesson.level
                            )} rounded-pill px-3 py-2`}
                          >
                            {lesson.level}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge bg-${getTypeColorClass(
                              lesson.type
                            )}-subtle text-${getTypeColorClass(
                              lesson.type
                            )} rounded-pill px-3 py-2`}
                          >
                            {lesson.type}
                          </span>
                        </td>
                        <td>{lesson.packageRequired ? "Có" : "Không"}</td>
                        <td className="text-end pe-4">
                          <Link
                            to={`/admin/lessons/edit/${lesson.lessonId}`}
                            className="btn btn-sm btn-outline-primary me-2"
                            title="Chỉnh sửa"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(lesson.lessonId)}
                            title="Xóa"
                            disabled={loading}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <i className="bi bi-journal-x fs-1 text-muted mb-3 d-block"></i>
                        <h5>Không tìm thấy bài học</h5>
                        <p className="text-muted">
                          Thử điều chỉnh tiêu chí tìm kiếm
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!loading && filteredLessons.length > 0 && (
        <nav aria-label="Lessons pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Trước
              </button>
            </li>
            {[...Array(totalPages).keys()].map((p) => (
              <li
                key={p + 1}
                className={`page-item ${page === p + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(p + 1)}
                >
                  {p + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${page === totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Sau
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

const getLevelColorClass = (level) => {
  switch (level.toLowerCase()) {
    case "beginner":
      return "primary";
    case "intermediate":
      return "info";
    case "advanced":
      return "warning";
    default:
      return "primary";
  }
};

const getTypeColorClass = (level) => {
  switch (level.toLowerCase()) {
    case "grammar":
      return "warning";
    case "vocabulary":
      return "danger";
    default:
      return "primary";
  }
};

export default AdminLessons;
