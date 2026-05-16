import { escapeHTML, labelObjective, listText } from "../utils/formatters.js";

function optionList(items = [], placeholder = "Todas") {
  return `
    <option value="">${placeholder}</option>
    ${items.map((item) => {
      const value = typeof item === "string" ? item : item.id;
      const label = typeof item === "string" ? item : item.name;
      return `<option value="${escapeHTML(value)}">${escapeHTML(label)}</option>`;
    }).join("")}
  `;
}

export function renderIdeasBank({ ideas = [], settings }) {
  return `
    <section class="hero">
      <span class="hero-kicker">Banco de ideas</span>
      <h1>Ideas listas para convertirse en acciones</h1>
      <p>
        Aquí guardan ideas de contenido por categoría y objetivo. Después se convierten en tarea para hoy,
        porque confiar en “me acuerdo luego” es básicamente una ruleta con WiFi.
      </p>
      <div class="hero-actions">
        <button class="btn primary" data-action="open-idea-modal">Agregar idea</button>
        <button class="btn secondary" data-action="refresh-ideas">Actualizar</button>
      </div>
    </section>

    <section class="card">
      <div class="filters">
        <label class="field">
          <span>Buscar</span>
          <input data-filter="idea-search" placeholder="piano, adultos, backstage..." />
        </label>
        <label class="field">
          <span>Objetivo</span>
          <select data-filter="idea-objective">${optionList(settings.objectives)}</select>
        </label>
        <label class="field">
          <span>Categoría</span>
          <select data-filter="idea-pillar">${optionList(settings.pillars)}</select>
        </label>
        <div class="field" style="align-self:end">
          <button class="btn secondary" data-action="apply-idea-filters">Filtrar</button>
        </div>
      </div>

      <div class="idea-list">
        ${ideas.length ? ideas.map(renderIdeaCard).join("") : `
          <div class="empty-state">
            <strong>No hay ideas todavía</strong>
            Carguen ideas base o creen una. El vacío creativo tiene buena acústica, pero no vende presencia.
          </div>
        `}
      </div>
    </section>
  `;
}

export function renderIdeaCard(idea) {
  return `
    <article class="idea-card" data-idea-row data-title="${escapeHTML(idea.title)}" data-objective="${escapeHTML(idea.objective)}" data-pillar="${escapeHTML(idea.pillar)}">
      <div class="idea-top">
        <div>
          <h3 class="idea-title">${escapeHTML(idea.title)}</h3>
          <p class="idea-description">${escapeHTML(idea.description || "")}</p>
        </div>
        <button class="btn small primary" data-action="idea-to-task" data-idea-id="${escapeHTML(idea.id || "")}">Usar hoy</button>
      </div>
      <div class="badges">
        <span class="badge blue">${labelObjective(idea.objective)}</span>
        <span class="badge green">${escapeHTML(idea.pillar || "")}</span>
        <span class="badge yellow">${escapeHTML(listText(idea.suggestedFormats || []))}</span>
        <span class="badge">${escapeHTML(listText(idea.platforms || []))}</span>
      </div>
      ${idea.isDefault ? `<p class="quick-note">Idea base de Musicala. Pueden usarla sin guardarla primero.</p>` : ""}
    </article>
  `;
}
