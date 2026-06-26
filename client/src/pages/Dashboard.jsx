import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import ProgressBar from "../components/ProgressBar";
import DailyTasks from "../components/DailyTasks";
import WeeklyPlan from "../components/WeeklyPlan";
import Loader from "../components/Loader";
import api from "../services/api";
import getTodaysTasks from "../utils/getTodaysTasks";
import calculateProgress from "../utils/calculateProgress";

function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recalculating, setRecalculating] = useState(false);
  const [error, setError] = useState("");
  const [showMonthly, setShowMonthly] = useState(false);
  const [impactMessage, setImpactMessage] = useState("");

  const savedName = sessionStorage.getItem("userName");

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await api.get(`/goals/${id}`);
        setGoal(response.data);
      } catch (err) {
        setError("Could not load goal. Check if the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchGoal();
  }, [id]);

  const handleTaskToggle = async (taskId, completed) => {
    try {
      const response = await api.patch(`/goals/${id}/tasks/${taskId}`, { completed });
      setGoal(response.data.goal);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleRecalculate = async () => {
    setRecalculating(true);
    setImpactMessage("");

    const missedTasks = goal.tasks.filter((t) => !t.completed).length;
    const totalTasks = goal.tasks.length;
    const estimatedDelayDays = Math.ceil(missedTasks / 3);

    try {
      await api.post(`/goals/${id}/recalculate`);
      const response = await api.get(`/goals/${id}`);
      setGoal(response.data);

      if (missedTasks > 0) {
        setImpactMessage(
          `You have ${missedTasks} incomplete task${missedTasks > 1 ? "s" : ""} out of ${totalTasks}. ` +
          `At this pace, your goal is delayed by approximately ${estimatedDelayDays} day${estimatedDelayDays > 1 ? "s" : ""}. ` +
          `Your plan has been recalculated to get you back on track.`
        );
      } else {
        setImpactMessage("You're all caught up! Your plan has been refreshed for the next 7 days.");
      }
    } catch (err) {
      console.error("Error recalculating:", err);
    } finally {
      setRecalculating(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-page"><p>{error}</p></div>;
  if (!goal) return null;

  const progress = calculateProgress(goal.tasks);
  const todaysTasks = getTodaysTasks(goal.roadmap, goal.tasks);

  const getTomorrowsTasks = () => {
    if (!goal.roadmap?.dailyPlan || goal.roadmap.dailyPlan.length < 2) return [];
    const tomorrowTitles = goal.roadmap.dailyPlan[1].tasks;
    return goal.tasks.filter((task) => tomorrowTitles.includes(task.title));
  };
  const tomorrowsTasks = getTomorrowsTasks();

  const getThisWeekDays = () => {
    if (!goal.roadmap?.dailyPlan) return [];
    return goal.roadmap.dailyPlan.slice(0, 7);
  };
  const thisWeekDays = getThisWeekDays();

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-container">

        {/* Back to all goals */}
        {savedName && (
          <button className="btn-back" onClick={() => navigate(`/goals/${savedName}`)}>
            ← Back to my goals
          </button>
        )}

        <DashboardCard goal={goal} />
        <ProgressBar progress={progress} />

        <div className="dashboard-grid">
          <DailyTasks tasks={todaysTasks} onTaskToggle={handleTaskToggle} label="Today's Tasks" />
          <div className="section-card">
            <h3 className="section-title">Tomorrow's Tasks</h3>
            {tomorrowsTasks.length === 0 ? (
              <p className="empty-message">No tasks for tomorrow.</p>
            ) : (
              <ul className="preview-task-list">
                {tomorrowsTasks.map((task, index) => (
                  <li key={index} className="preview-task-item">
                    <span className="preview-dot"></span>
                    {task.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {thisWeekDays.length > 0 && (
          <div className="section-card">
            <h3 className="section-title">This Week's Schedule</h3>
            <div className="week-grid">
              {thisWeekDays.map((day) => (
                <div key={day.day} className="week-day-card">
                  <span className="week-day-label">Day {day.day}</span>
                  <ul className="week-day-tasks">
                    {day.tasks.slice(0, 2).map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                    {day.tasks.length > 2 && (
                      <li className="week-day-more">+{day.tasks.length - 2} more</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <WeeklyPlan weeklyPlan={goal.roadmap?.weeklyPlan} />

        {goal.roadmap?.monthlyPlan?.length > 0 && (
          <div className="section-card">
            <button className="btn-expand-header" onClick={() => setShowMonthly(!showMonthly)}>
              <span>Monthly Milestones</span>
              <span>{showMonthly ? "↑ Hide" : "Complete monthly plan →"}</span>
            </button>
            {showMonthly && (
              <ul className="monthly-list" style={{ marginTop: "16px" }}>
                {goal.roadmap.monthlyPlan.map((month, index) => (
                  <li key={index} className="monthly-item">
                    <span className="monthly-index">Month {index + 1}</span>
                    <span>{month}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {impactMessage && (
          <div className={`impact-banner ${impactMessage.includes("all caught up") ? "impact-success" : "impact-warning"}`}>
            <span className="impact-icon">
              {impactMessage.includes("all caught up") ? "✅" : "⚠️"}
            </span>
            <p>{impactMessage}</p>
          </div>
        )}

        <div className="recalculate-section">
          <p className="recalculate-hint">Missed some tasks? Let AI rebuild your next 7 days.</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn-secondary" onClick={handleRecalculate} disabled={recalculating}>
              {recalculating ? "Recalculating..." : "↻ Recalculate Plan"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;