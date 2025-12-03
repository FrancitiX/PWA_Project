import React from "react";
import styles from "./inputs.module.css";
import { FaSearch } from "react-icons/fa";

function InputSearch({value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className={styles.inputSearch}>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button className={styles.iconButton}>
        <FaSearch />
      </button>
    </div>
  );
}

export { InputSearch };
