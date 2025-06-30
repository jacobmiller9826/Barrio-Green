const CACHE_NAME = "barrio-green-cache-v1";
const URLS_TO_CACHE = [
  "index.html",
  "dashboard.html",
  "rewards.html",
  "exchange.html",
  "admin.html",
  "help.html",
  "style.css",
  "app.js",
  "manifest.json",
  "icon.png",
  "icon512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
