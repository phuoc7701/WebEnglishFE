import React from "react";

const TestPartDetail = ({
  part,
  onPartChange,
  onQuestionChange,
  onAddQuestion,
  onDeleteQuestion,
}) => (
  <div className="card mb-3">
    <div className="card-header">
      <b>Phần {part.partNumber}: </b>
      <input
        className="form-control d-inline-block"
        style={{ width: 200, marginLeft: 8 }}
        name="partTitle"
        value={part.partTitle}
        onChange={e => onPartChange({ ...part, partTitle: e.target.value })}
      />
    </div>
    <div className="card-body">
      <p><b>Số câu hỏi:</b> {part.questions.length}</p>
      <ul className="list-group">
        {part.questions.map((q, qIdx) => (
          <li key={q.id || qIdx} className="list-group-item">
            <div>
              <b>Câu {qIdx + 1}:</b>
              <input
                className="form-control my-2"
                value={q.question}
                onChange={e => onQuestionChange(part, qIdx, { ...q, question: e.target.value })}
                placeholder="Nhập nội dung câu hỏi"
              />
              <div className="row">
                {q.options.map((opt, oIdx) => (
                  <div key={oIdx} className="col-6 d-flex align-items-center mb-2">
                    <span className="me-2">{String.fromCharCode(65 + oIdx)}:</span>
                    <input
                      className="form-control"
                      value={opt}
                      onChange={e => {
                        const newOptions = [...q.options];
                        newOptions[oIdx] = e.target.value;
                        onQuestionChange(part, qIdx, { ...q, options: newOptions });
                      }}
                      placeholder={`Đáp án ${String.fromCharCode(65 + oIdx)}`}
                    />
                    <input
                      type="radio"
                      className="form-check-input ms-2"
                      name={`correct-${part.id || part.partNumber}-${qIdx}`}
                      checked={q.correctAnswer === opt}
                      onChange={() =>
                        onQuestionChange(part, qIdx, { ...q, correctAnswer: opt })
                      }
                    />
                    <span className="ms-1">Đúng</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn btn-danger btn-sm mt-2"
                onClick={() => onDeleteQuestion(part, qIdx)}
              >
                Xóa câu hỏi
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn-primary btn-sm mt-3"
        onClick={() => onAddQuestion(part)}
      >
        Thêm câu hỏi
      </button>
    </div>
  </div>
);

export default TestPartDetail;