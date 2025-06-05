import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";


const LessonForm = () => {
  const { id } = useParams();
  console.log("Lesson ID:", id);
  const navigate = useNavigate();
  const isEditing = !!id;

  const emptyFormData = {
    title: "",
    description: "",
    videoFile: null,
    videoUrl: "",
    level: "Beginner",
    type: "Grammar",
    // topics: [],
    isPackageRequired: false,
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});
  const [currentTopicInput, setCurrentTopicInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  const [activeTab, setActiveTab] = useState("lessonInfo");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      axios
        .get(`http://localhost:8080/engzone/admin/lessons/${id}`, {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const lessonData = response.data;
          setFormData({
            title: lessonData.title || "",
            description: lessonData.description || "",
            videoFile: null,
            videoUrl: lessonData.videoUrl || "",
            level: lessonData.level || "Beginner",
            type: lessonData.type || "Grammar",
            isPackageRequired: lessonData.packageRequired || false,
          });
          // LẤY DANH SÁCH CÂU HỎI TỪ BACKEND
          setQuestions(
            lessonData.questions && lessonData.questions.length > 0
              ? lessonData.questions.map(q => ({
                ...q,
                correctAnswer: q.correctAnswer?.toString() ?? ""
              }))
              : [{ question: "", options: ["", "", "", ""], correctAnswer: "" }]
          );
        })
        .catch((error) => {
          setErrors((prev) => ({
            ...prev,
            form:
              error.response?.data?.message || "Failed to load course data.",
          }));
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setFormData(emptyFormData);
      setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
    }
  }, [id, isEditing]);

  useEffect(() => {
    // Cleanup videoPreviewUrl khi component unmount hoặc videoFile thay đổi
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const selectedFile = files && files.length > 0 ? files[0] : null;
      // Cập nhật videoPreviewUrl
      if (selectedFile) {
        if (!selectedFile.type.startsWith("video/")) {
          alert("Vui lòng chọn tệp video hợp lệ (ví dụ: MP4, WebM).");
          return;
        }
        console.log(
          "Tệp video được chọn:",
          selectedFile.name,
          selectedFile.type
        );
        const newPreviewUrl = URL.createObjectURL(selectedFile);
        console.log("New videoPreviewUrl:", newPreviewUrl);
        setVideoPreviewUrl((prev) => {
          if (prev) {
            console.log("Thu hồi videoPreviewUrl cũ:", prev);
            URL.revokeObjectURL(prev);
          }
          return newPreviewUrl;
        });
      } else {
        setVideoPreviewUrl((prev) => {
          if (prev) {
            console.log("Thu hồi videoPreviewUrl cũ:", prev);
            URL.revokeObjectURL(prev);
          }
          return null;
        });
      }
      setFormData((prev) => ({
        ...prev,
        [name]: selectedFile,
      }));
      console.log("formData.videoFile:", selectedFile);
    } else {
      let processedValue = value;
      if (type === "checkbox") {
        processedValue = checked;
      } else if (type === "radio" && name === "isPackageRequired") {
        processedValue = value === "true";
      }
      console.log("Processing value for", name, ":", processedValue);
      // Cập nhật formData
      setFormData((prev) => ({
        ...prev,
        [name]: processedValue,
      }));
    }
    // ádsd

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const renderTabs = () => (
    <ul className="nav nav-tabs mb-4">
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "lessonInfo" ? "active" : ""}`}
          onClick={() => setActiveTab("lessonInfo")}
          type="button"
          disabled={isLoading}
        >
          Thông tin bài học
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
          onClick={() => setActiveTab("questions")}
          type="button"
          disabled={isLoading}
        >
          Câu hỏi
        </button>
      </li>
    </ul>
  );


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

    if (!questions || questions.length === 0) {
      newErrors.form = "Phải thêm ít nhất 1 câu hỏi cho bài học.";
    } else {
      questions.forEach((q, idx) => {
        if (!q.question || q.question.trim() === "") {
          newErrors.form = `Câu hỏi số ${idx + 1} chưa nhập nội dung.`;
        }
        if (!q.options || q.options.length !== 4 || q.options.some(opt => !opt || opt.trim() === "")) {
          newErrors.form = `Câu hỏi số ${idx + 1} phải có đủ 4 đáp án và không được để trống.`;
        }
        if (
          q.correctAnswer === "" ||
          isNaN(Number(q.correctAnswer)) ||
          Number(q.correctAnswer) < 0 ||
          Number(q.correctAnswer) > 3
        ) {
          newErrors.form = `Câu hỏi số ${idx + 1} chưa chọn đáp án đúng.`;
        }
      });
    }

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
    submissionData.append(
      "isPackageRequired",
      formData.isPackageRequired ? "true" : "false"
    );

    const questionsForSubmit = questions.map(q => ({
      ...q,
      correctAnswer: q.correctAnswer === "" ? null : Number(q.correctAnswer)
    }));
    submissionData.append("questions", JSON.stringify(questionsForSubmit));




    // submissionData.append(
    //   "topics",
    //   JSON.stringify(formData.topics.filter((topic) => topic.trim() !== ""))
    // );

    if (formData.videoFile instanceof File) {
      submissionData.append("videoFile", formData.videoFile);
    } else if (isEditing && formData.videoUrl) {
      submissionData.append("videoUrl", formData.videoUrl);
    }
    console.log("Data submit:");
    for (let [key, value] of submissionData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      let response;
      if (isEditing) {
        response = await axios.put(
          `http://localhost:8080/engzone/admin/lessons/${id}`,
          submissionData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:8080/engzone/admin/lessons",
          submissionData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
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

  if (isLoading) {
    return (
      <div className="container-fluid px-4 text-center">
        <div className="spinner-border text-primary my-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading data...</p>
      </div>
    );
  }
  if (errors.form && isEditing && !formData.title) {
    return (
      <div className="container-fluid px-4 text-center">
        <div className="alert alert-danger">{errors.form}</div>
        <Link to="/admin/lessons" className="btn btn-outline-secondary">
          Back to list lesson
        </Link>
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
          {renderTabs()}
          {activeTab === "lessonInfo" && (
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
                    <option value="BEGINNER">Sơ cấp</option>
                    <option value="INTERMEDIATE">Trung cấp</option>
                    <option value="ADVANCED">Cao cấp</option>
                  </select>
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
                      <option value="GRAMMAR">Ngữ pháp</option>
                      <option value="VOCABULARY">Từ vựng</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Video File Upload */}
              <div className="mb-4">
                <label htmlFor="videoFile" className="form-label fw-medium">
                  Video bài học <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  className={`form-control ${errors.videoFile ? "is-invalid" : ""
                    }`}
                  id="videoFile"
                  name="videoFile"
                  accept="video/*"
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {videoPreviewUrl && (
                  <div className="mt-3">
                    <video width="500" controls key={videoPreviewUrl}>
                      <source src={videoPreviewUrl} type="video/mp4" />
                      Trình duyệt của bạn không hỗ trợ thẻ video.
                    </video>
                  </div>
                )}
                {isEditing && formData.videoUrl && !formData.videoFile && (
                  <div className="mt-3">
                    <video width="500" controls key={formData.videoUrl}>
                      <source src={formData.videoUrl} />
                    </video>
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
          )}

          {activeTab === "questions" && (
            <div>
              {questions.map((q, i) => (
                <div key={i} className="mb-4 border p-3 rounded">
                  <label className="form-label fw-semibold">Câu hỏi {i + 1} <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nhập câu hỏi"
                    value={q.question}
                    onChange={(e) => {
                      const newQs = [...questions];
                      newQs[i].question = e.target.value;
                      setQuestions(newQs);
                    }}
                  />

                  <h8>Đáp án</h8>

                  {q.options.map((opt, idx) => (
                    <div key={idx} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Lựa chọn ${idx + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const newQs = [...questions];
                          newQs[i].options[idx] = e.target.value;
                          setQuestions(newQs);
                        }}
                      />
                      <div className="input-group-text">
                        <input
                          type="radio"
                          name={`correctAnswer-${i}`}
                          checked={q.correctAnswer === idx.toString()}
                          onChange={() => {
                            const newQs = [...questions];
                            newQs[i].correctAnswer = idx.toString();
                            setQuestions(newQs);
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setQuestions((prev) => prev.filter((_, idx) => idx !== i));
                    }}
                  >
                    Xóa câu hỏi
                  </button>
                </div>
              ))}

              <button
                className="btn btn-primary"
                onClick={() => {
                  setQuestions((prev) => [
                    ...prev,
                    { question: "", options: ["", "", "", ""], correctAnswer: "" },
                  ]);
                }}
              >
                Thêm câu hỏi mới
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonForm;
