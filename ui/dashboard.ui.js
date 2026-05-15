import { calcCompletion, escapeHTML } from "../utils/formatters.js";
import { formatDateHuman } from "../utils/dates.js";
import { renderTaskList } from "./todayChecklist.ui.js";

export function renderDashboard({ dateString, tasks, template }) {
  const completion = calcCompletion(tasks);
  const published = tasks.filter((task) => task.status === "published").length;
  const recorded = tasks.filter((task) => task.status === "recorded").length;
  const pending = tasks.filter((task) => task.status === "pending").length;

  return `
    <section class="hero">
      <span class="hero-kicker">${formatDateHuman(dateString)} · ${escapeHTML(template?.name || "Plan de contenido")}</span>
      <h1>¿Qué contenido va a mostrar hoy qué hace Musicala?</h1>
      <p>
        La misión de hoy es producir piezas reales: clases, procesos, espacios, profes, detalles,
        aprendizajes y momentos que hagan visible la escuela. Sin vender aquí. Solo crear presencia y confianza.
      </p>
      <div class="hero-actions">
        <button class="btn primary" data-action="generate-today">Generar checklist de hoy</button>
        <button class="btn secondary" data-action="open-task-modal">Agregar tarea</button>
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
      <div class="stat-card">
        <strong>${published}</strong>
        <span>publicado</span>
      </div>
      <div class="stat-card">
        <strong>${recorded}</strong>
        <span>grabado pendiente</span>
      </div>
    </section>

    <section class="grid two" style="margin-top:18px">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Checklist de hoy</h2>
            <p>${pending} pendientes. Que no se conviertan en fósiles digitales, por favor.</p>
          </div>
          <button class="btn small secondary" data-action="refresh-today">Actualizar</button>
        </div>
        ${renderTaskList(tasks)}
      </div>

      <aside class="card">
        <div class="card-header">
          <div>
            <h3>Objetivo sugerido</h3>
            <p>${escapeHTML(template?.theme || "Crear contenido visible y reutilizable.")}</p>
          </div>
        </div>
        <div class="quick-note">
          <strong>${escapeHTML(template?.name || "Plan diario")}</strong><br />
          ${escapeHTML(template?.suggestedTasks?.[0]?.description || "Usen el checklist como punto de partida.")}
        </div>
        <hr style="border:0;border-top:1px solid var(--border);margin:18px 0" />
        <p class="quick-note">
          Tip práctico: graben primero material bruto. Publicar puede venir después.
          El contenido no nace perfecto, nace usable. Qué concepto tan revolucionario.
        </p>
      </aside>
    </section>
  `;
}
