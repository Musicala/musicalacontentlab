import { OBJECTIVE_LABELS } from "../data/contentObjectives.js";
import { STATUS_LABELS, PRIORITY_LABELS } from "../data/rotationRules.js";

export function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function labelObjective(value) {
  return OBJECTIVE_LABELS[value] || value || "Sin objetivo";
}

export function labelStatus(value) {
  return STATUS_LABELS[value] || value || "Pendiente";
}

export function labelPriority(value) {
  return PRIORITY_LABELS[value] || value || "Media";
}

export function listText(items = []) {
  if (!Array.isArray(items)) return "";
  return items.filter(Boolean).join(", ");
}

export function calcCompletion(tasks = []) {
  const total = tasks.length;
  if (!total) return 0;
  const completed = tasks.filter((task) =>
    ["published", "done", "skipped"].includes(task.status)
  ).length;
  return Math.round((completed / total) * 100);
}

export function uniqueValues(items = []) {
  return [...new Set(items.filter(Boolean))];
}
