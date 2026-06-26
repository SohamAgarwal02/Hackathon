import express from "express";
import {
  createGoal,
  getGoal,
  getGoalsByName,
  updateTaskStatus,
  recalculateGoalPlan,
} from "../controllers/goalController.js";

const router = express.Router();

router.post("/", createGoal);
router.get("/user/:name", getGoalsByName); // get all goals for a name
router.get("/:id", getGoal);
router.patch("/:goalId/tasks/:taskId", updateTaskStatus);
router.post("/:id/recalculate", recalculateGoalPlan);

export default router;  