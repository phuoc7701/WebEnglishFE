import { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../../mockData';

const AdminCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  
  // Filter courses based on search term and level filter
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || course.level.toLowerCase() === levelFilter.toLowerCase();
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-2">Manage Courses</h1>
          <p className="text-muted">Create, edit and manage your course catalog.</p>
        </div>
        <Link to="/admin/courses/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Course
        </Link>
      </div>
      
      {/* Filter and Search */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select 
            className="form-select" 
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: A-Z</option>
            <option>Sort by: Z-A</option>
            <option>Sort by: Rating</option>
          </select>
        </div>
      </div>
      
      {/* Courses Table */}
      <div className="card mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="ps-4">Course</th>
                  <th scope="col">Level</th>
                  <th scope="col">Lessons</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map(course => (
                    <tr key={course.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <img 
                            src={course.imageUrl} 
                            alt={course.title} 
                            className="rounded me-3"
                            width="48"
                            height="36"
                            style={{ objectFit: "cover" }}
                          />
                          <div>
                            <h6 className="mb-0 fw-bold">{course.title}</h6>
                            <small className="text-muted">{course.duration}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge bg-${getLevelColorClass(course.level)}-subtle text-${getLevelColorClass(course.level)} rounded-pill px-3 py-2`}>
                          {course.level}
                        </span>
                      </td>
                      <td>{course.totalLessons}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-star-fill text-accent me-1"></i>
                          <span>{course.rating}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-success-subtle text-secondary rounded-pill px-3 py-2">
                          Active
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex justify-content-end">
                          <Link to={`/admin/courses/edit/${course.id}`} className="btn btn-sm btn-outline-primary me-2">
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
                      <h5>No courses found</h5>
                      <p className="text-muted">Try adjusting your search or filter criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Pagination */}
      <nav aria-label="Courses pagination">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// Helper function to get color class based on level
const getLevelColorClass = (level) => {
  switch(level.toLowerCase()) {
    case 'beginner':
      return 'primary';
    case 'intermediate':
      return 'info';
    case 'advanced':
      return 'warning';
    default:
      return 'primary';
  }
};

export default AdminCourses;
