import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, data } from 'react-router-dom';
import axios from 'axios';
import TestPartDetail from './TestPartDetail';

const TestPart = () => {
  const { id } = useParams(); // id là partId
  const navigate = useNavigate();
  const [part, setPart] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {

    axios.get(`http://localhost:8080/engzone/test-parts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

      .then(res => {
        // console.log(res.data);    // Đặt log ở đây
        setPart(res.data);
      })
      .catch(() => setPart(null));

  }, [id, token]);

  if (!part) return <div>Không tìm thấy phần này.</div>;

  // Thay đổi thông tin part (vd: tiêu đề phần)
  const onPartChange = (newPart) => {
    setPart(newPart);
  };

  // Thay đổi một câu hỏi trong mảng questions
  const onQuestionChange = (partObj, qIdx, newQ) => {
    const newQuestions = [...(part.questions || [])];
    newQuestions[qIdx] = newQ;
    setPart({ ...part, questions: newQuestions });
  };

  // Thêm câu hỏi mới
  const onAddQuestion = () => {
    const newQuestions = [
      ...(part.questions || []),
      {
        id: null,           // Để null cho backend tự sinh (nếu cần)
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      }
    ];
    setPart({ ...part, questions: newQuestions });
  };

  // Xoá câu hỏi
  const onDeleteQuestion = (partObj, qIdx) => {
    const newQuestions = (part.questions || []).filter((_, idx) => idx !== qIdx);
    setPart({ ...part, questions: newQuestions });
  };

  const hasEmptyField = obj =>
    Object.values(obj).some(
      val =>
        val === null ||
        val === undefined ||
        (typeof val === 'string' && val.trim() === '') ||
        (Array.isArray(val) && val.length === 0)
    );

  const onSave = async () => {
    console.log("Questions:", part.questions);
    for (const [idx, q] of (part.questions || []).entries()) {
      // Kiểm tra nội dung câu hỏi
      if (!q.question || q.question.trim() === '') {
        setMessage(`Câu hỏi số ${idx + 1} bị thiếu nội dung!`);
        return;
      }
    }
    for (const [idx, q] of (part.questions || []).entries()) {
      if (!q.correctAnswer || q.correctAnswer.trim() === '') {
        setMessage(`Câu hỏi số ${idx + 1} bị thiếu đáp án!`);
        return;
      }
    }


    setSaving(true);
    setMessage('');
    try {
      // console.log("Dữ liệu gửi lên:", part);
      await axios.put(
        `http://localhost:8080/engzone/test-parts/${id}`,
        part,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Sau khi lưu thành công, chuyển về trang test cha:
      if (part.testId) {
        navigate(`/admin/tests/${part.testId}`);
      } else {
        setMessage('Không tìm thấy test cha để chuyển về!');
      }
    } catch (err) {
      console.error("Error when saving:", err);
      setMessage('Lưu thất bại. Vui lòng thử lại.');
    }
    setSaving(false);
  };

  // Quay lại trang trước
  const onBack = () => navigate(-1);

  return (
    <div>
      <TestPartDetail
        part={part}
        onPartChange={onPartChange}
        onQuestionChange={onQuestionChange}
        onAddQuestion={onAddQuestion}
        onDeleteQuestion={onDeleteQuestion}
      />
      <div className="d-flex mb-3 gap-2">
        <button className="btn btn-primary" onClick={onSave} disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu"}
        </button>
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Quay lại
        </button>
        {message && <div className="alert alert-info py-1 px-3 mb-0 ms-3">{message}</div>}
      </div>
    </div>
  );
};

export default TestPart;