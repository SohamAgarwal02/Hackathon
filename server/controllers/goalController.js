import Goal from "../models/Goal.js";
import { generateRoadmap, recalculateRoadmap } from "../services/aiService.js";

export const createGoal = async (req, res) => {
  try {
    const { name, title, description, deadline, hoursPerDay, level } = req.body;

    const roadmap = await generateRoadmap(title, description, deadline, hoursPerDay, level);

    const tasks = [];
    if (roadmap.dailyPlan && Array.isArray(roadmap.dailyPlan)) {
      roadmap.dailyPlan.forEach((day) => {
        day.tasks.forEach((taskTitle) => {
          tasks.push({ title: taskTitle, completed: false, dueDate: null });
        });
      });
    }

    const newGoal = new Goal({
      name,
      title,
      description,
      deadline,
      hoursPerDay,
      level,
      roadmap,
      tasks,
      progress: 0,
    });

    const savedGoal = await newGoal.save();
    res.status(201).json({ message: "Goal created successfully", goal: savedGoal });
  } catch (error) {
    console.error("Error in createGoal:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all goals belonging to a name
export const getGoalsByName = async (req, res) => {
  try {
    // Case-insensitive search so "amit" and "Amit" both work
    const goals = await Goal.find({
      name: { $regex: new RegExp(`^${req.params.name}$`, "i") }
    });
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error in getGoalsByName:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });
    res.status(200).json(goal);
  } catch (error) {
    console.error("Error in getGoal:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { goalId, taskId } = req.params;
    const { completed } = req.body;

    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    const task = goal.tasks.id(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = completed;

    const totalTasks = goal.tasks.length;
    const completedCount = goal.tasks.filter((t) => t.completed).length;
    goal.progress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

    const updatedGoal = await goal.save();
    res.status(200).json({ message: "Task updated successfully", goal: updatedGoal });
  } catch (error) {
    console.error("Error in updateTaskStatus:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const recalculateGoalPlan = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    const completedTasks = goal.tasks.filter((t) => t.completed).map((t) => t.title);
    const pendingTasks = goal.tasks.filter((t) => !t.completed).map((t) => t.title);

    const today = new Date();
    const deadline = new Date(goal.deadline);
    const remainingDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    const updatedPlan = await recalculateRoadmap(goal.title, completedTasks, pendingTasks, remainingDays);

    goal.roadmap.dailyPlan = updatedPlan.dailyPlan;
    const updatedGoal = await goal.save();

    res.status(200).json({ message: "Roadmap recalculated successfully", roadmap: updatedGoal.roadmap });
  } catch (error) {
    console.error("Error in recalculateGoalPlan:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};