import { escapeHTML } from "../utils/formatters.js";

export const VIEWS = [
  { id: "today", label: "Hoy" },
  { id: "calendar", label: "Calendario" },
  { id: "ideas", label: "Ideas" },
  { id: "history", label: "Historial" },
  { id: "templates", label: "Plantillas" }
];

export function renderLayout({ user, currentView }) {
  const displayName = user?.displayName || user?.email || "Musicala";

  return `
    <div class="app-layout">
      <header class="topbar">
        <div class="brand">
          <img src="./assets/logo.png" alt="Musicala" />
          <div class="brand-title">
            <strong>Musicala Content Lab</strong>
            <span>Creación diaria de contenido</span>
          </div>
        </div>

        <nav class="nav-tabs" aria-label="Navegación principal">
          ${VIEWS.map((view) => `
            <button class="nav-btn ${view.id === currentView ? "active" : ""}" data-view="${view.id}">
              ${view.label}
            </button>
          `).join("")}
        </nav>

        <div class="user-menu">
          <div class="user-chip">
            <strong>${escapeHTML(displayName)}</strong>
            <span>${escapeHTML(user?.email || "")}</span>
          </div>
          <button class="btn ghost small" data-action="logout">Salir</button>
        </div>
      </header>

      <main id="view-root" class="main"></main>

      <footer class="footer-note">
        Musicala Content Lab · Hagan contenido real, no solo selfies con cara de "hoy sí somos marca personal".
      </footer>
    </div>
  `;
}
