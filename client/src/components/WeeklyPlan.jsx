import { useState } from "react";

function WeeklyPlan({ weeklyPlan }) {
  const [showFull, setShowFull] = useState(false);

  if (!weeklyPlan || weeklyPlan.length === 0) {
    return (
      <div className="section-card">
        <h3 className="section-title">Weekly Plan</h3>
        <p className="empty-message">No weekly plan available.</p>
      </div>
    );
  }

  // Only show the first 2 weeks by default (this week + next)
  const previewItems = weeklyPlan.slice(0, 2);
  const displayItems = showFull ? weeklyPlan : previewItems;

  return (
    <div className="section-card">
      <h3 className="section-title">Weekly Plan</h3>
      <ul className="weekly-list">
        {displayItems.map((week, index) => (
          <li key={index} className="weekly-item">
            <span className="weekly-index">W{index + 1}</span>
            <span className="weekly-text">{week}</span>
          </li>
        ))}
      </ul>

      {/* Toggle button to reveal or hide remaining weeks */}
      {weeklyPlan.length > 2 && (
        <button
          className="btn-expand"
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? "Hide full plan ↑" : `Complete weekly plan → (${weeklyPlan.length - 2} more weeks)`}
        </button>
      )}
    </div>
  );
}

export default WeeklyPlan;