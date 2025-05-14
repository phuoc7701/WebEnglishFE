import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import FeatureCard from '../components/FeatureCard';
import { courses } from '../mockData';

const Home = () => {
  // Get first 3 courses for display
  const featuredCourses = courses.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container px-4 py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="display-5 fw-bold mb-3">Master English Online</h1>
              <p className="lead mb-4">Interactive lessons, practice exercises, and personalized learning paths to help you become fluent.</p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to="/courses" className="btn btn-light btn-lg text-primary fw-bold">
                  Explore Courses
                </Link>
                <Link to="/practice" className="btn btn-outline-light btn-lg fw-bold">
                  Start Practice
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

      {/* Popular Courses Section */}
      <section className="py-5 bg-white">
        <div className="container px-4">
          <h2 className="text-center fw-bold mb-5">Popular Courses</h2>
          <div className="row g-4">
            {featuredCourses.map(course => (
              <div className="col-md-6 col-lg-4" key={course.id}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/courses" className="btn btn-primary btn-lg fw-bold">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container px-4">
          <h2 className="text-center fw-bold mb-4">Learning Features</h2>
          <p className="text-center text-muted mb-5 mx-auto" style={{ maxWidth: "800px" }}>
            Our platform offers multiple ways to improve your English skills through different practice activities and learning methods.
          </p>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <FeatureCard 
                icon="book" 
                title="Lessons" 
                description="Structured lessons with clear explanations and examples."
                color="primary"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <FeatureCard 
                icon="pen" 
                title="Writing Practice" 
                description="Improve your writing skills with guided exercises and feedback."
                color="secondary"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <FeatureCard 
                icon="mic" 
                title="Speaking Practice" 
                description="Enhance pronunciation and fluency through interactive exercises."
                color="accent"
              />
            </div>
            <div className="col-md-6 col-lg-3">
              <FeatureCard 
                icon="clipboard-check" 
                title="Tests" 
                description="Assess your progress with comprehensive tests and quizzes."
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
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Learning progress statistics" 
                className="img-fluid rounded shadow-lg" 
              />
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h2 className="fw-bold mb-4">Track Your Progress</h2>
              <p className="text-muted mb-4">Our platform provides detailed statistics and progress tracking to help you monitor your learning journey and stay motivated.</p>
              <ul className="list-unstyled">
                <li className="d-flex mb-3">
                  <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white me-3" style={{ width: "24px", height: "24px" }}>
                    <i className="bi bi-check"></i>
                  </div>
                  <p className="m-0">Visualize your daily learning streaks</p>
                </li>
                <li className="d-flex mb-3">
                  <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white me-3" style={{ width: "24px", height: "24px" }}>
                    <i className="bi bi-check"></i>
                  </div>
                  <p className="m-0">Track vocabulary mastery and areas for improvement</p>
                </li>
                <li className="d-flex mb-3">
                  <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white me-3" style={{ width: "24px", height: "24px" }}>
                    <i className="bi bi-check"></i>
                  </div>
                  <p className="m-0">Set goals and receive personalized recommendations</p>
                </li>
                <li className="d-flex mb-3">
                  <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white me-3" style={{ width: "24px", height: "24px" }}>
                    <i className="bi bi-check"></i>
                  </div>
                  <p className="m-0">Compare your progress with other learners</p>
                </li>
              </ul>
              <Link to="/my-lessons" className="btn btn-primary fw-bold mt-3">
                View My Progress
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
