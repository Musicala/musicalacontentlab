import { escapeHTML, labelObjective, labelResult, labelStatus, listText } from "../utils/formatters.js";
import { formatDateHuman } from "../utils/dates.js";

export function renderHistory({ items = [] }) {
  const published = items.filter((task) => task.status === "published").length;
  const recorded = items.filter((task) => task.status === "recorded").length;
  const reusable = items.filter((task) => task.reusable).length;
  const worked = items.filter((task) => task.result === "worked").length;
  const notWorked = items.filter((task) => task.result === "not_worked").length;

  return `
    <section class="hero">
      <span class="hero-kicker">Historial creativo</span>
      <h1>Lo que se hizo, lo que sirvió y lo que se puede reciclar</h1>
      <p>
        El historial ayuda a ver si están mostrando siempre lo mismo y si el contenido realmente funciona.
        No lee Google Ads ni hace magia corporativa; solo registra señales simples, como debe ser cuando uno quiere avanzar sin volverse un dashboard con ego.
      </p>
      <div class="hero-actions">
        <button class="btn secondary" data-action="refresh-history">Actualizar historial</button>
      </div>
    </section>

    <section class="grid three">
      <div class="stat-card">
        <strong>${items.length}</strong>
        <span>piezas movidas</span>
      </div>
      <div class="stat-card">
        <strong>${worked}</strong>
        <span>marcadas como funcionó</span>
      </div>
      <div class="stat-card">
        <strong>${notWorked}</strong>
        <span>marcadas como no funcionó</span>
      </div>
    </section>

    <section class="grid three" style="margin-top:18px">
      <div class="stat-card">
        <strong>${published}</strong>
        <span>publicadas</span>
      </div>
      <div class="stat-card">
        <strong>${recorded}</strong>
        <span>grabadas pendientes</span>
      </div>
      <div class="stat-card">
        <strong>${reusable}</strong>
        <span>reutilizables</span>
      </div>
    </section>

    <section class="card" style="margin-top:18px">
      <div class="card-header">
        <div>
          <h2>Movimientos recientes</h2>
          <p>${recorded} piezas quedaron grabadas. No las dejen pudrirse en galería, esa tumba con miniaturas.</p>
        </div>
      </div>
      <div class="history-list">
        ${items.length ? items.map((item) => `
          <article class="history-card">
            <div class="task-top">
              <div>
                <h3 class="task-title">${escapeHTML(item.title)}</h3>
                <p class="task-description">${escapeHTML(item.description || "")}</p>
              </div>
              <span class="badge">${labelStatus(item.status)}</span>
            </div>
            <div class="badges">
              <span class="badge ${item.result === "worked" ? "green" : item.result === "not_worked" ? "pink" : ""}">${labelResult(item.result)}</span>
              <span class="badge blue">${labelObjective(item.objective)}</span>
              <span class="badge green">${escapeHTML(item.pillar || "")}</span>
              <span class="badge yellow">${escapeHTML(item.format || "")}</span>
              <span class="badge">${escapeHTML(listText(item.platforms || []))}</span>
              <span class="badge pink">${formatDateHuman(item.date)}</span>
            </div>
            ${item.publishLink ? `
              <p class="quick-note">
                Link: <a href="${escapeHTML(item.publishLink)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.publishLink)}</a>
              </p>
            ` : ""}
          </article>
        `).join("") : `
          <div class="empty-state">
            <strong>Aún no hay historial</strong>
            Marquen tareas como grabadas, publicadas o hechas para llenar esta sección.
          </div>
        `}
      </div>
    </section>
  `;
}
