import QuestionForm from './QuestionForm';

const PartForm = ({ part, partIdx, updatePart, removePart, canRemove, errors }) => {
  const handlePartTitleChange = (value) => {
    updatePart(partIdx, { ...part, partTitle: value });
  };

  const addQuestion = () => {
    updatePart(partIdx, {
      ...part,
      questions: [
        ...part.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: '' }
      ]
    });
  };

  const removeQuestion = (qIdx) => {
    if (part.questions.length <= 1) return;
    const updatedQuestions = [...part.questions];
    updatedQuestions.splice(qIdx, 1);
    updatePart(partIdx, { ...part, questions: updatedQuestions });
  };

  const updateQuestion = (qIdx, newQ) => {
    const updatedQuestions = [...part.questions];
    updatedQuestions[qIdx] = newQ;
    updatePart(partIdx, { ...part, questions: updatedQuestions });
  };

  return (
    <div className="bg-gray-50 rounded p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          className="font-bold text-lg px-2 py-1 border border-gray-300 rounded w-[200px]"
          value={part.partTitle}
          onChange={e => handlePartTitleChange(e.target.value)}
        />
        <button
          type="button"
          className="text-red-600 border border-red-200 rounded px-2 py-0.5 text-sm hover:bg-red-100 ml-2"
          onClick={() => removePart(partIdx)}
          disabled={!canRemove}
        >
          Remove Part
        </button>
      </div>
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium">Questions</span>
          <button
            type="button"
            className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200"
            onClick={addQuestion}
          >
            + Add Question
          </button>
        </div>
        {part.questions.map((question, qIdx) => (
          <QuestionForm
            key={qIdx}
            question={question}
            qIdx={qIdx}
            updateQuestion={updateQuestion}
            removeQuestion={removeQuestion}
            canRemove={part.questions.length > 1}
            errors={errors?.[qIdx]}
          />
        ))}
      </div>
    </div>
  );
};

export default PartForm;