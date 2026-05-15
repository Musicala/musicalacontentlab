import { DEFAULT_DAILY_TEMPLATES } from "../data/defaultDailyTemplates.js";
import { DEFAULT_CONTENT_IDEAS } from "../data/defaultContentIdeas.js";
import { ROTATION_RULES } from "../data/rotationRules.js";
import { getWeekday } from "./dates.js";

function pickFromArray(items, seed = 0) {
  if (!items.length) return null;
  return items[Math.abs(seed) % items.length];
}

function stringSeed(value = "") {
  return String(value)
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function getTemplateForDate(dateString) {
  const weekday = getWeekday(dateString);
  return DEFAULT_DAILY_TEMPLATES.find((template) => template.weekday === weekday) || DEFAULT_DAILY_TEMPLATES[0];
}

export function generateTasksForDate({ dateString, userName = "Musicala", existingTasks = [], customIdeas = [] }) {
  const template = getTemplateForDate(dateString);
  const seed = stringSeed(dateString);
  const ideas = [...customIdeas, ...DEFAULT_CONTENT_IDEAS];
  const antiSelfie = pickFromArray(ROTATION_RULES.antiSelfiePrompts, seed + existingTasks.length);
  const selectedIdea = pickFromArray(
    ideas.filter((idea) => idea.objective === template.objective) || ideas,
    seed + 7
  ) || pickFromArray(ideas, seed + 7);

  const baseTasks = template.suggestedTasks.map((task, index) => ({
    title: task.title,
    description: task.description,
    date: dateString,
    objective: template.objective,
    pillar: task.pillar || template.theme,
    format: task.format || "Reel",
    platforms: task.platforms || ["Instagram"],
    responsible: userName,
    status: "pending",
    priority: task.priority || "medium",
    source: "daily-template",
    reusable: true,
    publishLink: "",
    notes: "",
    createdByRotation: true,
    sortOrder: index + 1
  }));

  const ideaTask = selectedIdea
    ? {
        title: `Convertir idea en contenido: ${selectedIdea.title}`,
        description: selectedIdea.description,
        date: dateString,
        objective: selectedIdea.objective || template.objective,
        pillar: selectedIdea.pillar || template.theme,
        format: selectedIdea.suggestedFormats?.[0] || "Reel",
        platforms: selectedIdea.platforms || selectedIdea.suggestedPlatforms || ["Instagram", "TikTok"],
        responsible: userName,
        status: "pending",
        priority: "medium",
        source: "idea-rotation",
        reusable: true,
        publishLink: "",
        notes: "",
        createdByRotation: true,
        sortOrder: 98
      }
    : null;

  const antiSelfieTask = {
    title: "Plano anti-selfie del día",
    description: antiSelfie,
    date: dateString,
    objective: "confianza",
    pillar: "Detrás de cámaras",
    format: "Clip documental",
    platforms: ["Instagram", "Facebook", "TikTok"],
    responsible: userName,
    status: "pending",
    priority: "low",
    source: "anti-selfie-rule",
    reusable: true,
    publishLink: "",
    notes: "Esta tarea existe para que el contenido no dependa siempre de aparecer en cámara.",
    createdByRotation: true,
    sortOrder: 99
  };

  return [...baseTasks, ideaTask, antiSelfieTask]
    .filter(Boolean)
    .slice(0, ROTATION_RULES.dailyTaskLimit + 1);
}

export function buildTaskFromIdea({ idea, dateString, userName = "Musicala" }) {
  return {
    title: idea.title,
    description: idea.description || "",
    date: dateString,
    objective: idea.objective || "atraccion",
    pillar: idea.pillar || "Vida cotidiana Musicala",
    format: idea.suggestedFormats?.[0] || idea.format || "Reel",
    platforms: idea.platforms || ["Instagram", "Facebook", "TikTok"],
    responsible: userName,
    status: "pending",
    priority: "medium",
    source: "idea-bank",
    reusable: true,
    publishLink: "",
    notes: ""
  };
}
