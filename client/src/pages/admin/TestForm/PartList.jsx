import PartForm from './PartForm';

const PartList = ({ parts, setParts, errors }) => {
  const addPart = () => {
    setParts([
      ...parts,
      {
        partNumber: parts.length + 1,
        partTitle: `Part ${parts.length + 1}`,
        questions: [
          { question: '', options: ['', '', '', ''], correctAnswer: '' }
        ]
      }
    ]);
  };

  const removePart = (partIdx) => {
    if (parts.length <= 1) return;
    const updatedParts = [...parts];
    updatedParts.splice(partIdx, 1);
    updatedParts.forEach((p, idx) => { p.partNumber = idx + 1; p.partTitle = `Part ${idx + 1}`; });
    setParts(updatedParts);
  };

  const updatePart = (partIdx, newPart) => {
    const updatedParts = [...parts];
    updatedParts[partIdx] = newPart;
    setParts(updatedParts);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <label className="font-medium">Parts</label>
        <button
          type="button"
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200"
          onClick={addPart}
        >
          + Add Part
        </button>
      </div>
      {parts.map((part, partIdx) => (
        <PartForm
          key={partIdx}
          part={part}
          partIdx={partIdx}
          updatePart={updatePart}
          removePart={removePart}
          canRemove={parts.length > 1}
          errors={errors?.[partIdx]}
        />
      ))}
    </div>
  );
};

export default PartList;