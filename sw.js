const CACHE_NAME = "musicala-content-lab-v3";

const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/logo.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./firebase/firebase.config.js",
  "./firebase/auth.service.js",
  "./firebase/contentTasks.service.js",
  "./firebase/contentIdeas.service.js",
  "./firebase/contentSettings.service.js",
  "./firebase/calendar.service.js",
  "./firebase/history.service.js",
  "./ui/layout.ui.js",
  "./ui/auth.ui.js",
  "./ui/dashboard.ui.js",
  "./ui/todayChecklist.ui.js",
  "./ui/calendar.ui.js",
  "./ui/ideasBank.ui.js",
  "./ui/history.ui.js",
  "./ui/templates.ui.js",
  "./ui/settings.ui.js",
  "./ui/modals.ui.js",
  "./data/authorizedUsers.js",
  "./data/contentObjectives.js",
  "./data/contentPillars.js",
  "./data/contentFormats.js",
  "./data/contentPlatforms.js",
  "./data/contentMatrix.js",
  "./data/defaultDailyTemplates.js",
  "./data/defaultContentIdeas.js",
  "./data/rotationRules.js",
  "./utils/dates.js",
  "./utils/permissions.js",
  "./utils/rotationEngine.js",
  "./utils/formatters.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached ||
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
    )
  );
});
