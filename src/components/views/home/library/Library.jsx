import React, { useEffect, useState } from "react";
import styles from "./Library.module.css";
import Header from "../../../elements/header/Header";
import { getMyGames } from "../../../../services/localData";

function Library() {
  const [libraryGames, setLibraryGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = async () => {
    const data = await getMyGames();
    setLibraryGames(data);
  };

  const myGames = libraryGames.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favorites = myGames.filter((g) => g.favorite);
  const uncategorized = myGames.filter((g) => !g.favorite);

  return (
    <>
      <Header />

      <main className={styles.libraryContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button className={styles.filterBtn}>
              <svg viewBox="0 0 24 24" width="16" fill="currentColor">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
              </svg>
            </button>
          </div>

          <div className={styles.gameListScroll}>
            {/* Sección Favoritos */}
            {favorites.length > 0 && (
              <div className={styles.listSection}>
                <div className={styles.sectionHeader}>
                  FAVORITOS ({favorites.length})
                </div>
                {favorites.map((game) => (
                  <div key={game.id} className={styles.listItem}>
                    <img src={game.cover} alt="" className={styles.miniIcon} />
                    <span
                      className={
                        game.installed
                          ? styles.textInstalled
                          : styles.textUninstalled
                      }
                    >
                      {game.name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Sección Sin Categoría */}
            <div className={styles.listSection}>
              <div className={styles.sectionHeader}>
                SIN CATEGORÍA ({uncategorized.length})
              </div>
              {uncategorized.map((game) => (
                <div key={game.id} className={styles.listItem}>
                  <img src={game.cover} alt="" className={styles.miniIcon} />
                  <span
                    className={
                      game.installed
                        ? styles.textInstalled
                        : styles.textUninstalled
                    }
                  >
                    {game.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- CONTENIDO PRINCIPAL (GRID) --- */}
        <main className={styles.mainContent}>
          {/* Barra superior de herramientas */}
          <div className={styles.topBar}>
            <div className={styles.collectionTitle}>
              Todos los juegos{" "}
              <span className={styles.count}>({libraryGames.length})</span>
            </div>
            <div className={styles.sortControls}>
              <span>ORDENAR POR</span>
              <select className={styles.sortSelect}>
                <option>Tamaño en disco</option>
                <option>Última vez jugado</option>
                <option>Nombre</option>
              </select>
            </div>
          </div>

          {/* Grilla de Portadas */}
          <div className={styles.gridContainer}>
            {myGames.map((game) => (
              <div key={game.id} className={styles.gameCard}>
                <div className={styles.coverWrapper}>
                  <img
                    src={game.cover}
                    alt={game.name}
                    className={styles.coverImage}
                  />

                  {/* Overlay de Hover (Botón de Play) */}
                  <div className={styles.hoverOverlay}>
                    <div className={styles.playButton}>▶</div>
                  </div>

                  {/* Badge de Tamaño (Parte inferior) */}
                  <div className={styles.sizeBadge}>
                    <span className={styles.driveLetter}>{game.drive}</span>
                    <span className={styles.sizeText}>{game.size}</span>
                  </div>
                </div>
                <div className={styles.cardTitle}>{game.name}</div>
              </div>
            ))}
          </div>
        </main>
      </main>
    </>
  );
}

export default Library;
