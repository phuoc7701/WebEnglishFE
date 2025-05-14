import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tests, courses } from '../../mockData';

const TestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const emptyFormData = {
    title: '',
    description: '',
    courseId: '',
    duration: '',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      }
    ]
  };
  
  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (isEditing) {
      const testData = tests.find(t => t.id === parseInt(id));
      if (testData) {
        // Convert courseId to string for select input
        setFormData({
          ...testData,
          courseId: testData.courseId.toString()
        });
      }
    }
  }, [id, isEditing]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error on input change
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    
    if (field === 'question') {
      updatedQuestions[index].question = value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = value;
    }
    
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };
  
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };
  
  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: ''
        }
      ]
    }));
  };
  
  const removeQuestion = (index) => {
    if (formData.questions.length <= 1) {
      return; // Don't remove if it's the only question
    }
    
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.courseId) newErrors.courseId = 'Course selection is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    
    // Validate questions
    const questionErrors = [];
    formData.questions.forEach((q, index) => {
      const qErrors = {};
      
      if (!q.question.trim()) qErrors.question = 'Question text is required';
      
      const emptyOptions = q.options.some(opt => !opt.trim());
      if (emptyOptions) qErrors.options = 'All options must have content';
      
      if (!q.correctAnswer.trim()) qErrors.correctAnswer = 'Correct answer is required';
      else if (!q.options.includes(q.correctAnswer)) {
        qErrors.correctAnswer = 'Correct answer must match one of the options';
      }
      
      if (Object.keys(qErrors).length > 0) {
        questionErrors[index] = qErrors;
      }
    });
    
    if (questionErrors.length > 0) {
      newErrors.questions = questionErrors;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically save the data to your backend
      // For this mock implementation, we just log it and redirect
      console.log('Test form submitted:', formData);
      
      navigate('/admin/tests');
    }
  };
  
  return (
    <div className="container-fluid px-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-2">{isEditing ? 'Edit Test' : 'Add New Test'}</h1>
        <p className="text-muted">{isEditing ? 'Update your assessment test' : 'Create a new assessment test for your courses'}</p>
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
              <label htmlFor="courseId" className="form-label fw-medium">Course</label>
              <select
                className={`form-select ${errors.courseId ? 'is-invalid' : ''}`}
                id="courseId"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
              >
                <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
              {errors.courseId && <div className="invalid-feedback">{errors.courseId}</div>}
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
            
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="form-label fw-medium m-0">Questions</label>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={addQuestion}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Question
                </button>
              </div>
              
              {formData.questions.map((question, qIndex) => (
                <div key={qIndex} className="card mb-4 border-0 bg-light">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h6 className="fw-bold">Question {qIndex + 1}</h6>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeQuestion(qIndex)}
                        disabled={formData.questions.length <= 1}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control ${errors.questions?.[qIndex]?.question ? 'is-invalid' : ''}`}
                        placeholder="Enter question text"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                      />
                      {errors.questions?.[qIndex]?.question && (
                        <div className="invalid-feedback">{errors.questions[qIndex].question}</div>
                      )}
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">Answer Options</label>
                      {errors.questions?.[qIndex]?.options && (
                        <div className="text-danger small mb-2">{errors.questions[qIndex].options}</div>
                      )}
                      
                      {question.options.map((option, oIndex) => (
                        <div className="input-group mb-2" key={oIndex}>
                          <span className="input-group-text">
                            {String.fromCharCode(65 + oIndex)}
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Option ${oIndex + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="mb-2">
                      <label className="form-label">Correct Answer</label>
                      <select
                        className={`form-select ${errors.questions?.[qIndex]?.correctAnswer ? 'is-invalid' : ''}`}
                        value={question.correctAnswer}
                        onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                      >
                        <option value="">Select correct answer</option>
                        {question.options.map((option, oIndex) => (
                          <option key={oIndex} value={option} disabled={!option.trim()}>
                            {String.fromCharCode(65 + oIndex)}: {option || '(empty)'}
                          </option>
                        ))}
                      </select>
                      {errors.questions?.[qIndex]?.correctAnswer && (
                        <div className="invalid-feedback">{errors.questions[qIndex].correctAnswer}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
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
