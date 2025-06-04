import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const knowledgeRef = useRef();
  const practiceRef = useRef();
  const userRef = useRef();

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  useEffect(() => {

    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/engzone/users/${userId}/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserProfile(response.data.result);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
    fetchProfile();

    const handleClickOutside = (event) => {
      if (
        knowledgeRef.current &&
        !knowledgeRef.current.contains(event.target)
      ) {
        setIsKnowledgeDropdownOpen(false);
      }
      if (practiceRef.current && !practiceRef.current.contains(event.target)) {
        setIsPracticeDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const toggleKnowledgeDropdown = () => {
    setIsKnowledgeDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-dark text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/admin" className="text-decoration-none">
            <div className="d-flex align-items-center fs-4 fw-bold text-white">
              <i className="bi bi-globe me-2"></i>
              <span className="font-poppins">EngZone</span>
              <span className="ms-2 badge bg-primary rounded-pill">Admin</span>
            </div>
          </Link>
        </div>

        <div className="d-none d-md-flex gap-4 align-items-center">
          <Link
            to="/admin"
            className={`text-decoration-none fw-medium py-2 ${isActive("/admin") && !isActive("/admin/")
                ? "active-nav-link text-white"
                : "text-gray-light"
              }`}
          >
            Trang chủ
          </Link>
          {/* <Link 
            to="/admin/courses" 
            className={`text-decoration-none fw-medium py-2 ${isActive('/admin/courses') ? 'active-nav-link text-white' : 'text-gray-light'}`}
          >
            Courses
          </Link> */}
          <Link
            to="/admin/lessons"
            className={`text-decoration-none fw-medium py-2 ${isActive("/admin/lessons")
                ? "active-nav-link text-white"
                : "text-gray-light"
              }`}
          >
            Quản lý bài học
          </Link>
          {/* <Link 
            to="/admin/tests" 
            className={`text-decoration-none fw-medium py-2 ${isActive('/admin/tests') ? 'active-nav-link text-white' : 'text-gray-light'}`}
          >
            Tests
          </Link> */}
          <Link
            to="/admin/users"
            className={`text-decoration-none fw-medium py-2 ${isActive("/admin/users")
                ? "active-nav-link text-white"
                : "text-gray-light"
              }`}
          >
            Quản lý người dùng
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="position-relative" ref={userRef}>
            <div
              className="rounded-circle bg-accent d-flex align-items-center justify-content-center text-white"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
              onClick={() => setIsUserDropdownOpen((prev) => !prev)}
            >
              {userProfile && userProfile.avatarUrl ? (
                <img
                  src={userProfile.avatarUrl}
                  alt="Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <span className="fw-bold">
                  {getInitials(userProfile?.fullname || "AD")}
                </span>
              )}
            </div>

            {isUserDropdownOpen && (
              <div
                className="position-absolute end-0 mt-2 py-2 bg-white shadow rounded border"
                style={{ minWidth: "150px", zIndex: 100 }}
              >
                <Link
                  to="/admin/profile"
                  className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                >
                  Thông tin cá nhân
                </Link>
                <Link
                  to="/admin/changepass"
                  className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                >
                  Thay đổi mật khẩu
                </Link>
                <button
                  className="dropdown-item px-3 py-2 w-100 text-start text-dark border-0 bg-transparent"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            )}
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
      <div className={`d-md-none ${isMobileMenuOpen ? "d-block" : "d-none"}`}>
        <div className="px-3 py-2 bg-gray-800">
          <Link
            to="/admin"
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive("/admin") && !isActive("/admin/")
                ? "text-white"
                : "text-gray-light"
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Trang chủ
          </Link>
          {/* <Link 
            to="/admin/courses" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/admin/courses') ? 'text-white' : 'text-gray-light'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Courses
          </Link> */}
          <Link
            to="/admin/lessons"
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive("/admin/lessons") ? "text-white" : "text-gray-light"
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Quản lý bài học
          </Link>
          {/* <Link 
            to="/admin/tests" 
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive('/admin/tests') ? 'text-white' : 'text-gray-light'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tests
          </Link> */}
          <Link
            to="/admin/users"
            className={`d-block px-3 py-2 rounded text-decoration-none fw-medium ${isActive("/admin/users") ? "text-white" : "text-gray-light"
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Quản lý người dùng
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
