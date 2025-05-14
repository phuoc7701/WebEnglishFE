import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courses } from '../../mockData';

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const emptyFormData = {
    title: '',
    description: '',
    level: 'Beginner',
    totalLessons: 0,
    duration: '',
    imageUrl: '',
    topics: [''],
    rating: 0,
    progress: 0
  };
  
  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});
  const [topicCount, setTopicCount] = useState(1);
  
  useEffect(() => {
    if (isEditing) {
      const courseData = courses.find(c => c.id === parseInt(id));
      if (courseData) {
        setFormData(courseData);
        setTopicCount(courseData.topics?.length || 1);
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
  
  const handleTopicChange = (index, value) => {
    const updatedTopics = [...formData.topics || []];
    updatedTopics[index] = value;
    
    setFormData(prev => ({
      ...prev,
      topics: updatedTopics
    }));
  };
  
  const addTopic = () => {
    setFormData(prev => ({
      ...prev,
      topics: [...(prev.topics || []), '']
    }));
    setTopicCount(prev => prev + 1);
  };
  
  const removeTopic = (index) => {
    const updatedTopics = [...formData.topics || []];
    updatedTopics.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      topics: updatedTopics
    }));
    setTopicCount(prev => prev - 1);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.imageUrl) newErrors.imageUrl = 'Image URL is required';
    
    // Check if any topic is empty
    const hasEmptyTopic = formData.topics?.some(topic => !topic.trim());
    if (hasEmptyTopic) newErrors.topics = 'All topics must have content';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically save the data to your backend
      // For this mock implementation, we just log it and redirect
      console.log('Form submitted:', formData);
      
      navigate('/admin/courses');
    }
  };
  
  return (
    <div className="container-fluid px-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-2">{isEditing ? 'Edit Course' : 'Add New Course'}</h1>
        <p className="text-muted">{isEditing ? 'Update your course details' : 'Create a new course for your platform'}</p>
      </div>
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label fw-medium">Course Title</label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                id="title"
                name="title"
                placeholder="Enter course title"
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
                rows="4"
                placeholder="Enter course description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            
            <div className="row mb-4">
              <div className="col-md-4">
                <label htmlFor="level" className="form-label fw-medium">Level</label>
                <select
                  className="form-select"
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              
              <div className="col-md-4">
                <label htmlFor="totalLessons" className="form-label fw-medium">Total Lessons</label>
                <input
                  type="number"
                  className="form-control"
                  id="totalLessons"
                  name="totalLessons"
                  min="0"
                  value={formData.totalLessons}
                  onChange={handleChange}
                />
              </div>
              
              <div className="col-md-4">
                <label htmlFor="duration" className="form-label fw-medium">Duration</label>
                <input
                  type="text"
                  className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                  id="duration"
                  name="duration"
                  placeholder="e.g., 8 weeks"
                  value={formData.duration}
                  onChange={handleChange}
                />
                {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="imageUrl" className="form-label fw-medium">Course Image URL</label>
              <input
                type="text"
                className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                id="imageUrl"
                name="imageUrl"
                placeholder="Enter image URL"
                value={formData.imageUrl}
                onChange={handleChange}
              />
              {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl}</div>}
              <div className="form-text">Enter a valid URL for the course cover image.</div>
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-medium">Course Topics</label>
              <div className={`mb-2 ${errors.topics ? 'text-danger small' : ''}`}>
                {errors.topics}
              </div>
              
              {Array.from({ length: topicCount }).map((_, index) => (
                <div className="input-group mb-2" key={index}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Topic ${index + 1}`}
                    value={formData.topics?.[index] || ''}
                    onChange={(e) => handleTopicChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeTopic(index)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={addTopic}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add Topic
              </button>
            </div>
            
            {isEditing && (
              <div className="row mb-4">
                <div className="col-md-6">
                  <label htmlFor="rating" className="form-label fw-medium">Rating</label>
                  <input
                    type="number"
                    className="form-control"
                    id="rating"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                  <div className="form-text">Current average rating (0-5)</div>
                </div>
              </div>
            )}
            
            <div className="d-flex justify-content-between border-top pt-4 mt-4">
              <Link to="/admin/courses" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary px-4">
                {isEditing ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
