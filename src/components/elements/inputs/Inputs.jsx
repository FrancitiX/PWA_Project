
import React from "react";
import styles from "./inputs.module.css";

function InputSearch({ value, onChange }) {
  return (
    <div className={styles.inputSearch}>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar..."
        value={value}
        onChange={onChange}
      />
      <i className={styles.icon}></i>
      
    </div>
  );
}

export { InputSearch };
