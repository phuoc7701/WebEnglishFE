import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const CourseCard = ({ course }) => {
  const { id, title, description, imageUrl } = course;

  // Determine button text based on progress

  return (
    <div className="card h-100 shadow-sm hover-shadow-lg transition-shadow">
      <img 
        src={imageUrl} 
        alt={title} 
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">        
        <h3 className="h5 fw-bold mb-2">{title}</h3>
        <p className="text-muted mb-3 flex-grow-1">{description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
