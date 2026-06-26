import { useState } from "react";

function GoalForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "", description: "", deadline: "", hoursPerDay: 2, level: "Beginner",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <h2 className="form-heading">Set Your Goal</h2>
      <p className="form-subheading">Tell us what you want to achieve — AI will build your plan.</p>

      <div className="form-group">
        <label>Goal Title</label>
        <input type="text" name="title" placeholder="e.g. Crack SDE Internship in 6 months"
          value={formData.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" placeholder="Briefly describe your goal"
          value={formData.description} onChange={handleChange} rows={3} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Deadline</label>
          <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Hours per Day</label>
          <input type="number" name="hoursPerDay" min="1" max="12"
            value={formData.hoursPerDay} onChange={handleChange} required />
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

      <button type="submit" className="btn-primary"> Generate Plan </button>
    </form>
  );
}
export default GoalForm;