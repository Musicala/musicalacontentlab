export function renderAuthView(errorMessage = "") {
  return `
    <section class="auth-card">
      <img src="./assets/logo.png" alt="Musicala" class="auth-logo" />
      <div class="hero-kicker">Contenido diario · Musicala</div>
      <h1>Musicala Content Lab</h1>
      <p>
        App interna para planear, grabar, publicar y reutilizar contenido de Musicala
        sin depender de la inspiración de último minuto, esa señora tan incumplida.
      </p>
      ${errorMessage ? `<p class="badge pink">${errorMessage}</p>` : ""}
      <div class="hero-actions" style="justify-content:center">
        <button class="btn primary" data-action="login-google">Entrar con Google</button>
      </div>
      <p class="quick-note">
        Acceso autorizado solo para Alek y Cata.
      </p>
    </section>
  `;
}
