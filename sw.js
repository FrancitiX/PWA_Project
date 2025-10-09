const APP_SHELL_CACHE = "appShell_v1.0";
const DYNAMIC_CACHE = "dynamic_v1.0";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.addAll([
        "/src/index.css",
        "/src/components/views/home/Home.jsx",
        "/src/components/views/home/home.module.css",
        "src/components/views/offline/Offline.jsx",
        "src/components/views/offline/offline.module.css",
        "public/Gafoa.png",
        "src/components/views/session/Singin.jsx",
        "src/components/views/session/session.module.css",
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

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-users") {
    event.waitUntil(syncUsers());
  }
});

async function syncUsers() {
  const dbRequest = self.indexedDB.open("GafoaDB", 1);
  dbRequest.onsuccess = (event) => {
    const db = event.target.result;
    const tx = db.transaction("user", "readonly");
    const store = tx.objectStore("user");
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = () => {
      const users = getAllRequest.result;
      console.log("Usuarios pendientes de sync:", users);
      // Aquí podrías enviar al backend
    };
  };
}

// self.addEventListener('push', event=>{});
