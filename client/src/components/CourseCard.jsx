import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const CourseCard = ({ course }) => {
  const { id, title, description, level, rating, totalLessons, progress, imageUrl } = course;

  // Determine button text based on progress
  const buttonText = progress > 0 ? 'Continue' : 'Start Course';

  return (
    <div className="card h-100 shadow-sm hover-shadow-lg transition-shadow">
      <img 
        src={imageUrl} 
        alt={title} 
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 small">{level}</span>
          <div className="d-flex align-items-center">
            <i className="bi bi-star-fill text-accent me-1"></i>
            <span className="small fw-medium">{rating}</span>
          </div>
        </div>
        <h3 className="h5 fw-bold mb-2">{title}</h3>
        <p className="text-muted mb-3 flex-grow-1">{description}</p>
        
        <div className="mb-3">
          <div className="d-flex justify-content-between small mb-1">
            <span>Progress</span>
            <span className="fw-medium">{progress}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-muted small">
            <i className="bi bi-clock me-1"></i>
            <span>{totalLessons} lessons</span>
          </div>
          <Link 
            to={`/courses/${id}`} 
            className="text-primary text-decoration-none fw-medium"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
