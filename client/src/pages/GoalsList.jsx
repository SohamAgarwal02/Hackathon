import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import api from "../services/api";
import calculateProgress from "../utils/calculateProgress";
import formatDate from "../utils/formatDate";

function GoalsList() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get(`/goals/user/${name}`);
        setGoals(response.data);
      } catch (err) {
        console.error("Error fetching goals:", err);
        setError("Could not load goals.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [name]);

  const handleNewGoal = () => {
    navigate(`/create/${name}`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userName");
    navigate("/");
  };

  if (loading) return <Loader />;

  return (
    <div className="goals-list-page">
      <Navbar />
      <div className="goals-list-container">

        {/* Greeting header */}
        <div className="goals-list-header">
          <div>
            <h1 className="goals-list-greeting">Hey, {name}! 👋</h1>
            <p className="goals-list-subtext">
              {goals.length === 0
                ? "You have no active goals yet. Create one to get started."
                : `You have ${goals.length} active goal${goals.length > 1 ? "s" : ""}. Keep going!`}
            </p>
          </div>
          <div className="goals-list-actions">
            <button className="btn-primary" onClick={handleNewGoal}>
              + New Goal
            </button>
            <button className="btn-ghost" onClick={handleLogout}>
              Not {name}?
            </button>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        {/* Empty state */}
        {goals.length === 0 && !error && (
          <div className="empty-state">
            <p className="empty-state-icon">🎯</p>
            <h2>No goals yet</h2>
            <p>Create your first goal and let AI build your roadmap.</p>
            <button className="btn-primary" onClick={handleNewGoal}>
              Create Your First Goal
            </button>
          </div>
        )}

        {/* Goal cards grid */}
        {goals.length > 0 && (
          <div className="goals-grid">
            {goals.map((goal) => {
              const progress = calculateProgress(goal.tasks);
              const completedCount = goal.tasks.filter((t) => t.completed).length;
              const totalCount = goal.tasks.length;
              const daysLeft = Math.ceil(
                (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
              );
              const todayTasks = goal.roadmap?.dailyPlan?.[0]?.tasks || [];

              return (
                <div
                  key={goal._id}
                  className="goal-summary-card"
                  onClick={() => navigate(`/dashboard/${goal._id}`)}
                >
                  {/* Card top */}
                  <div className="goal-card-top">
                    <span className="goal-card-level">{goal.level}</span>
                    <span className={`goal-card-days ${daysLeft < 7 ? "days-urgent" : ""}`}>
                      {daysLeft > 0 ? `${daysLeft}d left` : "Deadline passed"}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="goal-card-title">{goal.title}</h2>
                  <p className="goal-card-description">{goal.description}</p>

                  {/* Progress bar */}
                  <div className="goal-card-progress-track">
                    <div
                      className="goal-card-progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="goal-card-progress-label">
                    <span>{progress}% complete</span>
                    <span>{completedCount}/{totalCount} tasks</span>
                  </div>

                  {/* Today's tasks preview */}
                  {todayTasks.length > 0 && (
                    <div className="goal-card-today">
                      <p className="goal-card-today-label">Today</p>
                      <ul className="goal-card-today-list">
                        {todayTasks.slice(0, 2).map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                        {todayTasks.length > 2 && (
                          <li className="goal-card-more">+{todayTasks.length - 2} more</li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="goal-card-footer">
                    <span>Due {formatDate(goal.deadline)}</span>
                    <span className="goal-card-cta">View details →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default GoalsList;