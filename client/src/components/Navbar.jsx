import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

// Hàm lấy ký tự viết tắt từ tên đầy đủ
const getInitials = (name) => {
  if (!name) return "";
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isKnowledgeDropdownOpen, setIsKnowledgeDropdownOpen] = useState(false);
  const [isGrammarSubmenuOpen, setIsGrammarSubmenuOpen] = useState(false);
  const [isVocabularySubmenuOpen, setIsVocabularySubmenuOpen] = useState(false);
  const [isPracticeDropdownOpen, setIsPracticeDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const knowledgeRef = useRef();
  const practiceRef = useRef();
  const userRef = useRef();

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

    const onAvatarChanged = (e) => {
      if (e.key === "avatarChanged") {
        fetchProfile();
      }
    };
    window.addEventListener("storage", onAvatarChanged);

    // Lắng nghe sự kiện avatarChanged custom (tab hiện tại)
    const onAvatarChangedCustom = () => {
      fetchProfile();
    };
    window.addEventListener("avatarChanged", onAvatarChangedCustom);

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserProfile(null);
    navigate("/");
  };
  const handleMouseEnter = () => {
    setIsKnowledgeDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsKnowledgeDropdownOpen(false);
    setIsGrammarSubmenuOpen(false);
    setIsVocabularySubmenuOpen(false);
  };

  const levels = [
    { name: "Sơ cấp", value: "beginner" },
    { name: "Trung cấp", value: "intermediate" },
    { name: "Cao cấp", value: "advanced" },
  ];

  return (
    <header className="bg-white shadow-sm sticky-top z-50">
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
            className={`text-decoration-none fw-medium text-gray-dark py-2 ${isActive("/") ? "active-nav-link" : ""
              }`}
          >
            Trang chủ
          </Link>

          <div
            className="position-relative"
            ref={knowledgeRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="text-decoration-none fw-medium text-gray-dark py-2 d-inline-block cursor-pointer">
              Kiến thức <i className="bi bi-caret-down-fill ms-1"></i>
            </span>

            {isKnowledgeDropdownOpen && (
              <div
                className="position-absolute bg-white shadow rounded border"
                style={{ top: "100%", left: 0, minWidth: "200px", zIndex: 100 }}
              >
                <div
                  className="dropdown-item px-3 py-2 cursor-pointer position-relative"
                  onMouseEnter={() => setIsGrammarSubmenuOpen(true)}
                  onMouseLeave={() => setIsGrammarSubmenuOpen(false)}
                >
                  Ngữ pháp
                  {isGrammarSubmenuOpen && (
                    <div
                      className="position-absolute bg-white shadow rounded border"
                      style={{ top: 0, left: "100%", minWidth: "160px" }}
                    >
                      {levels.map((level) => (
                        <Link
                          key={level.value}
                          to={`/lessons/type/grammar/level/${level.value}`}
                          className="dropdown-item px-3 py-2 d-block"
                        >
                          {level.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className="dropdown-item px-3 py-2 cursor-pointer position-relative"
                  onMouseEnter={() => setIsVocabularySubmenuOpen(true)}
                  onMouseLeave={() => setIsVocabularySubmenuOpen(false)}
                >
                  Từ vựng
                  {isVocabularySubmenuOpen && (
                    <div
                      className="position-absolute bg-white shadow rounded border"
                      style={{ top: 0, left: "100%", minWidth: "160px" }}
                    >
                      {levels.map((level) => (
                        <Link
                          key={level.value}
                          to={`/lessons/type/vocabulary/level/${level.value}`}
                          className="dropdown-item px-3 py-2 d-block"
                        >
                          {level.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
                style={{ top: "100%", left: 0, minWidth: "160px", zIndex: 100 }}
              >
                <Link
                  to="/speaking"
                  className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                  onClick={() => setIsPracticeDropdownOpen(false)}
                >
                  Luyện nói
                </Link>
                <Link
                  to="/practice/writing"
                  className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                  onClick={() => setIsPracticeDropdownOpen(false)}
                >
                  Luyện viết
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/tests"
            className={`text-decoration-none fw-medium text-gray-dark py-2 ${isActive("/test") ? "active-nav-link" : ""
              }`}
          >
            Thi thử
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          {!userProfile ? (
            <Link to="/login" className="btn btn-outline-primary btn-sm">
              Đăng nhập
            </Link>
          ) : (
            <div className="position-relative" ref={userRef}>
              <div
                className="rounded-circle bg-accent d-flex align-items-center justify-content-center text-white overflow-hidden"
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
                onClick={() => setIsUserDropdownOpen((prev) => !prev)}
              >
                {userProfile.avatarUrl ? (
                  <img
                    src={userProfile.avatarUrl}
                    alt="Avatar"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span className="fw-bold">
                    {getInitials(userProfile.fullname)}
                  </span>
                )}
              </div>

              {isUserDropdownOpen && (
                <div
                  className="position-absolute end-0 mt-2 py-2 bg-white shadow rounded border"
                  style={{ minWidth: "150px", zIndex: 100 }}
                >
                  <Link
                    to="/profile"
                    className="dropdown-item px-3 py-2 d-block"
                  >
                    Thông tin cá nhân
                  </Link>
                  <Link
                    to="/update"
                    className="dropdown-item px-3 py-2 text-decoration-none text-dark d-block"
                  >
                    Nâng cấp tài khoản
                     </Link>
            <Link
                    to="/changepass"
                    className="dropdown-item px-3 py-2 d-block"
                  >
                    Thay đổi mật khẩu

                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item px-3 py-2 w-100 text-start border-0 bg-transparent"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="d-md-none bg-transparent border-0"
            onClick={toggleMobileMenu}
          >
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
