import { DEFAULT_DAILY_TEMPLATES } from "../data/defaultDailyTemplates.js";
import { DEFAULT_CONTENT_IDEAS } from "../data/defaultContentIdeas.js";
import { ROTATION_RULES } from "../data/rotationRules.js";
import { DAILY_CONTENT_SLOTS, SERVICE_ROTATION, WEEKLY_CONTENT_FOCUS } from "../data/contentMatrix.js";
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

function getWeeklyFocus(dateString) {
  const weekday = getWeekday(dateString);
  return WEEKLY_CONTENT_FOCUS.find((item) => item.weekday === weekday) || WEEKLY_CONTENT_FOCUS[0];
}

function getServiceForSlot({ dateString, slotIndex, slot }) {
  const seed = stringSeed(`${dateString}-${slot.id}-${slotIndex}`);
  const focus = getWeeklyFocus(dateString);

  if (slot.id === "descubrimiento") {
    return pickFromArray(["Qué hacemos en Musicala", "Sede Musicala", "Modalidades: sede, hogar y virtual", "Musicalitos"], seed);
  }

  if (slot.id === "servicio_arte") {
    return pickFromArray(focus.servicePool?.length ? focus.servicePool : SERVICE_ROTATION, seed + 11);
  }

  if (slot.id === "talento") {
    return pickFromArray(["Profesores Musicala", "Estudiantes Musicala", ...SERVICE_ROTATION], seed + 23);
  }

  if (slot.id === "confianza_proceso") {
    return pickFromArray(["Historias reales de clase", "Detrás de cámaras", focus.focus, ...focus.servicePool], seed + 31);
  }

  if (slot.id === "diferencial") {
    return pickFromArray(["Metodología CREA", "Herramientas y recursos", "Servicios Musicala", "Modalidades: sede, hogar y virtual"], seed + 41);
  }

  if (slot.id === "conversion_suave") {
    return pickFromArray(["Servicios Musicala", focus.focus, "Modalidades: sede, hogar y virtual"], seed + 53);
  }

  return pickFromArray(SERVICE_ROTATION, seed + 7);
}

function buildPackageNotes(slot, service, focus) {
  const deliverables = slot.packagePlan?.length
    ? `Entregables sugeridos: ${slot.packagePlan.join(" + ")}.`
    : "Entregables sugeridos: reel/short + historias + pieza reutilizable.";

  return [
    `Enfoque semanal: ${focus.focus}.`,
    `Tema rotativo: ${service}.`,
    deliverables,
    "La pieza madre puede convertirse en reel, historia, carrusel, short o publicación fija según el material que salga."
  ].join(" ");
}

export function getTemplateForDate(dateString) {
  const weekday = getWeekday(dateString);
  return DEFAULT_DAILY_TEMPLATES.find((template) => template.weekday === weekday) || DEFAULT_DAILY_TEMPLATES[0];
}

export function generateTasksForDate({ dateString, userName = "Musicala", existingTasks = [], customIdeas = [] }) {
  const template = getTemplateForDate(dateString);
  const focus = getWeeklyFocus(dateString);
  const seed = stringSeed(dateString);
  const ideas = [...customIdeas, ...DEFAULT_CONTENT_IDEAS];
  const antiSelfie = pickFromArray(ROTATION_RULES.antiSelfiePrompts, seed + existingTasks.length);

  const baseTasks = DAILY_CONTENT_SLOTS.map((slot, index) => {
    const service = getServiceForSlot({ dateString, slotIndex: index, slot });
    const matchingIdea = pickFromArray(
      ideas.filter((idea) => idea.objective === slot.objective || idea.pillar === service),
      seed + index + 17
    );
    const ideaHint = matchingIdea ? ` Idea base: ${matchingIdea.title}.` : "";

    return {
      title: `${slot.title}: ${service}`,
      description: `${slot.description} ${buildPackageNotes(slot, service, focus)}${ideaHint}`,
      date: dateString,
      objective: slot.objective,
      pillar: service || slot.pillar || template.theme,
      focus: focus.focus,
      format: slot.format || "Paquete de contenido",
      platforms: slot.platforms || ["Instagram"],
      responsible: userName,
      status: "pending",
      priority: slot.priority || "medium",
      source: "daily-matrix",
      reusable: true,
      publishLink: "",
      notes: "",
      createdByRotation: true,
      slotId: slot.id,
      packagePlan: slot.packagePlan || [],
      sortOrder: index + 1
    };
  });

  const antiSelfieTask = {
    title: "Plano anti-selfie del día",
    description: `${antiSelfie} Esto alimenta cualquier objetivo del día y evita que todo dependa de hablar a cámara, porque tampoco estamos fundando un noticiero local.`,
    date: dateString,
    objective: "confianza_proceso",
    pillar: "Detrás de cámaras",
    focus: focus.focus,
    format: "Clip documental",
    platforms: ["Instagram", "Facebook", "TikTok"],
    responsible: userName,
    status: "pending",
    priority: "low",
    source: "anti-selfie-rule",
    reusable: true,
    publishLink: "",
    notes: "Usar como recurso de apoyo para reels, historias o carruseles.",
    createdByRotation: true,
    sortOrder: 99
  };

  return [...baseTasks, antiSelfieTask]
    .filter(Boolean)
    .slice(0, ROTATION_RULES.dailyTaskLimit + 1);
}

export function buildTaskFromIdea({ idea, dateString, userName = "Musicala" }) {
  return {
    title: idea.title,
    description: idea.description || "",
    date: dateString,
    objective: idea.objective || "descubrimiento",
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
