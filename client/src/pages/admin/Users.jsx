import { useState } from 'react';
import { users } from '../../mockData';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter users based on search term and status filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-fluid px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold mb-2">User Management</h1>
          <p className="text-muted">Manage your platform users and their progress.</p>
        </div>
        <button className="btn btn-primary">
          <i className="bi bi-person-plus me-2"></i>
          Add New User
        </button>
      </div>
      
      {/* Filter and Search */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search users by name, username or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <select 
            className="form-select" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="card mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="ps-4">User</th>
                  <th scope="col">Email</th>
                  <th scope="col">Join Date</th>
                  <th scope="col">Courses</th>
                  <th scope="col">Progress</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white me-3" style={{ width: "42px", height: "42px" }}>
                            {user.fullName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{user.fullName}</h6>
                            <small className="text-muted">@{user.username}</small>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.joinDate}</td>
                      <td>{user.coursesEnrolled}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="progress-bar me-2" style={{ width: "60px", height: "8px" }}>
                            <div 
                              className="progress-value" 
                              style={{ width: `${Math.round((user.lessonsCompleted / (user.coursesEnrolled * 10)) * 100)}%` }}
                            ></div>
                          </div>
                          <span>{user.lessonsCompleted} lessons</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${user.status === 'active' ? 'bg-success-subtle text-secondary' : 'bg-danger-subtle text-danger'} rounded-pill px-3 py-2`}>
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id={`user-actions-${user.id}`} data-bs-toggle="dropdown" aria-expanded="false">
                            Actions
                          </button>
                          <ul className="dropdown-menu" aria-labelledby={`user-actions-${user.id}`}>
                            <li><a className="dropdown-item" href="#view"><i className="bi bi-eye me-2"></i>View Details</a></li>
                            <li><a className="dropdown-item" href="#edit"><i className="bi bi-pencil me-2"></i>Edit</a></li>
                            <li><a className="dropdown-item" href="#progress"><i className="bi bi-bar-chart me-2"></i>View Progress</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                              <a className="dropdown-item" href="#status">
                                <i className={`bi bi-${user.status === 'active' ? 'person-lock' : 'person-check'} me-2`}></i>
                                {user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                              </a>
                            </li>
                            <li><a className="dropdown-item text-danger" href="#delete"><i className="bi bi-trash me-2"></i>Delete</a></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <i className="bi bi-people-fill fs-1 text-muted mb-3 d-block"></i>
                      <h5>No users found</h5>
                      <p className="text-muted">Try adjusting your search or filter criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* User Stats */}
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "64px", height: "64px" }}>
                <i className="bi bi-people fs-3 text-primary"></i>
              </div>
              <h3 className="h2 fw-bold mb-1">{users.length}</h3>
              <p className="text-muted mb-0">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="bg-success-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "64px", height: "64px" }}>
                <i className="bi bi-person-check fs-3 text-secondary"></i>
              </div>
              <h3 className="h2 fw-bold mb-1">{users.filter(u => u.status === 'active').length}</h3>
              <p className="text-muted mb-0">Active Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "64px", height: "64px" }}>
                <i className="bi bi-person-plus fs-3 text-accent"></i>
              </div>
              <h3 className="h2 fw-bold mb-1">24</h3>
              <p className="text-muted mb-0">New This Month</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="bg-danger-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "64px", height: "64px" }}>
                <i className="bi bi-person-dash fs-3 text-danger"></i>
              </div>
              <h3 className="h2 fw-bold mb-1">{users.filter(u => u.status === 'inactive').length}</h3>
              <p className="text-muted mb-0">Inactive Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
