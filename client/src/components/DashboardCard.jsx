import formatDate from "../utils/formatDate";

function DashboardCard({ goal }) {
  if (!goal) return null;

  const totalTasks = goal.tasks?.length ?? 0;
  const completedTasks = goal.tasks?.filter((task) => task.completed).length ?? 0;

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <span className="card-badge">{goal.level || "Goal"}</span>
        <span className="card-date">Due {formatDate(goal.deadline)}</span>
      </div>

      <h2 className="card-title">{goal.title}</h2>

      {goal.description && (
        <p className="card-description">{goal.description}</p>
      )}

      <div className="card-meta">
        <span>{goal.hoursPerDay || 0} hrs/day</span>
        <span>{completedTasks}/{totalTasks} tasks done</span>
      </div>
    </div>
  );
}

export default DashboardCard;
