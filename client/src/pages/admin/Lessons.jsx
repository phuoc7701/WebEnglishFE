import { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses, lessons } from '../../mockData';

const AdminLessons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  
  // Create a flat array of all lessons with course info
  const allLessons = Object.entries(lessons).flatMap(([courseId, courseLessons]) => {
    const course = courses.find(c => c.id === parseInt(courseId));
    return courseLessons.map(lesson => ({
      ...lesson,
      courseName: course?.title || 'Unknown Course',
      courseId: parseInt(courseId)
    }));
  });
  
  // Filter lessons based on search term and course filter
  const filteredLessons = allLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || lesson.courseId === parseInt(courseFilter);
    
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-2">Manage Lessons</h1>
          <p className="text-muted">Create, edit and organize lessons for your courses.</p>
        </div>
        <Link to="/admin/lessons/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Lesson
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
              placeholder="Search lessons..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select 
            className="form-select" 
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: A-Z</option>
            <option>Sort by: Z-A</option>
            <option>Sort by: Course</option>
          </select>
        </div>
      </div>
      
      {/* Lessons Table */}
      <div className="card mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="ps-4">Lesson</th>
                  <th scope="col">Course</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLessons.length > 0 ? (
                  filteredLessons.map(lesson => (
                    <tr key={lesson.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px" }}>
                            <i className="bi bi-play-fill text-primary fs-5"></i>
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{lesson.title}</h6>
                            <small className="text-muted">{lesson.description.substring(0, 60)}...</small>
                          </div>
                        </div>
                      </td>
                      <td>{lesson.courseName}</td>
                      <td>{lesson.duration}</td>
                      <td>
                        <span className={`badge ${lesson.completed ? 'bg-success-subtle text-secondary' : 'bg-warning-subtle text-accent'} rounded-pill px-3 py-2`}>
                          {lesson.completed ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id={`lesson-actions-${lesson.id}`} data-bs-toggle="dropdown" aria-expanded="false">
                            Actions
                          </button>
                          <ul className="dropdown-menu" aria-labelledby={`lesson-actions-${lesson.id}`}>
                            <li><Link className="dropdown-item" to={`/admin/lessons/edit/${lesson.id}`}><i className="bi bi-pencil me-2"></i>Edit</Link></li>
                            <li><a className="dropdown-item" href="#preview"><i className="bi bi-eye me-2"></i>Preview</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item text-danger" href="#delete"><i className="bi bi-trash me-2"></i>Delete</a></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <i className="bi bi-journal-x fs-1 text-muted mb-3 d-block"></i>
                      <h5>No lessons found</h5>
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
      <nav aria-label="Lessons pagination">
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

export default AdminLessons;
