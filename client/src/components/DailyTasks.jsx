import TaskCard from "./TaskCard";

function DailyTasks({ tasks, onTaskToggle, label = "Today's Tasks" }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="section-card">
        <h3 className="section-title">{label}</h3>
        <p className="empty-message">No tasks found.</p>
      </div>
    );
  }
  return (
    <div className="section-card">
      <h3 className="section-title">{label}</h3>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onToggle={onTaskToggle} />
        ))}
      </div>
    </div>
  );
}

export default DailyTasks;