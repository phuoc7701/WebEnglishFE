const QuestionForm = ({ question, qIdx, updateQuestion, removeQuestion, canRemove, errors }) => {
  const handleChange = (field, value) => {
    updateQuestion(qIdx, { ...question, [field]: value });
  };

  const handleOptionChange = (oIdx, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[oIdx] = value;
    updateQuestion(qIdx, { ...question, options: updatedOptions });
  };

  return (
    <div className="bg-white rounded shadow p-4 mb-3">
      <div className="flex justify-between items-center mb-2">
        <h6 className="font-semibold">Question {qIdx + 1}</h6>
        <button
          type="button"
          className="text-red-600 border border-red-200 rounded px-2 py-0.5 text-sm hover:bg-red-100"
          onClick={() => removeQuestion(qIdx)}
          disabled={!canRemove}
        >
          Remove
        </button>
      </div>
      <div className="mb-2">
        <input
          type="text"
          className={`w-full border ${errors?.question ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
          placeholder="Enter question text"
          value={question.question}
          onChange={e => handleChange('question', e.target.value)}
        />
        {errors?.question && <div className="text-red-500 text-sm mt-1">{errors.question}</div>}
      </div>
      <div className="mb-2">
        <label className="font-medium text-sm">Answer Options</label>
        {errors?.options && <div className="text-red-500 text-xs mb-1">{errors.options}</div>}
        {question.options.map((option, oIdx) => (
          <div className="flex items-center mb-1" key={oIdx}>
            <span className="w-6">{String.fromCharCode(65 + oIdx)}</span>
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-2 py-1"
              placeholder={`Option ${oIdx + 1}`}
              value={option}
              onChange={e => handleOptionChange(oIdx, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="mb-2">
        <label className="font-medium text-sm">Correct Answer</label>
        <select
          className={`w-full border ${errors?.correctAnswer ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
          value={question.correctAnswer}
          onChange={e => handleChange('correctAnswer', e.target.value)}
        >
          <option value="">Select correct answer</option>
          {question.options.map((option, oIdx) => (
            <option key={oIdx} value={option} disabled={!option.trim()}>
              {String.fromCharCode(65 + oIdx)}: {option || '(empty)'}
            </option>
          ))}
        </select>
        {errors?.correctAnswer && <div className="text-red-500 text-sm mt-1">{errors.correctAnswer}</div>}
      </div>
    </div>
  );
};

export default QuestionForm;