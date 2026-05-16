import { escapeHTML, labelObjective, labelResult, labelStatus, listText } from "../utils/formatters.js";
import { formatDateHuman, getDateRange } from "../utils/dates.js";

export function renderCalendar({ startDate, tasks }) {
  const days = getDateRange(startDate, 14);
  const grouped = days.map((day) => ({
    date: day,
    tasks: tasks.filter((task) => task.date === day)
  }));

  return `
    <section class="hero">
      <span class="hero-kicker">Calendario editorial</span>
      <h1>Lo que se graba, se publica y se reutiliza</h1>
      <p>
        Vista de 14 días para no vivir improvisando contenido como si el algoritmo fuera una fogata espiritual.
      </p>
      <div class="hero-actions">
        <button class="btn primary" data-action="open-task-modal">Agregar tarea programada</button>
        <button class="btn secondary" data-action="refresh-calendar">Actualizar</button>
      </div>
    </section>

    <section class="calendar-days">
      ${grouped.map((group) => `
        <article class="day-group">
          <div class="day-title">
            <strong>${formatDateHuman(group.date)}</strong>
            <span class="badge">${group.tasks.length} tarea${group.tasks.length === 1 ? "" : "s"}</span>
          </div>
          <div class="day-items">
            ${group.tasks.length ? group.tasks.map((task) => `
              <div class="task-card ${escapeHTML(task.status || "pending")}">
                <div class="task-top">
                  <div>
                    <h3 class="task-title">${escapeHTML(task.title)}</h3>
                    <p class="task-description">${escapeHTML(task.description || "")}</p>
                  </div>
                  <span class="badge">${labelStatus(task.status)}</span>
                </div>
                <div class="badges">
                  <span class="badge ${task.result === "worked" ? "green" : task.result === "not_worked" ? "pink" : ""}">${labelResult(task.result)}</span>
                  <span class="badge blue">${labelObjective(task.objective)}</span>
                  <span class="badge green">${escapeHTML(task.pillar || "")}</span>
                  <span class="badge yellow">${escapeHTML(task.format || "")}</span>
                  <span class="badge">${escapeHTML(listText(task.platforms))}</span>
                </div>
              </div>
            `).join("") : `
              <div class="empty-state">
                <strong>Sin contenido programado</strong>
                Día libre o hueco peligroso. Ustedes sabrán.
              </div>
            `}
          </div>
        </article>
      `).join("")}
    </section>
  `;
}
