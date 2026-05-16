import { escapeHTML, labelObjective, labelPriority, labelResult, labelStatus, listText } from "../utils/formatters.js";

const ACTIVE_STATUSES = new Set(["pending", "rescheduled"]);

export function renderTaskList(tasks = []) {
  if (!tasks.length) {
    return `
      <div class="empty-state">
        <strong>No hay objetivos para hoy</strong>
        Generen el checklist diario, creen una tarea manual o registren algo que ya grabaron. La app no adivina por telepatía, todavía.
      </div>
    `;
  }

  const active = tasks.filter((task) => ACTIVE_STATUSES.has(task.status || "pending"));
  const moved = tasks.filter((task) => !ACTIVE_STATUSES.has(task.status || "pending"));

  return `
    <div class="task-list">
      ${active.length ? `<h3 class="section-label">Pendiente por hacer</h3>${active.map(renderTaskCard).join("")}` : ""}
      ${moved.length ? `<h3 class="section-label">Material movido / registrado</h3>${moved.map(renderTaskCard).join("")}` : ""}
    </div>
  `;
}

export function renderTaskCard(task) {
  const result = task.result || "unknown";
  const canEvaluate = ["recorded", "edited", "scheduled", "published", "done"].includes(task.status);

  return `
    <article class="task-card ${escapeHTML(task.status || "pending")}">
      <div class="task-top">
        <div>
          <h3 class="task-title">${escapeHTML(task.title)}</h3>
          <p class="task-description">${escapeHTML(task.description || "")}</p>
        </div>
        <span class="badge ${task.priority === "high" ? "pink" : task.priority === "low" ? "blue" : ""}">
          ${labelPriority(task.priority)}
        </span>
      </div>

      <div class="badges">
        <span class="badge">${labelStatus(task.status)}</span>
        <span class="badge ${result === "worked" ? "green" : result === "not_worked" ? "pink" : ""}">${labelResult(result)}</span>
        <span class="badge blue">${labelObjective(task.objective)}</span>
        <span class="badge green">${escapeHTML(task.pillar || "Sin categoría")}</span>
        <span class="badge yellow">${escapeHTML(task.format || "Sin formato")}</span>
        <span class="badge">${escapeHTML(listText(task.platforms) || "Sin plataforma")}</span>
      </div>

      ${task.publishLink ? `
        <p class="quick-note">
          Link: <a href="${escapeHTML(task.publishLink)}" target="_blank" rel="noopener noreferrer">${escapeHTML(task.publishLink)}</a>
        </p>
      ` : ""}

      ${task.notes ? `<p class="quick-note"><strong>Notas:</strong> ${escapeHTML(task.notes)}</p>` : ""}

      <div class="task-actions">
        <button class="btn small secondary" data-action="task-status" data-task-id="${task.id}" data-status="recorded">Grabado</button>
        <button class="btn small secondary" data-action="task-status" data-task-id="${task.id}" data-status="edited">Editado</button>
        <button class="btn small secondary" data-action="task-status" data-task-id="${task.id}" data-status="scheduled">Programado</button>
        <button class="btn small primary" data-action="task-status" data-task-id="${task.id}" data-status="published">Publicado</button>
        <button class="btn small ghost" data-action="task-status" data-task-id="${task.id}" data-status="skipped">Omitido</button>
        <button class="btn small ghost" data-action="reschedule-task" data-task-id="${task.id}">Mañana</button>
        <button class="btn small ghost" data-action="edit-task" data-task-id="${task.id}">Editar</button>
        <button class="btn small danger" data-action="delete-task" data-task-id="${task.id}">Eliminar</button>
      </div>

      ${canEvaluate ? `
        <div class="task-actions result-actions">
          <span class="result-label">Resultado simple:</span>
          <button class="btn small secondary" data-action="task-result" data-task-id="${task.id}" data-result="worked">Funcionó</button>
          <button class="btn small secondary" data-action="task-result" data-task-id="${task.id}" data-result="not_worked">No funcionó</button>
          <button class="btn small ghost" data-action="task-result" data-task-id="${task.id}" data-result="testing">En prueba</button>
        </div>
      ` : ""}
    </article>
  `;
}
