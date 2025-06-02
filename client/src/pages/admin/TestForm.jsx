import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PartList from './TestForm/PartList';

const emptyFormData = {
  title: '',
  description: '',
  duration: '',
  parts: [
    {
      partNumber: 1,
      partTitle: 'Part 1',
      questions: [
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: ''
        }
      ]
    }
  ]
};

const TestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (isEditing) {
      const testData = tests.find(t => t.id === parseInt(id));
      if (testData) setFormData({ ...testData });
    }
  }, [id, isEditing]);

  // Validate logic như hướng dẫn bên trên
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';

    const partErrors = [];
    formData.parts.forEach((part, partIdx) => {
      const questionsErr = [];
      part.questions.forEach((q, qIdx) => {
        const qErrors = {};
        if (!q.question.trim()) qErrors.question = 'Question text is required';
        const emptyOptions = q.options.some(opt => !opt.trim());
        if (emptyOptions) qErrors.options = 'All options must have content';
        if (!q.correctAnswer.trim()) qErrors.correctAnswer = 'Correct answer is required';
        else if (!q.options.includes(q.correctAnswer)) {
          qErrors.correctAnswer = 'Correct answer must match one of the options';
        }
        if (Object.keys(qErrors).length > 0) questionsErr[qIdx] = qErrors;
      });
      if (questionsErr.length > 0) partErrors[partIdx] = questionsErr;
    });
    if (partErrors.length > 0) newErrors.parts = partErrors;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Callback để update các part
  const handlePartsChange = (newParts) => {
    setFormData(prev => ({ ...prev, parts: newParts }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log("formData:", formData);
        console.log(JSON.stringify(formData))
        await axios.post(
          'http://localhost:8080/engzone/tests',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        navigate('/admin/tests');
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error(error);
      }
    }
  };

  return (
    <div className="container-fluid px-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-2">{isEditing ? 'Edit Test' : 'Add New Test'}</h1>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label fw-medium">Test Title</label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                id="title"
                name="title"
                placeholder="Enter test title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="form-label fw-medium">Description</label>
              <textarea
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                id="description"
                name="description"
                rows="3"
                placeholder="Enter test description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="form-label fw-medium">Duration</label>
              <input
                type="text"
                className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                id="duration"
                name="duration"
                placeholder="e.g., 15 min"
                value={formData.duration}
                onChange={handleChange}
              />
              {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
            </div>
            {/* Part list component */}
            <PartList
              parts={formData.parts}
              setParts={handlePartsChange}
              errors={errors.parts}
            />
            <div className="d-flex justify-content-between border-top pt-4 mt-4">
              <Link to="/admin/tests" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary px-4">
                {isEditing ? 'Update Test' : 'Create Test'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestForm;