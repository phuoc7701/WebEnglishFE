import { Link } from 'react-router-dom';
import { adminStats, recentActivities, courses } from '../../mockData';

const Dashboard = () => {
  // Get top courses (sort by enrollment number)
  const topCourses = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="container-fluid px-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted">Welcome back, Admin. Here's an overview of your platform.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-primary-subtle p-3 rounded me-3">
                  <i className="bi bi-people text-primary fs-4"></i>
                </div>
                <div>
                  <div className="text-muted small">Total Users</div>
                  <div className="h3 fw-bold">{adminStats.totalUsers}</div>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3 text-secondary">
                <i className="bi bi-arrow-up me-1"></i>
                <span className="small">{adminStats.userGrowth}% from last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-success-subtle p-3 rounded me-3">
                  <i className="bi bi-book text-secondary fs-4"></i>
                </div>
                <div>
                  <div className="text-muted small">Active Courses</div>
                  <div className="h3 fw-bold">{adminStats.activeCourses}</div>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3 text-secondary">
                <i className="bi bi-arrow-up me-1"></i>
                <span className="small">{adminStats.coursesGrowth}% from last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-warning-subtle p-3 rounded me-3">
                  <i className="bi bi-clipboard-check text-accent fs-4"></i>
                </div>
                <div>
                  <div className="text-muted small">Lessons Completed</div>
                  <div className="h3 fw-bold">{adminStats.lessonsCompleted}</div>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3 text-secondary">
                <i className="bi bi-arrow-up me-1"></i>
                <span className="small">{adminStats.lessonsGrowth}% from last month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-danger-subtle p-3 rounded me-3">
                  <i className="bi bi-star text-danger fs-4"></i>
                </div>
                <div>
                  <div className="text-muted small">Average Rating</div>
                  <div className="h3 fw-bold">{adminStats.averageRating}/5</div>
                </div>
              </div>
              <div className="d-flex align-items-center mt-3 text-secondary">
                <i className="bi bi-arrow-up me-1"></i>
                <span className="small">{adminStats.ratingGrowth} from last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity and Popular Courses */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold m-0">Recent Activity</h2>
                <Link to="#" className="text-primary text-decoration-none small">View All</Link>
              </div>
              
              <div className="d-flex flex-column gap-3">
                {recentActivities.map(activity => (
                  <div className="d-flex pb-3 border-bottom" key={activity.id}>
                    <div className={`bg-${getIconColor(activity.type)}-subtle p-2 rounded me-3`}>
                      <i className={`bi bi-${activity.icon} text-${getIconColor(activity.type)}`}></i>
                    </div>
                    <div>
                      <div className="fw-medium">{activity.description}</div>
                      <div className="text-muted small">{activity.details}</div>
                      <div className="text-muted x-small mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold m-0">Popular Courses</h2>
                <Link to="/admin/courses" className="text-primary text-decoration-none small">Manage Courses</Link>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="text-nowrap">Course Name</th>
                      <th scope="col" className="text-nowrap">Enrollments</th>
                      <th scope="col" className="text-nowrap">Rating</th>
                      <th scope="col" className="text-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCourses.map((course, index) => (
                      <tr key={course.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: "32px", height: "32px" }}>
                              <i className="bi bi-book text-primary"></i>
                            </div>
                            <span className="fw-medium">{course.title}</span>
                          </div>
                        </td>
                        <td>{1243 - (index * 246)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-star-fill text-accent me-1"></i>
                            <span>{course.rating}</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-success-subtle text-secondary rounded-pill">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Engagement Chart and Quick Actions */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 fw-bold m-0">User Engagement</h2>
                <select className="form-select form-select-sm" style={{ width: "auto" }}>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                </select>
              </div>
              
              <div className="d-flex align-items-center justify-content-center" style={{ height: "320px" }}>
                <div className="text-center text-muted">
                  <i className="bi bi-bar-chart fs-1 mb-3 d-block"></i>
                  <p>User engagement chart would display here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-4">Quick Actions</h2>
              
              <div className="d-flex flex-column gap-3">
                <Link to="/admin/courses/new" className="card bg-primary text-white text-decoration-none">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-plus-circle fs-4 me-3"></i>
                      <div>
                        <div className="fw-medium">Add New Course</div>
                        <div className="small text-white-50">Create a new learning course</div>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/lessons/new" className="card bg-dark text-white text-decoration-none">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-file-earmark-plus fs-4 me-3"></i>
                      <div>
                        <div className="fw-medium">Add New Lesson</div>
                        <div className="small text-white-50">Create lesson content</div>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/tests/new" className="card bg-secondary text-white text-decoration-none">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-clipboard-plus fs-4 me-3"></i>
                      <div>
                        <div className="fw-medium">Create New Test</div>
                        <div className="small text-white-50">Add assessment questions</div>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <Link to="/admin/users" className="card bg-accent text-white text-decoration-none">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-people fs-4 me-3"></i>
                      <div>
                        <div className="fw-medium">Manage Users</div>
                        <div className="small text-white-50">View and edit user accounts</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get icon color based on activity type
function getIconColor(type) {
  switch (type) {
    case 'user_registration':
      return 'primary';
    case 'course_published':
      return 'secondary';
    case 'course_review':
      return 'accent';
    case 'content_reported':
      return 'danger';
    default:
      return 'primary';
  }
}

export default Dashboard;
