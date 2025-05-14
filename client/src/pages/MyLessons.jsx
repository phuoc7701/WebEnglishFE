import { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses, userLearningHistory } from '../mockData';

const MyLessons = () => {
  const [activeTab, setActiveTab] = useState('in-progress');
  
  // Get courses that are in progress (have progress > 0)
  const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100);
  
  // Get courses that are completed (have progress of 100)
  const completedCourses = courses.filter(course => course.progress === 100);
  
  // Get recently accessed courses based on learning history
  const recentlyAccessedIds = userLearningHistory
    .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
    .map(history => history.courseId);
  
  const recentCourses = recentlyAccessedIds
    .map(id => courses.find(course => course.id === id))
    .filter((course, index, self) => 
      course && self.findIndex(c => c.id === course.id) === index
    )
    .slice(0, 3); // Get only the first 3 unique courses

  return (
    <div className="container my-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">My Learning</h1>
          <p className="text-muted">Track your progress and continue where you left off.</p>
        </div>
        <div className="col-md-6">
          <div className="card bg-light border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white me-3" style={{ width: "48px", height: "48px" }}>
                  <i className="bi bi-lightning-charge-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Current Learning Streak</h5>
                  <p className="mb-0">You've been learning for <span className="fw-bold text-primary">5 days</span> in a row!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mb-5">
        <h2 className="fw-bold mb-4">Recently Accessed</h2>
        <div className="row g-4">
          {recentCourses.length > 0 ? (
            recentCourses.map(course => (
              <div className="col-md-4" key={course.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">{course.title}</h5>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small mb-1">
                        <span>Progress</span>
                        <span className="fw-medium">{course.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-value" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                    <Link to={`/courses/${course.id}`} className="btn btn-primary w-100">Continue Learning</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-4">
              <i className="bi bi-journal-x fs-1 text-muted mb-3 d-block"></i>
              <h4>No recent activity</h4>
              <p className="text-muted mb-4">You haven't accessed any courses recently.</p>
              <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
            </div>
          )}
        </div>
      </div>

      {/* My Courses Tabs */}
      <h2 className="fw-bold mb-4">My Courses</h2>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'in-progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('in-progress')}
          >
            In Progress
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </li>
      </ul>

      {/* In Progress Courses */}
      {activeTab === 'in-progress' && (
        <div className="row g-4">
          {inProgressCourses.length > 0 ? (
            inProgressCourses.map(course => (
              <div className="col-md-6 col-lg-4" key={course.id}>
                <div className="card h-100 shadow-sm">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title} 
                    className="card-img-top"
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">{course.title}</h5>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small mb-1">
                        <span>Progress</span>
                        <span className="fw-medium">{course.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-value" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted small">
                        <i className="bi bi-clock me-1"></i>
                        <span>{course.totalLessons} lessons</span>
                      </div>
                      <Link to={`/courses/${course.id}`} className="btn btn-sm btn-primary">
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-4">
              <i className="bi bi-journal-x fs-1 text-muted mb-3 d-block"></i>
              <h4>No courses in progress</h4>
              <p className="text-muted mb-4">You haven't started any courses yet.</p>
              <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
            </div>
          )}
        </div>
      )}

      {/* Completed Courses */}
      {activeTab === 'completed' && (
        <div className="row g-4">
          {completedCourses.length > 0 ? (
            completedCourses.map(course => (
              <div className="col-md-6 col-lg-4" key={course.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="position-absolute top-0 end-0 mt-3 me-3">
                      <span className="badge bg-success rounded-pill">
                        <i className="bi bi-check-circle-fill me-1"></i>
                        Completed
                      </span>
                    </div>
                    <h5 className="fw-bold mb-3">{course.title}</h5>
                    <p className="text-muted mb-4">{course.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted small">
                        <i className="bi bi-award me-1"></i>
                        <span>Certificate earned</span>
                      </div>
                      <Link to={`/courses/${course.id}`} className="btn btn-sm btn-outline-primary">
                        Review
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-4">
              <i className="bi bi-trophy fs-1 text-muted mb-3 d-block"></i>
              <h4>No completed courses yet</h4>
              <p className="text-muted mb-4">Keep learning to complete your first course!</p>
              <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
            </div>
          )}
        </div>
      )}

      {/* Learning Statistics */}
      <div className="mt-5 pt-4 border-top">
        <h2 className="fw-bold mb-4">Learning Statistics</h2>
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card text-center h-100">
              <div className="card-body">
                <div className="rounded-circle bg-primary-subtle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px" }}>
                  <i className="bi bi-book fs-3 text-primary"></i>
                </div>
                <h3 className="h2 fw-bold mb-1">3</h3>
                <p className="text-muted mb-0">Courses Enrolled</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center h-100">
              <div className="card-body">
                <div className="rounded-circle bg-success-subtle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px" }}>
                  <i className="bi bi-journal-check fs-3 text-secondary"></i>
                </div>
                <h3 className="h2 fw-bold mb-1">18</h3>
                <p className="text-muted mb-0">Lessons Completed</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center h-100">
              <div className="card-body">
                <div className="rounded-circle bg-warning-subtle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px" }}>
                  <i className="bi bi-clock-history fs-3 text-accent"></i>
                </div>
                <h3 className="h2 fw-bold mb-1">24h</h3>
                <p className="text-muted mb-0">Total Learning Time</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center h-100">
              <div className="card-body">
                <div className="rounded-circle bg-danger-subtle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px" }}>
                  <i className="bi bi-award fs-3 text-danger"></i>
                </div>
                <h3 className="h2 fw-bold mb-1">12</h3>
                <p className="text-muted mb-0">Achievements Earned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLessons;
