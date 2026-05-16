import { DAILY_CONTENT_SLOTS, WEEKLY_CONTENT_FOCUS } from "./contentMatrix.js";

function buildTemplate(focusItem) {
  return {
    weekday: focusItem.weekday,
    name: focusItem.name,
    objective: "matriz_diaria",
    theme: focusItem.focus,
    suggestedTasks: DAILY_CONTENT_SLOTS.map((slot) => ({
      title: slot.title,
      description: slot.description,
      format: slot.format,
      pillar: slot.pillar,
      platforms: slot.platforms,
      priority: slot.priority,
      objective: slot.objective,
      packagePlan: slot.packagePlan,
      slotId: slot.id
    }))
  };
}

export const DEFAULT_DAILY_TEMPLATES = WEEKLY_CONTENT_FOCUS.map(buildTemplate);
