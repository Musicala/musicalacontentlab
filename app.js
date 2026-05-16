import { signInWithGoogle, signOutUser, listenAuth } from "./firebase/auth.service.js";
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  getRecentTasks,
  getTasksByDate,
  getTasksByRange,
  updateTask
} from "./firebase/contentTasks.service.js";
import { createIdea, getIdeas, updateIdea } from "./firebase/contentIdeas.service.js";
import { getContentSettings, saveContentSettings } from "./firebase/contentSettings.service.js";
import { renderAuthView } from "./ui/auth.ui.js";
import { renderLayout } from "./ui/layout.ui.js";
import { renderDashboard } from "./ui/dashboard.ui.js";
import { renderCalendar } from "./ui/calendar.ui.js";
import { renderIdeasBank } from "./ui/ideasBank.ui.js";
import { renderHistory } from "./ui/history.ui.js";
import { renderTemplates } from "./ui/templates.ui.js";
import { renderSettings } from "./ui/settings.ui.js";
import { renderIdeaModal, renderTaskModal } from "./ui/modals.ui.js";
import { DEFAULT_CONTENT_IDEAS } from "./data/defaultContentIdeas.js";
import { CONTENT_OBJECTIVES } from "./data/contentObjectives.js";
import { CONTENT_PILLARS } from "./data/contentPillars.js";
import { CONTENT_FORMATS } from "./data/contentFormats.js";
import { CONTENT_PLATFORMS } from "./data/contentPlatforms.js";
import { getTemplateForDate, generateTasksForDate, buildTaskFromIdea } from "./utils/rotationEngine.js";
import { addDays, toDateInputValue } from "./utils/dates.js";
import { escapeHTML } from "./utils/formatters.js";

const appRoot = document.querySelector("#app");

const SETTINGS_STRATEGY_VERSION = "weekly-matrix-v1";

const DEFAULT_SETTINGS = {
  strategyVersion: SETTINGS_STRATEGY_VERSION,
  objectives: CONTENT_OBJECTIVES,
  pillars: CONTENT_PILLARS,
  formats: CONTENT_FORMATS,
  platforms: CONTENT_PLATFORMS,
  dailyTargets: {
    recorded: 1,
    published: 0,
    pendingWarning: 3
  }
};

const state = {
  user: null,
  currentView: "today",
  selectedDate: toDateInputValue(),
  tasksToday: [],
  tasksRange: [],
  ideas: [],
  history: [],
  modalTask: null,
  settings: structuredClone(DEFAULT_SETTINGS),
  settingsLoaded: false,
  lastError: ""
};

function getUserName() {
  const email = state.user?.email || "";
  if (email.includes("catalina")) return "Cata";
  if (email.includes("alek")) return "Alek";
  return state.user?.displayName || "Alek y Cata";
}

function showToast(message) {
  const old = document.querySelector(".toast");
  old?.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function showError(error) {
  console.error(error);
  showToast(error?.message || "Pasó algo raro. Firebase haciendo de Firebase, seguramente.");
}

function uniq(items = []) {
  return [...new Set(items.map((item) => String(item || "").trim()).filter(Boolean))];
}

function slugify(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "") || "objetivo";
}

function normalizeObjectives(items = []) {
  const list = items
    .map((item) => {
      if (typeof item === "string") {
        return { id: slugify(item), name: item.trim(), description: "" };
      }
      return {
        id: item.id || slugify(item.name),
        name: item.name || item.id || "Objetivo",
        description: item.description || ""
      };
    })
    .filter((item) => item.id && item.name);

  const seen = new Set();
  return list.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function buildSettings(remote = null) {
  const shouldUseRemote = remote?.strategyVersion === SETTINGS_STRATEGY_VERSION;
  const source = shouldUseRemote ? remote : DEFAULT_SETTINGS;

  return {
    strategyVersion: SETTINGS_STRATEGY_VERSION,
    objectives: normalizeObjectives(source?.objectives?.length ? source.objectives : DEFAULT_SETTINGS.objectives),
    pillars: uniq(source?.pillars?.length ? source.pillars : DEFAULT_SETTINGS.pillars),
    formats: uniq(source?.formats?.length ? source.formats : DEFAULT_SETTINGS.formats),
    platforms: uniq(source?.platforms?.length ? source.platforms : DEFAULT_SETTINGS.platforms),
    dailyTargets: {
      recorded: Number(source?.dailyTargets?.recorded ?? DEFAULT_SETTINGS.dailyTargets.recorded),
      published: Number(source?.dailyTargets?.published ?? DEFAULT_SETTINGS.dailyTargets.published),
      pendingWarning: Number(source?.dailyTargets?.pendingWarning ?? DEFAULT_SETTINGS.dailyTargets.pendingWarning)
    }
  };
}

async function ensureSettings({ force = false } = {}) {
  if (state.settingsLoaded && !force) return;
  const remote = await getContentSettings();
  state.settings = buildSettings(remote);
  state.settingsLoaded = true;
}

function linesToArray(value = "") {
  return uniq(String(value).split(/\r?\n|,/));
}

function objectivesFromTextarea(value = "") {
  return linesToArray(value).map((name) => ({
    id: slugify(name),
    name,
    description: ""
  }));
}

function csvToArray(value = "") {
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderShell() {
  if (!state.user) {
    appRoot.innerHTML = renderAuthView(state.lastError);
    return;
  }

  appRoot.innerHTML = renderLayout({
    user: state.user,
    currentView: state.currentView
  });

  renderCurrentView();
}

async function loadToday() {
  state.tasksToday = await getTasksByDate(state.selectedDate);
}

async function loadCalendar() {
  const start = state.selectedDate;
  const end = addDays(start, 13);
  state.tasksRange = await getTasksByRange(start, end);
}

async function loadIdeas() {
  const savedIdeas = await getIdeas();
  const savedTitles = new Set(savedIdeas.map((idea) => String(idea.title).toLowerCase().trim()));

  const defaultIdeas = DEFAULT_CONTENT_IDEAS
    .filter((idea) => !savedTitles.has(String(idea.title).toLowerCase().trim()))
    .map((idea, index) => ({
      ...idea,
      id: `default-${index}`,
      isDefault: true
    }));

  state.ideas = [...savedIdeas, ...defaultIdeas];
}

async function loadHistory() {
  const recent = await getRecentTasks(120);
  state.history = recent.filter((task) =>
    ["recorded", "edited", "scheduled", "published", "done", "skipped"].includes(task.status)
  );
}

async function renderCurrentView() {
  const root = document.querySelector("#view-root");
  if (!root) return;

  try {
    await ensureSettings();

    if (state.currentView === "today") {
      await loadToday();
      const template = getTemplateForDate(state.selectedDate);
      root.innerHTML = renderDashboard({
        dateString: state.selectedDate,
        tasks: state.tasksToday,
        template,
        settings: state.settings
      });
      return;
    }

    if (state.currentView === "calendar") {
      await loadCalendar();
      root.innerHTML = renderCalendar({
        startDate: state.selectedDate,
        tasks: state.tasksRange
      });
      return;
    }

    if (state.currentView === "ideas") {
      await loadIdeas();
      root.innerHTML = renderIdeasBank({ ideas: state.ideas, settings: state.settings });
      return;
    }

    if (state.currentView === "history") {
      await loadHistory();
      root.innerHTML = renderHistory({ items: state.history });
      return;
    }

    if (state.currentView === "templates") {
      root.innerHTML = renderTemplates();
      return;
    }

    if (state.currentView === "settings") {
      root.innerHTML = renderSettings({ settings: state.settings });
      return;
    }
  } catch (error) {
    root.innerHTML = `
      <section class="card">
        <h2>No se pudo cargar esta vista</h2>
        <p class="quick-note">${escapeHTML(error.message || "Error desconocido")}</p>
        <p class="quick-note">
          Revisen Firebase config, reglas de Firestore y que Cloud Firestore esté activo.
          Qué bendición tener tres lugares distintos donde algo puede fallar.
        </p>
      </section>
    `;
    console.error(error);
  }
}

async function generateTodayChecklist() {
  await loadToday();

  if (state.tasksToday.length) {
    const confirmed = window.confirm("Ya hay tareas para hoy. ¿Quieren agregar más tareas rotativas?");
    if (!confirmed) return;
  }

  await loadIdeas();
  const customIdeas = state.ideas.filter((idea) => !idea.isDefault);

  const tasks = generateTasksForDate({
    dateString: state.selectedDate,
    userName: getUserName(),
    existingTasks: state.tasksToday,
    customIdeas
  });

  await Promise.all(tasks.map((task) => createTask(task, state.user)));
  showToast("Checklist generado. Ahora toca hacerlo, qué detalle tan incómodo.");
  await renderCurrentView();
}

function openTaskModal(task = null) {
  state.modalTask = task;
  document.body.insertAdjacentHTML(
    "beforeend",
    renderTaskModal({
      task,
      dateString: state.selectedDate,
      settings: state.settings
    })
  );
}

function openIdeaModal() {
  document.body.insertAdjacentHTML("beforeend", renderIdeaModal({ settings: state.settings }));
}

function closeModal() {
  document.querySelector("[data-modal]")?.remove();
  state.modalTask = null;
}

function getFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function handleTaskForm(form) {
  const data = getFormData(form);
  const taskId = form.dataset.taskId;

  const payload = {
    title: data.title,
    description: data.description,
    date: data.date,
    responsible: data.responsible,
    objective: data.objective,
    pillar: data.pillar,
    format: data.format,
    priority: data.priority,
    platforms: csvToArray(data.platforms),
    publishLink: data.publishLink,
    notes: data.notes,
    status: data.status || state.modalTask?.status || "pending",
    result: data.result || state.modalTask?.result || "unknown",
    reusable: true,
    source: state.modalTask?.source || "manual"
  };

  if (taskId) {
    await updateTask(taskId, payload);
    showToast("Objetivo actualizado.");
  } else {
    await createTask(payload, state.user);
    showToast("Objetivo creado.");
  }

  closeModal();
  await renderCurrentView();
}

async function handleQuickCaptureForm(form) {
  const data = getFormData(form);

  await createTask(
    {
      title: data.title,
      description: "Material registrado rápidamente desde el día a día.",
      date: state.selectedDate,
      responsible: getUserName(),
      objective: data.objective || "confianza",
      pillar: data.pillar || "Vida cotidiana Musicala",
      format: data.format || "Reel",
      priority: "medium",
      platforms: csvToArray(data.platforms || "Instagram, TikTok, YouTube Shorts"),
      publishLink: "",
      notes: data.notes || "",
      status: "recorded",
      result: "unknown",
      reusable: true,
      source: "quick-capture",
      createdByQuickCapture: true,
      sortOrder: 20
    },
    state.user
  );

  form.reset();
  showToast("Registrado como grabado. La galería acaba de perder un fantasma.");
  await renderCurrentView();
}

async function handleIdeaForm(form) {
  const data = getFormData(form);

  await createIdea(
    {
      title: data.title,
      description: data.description,
      objective: data.objective,
      pillar: data.pillar,
      suggestedFormats: csvToArray(data.suggestedFormats || "Reel"),
      platforms: csvToArray(data.platforms || "Instagram, Facebook, TikTok")
    },
    state.user
  );

  closeModal();
  showToast("Idea guardada. Una menos que se pierde en el limbo mental.");
  await renderCurrentView();
}

async function handleSettingsForm(form) {
  const data = getFormData(form);
  const nextSettings = buildSettings({
    strategyVersion: SETTINGS_STRATEGY_VERSION,
    objectives: objectivesFromTextarea(data.objectives),
    pillars: linesToArray(data.pillars),
    formats: linesToArray(data.formats),
    platforms: linesToArray(data.platforms),
    dailyTargets: {
      recorded: Number(data.recordedTarget || 0),
      published: Number(data.publishedTarget || 0),
      pendingWarning: Number(data.pendingWarning || 3)
    }
  });

  await saveContentSettings(nextSettings, state.user);
  state.settings = nextSettings;
  state.settingsLoaded = true;
  showToast("Ajustes guardados. La app ahora tiene menos excusas.");
  await renderCurrentView();
}

function getIdeaById(ideaId) {
  return state.ideas.find((idea) => idea.id === ideaId);
}

async function convertIdeaToTask(ideaId) {
  await loadIdeas();
  const idea = getIdeaById(ideaId);
  if (!idea) {
    showToast("No encontré esa idea. El DOM y Firebase no se pusieron de acuerdo.");
    return;
  }

  const task = buildTaskFromIdea({
    idea,
    dateString: state.selectedDate,
    userName: getUserName()
  });

  await createTask(task, state.user);

  if (!idea.isDefault) {
    await updateIdea(idea.id, {
      usedCount: (idea.usedCount || 0) + 1,
      status: "used"
    });
  }

  showToast("Idea convertida en objetivo para hoy.");
  state.currentView = "today";
  renderShell();
}

function applyIdeaFilters() {
  const search = document.querySelector("[data-filter='idea-search']")?.value?.toLowerCase().trim() || "";
  const objective = document.querySelector("[data-filter='idea-objective']")?.value || "";
  const pillar = document.querySelector("[data-filter='idea-pillar']")?.value || "";

  document.querySelectorAll("[data-idea-row]").forEach((row) => {
    const title = row.dataset.title?.toLowerCase() || "";
    const rowObjective = row.dataset.objective || "";
    const rowPillar = row.dataset.pillar || "";

    const matchesSearch = !search || title.includes(search) || rowPillar.toLowerCase().includes(search);
    const matchesObjective = !objective || rowObjective === objective;
    const matchesPillar = !pillar || rowPillar === pillar;

    row.classList.toggle("hidden", !(matchesSearch && matchesObjective && matchesPillar));
  });
}

async function handleGlobalClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const action = button.dataset.action;

  try {
    if (action === "login-google") {
      state.lastError = "";
      await signInWithGoogle();
      return;
    }

    if (action === "logout") {
      await signOutUser();
      return;
    }

    if (action === "close-modal") {
      closeModal();
      return;
    }

    if (action === "generate-today") {
      await generateTodayChecklist();
      return;
    }

    if (action === "refresh-today" || action === "refresh-calendar" || action === "refresh-ideas" || action === "refresh-history") {
      await renderCurrentView();
      showToast("Vista actualizada.");
      return;
    }

    if (action === "reset-settings-draft") {
      state.settings = structuredClone(DEFAULT_SETTINGS);
      state.settingsLoaded = true;
      await renderCurrentView();
      showToast("Texto base restaurado en pantalla. Guarden si quieren aplicarlo.");
      return;
    }

    if (action === "open-task-modal") {
      openTaskModal();
      return;
    }

    if (action === "open-idea-modal") {
      openIdeaModal();
      return;
    }

    if (action === "task-status") {
      await changeTaskStatus(button.dataset.taskId, button.dataset.status);
      showToast("Estado actualizado.");
      await renderCurrentView();
      return;
    }

    if (action === "task-result") {
      await updateTask(button.dataset.taskId, {
        result: button.dataset.result || "unknown"
      });
      showToast("Resultado marcado. Datos sencillos, no oráculo de marketing.");
      await renderCurrentView();
      return;
    }

    if (action === "reschedule-task") {
      await updateTask(button.dataset.taskId, {
        date: addDays(state.selectedDate, 1),
        status: "rescheduled"
      });
      showToast("Tarea reprogramada para mañana.");
      await renderCurrentView();
      return;
    }

    if (action === "edit-task") {
      const allTasks = [...state.tasksToday, ...state.tasksRange, ...state.history];
      const task = allTasks.find((item) => item.id === button.dataset.taskId);
      if (!task) {
        showToast("No encontré la tarea para editar.");
        return;
      }
      openTaskModal(task);
      return;
    }

    if (action === "delete-task") {
      const confirmed = window.confirm("¿Eliminar esta tarea? Esto sí es irreversible, como mandar un audio sin escucharlo.");
      if (!confirmed) return;
      await deleteTask(button.dataset.taskId);
      showToast("Tarea eliminada.");
      await renderCurrentView();
      return;
    }

    if (action === "idea-to-task") {
      await convertIdeaToTask(button.dataset.ideaId);
      return;
    }

    if (action === "apply-idea-filters") {
      applyIdeaFilters();
      return;
    }
  } catch (error) {
    if (action === "login-google") {
      state.lastError = error.message;
      renderShell();
      return;
    }
    showError(error);
  }
}

async function handleGlobalSubmit(event) {
  const form = event.target.closest("form");
  if (!form) return;
  event.preventDefault();

  try {
    if (form.dataset.form === "task") {
      await handleTaskForm(form);
      return;
    }

    if (form.dataset.form === "quick-capture") {
      await handleQuickCaptureForm(form);
      return;
    }

    if (form.dataset.form === "idea") {
      await handleIdeaForm(form);
      return;
    }

    if (form.dataset.form === "settings") {
      await handleSettingsForm(form);
      return;
    }
  } catch (error) {
    showError(error);
  }
}

function handleNavigation(event) {
  const navBtn = event.target.closest("[data-view]");
  if (!navBtn) return;

  state.currentView = navBtn.dataset.view;
  renderShell();
}

function initPWA() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("No se pudo registrar el service worker:", error);
    });
  }
}

document.addEventListener("click", handleGlobalClick);
document.addEventListener("submit", handleGlobalSubmit);
document.addEventListener("click", handleNavigation);

listenAuth((user) => {
  state.user = user;
  if (!user) state.settingsLoaded = false;
  renderShell();
});

initPWA();
