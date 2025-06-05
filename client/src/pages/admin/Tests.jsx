import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const testsPerPage = 10;

const AdminTests = () => {
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  // Fetch tests from API
  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8080/engzone/tests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTests(res.data);
      } catch (err) {
        setTests([]);
      }
      setLoading(false);
    };
    fetchTests();
  }, []);

  // Filter tests based on search term
  const filteredTests = Array.isArray(tests)
    ? tests.filter(test => (
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    : [];

  // Pagination logic
  const totalPages = Math.ceil(filteredTests.length / testsPerPage);
  const paginatedTests = filteredTests.slice(
    (currentPage - 1) * testsPerPage,
    currentPage * testsPerPage
  );

  // Khi search, reset về trang 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="container-fluid px-4 mt-10">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-2">Quản lý Tests</h1>
        </div>
        <Link to="/admin/tests/new" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Thêm bài Test
        </Link>
      </div>

      {/* Search */}
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
        <div className="col-md-6">
          {/* Nếu muốn thêm sort, để đây hoặc xóa luôn */}
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
                  <th scope="col">Questions</th>
                  <th scope="col">Duration</th>
                  {/* <th scope="col">Status</th>
                  <th scope="col" className="text-end pe-4">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <div className="spinner-border text-primary" />
                    </td>
                  </tr>
                ) : paginatedTests.length > 0 ? (
                  paginatedTests.map(test => (
                    <tr key={test.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-danger-subtle d-flex align-items-center justify-content-center me-3" style={{ width: "40px", height: "40px" }}>
                            <i className="bi bi-clipboard-check text-danger fs-5"></i>
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">
                              <Link
                                to={`/admin/tests/${test.id}`}
                                className="text-decoration-none text-dark"
                                style={{ cursor: "pointer" }}
                              >
                                {test.title}
                              </Link>
                            </h6>
                            <small className="text-muted">{test.description.substring(0, 60)}...</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        {test.parts
                          ? test.parts.reduce((acc, part) => acc + (part.questions ? part.questions.length : 0), 0)
                          : (test.questions ? test.questions.length : 0)
                        }
                      </td>
                      <td>{test.duration}</td>
                      {/* <td>
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
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <i className="bi bi-clipboard-x fs-1 text-muted mb-3 d-block"></i>
                      <h5>No tests found</h5>
                      <p className="text-muted">Try adjusting your search criteria</p>
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
          <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          </li>
          {Array.from({ length: totalPages }, (_, idx) => (
            <li key={idx + 1} className={`page-item${currentPage === idx + 1 ? ' active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
            </li>
          ))}
          <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminTests;