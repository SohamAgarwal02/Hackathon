import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GoalsList from "./pages/GoalsList";
import CreateGoal from "./pages/CreateGoal";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goals/:name" element={<GoalsList />} />
        <Route path="/create/:name" element={<CreateGoal />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;