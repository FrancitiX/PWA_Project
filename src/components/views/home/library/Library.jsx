import React, { useState } from "react";
import styles from "./Library.module.css";
import Header from "../../../elements/header/Header";

const mockLibrary = [
  {
    id: 1,
    name: "Red Dead Redemption 2",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg",
    size: "119.45 GB",
    drive: "F:",
    favorite: true,
    installed: true,
  },
  {
    id: 2,
    name: "Street Fighter 6",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1364780/header.jpg",
    size: "103.11 GB",
    drive: "F:",
    favorite: true,
    installed: true,
  },
  {
    id: 3,
    name: "DOOM Eternal",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/782330/header.jpg",
    size: "89.42 GB",
    drive: "C:",
    favorite: true,
    installed: true,
  },
  {
    id: 4,
    name: "Battlefield 2042",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1517290/header.jpg",
    size: "69.22 GB",
    drive: "F:",
    favorite: true,
    installed: false,
  },
  {
    id: 5,
    name: "Rainbow Six Siege",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/359550/header.jpg",
    size: "64.32 GB",
    drive: "F:",
    favorite: true,
    installed: true,
  },
  {
    id: 6,
    name: "Counter-Strike 2",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
    size: "55.41 GB",
    drive: "C:",
    favorite: true,
    installed: true,
  },
  {
    id: 7,
    name: "NieR:Automata",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/524220/header.jpg",
    size: "40.88 GB",
    drive: "F:",
    favorite: false,
    installed: true,
  },
  {
    id: 8,
    name: "Left 4 Dead 2",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/550/header.jpg",
    size: "15.63 GB",
    drive: "C:",
    favorite: false,
    installed: true,
  },
  {
    id: 9,
    name: "Hollow Knight",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/header.jpg",
    size: "7.43 GB",
    drive: "C:",
    favorite: false,
    installed: true,
  },
  {
    id: 10,
    name: "Stardew Valley",
    cover:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg",
    size: "1.2 GB",
    drive: "C:",
    favorite: true,
    installed: true,
  },
];

function Library() {
  const [searchTerm, setSearchTerm] = useState("");

  const myGames = mockLibrary.filter((g) =>
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
              <span className={styles.count}>({mockLibrary.length})</span>
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
