import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import Loader from "../components/Loader";
import api from "../services/api";
import calculateProgress from "../utils/calculateProgress";
import getTodaysTasks from "../utils/getTodaysTasks";
import formatDate from "../utils/formatDate";

function MyGoal() {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const goalId = sessionStorage.getItem("goalId");

  useEffect(() => {
    if (!goalId) {
      navigate("/");
      return;
    }

    const fetchGoal = async () => {
      try {
        const response = await api.get(`/goals/${goalId}`);
        setGoal(response.data);
      } catch (err) {
        console.error("Error fetching goal:", err);
        setError("Could not load your goal. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, []);

  const handleNewGoal = () => {
    sessionStorage.removeItem("goalId");
    navigate("/");
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-page"><p>{error}</p></div>;
  if (!goal) return null;

  const progress = calculateProgress(goal.tasks);
  const todaysTasks = getTodaysTasks(goal.roadmap, goal.tasks);
  const completedCount = goal.tasks.filter((t) => t.completed).length;
  const totalCount = goal.tasks.length;

  const tomorrowTitles =
    goal.roadmap?.dailyPlan?.length >= 2
      ? goal.roadmap.dailyPlan[1].tasks.slice(0, 3)
      : [];

  return (
    <div className="mygoal-page">
      <Navbar />
      <div className="mygoal-container">

        <div className="mygoal-hero">
          <div className="mygoal-hero-left">
            <span className="mygoal-badge">👋 {goal.name}</span>
            <h1 className="mygoal-title">{goal.title}</h1>
            <p className="mygoal-description">{goal.description}</p>
            <div className="mygoal-meta">
              <span>⏱ {goal.hoursPerDay} hrs/day</span>
              <span>📅 Deadline: {formatDate(goal.deadline)}</span>
            </div>
          </div>
          <div className="mygoal-progress-circle">
            <span className="mygoal-progress-number">{progress}%</span>
            <span className="mygoal-progress-label">Complete</span>
          </div>
        </div>

        <ProgressBar progress={progress} />

        <div className="mygoal-stats">
          <div className="mygoal-stat-card">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Tasks Done</span>
          </div>
          <div className="mygoal-stat-card">
            <span className="stat-number">{totalCount - completedCount}</span>
            <span className="stat-label">Remaining</span>
          </div>
          <div className="mygoal-stat-card">
            <span className="stat-number">
              {Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))}
            </span>
            <span className="stat-label">Days Left</span>
          </div>
          <div className="mygoal-stat-card">
            <span className="stat-number">{goal.roadmap?.weeklyPlan?.length || 0}</span>
            <span className="stat-label">Weeks Planned</span>
          </div>
        </div>

        <div className="mygoal-section">
          <h2 className="mygoal-section-title">Today's Focus</h2>
          {todaysTasks.length === 0 ? (
            <p className="empty-message">No tasks for today.</p>
          ) : (
            <ul className="mygoal-task-preview">
              {todaysTasks.map((task) => (
                <li key={task._id} className={`mygoal-task-item ${task.completed ? "mygoal-task-done" : ""}`}>
                  <span className={`mygoal-task-dot ${task.completed ? "dot-done" : "dot-pending"}`}></span>
                  <span>{task.title}</span>
                  {task.completed && <span className="mygoal-task-tick">✓</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {tomorrowTitles.length > 0 && (
          <div className="mygoal-section mygoal-section-muted">
            <h2 className="mygoal-section-title">Coming Up Tomorrow</h2>
            <ul className="mygoal-task-preview">
              {tomorrowTitles.map((title, index) => (
                <li key={index} className="mygoal-task-item mygoal-task-muted">
                  <span className="mygoal-task-dot dot-muted"></span>
                  <span>{title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mygoal-actions">
          <button className="btn-primary mygoal-btn" onClick={() => navigate(`/dashboard/${goalId}`)}>
            View Full Dashboard →
          </button>
          <button className="btn-danger mygoal-btn-sm" onClick={handleNewGoal}>
            + New Goal
          </button>
        </div>

      </div>
    </div>
  );
}

export default MyGoal;