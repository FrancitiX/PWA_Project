import React from "react";
import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/titles";

import Login from "./components/views/session/Login";

import Home from "./components/views/home/home";
import Offline from "./components/views/offline/Offline";

navigator.serviceWorker.register("../sw.js");

let db = window.indexedDB.open("database", 1);
db.onupgradeneeded = function (event) {
  let result = event.target.result;
  result.createObjectStore("table", { autoIncrement: true });
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Navegacion normal */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/offline" element={<Offline />} />
        
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
