import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courses, lessons } from '../../mockData';

const LessonForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const emptyFormData = {
    title: '',
    description: '',
    courseId: '',
    videoUrl: '',
    duration: '',
    completed: false,
    transcript: '',
    practiceExercises: []
  };
  
  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (isEditing) {
      // Find the lesson in all courses
      let foundLesson = null;
      let foundCourseId = null;
      
      for (const [courseId, courseLessons] of Object.entries(lessons)) {
        const lesson = courseLessons.find(l => l.id === parseInt(id));
        if (lesson) {
          foundLesson = lesson;
          foundCourseId = parseInt(courseId);
          break;
        }
      }
      
      if (foundLesson) {
        setFormData({
          ...foundLesson,
          courseId: foundCourseId.toString()
        });
      }
    }
  }, [id, isEditing]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error on input change
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.courseId) newErrors.courseId = 'Course selection is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically save the data to your backend
      // For this mock implementation, we just log it and redirect
      console.log('Lesson form submitted:', formData);
      
      navigate('/admin/lessons');
    }
  };
  
  return (
    <div className="container-fluid px-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-2">{isEditing ? 'Edit Lesson' : 'Add New Lesson'}</h1>
        <p className="text-muted">{isEditing ? 'Update your lesson content' : 'Create new lesson content for your courses'}</p>
      </div>
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label fw-medium">Lesson Title</label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                id="title"
                name="title"
                placeholder="Enter lesson title"
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
                placeholder="Enter lesson description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            
            <div className="row mb-4">
              <div className="col-md-6">
                <label htmlFor="videoUrl" className="form-label fw-medium">Video URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="videoUrl"
                  name="videoUrl"
                  placeholder="Enter video URL"
                  value={formData.videoUrl}
                  onChange={handleChange}
                />
                <div className="form-text">Link to the lesson video content (YouTube, Vimeo, etc.)</div>
              </div>
              
              <div className="col-md-6">
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
            </div>
            
            <div className="mb-4">
              <label htmlFor="transcript" className="form-label fw-medium">Lesson Transcript</label>
              <textarea
                className="form-control"
                id="transcript"
                name="transcript"
                rows="6"
                placeholder="Enter lesson transcript (optional)"
                value={formData.transcript || ''}
                onChange={handleChange}
              ></textarea>
              <div className="form-text">Provide a transcript of the lesson content for accessibility</div>
            </div>
            
            <div className="mb-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="completed"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="completed">
                  Publish Lesson
                </label>
              </div>
              <div className="form-text">
                {formData.completed 
                  ? 'Lesson will be visible to students' 
                  : 'Lesson will be saved as a draft'}
              </div>
            </div>
            
            <div className="d-flex justify-content-between border-top pt-4 mt-4">
              <Link to="/admin/lessons" className="btn btn-outline-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary px-4">
                {isEditing ? 'Update Lesson' : 'Create Lesson'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LessonForm;
