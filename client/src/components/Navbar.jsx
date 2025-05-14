import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ toggleView }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Check if a path is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/" className="text-decoration-none">
            <div className="d-flex align-items-center fs-4 fw-bold text-primary">
              <i className="bi bi-globe me-2"></i>
              <span className="font-poppins">LearnEnglish</span>
            </div>
          </Link>
        </div>

        <div className="d-none d-md-flex gap-4 align-items-center">
          <Link 
            to="/" 
            className={`text-decoration-none fw-medium text-gray-dark py-2 ${isActive('/') ? 'active-nav-link' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/courses" 
            className={`text-decoration-none fw-medium text-gray-dark py-2 ${isActive('/courses') ? 'active-nav-link' : ''}`}
          >
            Courses
          </Link>
          <Link 
            to="/practice" 
            className={`text-decoration-none fw-medium text-gray-dark py-2 ${isActive('/practice') ? 'active-nav-link' : ''}`}
          >
            Practice
          </Link>
          <Link 
            to="/my-lessons" 
            className={`text-decoration-none fw-medium text-gray-dark py-2 ${isActive('/my-lessons') ? 'active-nav-link' : ''}`}
          >
            My Lessons
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button 
            onClick={toggleView} 
            className="px-3 py-1 text-xs fw-medium bg-gray-light rounded-pill hover-bg-gray-200"
          >
            Switch to Admin
          </button>
          <div className="rounded-circle bg-accent d-flex align-items-center justify-content-center text-white" style={{ width: '40px', height: '40px', cursor: 'pointer' }}>
            <span className="fw-bold">JD</span>
          </div>
          <button 
            className="d-md-none bg-transparent border-0"
            onClick={toggleMobileMenu}
          >
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`d-md-none ${isMobileMenuOpen ? 'd-block' : 'd-none'}`}>
        <div className="px-3 py-2 bg-white border-top">
          <Link 
            to="/" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/') ? 'text-primary' : 'text-gray-dark'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/courses" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/courses') ? 'text-primary' : 'text-gray-dark'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Courses
          </Link>
          <Link 
            to="/practice" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/practice') ? 'text-primary' : 'text-gray-dark'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Practice
          </Link>
          <Link 
            to="/my-lessons" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/my-lessons') ? 'text-primary' : 'text-gray-dark'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Lessons
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
