const FeatureCard = ({ icon, title, description, color }) => {
  const getColorClass = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-subtle text-primary';
      case 'secondary':
        return 'bg-success-subtle text-secondary';
      case 'accent':
        return 'bg-warning-subtle text-accent';
      case 'danger':
        return 'bg-danger-subtle text-danger';
      default:
        return 'bg-primary-subtle text-primary';
    }
  };

  return (
    <div className="card h-100 border-0 shadow-sm p-4 text-center">
      <div className={`rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center ${getColorClass(color)}`} style={{ width: "64px", height: "64px" }}>
        <i className={`bi bi-${icon} fs-4`}></i>
      </div>
      <h3 className="fs-5 fw-bold mb-2">{title}</h3>
      <p className="text-muted mb-0">{description}</p>
    </div>
  );
};

export default FeatureCard;
