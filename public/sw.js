const APP_SHELL_CACHE = "appShell_v1.0";
const DYNAMIC_CACHE = "dynamic_v1.0";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => {
      return cache.addAll(["/", "/Gafoa.png", "/images/SessionBG.webp"]);
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
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open("GafoaDB", 1);

    dbRequest.onsuccess = async (event) => {
      const db = event.target.result;
      const tx = db.transaction("user", "readwrite");
      const store = tx.objectStore("user");

      const getAll = store.getAll();

      getAll.onsuccess = async () => {
        const users = getAll.result;

        if (users.length === 0) {
          console.log("No hay usuarios por sincronizar.");
          return resolve();
        }

        for (let user of users) {
          try {
            const resp = await fetch("https://pwa-project-back.onrender.com/api/singIn", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });

            // const json = await resp.json();
            let json = null;
            try {
              json = await resp.clone().json();
            } catch (e) {
              console.error("Respuesta no es JSON:", await resp.text());
              continue; // saltar este usuario
            }

            if (json.status === "ok") {
              // Si se registró correctamente, eliminarlo de IndexedDB
              const deleteTx = db.transaction("user", "readwrite");
              deleteTx.objectStore("user").delete(user.id);
              console.log("Usuario sincronizado y eliminado:", user.username);
            }
          } catch (error) {
            console.error("Error sincronizando usuario:", error);
          }
        }

        resolve();
      };
    };

    dbRequest.onerror = reject;
  });
}

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Notificación";
  const options = {
    body: data.body || "Tienes una nueva notificación.",
    icon: "/icon.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
