import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <button className="btn-primary" onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}
export default NotFound;