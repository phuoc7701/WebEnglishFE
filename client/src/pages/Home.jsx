import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import FeatureCard from '../components/FeatureCard';
import { employees} from '../mockData';
import { students} from '../mockData';
import learne from './images/learnenglish.png';

const Home = () => {
  // Get first 3 courses for display
  const featuredEmployees = employees.slice(0, 3);
  const featuredStudents = students.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container px-4 py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="display-5 fw-bold mb-3">Learn With EngZone</h1>
              <p className="lead mb-4">Bài học tương tác, bài tập thực hành và lộ trình học tập cá nhân để giúp bạn trở nên thông thạo.</p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                {/* <Link to="/courses" className="btn btn-light btn-lg text-primary fw-bold">
                  Explore Courses
                </Link> */}
                <Link to="/practice" className="btn btn-outline-light btn-lg fw-bold">
                  Bắt đầu học
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Student learning English online" 
                className="img-fluid rounded shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-5 bg-light">
        <div className="container px-4">
          <h2 className="text-center fw-bold mb-4">Học cùng EngZone có gì ?</h2>
          <p className="text-center text-muted mb-5 mx-auto" style={{ maxWidth: "800px" }}>
            Nền tảng của chúng tôi cung cấp nhiều cách để cải thiện các kỹ năng tiếng Anh của bạn thông qua các hoạt động thực hành và phương pháp học tập khác nhau.
          </p>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <FeatureCard 
                icon="book" 
                title="Bài học nền tảng" 
                description="Hệ thống bài học rõ ràng, dễ hiểu, giúp bạn làm chủ ngữ pháp, từ vựng và cấu trúc câu thông dụng từ cơ bản đến nâng cao."
                color="primary"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <FeatureCard 
                icon="pen" 
                title="Luyện viết cùng AI" 
                description="Cải thiện kỹ năng viết tiếng Anh qua các bài tập thực tế. Nhận phản hồi từ AI thông minh để nâng cao từng câu chữ mỗi ngày."
                color="secondary"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <FeatureCard 
                icon="mic" 
                title="Luyện nói cùng AI" 
                description="Luyện nói trực tiếp với AI, sửa phát âm ngay lập tức và nâng cao phản xạ trong các tình huống thường gặp khi đi làm hoặc du lịch."
                color="accent"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <FeatureCard 
                icon="clipboard-check" 
                title="Làm bài kiểm tra" 
                description="Bài kiểm tra ngắn, dễ hiểu, đánh giá đúng trình độ hiện tại và đưa ra gợi ý cải thiện tức thì."
                color="danger"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Progress Tracking Section */}
      <section className="py-5 bg-white">
        <div className="container px-4">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img 
                src={learne} 
                alt="Learning progress statistics" 
                className="img-fluid rounded shadow-lg" 
              />
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h2 className="fw-bold mb-4">Tại sao nên sử dụng hệ thống học tiếng Anh Engzone?</h2>
              <h5 className="text-muted mb-4">Cải thiện toàn diện 4 kỹ năng Nghe – Nói – Đọc – Viết một cách hiệu quả và cá nhân hóa</h5>
              <p className="text-muted mb-4">Engzone là nền tảng học tiếng Anh toàn diện, giúp người học rèn luyện và nâng cao đồng đều cả 4 kỹ năng thiết yếu trong tiếng Anh: Nghe, Nói, Đọc, Viết. Với giao diện thân thiện, dễ sử dụng cùng hệ thống theo dõi tiến bộ chi tiết, Engzone phù hợp với mọi trình độ từ cơ bản đến nâng cao. Hãy bắt đầu luyện tập, bạn sẽ thấy sự tiến bộ rõ rệt qua từng ngày!</p>
              <ul className="list-unstyled">
                <li className="d-flex mb-3">
                  <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white me-3" style={{ width: "24px", height: "24px" }}>
                    <i className="bi bi-check"></i>
                  </div>
                  <p className="m-0">Kho từ vựng phong phú và hệ thống hóa</p>
                </li>
                <li className="d-flex mb-3">
                  <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white me-3" style={{ width: "24px", height: "24px" }}>
                    <i className="bi bi-check"></i>
                  </div>
                  <p className="m-0">Luyện tập 4 kỹ năng một cách chuyên sâu</p>
                </li>
                <li className="d-flex mb-3">
                  <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white me-3" style={{ width: "24px", height: "24px" }}>
                    <i className="bi bi-check"></i>
                  </div>
                  <p className="m-0">Phân tích tiến độ học tập thông minh</p>
                </li>
                <li className="d-flex mb-3">
                  <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white me-3" style={{ width: "24px", height: "24px" }}>
                    <i className="bi bi-check"></i>
                  </div>
                  <p className="m-0">Compare your progress with other learners</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container px-4">
          <h2 className="text-center fw-bold mb-5">Đội ngũ phát triển</h2>
          <div className="row g-4">
            {featuredEmployees.map(employee => (
              <div className="col-md-6 col-lg-4" key={employee.id}>
                <CourseCard course={employee} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container px-4">
          <h2 className="text-center fw-bold mb-5">Học viên đã học</h2>
          <div className="row g-4">
            {featuredStudents.map(student => (
              <div className="col-md-6 col-lg-4" key={student.id}>
                <CourseCard course={student} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
