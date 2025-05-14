import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { courses, lessons as allLessons } from '../mockData';
import ProgressBar from '../components/ProgressBar';

const CourseDetail = () => {
  const { id } = useParams();
  const courseId = parseInt(id);
  const course = courses.find(c => c.id === courseId);
  const courseLessons = allLessons[courseId] || [];

  const [activeTab, setActiveTab] = useState('overview');

  if (!course) {
    return (
      <div className="container my-5 text-center">
        <i className="bi bi-exclamation-circle fs-1 text-muted mb-3 d-block"></i>
        <h2>Course Not Found</h2>
        <p className="text-muted mb-4">The course you're looking for does not exist or has been removed.</p>
        <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Course Header */}
      <div className="row mb-5">
        <div className="col-lg-8">
          <h1 className="fw-bold mb-3">{course.title}</h1>
          <p className="lead mb-4">{course.description}</p>
          <div className="d-flex flex-wrap gap-4 mb-4">
            <div className="d-flex align-items-center">
              <i className="bi bi-bar-chart-fill text-primary me-2"></i>
              <span>{course.level}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-clock-fill text-primary me-2"></i>
              <span>{course.duration}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-book-fill text-primary me-2"></i>
              <span>{course.totalLessons} lessons</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-star-fill text-accent me-2"></i>
              <span>{course.rating} rating</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-1">
              <span>Course Progress</span>
              <span className="fw-medium">{course.progress}%</span>
            </div>
            <ProgressBar progress={course.progress} />
          </div>
          <button className="btn btn-primary btn-lg px-4 fw-bold">
            {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
          </button>
        </div>
        <div className="col-lg-4 mt-4 mt-lg-0">
          <img 
            src={course.imageUrl}
            alt={course.title}
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </div>

      {/* Course Content Navigation */}
      <div className="mb-4 border-bottom">
        <ul className="nav nav-tabs border-0">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'lessons' ? 'active' : ''}`}
              onClick={() => setActiveTab('lessons')}
            >
              Lessons
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mb-5">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h3 className="fw-bold mb-4">About This Course</h3>
            <p className="mb-4">
              This comprehensive course is designed to help you master {course.title.toLowerCase()}. 
              Through our structured curriculum, you'll develop confidence and fluency in English.
            </p>
            
            <h4 className="fw-bold mb-3">What You'll Learn</h4>
            <div className="row mb-4">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  {course.topics && course.topics.map((topic, index) => (
                    <li className="list-group-item bg-transparent px-0" key={index}>
                      <i className="bi bi-check-circle-fill text-secondary me-2"></i>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <h4 className="fw-bold mb-3">Requirements</h4>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item bg-transparent px-0">
                <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i>
                No prior knowledge required for this course
              </li>
              <li className="list-group-item bg-transparent px-0">
                <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i>
                Basic computer skills for accessing online materials
              </li>
              <li className="list-group-item bg-transparent px-0">
                <i className="bi bi-arrow-right-circle-fill text-primary me-2"></i>
                Commitment to practice regularly
              </li>
            </ul>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div>
            <h3 className="fw-bold mb-4">Course Lessons</h3>
            {courseLessons.length > 0 ? (
              <div className="list-group">
                {courseLessons.map((lesson, index) => (
                  <Link 
                    to={`/lessons/${lesson.id}`} 
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" 
                    key={lesson.id}
                  >
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-light d-flex justify-content-center align-items-center me-3" style={{ width: "36px", height: "36px" }}>
                        <span className="fw-medium">{index + 1}</span>
                      </div>
                      <div>
                        <h5 className="mb-1">{lesson.title}</h5>
                        <p className="mb-0 text-muted small">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-light text-dark me-3">{lesson.duration}</span>
                      {lesson.completed ? (
                        <i className="bi bi-check-circle-fill text-secondary fs-5"></i>
                      ) : (
                        <i className="bi bi-play-circle text-primary fs-5"></i>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <i className="bi bi-journal-x fs-1 text-muted mb-3 d-block"></i>
                <h4>No lessons available</h4>
                <p className="text-muted">Lessons for this course are coming soon.</p>
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold m-0">Student Reviews</h3>
              <div className="bg-light p-2 rounded">
                <span className="fw-bold text-warning me-2">{course.rating}</span>
                <i className="bi bi-star-fill text-warning"></i>
              </div>
            </div>
            
            {/* Sample reviews */}
            <div className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="card-title">Sarah Johnson</h5>
                  <div>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">2 weeks ago</h6>
                <p className="card-text">This course exceeded my expectations! The lessons are well-structured and the instructor explains everything clearly.</p>
              </div>
            </div>
            
            <div className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="card-title">David Chen</h5>
                  <div>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star text-warning"></i>
                  </div>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">1 month ago</h6>
                <p className="card-text">Great content and practice exercises. I'd recommend this to anyone wanting to improve their English skills.</p>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="card-title">Maria Rodriguez</h5>
                  <div>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-half text-warning"></i>
                  </div>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">2 months ago</h6>
                <p className="card-text">I learned so much from this course. The interactive exercises are particularly helpful for practicing what you learn.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
