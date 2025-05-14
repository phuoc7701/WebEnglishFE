const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress-value" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
