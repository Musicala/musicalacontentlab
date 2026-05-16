import { toDateInputValue } from "../utils/dates.js";
import { escapeHTML } from "../utils/formatters.js";

function optionList(items, selected = "") {
  return items
    .map((item) => {
      const value = typeof item === "string" ? item : item.id;
      const label = typeof item === "string" ? item : item.name;
      return `<option value="${escapeHTML(value)}" ${value === selected ? "selected" : ""}>${escapeHTML(label)}</option>`;
    })
    .join("");
}

export function renderTaskModal({ task = null, dateString = toDateInputValue(), settings }) {
  return `
    <div class="modal-backdrop" data-modal>
      <section class="modal">
        <h2>${task ? "Editar objetivo/tarea" : "Nuevo objetivo de contenido"}</h2>
        <p>Creen una acción concreta. “Hacer contenido” no cuenta, eso es una nube con complejo de tarea.</p>

        <form data-form="task" data-task-id="${escapeHTML(task?.id || "")}">
          <div class="form-grid">
            <label class="field span-2">
              <span>Título</span>
              <input name="title" required value="${escapeHTML(task?.title || "")}" placeholder="Ej: Grabar reel de adulto aprendiendo piano" />
            </label>

            <label class="field span-2">
              <span>Descripción</span>
              <textarea name="description" placeholder="Qué se debe grabar, mostrar, registrar o publicar">${escapeHTML(task?.description || "")}</textarea>
            </label>

            <label class="field">
              <span>Fecha</span>
              <input type="date" name="date" required value="${escapeHTML(task?.date || dateString)}" />
            </label>

            <label class="field">
              <span>Responsable</span>
              <select name="responsible">
                <option value="Alek" ${task?.responsible === "Alek" ? "selected" : ""}>Alek</option>
                <option value="Cata" ${task?.responsible === "Cata" ? "selected" : ""}>Cata</option>
                <option value="Alek y Cata" ${!task?.responsible || task?.responsible === "Alek y Cata" ? "selected" : ""}>Alek y Cata</option>
              </select>
            </label>

            <label class="field">
              <span>Objetivo</span>
              <select name="objective">${optionList(settings.objectives, task?.objective || "atraccion")}</select>
            </label>

            <label class="field">
              <span>Categoría</span>
              <select name="pillar">${optionList(settings.pillars, task?.pillar || "Música")}</select>
            </label>

            <label class="field">
              <span>Formato</span>
              <select name="format">${optionList(settings.formats, task?.format || "Reel")}</select>
            </label>

            <label class="field">
              <span>Prioridad</span>
              <select name="priority">
                <option value="high" ${task?.priority === "high" ? "selected" : ""}>Alta</option>
                <option value="medium" ${!task?.priority || task?.priority === "medium" ? "selected" : ""}>Media</option>
                <option value="low" ${task?.priority === "low" ? "selected" : ""}>Baja</option>
              </select>
            </label>

            <label class="field">
              <span>Estado</span>
              <select name="status">
                <option value="pending" ${!task?.status || task?.status === "pending" ? "selected" : ""}>Pendiente</option>
                <option value="recorded" ${task?.status === "recorded" ? "selected" : ""}>Grabado</option>
                <option value="edited" ${task?.status === "edited" ? "selected" : ""}>Editado</option>
                <option value="scheduled" ${task?.status === "scheduled" ? "selected" : ""}>Programado</option>
                <option value="published" ${task?.status === "published" ? "selected" : ""}>Publicado</option>
                <option value="done" ${task?.status === "done" ? "selected" : ""}>Hecho</option>
                <option value="skipped" ${task?.status === "skipped" ? "selected" : ""}>Omitido</option>
              </select>
            </label>

            <label class="field">
              <span>¿Funcionó?</span>
              <select name="result">
                <option value="unknown" ${!task?.result || task?.result === "unknown" ? "selected" : ""}>Sin evaluar</option>
                <option value="worked" ${task?.result === "worked" ? "selected" : ""}>Funcionó</option>
                <option value="not_worked" ${task?.result === "not_worked" ? "selected" : ""}>No funcionó</option>
                <option value="testing" ${task?.result === "testing" ? "selected" : ""}>En prueba</option>
              </select>
            </label>

            <label class="field span-2">
              <span>Plataformas</span>
              <input name="platforms" value="${escapeHTML((task?.platforms || settings.platforms.slice(0, 2)).join(", "))}" placeholder="Instagram, Facebook, TikTok..." />
            </label>

            <label class="field span-2">
              <span>Link publicado</span>
              <input name="publishLink" value="${escapeHTML(task?.publishLink || "")}" placeholder="https://..." />
            </label>

            <label class="field span-2">
              <span>Notas</span>
              <textarea name="notes" placeholder="Observaciones, material pendiente, ideas para reciclar...">${escapeHTML(task?.notes || "")}</textarea>
            </label>
          </div>

          <div class="form-actions">
            <button class="btn primary" type="submit">${task ? "Guardar cambios" : "Crear objetivo"}</button>
            <button class="btn ghost" type="button" data-action="close-modal">Cancelar</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

export function renderIdeaModal({ settings }) {
  return `
    <div class="modal-backdrop" data-modal>
      <section class="modal">
        <h2>Nueva idea de contenido</h2>
        <p>Guarden ideas rápidas para convertirlas después en tareas. La memoria humana es un archivo temporal con pésimo soporte.</p>

        <form data-form="idea">
          <div class="form-grid">
            <label class="field span-2">
              <span>Título</span>
              <input name="title" required placeholder="Ej: Soy muy viejo para aprender música" />
            </label>

            <label class="field span-2">
              <span>Descripción</span>
              <textarea name="description" placeholder="Qué se quiere contar, mostrar o enseñar"></textarea>
            </label>

            <label class="field">
              <span>Objetivo</span>
              <select name="objective">${optionList(settings.objectives, "atraccion")}</select>
            </label>

            <label class="field">
              <span>Categoría</span>
              <select name="pillar">${optionList(settings.pillars, "Música")}</select>
            </label>

            <label class="field span-2">
              <span>Formatos sugeridos</span>
              <input name="suggestedFormats" placeholder="Reel, Historia, Short" />
            </label>

            <label class="field span-2">
              <span>Plataformas</span>
              <input name="platforms" placeholder="Instagram, TikTok, YouTube Shorts" />
            </label>
          </div>

          <div class="form-actions">
            <button class="btn primary" type="submit">Guardar idea</button>
            <button class="btn ghost" type="button" data-action="close-modal">Cancelar</button>
          </div>
        </form>
      </section>
    </div>
  `;
}
