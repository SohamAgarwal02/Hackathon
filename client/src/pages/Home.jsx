import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function Home() {
  const [nameInput, setNameInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If name already saved, go straight to their goals page
    const savedName = sessionStorage.getItem("userName");
    if (savedName) {
      navigate(`/goals/${savedName}`);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    // Save name to session and go to their goals page
    sessionStorage.setItem("userName", nameInput.trim());
    navigate(`/goals/${nameInput.trim()}`);
  };

  return (
    <div className="home-page">
      <Navbar />

      <div className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">AI-Powered Productivity</p>
          <h1 className="hero-heading">Your GPS<br />for every goal.</h1>
          <p className="hero-body">
            Enter your name to get started. AI builds your month/week/day
            roadmap and recalculates when life gets in the way.
          </p>
        </div>
      </div>

      <div className="form-section">
        <form className="goal-form" onSubmit={handleSubmit}>
          <h2 className="form-heading">Who are you?</h2>
          <p className="form-subheading">Enter your name to see your goals or create a new one.</p>

          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              placeholder="e.g. Amit"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
              autoFocus
            />
          </div>

          <button type="submit" className="btn-primary">
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;