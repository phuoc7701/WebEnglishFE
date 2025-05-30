import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isKnowledgeDropdownOpen, setIsKnowledgeDropdownOpen] = useState(false);
  const [isPracticeDropdownOpen, setIsPracticeDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const knowledgeRef = useRef();
  const practiceRef = useRef();
  const userRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleClickOutside = (event) => {
      if (knowledgeRef.current && !knowledgeRef.current.contains(event.target)) {
        setIsKnowledgeDropdownOpen(false);
      }
      if (practiceRef.current && !practiceRef.current.contains(event.target)) {
        setIsPracticeDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleKnowledgeDropdown = () => {
    setIsKnowledgeDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/" className="text-decoration-none">
            <div className="d-flex align-items-center fs-4 fw-bold text-primary">
              <i className="bi bi-globe me-2"></i>
              <span className="font-poppins">EngZone</span>
            </div>
          </Link>
        </div>

        <div className="d-none d-md-flex gap-4 align-items-center">
          <Link
            to="/"
            className={`text-decoration-none fw-medium text-gray-dark py-2 ${isActive('/') ? 'active-nav-link' : ''}`}
          >
            Trang chủ
          </Link>

          <div className="position-relative" ref={knowledgeRef}>
            <span
              className={`text-decoration-none fw-medium text-gray-dark py-2 d-inline-block cursor-pointer ${isActive('/courses') ? 'active-nav-link' : ''
                }`}
              onClick={toggleKnowledgeDropdown}
            >
              Kiến thức <i className="bi bi-caret-down-fill ms-1"></i>
            </span>

            {isKnowledgeDropdownOpen && (
              <div
                className="position-absolute bg-white shadow rounded border mt-1"
                style={{ top: '100%', left: 0, minWidth: '160px', zIndex: 100 }}
              >
                <Link
                  to="/courses/grammar"
                  className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                  onClick={() => setIsKnowledgeDropdownOpen(false)}
                >
                  Ngữ pháp
                </Link>
                <Link
                  to="/courses/vocabulary"
                  className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                  onClick={() => setIsKnowledgeDropdownOpen(false)}
                >
                  Từ vựng
                </Link>
              </div>
            )}
          </div>

          <div className="position-relative" ref={practiceRef}>
            <span
              className={`text-decoration-none fw-medium text-gray-dark py-2 d-inline-block cursor-pointer ${isActive('/practice') ? 'active-nav-link' : ''
                }`}
              onClick={() => setIsPracticeDropdownOpen((prev) => !prev)}
            >
              Ôn luyện <i className="bi bi-caret-down-fill ms-1"></i>
            </span>

            {isPracticeDropdownOpen && (
              <div
                className="position-absolute bg-white shadow rounded border mt-1"
                style={{ top: '100%', left: 0, minWidth: '160px', zIndex: 100 }}
              >
                <Link
                  to="/listening"
                  className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                  onClick={() => setIsPracticeDropdownOpen(false)}
                >
                  Luyện nghe
                </Link>
                <Link
                  to="/speaking"
                  className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                  onClick={() => setIsPracticeDropdownOpen(false)}
                >
                  Luyện nói
                </Link>
                <Link
                  to="/reading"
                  className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                  onClick={() => setIsPracticeDropdownOpen(false)}
                >
                  Luyện đọc
                </Link>
                <Link
                  to="/writting"
                  className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                  onClick={() => setIsPracticeDropdownOpen(false)}
                >
                  Luyện viết
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/test"
            className={`text-decoration-none fw-medium text-gray-dark py-2 ${isActive('/test') ? 'active-nav-link' : ''}`}
          >
            Thi thử
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">

          {!user ? (
            <Link to="/login" className="btn btn-outline-primary btn-sm">Đăng nhập</Link>
          ) : (
            <div className="position-relative" ref={userRef}>
              <div
                className="rounded-circle bg-accent d-flex align-items-center justify-content-center text-white"
                style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                onClick={() => setIsUserDropdownOpen((prev) => !prev)}
              >
                <span className="fw-bold">{user.initials}</span>
              </div>

              {isUserDropdownOpen && (
                <div className="position-absolute end-0 mt-2 py-2 bg-white shadow rounded border" style={{ minWidth: '150px', zIndex: 100 }}>
                  <Link to="/profile" className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block">Thông tin cá nhân</Link>
                  <Link to="/update" className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block">Nâng cấp tài khoản</Link>
                  <button className="dropdown-item px-3 py-2 w-100 text-start text-dark border-0 bg-transparent" onClick={handleLogout}>Đăng xuất</button>
                </div>
              )}
            </div>
          )}

          <button className="d-md-none bg-transparent border-0" onClick={toggleMobileMenu}>
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
