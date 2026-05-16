import { calcCompletion, escapeHTML, labelObjective } from "../utils/formatters.js";
import { formatDateHuman } from "../utils/dates.js";
import { renderTaskList } from "./todayChecklist.ui.js";

function optionList(items = [], selected = "") {
  return items
    .map((item) => {
      const value = typeof item === "string" ? item : item.id;
      const label = typeof item === "string" ? item : item.name;
      return `<option value="${escapeHTML(value)}" ${value === selected ? "selected" : ""}>${escapeHTML(label)}</option>`;
    })
    .join("");
}

function renderMissingList(tasks = []) {
  const pending = tasks
    .filter((task) => ["pending", "rescheduled"].includes(task.status || "pending"))
    .sort((a, b) => {
      const score = { high: 0, medium: 1, low: 2 };
      return (score[a.priority] ?? 1) - (score[b.priority] ?? 1);
    })
    .slice(0, 6);

  if (!pending.length) {
    return `
      <div class="empty-state compact">
        <strong>No hay pendientes activos</strong>
        Hoy no hay alarma creativa. Raro, sospechoso, pero bonito.
      </div>
    `;
  }

  return `
    <div class="mini-list">
      ${pending.map((task) => `
        <article class="mini-task">
          <strong>${escapeHTML(task.title)}</strong>
          <span>${escapeHTML(task.format || "Formato libre")} · ${labelObjective(task.objective)}</span>
        </article>
      `).join("")}
    </div>
  `;
}

export function renderDashboard({ dateString, tasks, template, settings }) {
  const completion = calcCompletion(tasks);
  const published = tasks.filter((task) => task.status === "published").length;
  const recorded = tasks.filter((task) => task.status === "recorded").length;
  const pending = tasks.filter((task) => ["pending", "rescheduled"].includes(task.status || "pending")).length;
  const targets = settings.dailyTargets || { recorded: 1, published: 0, pendingWarning: 3 };
  const recordedTarget = Number(targets.recorded ?? 1);
  const publishedTarget = Number(targets.published ?? 0);
  const pendingWarning = Number(targets.pendingWarning ?? 3);
  const recordedOk = recorded >= recordedTarget;
  const publishedOk = published >= publishedTarget;
  const pressureText = pending > pendingWarning
    ? `Hay ${pending} pendientes. El tablero ya está mirando feo.`
    : `${pending} pendiente${pending === 1 ? "" : "s"} activo${pending === 1 ? "" : "s"}. Controlable, por ahora.`;

  return `
    <section class="hero">
      <span class="hero-kicker">${formatDateHuman(dateString)} · ${escapeHTML(template?.name || "Plan de contenido")}</span>
      <h1>Matriz diaria: mismos objetivos, temas rotativos</h1>
      <p>
        Cada día conserva los mismos frentes: explicar Musicala, mostrar un servicio, enseñar talento, evidenciar proceso,
        contar un diferencial e invitar a preguntar. Lo que rota es el arte o tema de la semana, no el cerebro de ustedes, pobrecito.
      </p>
      <div class="hero-actions">
        <button class="btn primary" data-action="generate-today">Generar checklist de hoy</button>
        <button class="btn secondary" data-action="open-task-modal">Agregar objetivo/tarea</button>
        <button class="btn ghost" data-action="open-idea-modal">Guardar idea rápida</button>
      </div>
    </section>

    <section class="grid three">
      <div class="stat-card">
        <strong>${completion}%</strong>
        <span>avance del día</span>
        <div class="progress-wrap" style="margin-top:12px">
          <div class="progress-bar" style="width:${completion}%"></div>
        </div>
      </div>
      <div class="stat-card ${recordedOk ? "good" : "warning"}">
        <strong>${recorded}/${recordedTarget}</strong>
        <span>grabaciones mínimas</span>
      </div>
      <div class="stat-card ${publishedOk ? "good" : "warning"}">
        <strong>${published}/${publishedTarget}</strong>
        <span>publicaciones mínimas</span>
      </div>
    </section>

    <section class="grid two" style="margin-top:18px">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Checklist de hoy</h2>
            <p>${pressureText}</p>
          </div>
          <button class="btn small secondary" data-action="refresh-today">Actualizar</button>
        </div>
        ${renderTaskList(tasks)}
      </div>

      <aside class="card sticky-side">
        <div class="card-header">
          <div>
            <h3>Juemadre, falta esto</h3>
            <p>La lista incómoda para abrir y actuar. Cada tarea es una pieza madre que puede dar reel, historias y publicación.</p>
          </div>
        </div>
        ${renderMissingList(tasks)}

        <hr class="soft-line" />

        <div class="card-header compact-header">
          <div>
            <h3>Registrar algo que ya grabaron</h3>
            <p>Para casos tipo: “canté y toqué guitarra”. Eso no se pierde en la galería, por amor al orden.</p>
          </div>
        </div>

        <form data-form="quick-capture" class="quick-capture-form">
          <label class="field">
            <span>¿Qué grabaron?</span>
            <input name="title" required placeholder="Ej: Canción cantando y guitarra" />
          </label>

          <div class="form-grid compact-grid">
            <label class="field">
              <span>Categoría</span>
              <select name="pillar">${optionList(settings.pillars, "Música")}</select>
            </label>

            <label class="field">
              <span>Objetivo</span>
              <select name="objective">${optionList(settings.objectives, "confianza")}</select>
            </label>

            <label class="field">
              <span>Formato probable</span>
              <select name="format">${optionList(settings.formats, "Reel")}</select>
            </label>

            <label class="field">
              <span>Plataformas</span>
              <input name="platforms" value="Instagram, TikTok, YouTube Shorts" />
            </label>
          </div>

          <label class="field">
            <span>Notas rápidas</span>
            <textarea name="notes" placeholder="Dónde quedó el video, idea de copy, si sirve para reciclar..."></textarea>
          </label>

          <button class="btn primary" type="submit">Registrar como grabado</button>
        </form>
      </aside>
    </section>
  `;
}
