import React from "react";
import { InputSearch } from "../inputs/Inputs";
import styles from "./header.module.css";

function SubNav() {
  const [search, setSearch] = React.useState("");

  return (
    <nav className={styles.subnav}>
      <div className={styles.item}>Explorar</div>
      <div className={styles.item}>Recomendaciones</div>
      <div className={styles.item}>Categorías</div>

      <div className={styles.inputSearch}>
        <InputSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar juegos..."
        />
      </div>
    </nav>
  );
}

export default SubNav;
