import React from "react";
import App from "../../layout/app";
import styles from "./home.module.css";

function home() {

  const test = () => {

    try {
      const data = {}
    } catch (e) {
      
      self.registration.sync.test()
    }


    let db = window.indexedDB.open("database");
    db.onsuccess = (event) => {
      let result = event.target.result;
      let transaction = result.transaction("table", "readwrite");
      let obj = transaction.objectStore("table");

      // const resultado = obj.get(1);

      const resultado = obj.add({ name: "Melisaa", age: 19 });

      // const resultado = obj.delete(2);

      resultado.onsuccess = (event) => {
        console.log(event.target.result);
      }
    };
  };



  return (
    <App>

      <main className={styles.main}>
        <div className={styles.carrousel}>Destacado</div>
        <div className={styles.offert}> Hola mundo</div>
        <div className={styles.recomendations}></div>
      </main>
    </App>
  );
}

export default home;
