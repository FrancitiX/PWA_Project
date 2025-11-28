import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Titles";

import Login from "./components/views/session/Login";
import Singin from "./components/views/session/Singin";

import Home from "./components/views/home/Home";
import Offline from "./components/views/offline/Offline";
import Game from "./components/views/game/Game";

import Profile from "./components/views/user/profile/Profile";
import WishList from "./components/views/user/wishList/WishList";
import Cart from "./components/views/user/cart/Cart";
import Library from "./components/views/home/library/Library";

navigator.serviceWorker
  .register("/sw.js")
  .then((reg) => console.log("SW registrado con éxito:", reg))
  .catch(console.error);

let db = window.indexedDB.open("GafoaDB", 1);
db.onupgradeneeded = function (event) {
  let DB = event.target.result;
  if (!DB.objectStoreNames.contains("user")) {
    DB.createObjectStore("user", { autoIncrement: true });
  }
  if (!DB.objectStoreNames.contains("my games")) {
    DB.createObjectStore("my games", { autoIncrement: true });
  }
  if (!DB.objectStoreNames.contains("cart")) {
    DB.createObjectStore("cart", { autoIncrement: true });
  }
};

db.onerror = function (event) {
  console.error("Error al abrir IndexedDB:", event.target.errorCode);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Vistas de usuario */}
          <Route path="/login" element={<Login />} />
          <Route path="/singin" element={<Singin />} />
          <Route path="/profile/:user" element={<Profile />} />
          <Route path="/Library/:user" element={<Library />} />

          {/* Home y vistas generales */}
          <Route path="/game/:id/:game" element={<Game />} />
          <Route path="/:user/cart" element={<Cart />} />

          {/* Vista offline */}
          <Route path="/offline" element={<Offline />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
