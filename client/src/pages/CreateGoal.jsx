import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import api from "../services/api";

function CreateGoal() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    hoursPerDay: 2,
    level: "Beginner",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/goals", {
        ...formData,
        name, // attach the name from the URL param
      });

      const goalId = response.data.goal._id;
      // Go straight to the dashboard for this new goal
      navigate(`/dashboard/${goalId}`);
    } catch (err) {
      console.error("Error creating goal:", err);
      setError("Something went wrong. Make sure the backend is running.");
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="home-page">
      <Navbar />

      <div className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">New Goal for {name}</p>
          <h1 className="hero-heading">What do you want<br />to achieve?</h1>
          <p className="hero-body">
            Tell us your goal. AI will build a personalized month/week/day roadmap for you.
          </p>
        </div>
      </div>

      <div className="form-section">
        {error && <p className="error-message">{error}</p>}
        <form className="goal-form" onSubmit={handleSubmit}>
          <h2 className="form-heading">Set Your Goal</h2>
          <p className="form-subheading">Creating a plan for <strong>{name}</strong></p>

          <div className="form-group">
            <label>Goal Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Crack SDE Internship in 6 months"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Briefly describe your goal and what success looks like"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Hours per Day</label>
              <input
                type="number"
                name="hoursPerDay"
                min="1"
                max="12"
                value={formData.hoursPerDay}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Current Level</label>
            <select name="level" value={formData.level} onChange={handleChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button type="button" className="btn-secondary" onClick={() => navigate(`/goals/${name}`)}>
              ← Back
            </button>
            <button type="submit" className="btn-primary">
               Generate Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGoal;