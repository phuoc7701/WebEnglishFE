import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const AdminNavbar = ({ toggleView }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Check if a path is active
  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-dark text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/admin" className="text-decoration-none">
            <div className="d-flex align-items-center fs-4 fw-bold text-white">
              <i className="bi bi-globe me-2"></i>
              <span className="font-poppins">LearnEnglish</span>
              <span className="ms-2 badge bg-primary rounded-pill">Admin</span>
            </div>
          </Link>
        </div>

        <div className="d-none d-md-flex gap-4 align-items-center">
          <Link 
            to="/admin" 
            className={`text-decoration-none fw-medium py-2 ${isActive('/admin') && !isActive('/admin/') ? 'active-nav-link text-white' : 'text-gray-light'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/courses" 
            className={`text-decoration-none fw-medium py-2 ${isActive('/admin/courses') ? 'active-nav-link text-white' : 'text-gray-light'}`}
          >
            Courses
          </Link>
          <Link 
            to="/admin/lessons" 
            className={`text-decoration-none fw-medium py-2 ${isActive('/admin/lessons') ? 'active-nav-link text-white' : 'text-gray-light'}`}
          >
            Lessons
          </Link>
          <Link 
            to="/admin/tests" 
            className={`text-decoration-none fw-medium py-2 ${isActive('/admin/tests') ? 'active-nav-link text-white' : 'text-gray-light'}`}
          >
            Tests
          </Link>
          <Link 
            to="/admin/users" 
            className={`text-decoration-none fw-medium py-2 ${isActive('/admin/users') ? 'active-nav-link text-white' : 'text-gray-light'}`}
          >
            Users
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button 
            onClick={toggleView} 
            className="px-3 py-1 text-xs fw-medium bg-gray-700 rounded-pill text-white"
          >
            Switch to User View
          </button>
          <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white" style={{ width: '40px', height: '40px', cursor: 'pointer' }}>
            <span className="fw-bold">AD</span>
          </div>
          <button 
            className="d-md-none bg-transparent border-0 text-white"
            onClick={toggleMobileMenu}
          >
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`d-md-none ${isMobileMenuOpen ? 'd-block' : 'd-none'}`}>
        <div className="px-3 py-2 bg-gray-800">
          <Link 
            to="/admin" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/admin') && !isActive('/admin/') ? 'text-white' : 'text-gray-light'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/courses" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/admin/courses') ? 'text-white' : 'text-gray-light'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Courses
          </Link>
          <Link 
            to="/admin/lessons" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/admin/lessons') ? 'text-white' : 'text-gray-light'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Lessons
          </Link>
          <Link 
            to="/admin/tests" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/admin/tests') ? 'text-white' : 'text-gray-light'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tests
          </Link>
          <Link 
            to="/admin/users" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/admin/users') ? 'text-white' : 'text-gray-light'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Users
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
