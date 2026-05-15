import { escapeHTML, labelObjective, labelPriority, labelStatus, listText } from "../utils/formatters.js";

export function renderTaskList(tasks = []) {
  if (!tasks.length) {
    return `
      <div class="empty-state">
        <strong>No hay tareas para hoy</strong>
        Generen el checklist diario o creen una tarea manual. La app no adivina por telepatía, todavía.
      </div>
    `;
  }

  return `
    <div class="task-list">
      ${tasks.map(renderTaskCard).join("")}
    </div>
  `;
}

export function renderTaskCard(task) {
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
        <span class="badge blue">${labelObjective(task.objective)}</span>
        <span class="badge green">${escapeHTML(task.pillar || "Sin pilar")}</span>
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
    </article>
  `;
}
