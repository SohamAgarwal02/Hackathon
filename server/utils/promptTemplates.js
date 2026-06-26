export const roadmapPrompt = (title, description, deadline, hoursPerDay, level) => {
  return `
You are a productivity and learning coach AI.

A user has the following goal:
- Title: ${title}
- Description: ${description}
- Deadline: ${deadline}
- Hours available per day: ${hoursPerDay}
- Current level: ${level}

Generate a detailed roadmap broken into:
1. monthlyPlan - array of monthly milestones
2. weeklyPlan - array of weekly goals
3. dailyPlan - array of at least 7 days, each with specific tasks

Return ONLY valid JSON. Do not include markdown, explanation or code fences.

{
  "monthlyPlan": ["Month 1: ...", "Month 2: ..."],
  "weeklyPlan": ["Week 1: ...", "Week 2: ..."],
  "dailyPlan": [
    { "day": 1, "tasks": ["...", "..."] },
    { "day": 2, "tasks": ["...", "..."] }
  ]
}
`;
};

export const recalculatePrompt = (title, completedTasks, pendingTasks, remainingDays) => {
  return `
You are a productivity AI assistant.

The user is working on: "${title}"

Progress:
- Completed tasks: ${JSON.stringify(completedTasks)}
- Pending/missed tasks: ${JSON.stringify(pendingTasks)}
- Remaining days: ${remainingDays}

Generate a fresh 7-day plan to help the user catch up.

Return ONLY valid JSON. Do not include markdown, explanation or code fences.

{
  "dailyPlan": [
    { "day": 1, "tasks": ["...", "..."] },
    { "day": 2, "tasks": ["...", "..."] }
  ]
}
`;
};