import { GoogleGenAI } from "@google/genai";
import { roadmapPrompt, recalculatePrompt } from "../utils/promptTemplates.js";

let genAI;

const getGenAI = () => {
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  return genAI;
};

const parseJSON = (text) => {
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
};

export const generateRoadmap = async (title, description, deadline, hoursPerDay, level) => {
  try {
    const prompt = roadmapPrompt(title, description, deadline, hoursPerDay, level);
    const result = await getGenAI().models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    const text = result.text;
    return parseJSON(text);
  } catch (error) {
    console.error("Error generating roadmap:", error.message);
    throw new Error("Failed to generate roadmap from AI");
  }
};

export const recalculateRoadmap = async (title, completedTasks, pendingTasks, remainingDays) => {
  try {
    const prompt = recalculatePrompt(title, completedTasks, pendingTasks, remainingDays);
    const result = await getGenAI().models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    const text = result.text;
    return parseJSON(text);
  } catch (error) {
    console.error("Error recalculating roadmap:", error.message);
    throw new Error("Failed to recalculate roadmap from AI");
  }
};
