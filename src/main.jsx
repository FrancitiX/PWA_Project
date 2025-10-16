import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/titles";

import Login from "./components/views/session/Login";
import Singin from "./components/views/session/Singin";

import Home from "./components/views/home/home";
import Offline from "./components/views/offline/Offline";

navigator.serviceWorker.register("/sw.js")
  .then((reg) => console.log("SW registrado con éxito:", reg))
  .catch(console.error);


let db = window.indexedDB.open("GafoaDB", 1);
db.onupgradeneeded = function (event) {
  let DB = event.target.result;
  if (!DB.objectStoreNames.contains("user")) {
    DB.createObjectStore("user", { autoIncrement: true });
  }
};

db.onerror = function(event) {
  console.error("Error al abrir IndexedDB:", event.target.errorCode);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Navegacion normal */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singin" element={<Singin />} />

          <Route path="/offline" element={<Offline />} />
        
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
