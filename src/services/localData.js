let db;

const request = indexedDB.open("GafoaDB", 1);

request.onupgradeneeded = (event) => {
  const database = event.target.result;

  if (!database.objectStoreNames.contains("user"))
    database.createObjectStore("user", { autoIncrement: true });

  if (!database.objectStoreNames.contains("cart"))
    database.createObjectStore("cart", { autoIncrement: true });

  if (!database.objectStoreNames.contains("my games"))
    database.createObjectStore("my games", { autoIncrement: true });
};

request.onsuccess = (event) => {
  db = event.target.result;
  // console.log("DB lista");
};

request.onerror = () => console.error("Error abriendo DB");

function addUserToDB(userData) {
  const request = indexedDB.open("GafoaDB", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains("user")) {
      db.createObjectStore("user", { autoIncrement: true });
    }
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    const transaction = db.transaction("user", "readwrite");
    const store = transaction.objectStore("user");

    const addRequest = store.add(userData);

    addRequest.onsuccess = () => {
      console.log("Usuario agregado:", addRequest.result);
    };

    addRequest.onerror = (err) => {
      console.error("Error al agregar usuario:", err);
    };
  };

  request.onerror = (err) => {
    console.error("Error al abrir DB:", err);
  };
}

function addToCartDB(producto) {
  if (!db) {
    console.error("La base de datos no está lista todavía");
    return;
  }

  const tx = db.transaction(["cart"], "readwrite");
  const store = tx.objectStore("cart");

  const req = store.add(producto);

  req.onsuccess = () => {
    console.log("Producto agregado al carrito");
    alert("Juego agregado al carrito");
  };

  req.onerror = (e) => {
    console.error("Error agregando al carrito:", e.target.error);
  };
}

function getCart() {
  return new Promise((resolve, reject) => {
    const dbRequest = window.indexedDB.open("GafoaDB", 1);

    dbRequest.onerror = () => resolve([]); // devuelve array vacío

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const tx = db.transaction("cart", "readonly");
      const store = tx.objectStore("cart");
      const items = [];

      const cursor = store.openCursor();
      cursor.onsuccess = (e) => {
        const c = e.target.result;
        if (c) {
          items.push({ key: c.key, ...c.value });
          c.continue();
        } else {
          resolve(items); // SIEMPRE array
        }
      };

      cursor.onerror = () => resolve([]); // no revienta
    };
  });
}

function deleteCartItem(id) {
  return new Promise((resolve, reject) => {
    const dbRequest = window.indexedDB.open("GafoaDB", 1);

    dbRequest.onerror = () => reject("Error al abrir DB");

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const tx = db.transaction("cart", "readwrite");
      const store = tx.objectStore("cart");

      const req = store.delete(id);

      req.onsuccess = () => resolve(true);
      req.onerror = () => reject("Error al eliminar de IndexedDB");
    };
  });
}

function saveGame(gameData) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("GafoaDB", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;

      const tx = db.transaction("my games", "readwrite");
      const store = tx.objectStore("my games");

      // Primero: verificar si ya existe
      const cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (e) => {
        const cursor = e.target.result;

        if (cursor) {
          if (cursor.value.id === gameData.id) {
            resolve("already-exists");
            return;
          }
          cursor.continue();
        } else {
          // No existe → agregar
          const addRequest = store.add(gameData);

          addRequest.onsuccess = () => resolve("saved");
          addRequest.onerror = (err) => reject(err);
        }
      };
    };

    request.onerror = (err) => reject(err);
  });
}

function getMyGames() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("GafoaDB", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const tx = db.transaction("my games", "readonly");
      const store = tx.objectStore("my games");

      const items = [];
      const cursorRequest = store.openCursor();

      cursorRequest.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          items.push(cursor.value);
          cursor.continue();
        } else {
          resolve(items);
        }
      };

      cursorRequest.onerror = (err) => reject(err);
    };

    request.onerror = (err) => reject(err);
  });
}

function existsInLibrary(gameId) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("GafoaDB", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const tx = db.transaction("my games", "readonly");
      const store = tx.objectStore("my games");

      const getRequest = store.get(gameId);

      getRequest.onsuccess = () => {
        resolve(!!getRequest.result); // true si existe, false si no
      };

      getRequest.onerror = (err) => reject(err);
    };

    request.onerror = (err) => reject(err);
  });
}

export {
  addUserToDB,
  addToCartDB,
  getCart,
  deleteCartItem,
  saveGame,
  getMyGames,
  existsInLibrary
};
