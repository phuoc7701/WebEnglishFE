import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tests, courses } from '../../mockData';

const AdminTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  // Filter tests based on search term and course filter
  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || test.courseId === parseInt(courseFilter);

    return matchesSearch && matchesCourse;
  });

  // Get course name by ID
  const getCourseNameById = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-2">Manage Tests</h1>
          <p className="text-muted">Create, edit and organize assessment tests for your courses.</p>
        </div>
        <Link to="/admin/tests/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Test
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
              placeholder="Search tests..."
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

      {/* Tests Table */}
      <div className="card mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="ps-4">Test</th>
                  <th scope="col">Course</th>
                  <th scope="col">Questions</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.length > 0 ? (
                  filteredTests.map(test => (
                    <tr key={test.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-danger-subtle d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px" }}>
                            <i className="bi bi-clipboard-check text-danger fs-5"></i>
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{test.title}</h6>
                            <small className="text-muted">{test.description.substring(0, 60)}...</small>
                          </div>
                        </div>
                      </td>
                      <td>{getCourseNameById(test.courseId)}</td>
                      <td>{test.questions.length}</td>
                      <td>{test.duration}</td>
                      <td>
                        <span className="badge bg-success-subtle text-secondary rounded-pill px-3 py-2">
                          Active
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id={`test-actions-${test.id}`} data-bs-toggle="dropdown" aria-expanded="false">
                            Actions
                          </button>
                          <ul className="dropdown-menu" aria-labelledby={`test-actions-${test.id}`}>
                            <li><Link className="dropdown-item" to={`/admin/tests/edit/${test.id}`}><i className="bi bi-pencil me-2"></i>Edit</Link></li>
                            <li><a className="dropdown-item" href="#preview"><i className="bi bi-eye me-2"></i>Preview</a></li>
                            <li><a className="dropdown-item" href="#results"><i className="bi bi-bar-chart me-2"></i>View Results</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#duplicate"><i className="bi bi-copy me-2"></i>Duplicate</a></li>
                            <li><a className="dropdown-item text-danger" href="#delete"><i className="bi bi-trash me-2"></i>Delete</a></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <i className="bi bi-clipboard-x fs-1 text-muted mb-3 d-block"></i>
                      <h5>No tests found</h5>
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
      <nav aria-label="Tests pagination">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
          </li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminTests;
