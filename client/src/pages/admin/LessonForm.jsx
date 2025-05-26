import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LessonForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const emptyFormData = {
    title: "",
    description: "",
    videoFile: null,
    level: "Beginner",
    type: "Grammar",
    // topics: [],
    isPackageRequired: false,
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});
  const [currentTopicInput, setCurrentTopicInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      axios
        .get(`http://localhost:8080/engzone/admin/lessons/${id}`)
        .then((response) => {
          const courseData = response.data;
          setFormData({
            title: courseData.title || "",
            description: courseData.description || "",
            videoFile: courseData.videoFile || "",
            level: courseData.level || "Beginner",
            type: courseData.type || "Grammar",
            // topics: courseData.topics?.length ? courseData.topics : [],
            isPackageRequired: courseData.isPackageRequired || false,
          });
        })
        .catch((error) => {
          console.error("Error fetching course data:", error);
          setErrors((prev) => ({
            ...prev,
            form: "Failed to load course data.",
          }));
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setFormData(emptyFormData);
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.files[0] || null,
      }));
    } else {
      const { value } = e.target;
      let processedValue = value;
      if (type === "checkbox") {
        processedValue = checked;
      } else if (type === "radio" && name === "isPackageRequired") {
        processedValue = value === "true";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: processedValue,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCurrentTopicInputChange = (e) => {
    setCurrentTopicInput(e.target.value);
  };

  const handleAddTopicOnKeyDown = (e) => {
    if (e.key === "Enter" && currentTopicInput.trim() !== "") {
      e.preventDefault();
      const newTopic = currentTopicInput.trim();
      if (!formData.topics.includes(newTopic)) {
        setFormData((prev) => ({
          ...prev,
          topics: [...prev.topics, newTopic],
        }));
      }
      setCurrentTopicInput("");
    }
  };

  const removeTopic = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((_, index) => index !== indexToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Phải nhập tiêu đề bài học";
    // if (!formData.description.trim()) newErrors.description = "Mô tả không được trống";
    if (!isEditing && !formData.videoFile) {
      newErrors.videoFile = "Phải tải video bài học lên";
    }

    // if (!formData.topics || formData.topics.length === 0) {
    //   newErrors.topics = "Bài học phải có ít nhất một chủ đề.";
    // } else {
    //   const hasInvalidTopic = formData.topics.some(
    //     (topic) => !topic || topic.trim() === ""
    //   );
    //   if (hasInvalidTopic) {
    //     newErrors.topics = "Tất cả chủ đề phải có nội dung.";
    //   }
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, form: "" }));

    const submissionData = new FormData();

    submissionData.append("title", formData.title);
    submissionData.append("description", formData.description);
    submissionData.append("level", formData.level);
    submissionData.append("type", formData.type);
    submissionData.append("isPackageRequired", formData.isPackageRequired);

    // submissionData.append(
    //   "topics",
    //   JSON.stringify(formData.topics.filter((topic) => topic.trim() !== ""))
    // );

    if (formData.videoFile instanceof File) {
      submissionData.append("videoFile", formData.videoFile);
    }

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:8080/engzone/admin/lessons/${id}`,
          submissionData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/engzone/admin/lessons",
          submissionData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      console.log("Form submitted successfully:", response.data);
      navigate("/admin/lessons");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      const errorData = error.response?.data;
      if (errorData && typeof errorData === "object") {
        setErrors((prev) => ({
          ...prev,
          ...(errorData.errors || {}),
          form:
            errorData.message || "Submission failed. Please check the form.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "An unexpected error occurred. Please try again.",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing && isLoading && !formData.title) {
    return (
      <div className="container-fluid px-4 text-center">
        <div className="spinner-border text-primary my-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-2">
          {isEditing ? "Cập nhật bài học" : "Thêm bài học"}
        </h1>
        <p className="text-muted">
          {isEditing ? "Cập nhật chi tiết bài học" : "Tạo một bài học mới"}
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {errors.form && (
              <div className="alert alert-danger" role="alert">
                {errors.form}
              </div>
            )}

            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="form-label fw-medium">
                Tiêu đề bài học <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                id="title"
                name="title"
                placeholder="Nhập tiêu đề"
                value={formData.title}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="form-label fw-medium">
                Mô tả
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                placeholder="Nhập mô tả chi tiết cho bài học"
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
              ></textarea>
            </div>

            {/* Row: Level, Type */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label htmlFor="level" className="form-label fw-medium">
                  Trình độ
                </label>
                <select
                  /* ... */ name="level"
                  value={formData.level}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="form-select"
                >
                  <option value="Beginner">Sơ cấp</option>
                  <option value="Intermediate">Trung cấp</option>
                  <option value="Advanced">Cao cấp</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="type" className="form-label fw-medium">
                  Loại bài học
                </label>
                <select
                  /* ... */ name="type"
                  value={formData.type}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="form-select"
                >
                  <option value="Grammar">Ngữ pháp</option>
                  <option value="Vocabulary">Từ vựng</option>
                </select>
              </div>
            </div>

            {/* Video File Upload */}
            <div className="mb-4">
              <label htmlFor="videoFile" className="form-label fw-medium">
                Video bài học
              </label>
              <input
                type="file"
                className={`form-control ${
                  errors.videoFile ? "is-invalid" : ""
                }`}
                id="videoFile"
                name="videoFile"
                accept="video/*"
                onChange={handleChange} // Thuộc tính 'value' đã được bỏ
                disabled={isLoading}
              />
              {formData.videoFile &&
                !(formData.videoFile instanceof File) &&
                typeof formData.videoFile === "string" && (
                  <div className="form-text text-muted mt-1">
                    Video hiện tại: {formData.videoFile.split("/").pop()} (Chọn
                    file mới để thay thế)
                  </div>
                )}
              {errors.videoFile && (
                <div className="invalid-feedback">{errors.videoFile}</div>
              )}
            </div>

            {/* Lesson Topics */}
            {/* <div className="mb-4">
              <label htmlFor="topicInput" className="form-label fw-medium">
                Chủ đề liên quan <span className="text-danger">*</span>
              </label>
              {errors.topics && (
                <div className="mb-2 text-danger small">{errors.topics}</div>
              )}
              <div
                className="d-flex flex-wrap gap-2 mb-2 border p-2 rounded"
                style={{ minHeight: "40px" }}
              >
                {(formData.topics || []).map((topic, index) => (
                  <span
                    key={index}
                    className="badge bg-primary d-flex align-items-center fs-6"
                  >
                    {topic}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      aria-label={`Remove ${topic}`}
                      onClick={() => removeTopic(index)}
                      disabled={isLoading}
                      style={{
                        fontSize: "0.6em",
                        filter: "brightness(0) invert(1)",
                      }}
                    ></button>
                  </span>
                ))}
                {(formData.topics || []).length === 0 && !currentTopicInput && (
                  <span className="text-muted small">
                    Chưa có chủ đề nào...
                  </span>
                )}
              </div>
              <input
                type="text"
                id="topicInput"
                className="form-control"
                placeholder="Nhập chủ đề rồi nhấn Enter"
                value={currentTopicInput}
                onChange={handleCurrentTopicInputChange}
                onKeyDown={handleAddTopicOnKeyDown}
                disabled={isLoading}
              />
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mt-2"
                onClick={() => {
                  if (currentTopicInput.trim() !== "") {
                    const nt = currentTopicInput.trim();
                    if (!formData.topics.includes(nt))
                      setFormData((p) => ({ ...p, topics: [...p.topics, nt] }));
                    setCurrentTopicInput("");
                  }
                }}
                disabled={isLoading || currentTopicInput.trim() === ""}
              >
                <i className="bi bi-plus-circle me-1"></i>Thêm chủ đề
              </button>
            </div> */}

            {/* isPackageRequired Radio Buttons */}
            <div className="mb-4">
              <label className="form-label fw-medium d-block">
                Yêu cầu gói đăng ký?
              </label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="isPackageRequired"
                  id="isPackageRequiredNo"
                  value="false"
                  checked={formData.isPackageRequired === false}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <label
                  className="form-check-label"
                  htmlFor="isPackageRequiredNo"
                >
                  Không
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="isPackageRequired"
                  id="isPackageRequiredYes"
                  value="true"
                  checked={formData.isPackageRequired === true}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <label
                  className="form-check-label"
                  htmlFor="isPackageRequiredYes"
                >
                  Có
                </label>
              </div>
            </div>

            {/* Buttons (Create, Update) */}
            <div className="d-flex justify-content-between border-top pt-4 mt-4">
              <Link
                to="/admin/lessons"
                className="btn btn-outline-secondary"
                disabled={isLoading}
              >
                Hủy
              </Link>
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {isEditing ? "Đang cập nhật..." : "Đang tạo..."}
                  </>
                ) : isEditing ? (
                  "Cập nhật"
                ) : (
                  "Tạo"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LessonForm;
