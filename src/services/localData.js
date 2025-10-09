function addUserToDB(userData) {
  const request = indexedDB.open("GafoaDB", 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("user", "readwrite");
    const store = transaction.objectStore("user");
    const addRequest = store.add(userData);

    addRequest.onsuccess = () => console.log("Usuario agregado:", addRequest.result);
    addRequest.onerror = (err) => console.error("Error al agregar usuario:", err);
  };

  request.onerror = (err) => console.error("Error al abrir DB:", err);
}

export { addUserToDB };