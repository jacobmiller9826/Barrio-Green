self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('barrio-green-v1').then(cache =>
      cache.addAll([
        '/',
        '/index.html',
        '/dashboard.html',
        '/rewards.html',
        '/help.html',
        '/style.css',
        '/app.js',
        '/manifest.json',
        '/icon.png'
      ])
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
