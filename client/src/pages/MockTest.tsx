import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ToeicTestPage() {
  const [parts, setParts] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentPart, setCurrentPart] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [highlight, setHighlight] = useState(true);
  const [timer, setTimer] = useState(45 * 60);
  const { id } = useParams();
  const [testName, setTestName] = useState("");
  const navigate = useNavigate();

  // Lấy đề thi từ backend, SẮP XẾP PARTS theo partNumber
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/engzone/tests/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        // Sắp xếp parts theo partNumber tăng dần
        const sortedParts = [...data.parts].sort((a, b) => a.partNumber - b.partNumber);
        const allQuestions = sortedParts
          .flatMap((part) =>
            (Array.isArray(part.questions) ? part.questions : []).map((q) => ({
              id: q.id,
              number: q.number ?? q.question,
              content: q.content ?? q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              partNumber: part.partNumber,
            }))
          );
        setTestName(data.title || "Tên bài thi");
        setParts(sortedParts);
        setQuestions(allQuestions);
        setTimer((data.duration || 45) * 60);
      } catch (error) {
        console.error("Failed to fetch test:", error);
      }
    };
    fetchTest();
  }, [id]);

  const handleSubmit = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn nộp bài không?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8080/engzone/tests/submit",
        {
          testId: id,
          answers: answers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        alert(`Nộp bài thành công!\nĐiểm của bạn: ${res.data.score}`);
        navigate("/account");
      } else {
        alert("Nộp bài thất bại, vui lòng thử lại.");
      }
    } catch (err) {
      alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.");
    }
  };

  // Lấy part hiện tại
  const part = parts[currentPart];
  const partQuestions = part
    ? questions.filter((q) => q.partNumber === part.partNumber)
    : [];
  const sidebarParts = parts.map((part) => ({
    name: part.partTitle,
    from: part.questions[0]?.number ?? 1,
    to: part.questions[part.questions.length - 1]?.number ?? 1,
  }));

  // Timer
  useEffect(() => {
    if (timer === 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  // format mm:ss
  const formatTime = (time) => {
    const mm = String(Math.floor(time / 60)).padStart(2, "0");
    const ss = String(time % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fafbfc" }}>
      {/* Main section */}
      <div style={{ flex: 1, padding: 16 }}>
        {/* Header */}
        <div style={{
          fontWeight: "bold",
          fontSize: "2rem",
          marginBottom: 20,
          color: "#2563eb"
        }}>{testName}</div>

        {/* Test Controls */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <label style={{ display: "flex", alignItems: "center", fontSize: 15, fontWeight: 500 }}>
            <input
              type="checkbox"
              style={{ marginRight: 8 }}
              checked={highlight}
              onChange={() => setHighlight(h => !h)}
            />
            <span className="italic font-semibold">Highlight nội dung</span>
            <span
              style={{
                marginLeft: 8,
                color: "#aaa",
                cursor: "pointer"
              }}
              title="Chức năng đánh dấu nội dung quan trọng"
            >?</span>
          </label>
          <div style={{ flex: 1 }}></div>
          {/* Tabs */}
          <div>
            {parts.map((p, idx) => (
              <button
                key={idx}
                style={{
                  padding: "8px 20px",
                  marginRight: 8,
                  borderRadius: 6,
                  border: "1px solid #2563eb",
                  background: currentPart === idx ? "#2563eb" : "#fff",
                  color: currentPart === idx ? "#fff" : "#2563eb",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
                onClick={() => {
                  setCurrentPart(idx);
                  setCurrentQuestion(partQuestions[0]?.number ?? 1);
                }}
              >
                {p.partTitle}
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        {partQuestions.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", fontStyle: "italic", marginTop: 32 }}>
            Không có câu hỏi cho phần này.
          </div>
        ) : (
          partQuestions.map((q, idx) => (
            <div
              key={q.id}
              style={{
                marginBottom: 36,
                borderBottom: "1px solid #eee",
                paddingBottom: 24,
                background: highlight ? "#f7fafe" : "transparent"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{
                  color: "#2563eb",
                  fontWeight: "bold",
                  fontSize: 20,
                  border: "1px solid #ddd",
                  background: "#f3f4f6",
                  borderRadius: 6,
                  padding: "0 10px",
                  marginRight: 12
                }}>
                  {q.number}
                </span>
                <span style={{ fontSize: 17 }}>{q.content}</span>
              </div>
              <div style={{ marginLeft: 40, marginTop: 6 }}>
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} style={{ marginBottom: 6, display: "flex", alignItems: "center" }}>
                    <input
                      type="radio"
                      id={`q${q.number}_opt${optIdx}`}
                      name={`q${q.number}`}
                      style={{ marginRight: 8 }}
                      checked={answers[q.number] === opt}
                      onChange={() => setAnswers(a => ({ ...a, [q.number]: opt }))}
                    />
                    <label htmlFor={`q${q.number}_opt${optIdx}`}>{opt}</label>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sidebar */}
      <div style={{
        width: 260,
        borderLeft: "1px solid #eee",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "30px 20px 20px 20px"
      }}>
        {/* Timer */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 15, color: "#888", fontWeight: 600, marginBottom: 3 }}>Thời gian làm bài:</div>
          <div style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#111",
            marginBottom: 16
          }}>{formatTime(timer)}</div>
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              background: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: 6,
              padding: "10px 0",
              marginBottom: 10,
              cursor: "pointer"
            }}
          >NỘP BÀI</button>
          <div style={{ fontSize: 12, color: "#d32f2f", marginBottom: 3 }}>Khôi phục/lưu bài làm &gt;</div>
          <div style={{ fontSize: 12, color: "#f59e42" }}>
            <b>Chú ý:</b> bạn có thể click vào số thứ tự câu hỏi trong bảng để đánh dấu review
          </div>
        </div>

        {/* Question Numbers by Part */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {sidebarParts.map((sp, idx) => (
            <div key={idx} style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{sp.name}</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {Array.from(
                  { length: sp.to - sp.from + 1 },
                  (_, i) => sp.from + i
                ).map((num) => (
                  <button
                    key={num}
                    style={{
                      width: 38,
                      height: 38,
                      margin: 3,
                      borderRadius: 6,
                      fontWeight: 600,
                      fontSize: 15,
                      border:
                        answers[num]
                          ? "2px solid #2563eb"
                          : "1px solid #ccc",
                      background:
                        num === currentQuestion
                          ? "#e3ebfd"
                          : answers[num]
                          ? "#dbeafe"
                          : "#fff",
                      color: answers[num] ? "#2563eb" : "#333",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      setCurrentPart(idx);
                      setCurrentQuestion(num);
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}