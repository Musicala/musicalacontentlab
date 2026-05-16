import { escapeHTML } from "../utils/formatters.js";

function lines(items = []) {
  return items
    .map((item) => {
      if (typeof item === "string") return item;
      return item.name || item.id || "";
    })
    .filter(Boolean)
    .join("\n");
}

export function renderSettings({ settings }) {
  const targets = settings.dailyTargets || {};

  return `
    <section class="hero">
      <span class="hero-kicker">Ajustes vivos</span>
      <h1>La app ahora trabaja por matriz, no por inspiración del día</h1>
      <p>
        Los objetivos diarios se mantienen estables y las categorías rotan durante la semana.
        Así no toca preguntarse cada mañana qué publicar, esa tradición humana tan desgastante.
      </p>
    </section>

    <section class="card">
      <div class="card-header">
        <div>
          <h2>Categorías y metas</h2>
          <p>Una opción por línea. Pueden borrar, renombrar o agregar lo que necesiten.</p>
        </div>
      </div>

      <form data-form="settings">
        <div class="form-grid">
          <label class="field span-2">
            <span>Categorías / pilares de contenido</span>
            <textarea name="pillars" required>${escapeHTML(lines(settings.pillars))}</textarea>
          </label>

          <label class="field span-2">
            <span>Objetivos de contenido</span>
            <textarea name="objectives" required>${escapeHTML(lines(settings.objectives))}</textarea>
          </label>

          <label class="field span-2">
            <span>Formatos</span>
            <textarea name="formats" required>${escapeHTML(lines(settings.formats))}</textarea>
          </label>

          <label class="field span-2">
            <span>Plataformas</span>
            <textarea name="platforms" required>${escapeHTML(lines(settings.platforms))}</textarea>
          </label>

          <label class="field">
            <span>Meta diaria mínima de grabaciones</span>
            <input type="number" name="recordedTarget" min="0" max="20" value="${escapeHTML(targets.recorded ?? 1)}" />
          </label>

          <label class="field">
            <span>Meta diaria mínima de publicaciones</span>
            <input type="number" name="publishedTarget" min="0" max="20" value="${escapeHTML(targets.published ?? 0)}" />
          </label>

          <label class="field">
            <span>Máximo de pendientes antes de alerta</span>
            <input type="number" name="pendingWarning" min="1" max="20" value="${escapeHTML(targets.pendingWarning ?? 3)}" />
          </label>
        </div>

        <div class="form-actions">
          <button class="btn primary" type="submit">Guardar ajustes</button>
          <button class="btn secondary" type="button" data-action="reset-settings-draft">Restaurar texto base en pantalla</button>
        </div>
      </form>
    </section>
  `;
}
