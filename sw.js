const APP_SHELL_CACHE = "appShell_v1.0";
const DYNAMIC_CACHE = "dynamic_v1.0";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.addAll([
        "/src/index.css",
        // "/src/components/views/home/Home.jsx",
        // "/src/components/views/home/home.module.css",
        "src/components/views/offline/Offline.jsx",
        "src/components/views/offline/offline.module.css",
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== APP_SHELL_CACHE && key !== DYNAMIC_CACHE)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith("ws")) return;
  if (event.request.method === "GET") {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Solo cachear si es un recurso válido (http o https)
          if (event.request.url.startsWith("http")) {
            caches.match(event.request).then((cache) => {
              if (!cache) {
                caches.open(DYNAMIC_CACHE).then((cache) => {
                  cache.put(event.request, networkResponse.clone());
                });
              }
            });
          }
          return networkResponse.clone();
        })
        .catch(() => {
          // Si esta offline devolvemos el cache
          return caches.match(event.request).then((res) => {
            // Si no existe en caché, devolver un recurso offline
            return res || caches.match("/offline");
          });
        })
    );
  }
});

self.addEventListener("sync", event => {

  let db = window.indexedDB.open("database");
  db.onsuccess = event => {
    let result = event.target.result;
    let transaction = result.transaction("table", "readwrite");
    let obj = transaction.objectStore("table");

    const resultado = obj.get(1);

    // const resultado = obj.add({ name: "Melisaa", age: 19 });

    // const resultado = obj.delete(2);

    resultado.onsuccess = (event) => {
      console.log(event.target.result);
    };
  };
});
// self.addEventListener('push', event=>{});
