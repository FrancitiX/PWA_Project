self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("appShell_v1.0").then((cache) => {
      return cache.addAll([
        "/src/index.css",
        // "/src/components/views/home/Home.jsx",
        // "/src/components/views/home/home.module.css"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([caches.delete("appShell"), caches.delete("dynamic")])
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Solo cachear si es un recurso válido (http o https)
          if (event.request.url.startsWith("http")) {
            caches.match(event.request).then((cache) => {
              if (!cache) {
                caches.open("dynamic").then((cacheDyn) => {
                  // Clonamos porque una Response solo se puede usar una vez
                  cacheDyn.put(event.request, networkResponse.clone());
                });
              }
            });
          }
          return networkResponse.clone();
        })
        .catch(() => {
          // Si falla la red, tratar de devolver lo que tengamos en caché
          return caches.match(event.request);
        })
    );
  }
});

// self.addEventListener('', event=>{});
// self.addEventListener('push', event=>{});
