function ProgressBar({ progress }) {
  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <span className="progress-label">Overall Progress</span>
        <span className="progress-percent">{progress}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-caption">
        {progress === 0 && "Start completing tasks to track your progress"}
        {progress > 0 && progress < 50 && "Good start — keep the momentum going!"}
        {progress >= 50 && progress < 100 && "Halfway there — you're crushing it!"}
        {progress === 100 && "Goal complete! 🎉"}
      </p>
    </div>
  );
}
export default ProgressBar;