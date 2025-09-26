import React from "react";
import App from "../../layout/app";
import styles from "./home.module.css";

function home() {
  return (
    <App>

      <main>
        <div className={styles.carrousel}>Destacado</div>
        <div className={styles.offert}> Hola mundo</div>
        <div className={styles.recomendations}></div>
      </main>

    </App>
  );
}

export default home;
