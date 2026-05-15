import { DEFAULT_DAILY_TEMPLATES } from "../data/defaultDailyTemplates.js";
import { ROTATION_RULES } from "../data/rotationRules.js";
import { escapeHTML, labelObjective, listText } from "../utils/formatters.js";

const WEEKDAYS = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado"
};

export function renderTemplates() {
  return `
    <section class="hero">
      <span class="hero-kicker">Plantillas y rotación</span>
      <h1>La base creativa de Musicala</h1>
      <p>
        Estas reglas alimentan el botón de generar checklist diario. La idea es rotar objetivos,
        pilares, formatos y planos para no producir contenido repetido hasta que el celular pida vacaciones.
      </p>
    </section>

    <section class="grid two">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Plantillas por día</h2>
            <p>Base inicial cargada en código. Luego podemos hacerlas editables desde Firestore.</p>
          </div>
        </div>
        <div class="template-list">
          ${DEFAULT_DAILY_TEMPLATES.map((template) => `
            <article class="template-card">
              <div class="task-top">
                <div>
                  <h3 class="task-title">${WEEKDAYS[template.weekday]} · ${escapeHTML(template.name)}</h3>
                  <p class="task-description">${escapeHTML(template.theme)}</p>
                </div>
                <span class="badge blue">${labelObjective(template.objective)}</span>
              </div>
              <div class="badges">
                ${template.suggestedTasks.map((task) => `<span class="badge">${escapeHTML(task.format)}</span>`).join("")}
              </div>
              <ul class="quick-note">
                ${template.suggestedTasks.map((task) => `<li>${escapeHTML(task.title)}</li>`).join("")}
              </ul>
            </article>
          `).join("")}
        </div>
      </div>

      <aside class="card">
        <div class="card-header">
          <div>
            <h2>Reglas anti-repetición</h2>
            <p>Para no quedarse solo en selfies, stories improvisadas y “hoy no alcanzamos”.</p>
          </div>
        </div>
        <h3>Pilares que deben rotar</h3>
        <div class="badges">
          ${ROTATION_RULES.weeklyBalance.map((item) => `<span class="badge green">${escapeHTML(item)}</span>`).join("")}
        </div>
        <h3>Planos anti-selfie</h3>
        <p class="quick-note">${escapeHTML(listText(ROTATION_RULES.antiSelfiePrompts.slice(0, 8)))}</p>
        <hr style="border:0;border-top:1px solid var(--border);margin:18px 0" />
        <p class="quick-note">
          Nota: el motor ya mezcla plantillas, ideas base y un plano anti-selfie. Lo siguiente sería
          guardar estadísticas por pilar para que la app diga qué área está quedando invisible.
        </p>
      </aside>
    </section>
  `;
}
