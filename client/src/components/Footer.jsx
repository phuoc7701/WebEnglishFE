import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container mx-auto px-4">
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-3">
            <h3 className="fs-5 fw-bold mb-3">EngZone</h3>
            <p className="text-gray-light mb-4">Nền tảng tốt nhất để học tiếng Anh trực tuyến với các bài học tương tác và phản hồi cá nhân hóa.</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-decoration-none text-white">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-decoration-none text-white">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-decoration-none text-white">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-decoration-none text-white">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="fs-6 fw-semibold mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/courses" className="text-gray-light text-decoration-none hover-text-white">
                  Kiến thức
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/practice" className="text-gray-light text-decoration-none hover-text-white">
                  Ôn Luyện
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/my-lessons" className="text-gray-light text-decoration-none hover-text-white">
                  Thi thử
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="fs-6 fw-semibold mb-3">Resources</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-gray-light text-decoration-none hover-text-white">
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-light text-decoration-none hover-text-white">
                  Tutorials
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-light text-decoration-none hover-text-white">
                  FAQ
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-light text-decoration-none hover-text-white">
                  Community
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-12 col-md-6 col-lg-3">
            <h4 className="fs-6 fw-semibold mb-3">Liên hệ</h4>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-envelope me-2"></i>
                <a href="mailto:info@learnenglish.com" className="text-gray-light text-decoration-none hover-text-white">
                  EngZone@gmail.com
                </a>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-telephone me-2"></i>
                <a href="tel:+1234567890" className="text-gray-light text-decoration-none hover-text-white">
                  0973067285
                </a>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-geo-alt me-2"></i>
                <span className="text-gray-light">77 Nguyễn Huệ, Thành phố Huế</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-top border-secondary mt-4 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-gray-light small mb-3 mb-md-0">© 2025 EngZone. All rights reserved.</p>
          <div className="d-flex gap-4">
            <a href="#" className="text-gray-light text-decoration-none small">Chính sách bảo mật</a>
            <a href="#" className="text-gray-light text-decoration-none small">Điều khoản dịch vụ</a>
            <a href="#" className="text-gray-light text-decoration-none small">Chính sách cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
