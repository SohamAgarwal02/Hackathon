function TaskCard({ task, onToggle }) {
  return (
    <div className={`task-card ${task.completed ? "task-completed" : ""}`}>
      <input type="checkbox" className="task-checkbox"
        checked={task.completed} onChange={() => onToggle(task._id, !task.completed)} />
      <span className="task-title">{task.title}</span>
    </div>
  );
}
export default TaskCard;