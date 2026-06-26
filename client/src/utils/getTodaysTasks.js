const getTodaysTasks = (roadmap, tasks) => {
  if (!roadmap || !roadmap.dailyPlan || roadmap.dailyPlan.length === 0) return [];
  if (!tasks || tasks.length === 0) return [];
  const todayTitles = roadmap.dailyPlan[0].tasks;
  return tasks.filter((task) => todayTitles.includes(task.title));
};

export default getTodaysTasks;