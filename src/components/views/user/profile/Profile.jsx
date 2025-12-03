import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import classNames from "classnames";
import App from "../../../layout/App";
import { getUserData } from "../../../../services/auth/users";

const userData = {
  username: "FrancitiX",
  realName: "フランシスコ",
  country: "Mexico",
  flagCode: "mx",
  description:
    "La vida es un sube y baja (o un elevador) dicen por ahí, pero parece que el mío esta descompuesto porque no sube por mas que intento",
  level: 1,
  xp: '236',
  badgeTitle: "Apilador Perspicaz",
  recentHours: "0",
  gamesCount: 0,
  badgesCount: 0,
  avatarUrl:
    "https://avatars.cloudflare.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg", // Tu avatar de ejemplo
  badgeIconUrl:
    "https://community.cloudflare.steamstatic.com/public/images/badges/02_xp/25.png", // Icono de la insignia 25+
  recentActivity: [],
  badges: [
  ],
};

function Profile() {
  const [user, setUser] = useState(null);

  const getData = async () => {
    const userData = await getUserData();
    setUser(userData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <App>
      <div className={styles.profileBackground}>
        <div className={classNames("container", styles.profileContent)}>
          <div className={styles.mainColumn}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarContainer}>
                <img
                  src={userData.avatarUrl}
                  alt={userData.username}
                  className={styles.avatar}
                />
              </div>
              <div className={styles.headerInfo}>
                <h1 className={styles.username}>
                  {user ? user.username : "Cargando..."}{" "}
                  {/* <span className={styles.dropdownArrow}>▼</span> */}
                </h1>
                <p className={styles.subInfo}>
                  {/* {userData.realName} */}

                  {/* <span
                    className={styles.flag}
                    role="img"
                    aria-label={userData.country}
                  >
                    🇲🇽
                  </span>
                  {userData.country} */}
                  <div className={styles.onlineStatus}>En línea</div>
                </p>
                <p className={styles.description}>{userData.description}</p>
              </div>
            </div>

            <div className={styles.activitySection}>
              <div className={styles.sectionTitleRow}>
                <h3>Juegos adquiridos recientemente</h3>
                <span className={styles.recentHours}>
                  {userData.recentHours} recientes
                </span>
              </div>

              <div className={styles.gamesList}>
                {userData.recentActivity.map((game) => (
                  <div key={game.id} className={styles.gameActivityCard}>
                    <div className={styles.gameCover}>
                      <img src={game.cover} alt={game.name} />
                    </div>

                    <div className={styles.gameDetails}>
                      <h4>{game.name}</h4>
                      <div className={styles.statsRow}>
                        <span>{game.hoursTotal} h registradas</span>
                        <span className={styles.lastPlayed}>
                          usado por última vez el {game.lastPlayed}
                        </span>
                      </div>

                      {/* <div className={styles.achievementsBar}>
                        <span>Avance en los logros</span>
                        <div className={styles.barContainer}>
                          <div
                            className={styles.barFill}
                            style={{
                              width: `${
                                (game.achievements.unlocked /
                                  game.achievements.total) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>

                        <span className={styles.achievementsCount}>
                          {game.achievements.unlocked} de{" "}
                          {game.achievements.total}
                        </span>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.rightSidebar}>
            <div className={styles.levelBox}>
              <div className={styles.levelCircle}>
                <span>Nivel</span>
                <span className={styles.levelNumber}>{userData.level}</span>
              </div>
              <div className={styles.badgeInfo}>
                <img
                  src={userData.badgeIconUrl}
                  alt={userData.badgeTitle}
                  className={styles.badgeIcon}
                />
                <div>
                  <div className={styles.badgeTitle}>{userData.badgeTitle}</div>
                  <div className={styles.xpInfo}>{userData.xp} EXP</div>
                </div>
              </div>
              <button className={styles.editProfileBtn}>
                Modificar perfil
              </button>
            </div>

            <div className={styles.sidebarSection}>
              <h3>
                Conexiones
                <span className={styles.count}>{userData.badgesCount}</span>
              </h3>
              <div className={styles.badgesGrid}>
                {userData.badges.map((badgeUrl, index) => (
                  <img
                    key={index}
                    ñ
                    src={badgeUrl}
                    alt={`Insignia ${index + 1}`}
                    className={styles.miniBadge}
                  />
                ))}
              </div>
            </div>

            {/* Menú lateral de enlaces */}
            <div className={styles.sidebarLinks}>
              <div className={styles.linkItem}>
                Juegos{" "}
                <span className={styles.count}>{userData.gamesCount}</span>
              </div>
              <div className={styles.linkItem}>Inventario</div>
              <div className={styles.linkItem}>Capturas</div>
              <div className={styles.linkItem}>Videos</div>
            </div>
          </div>
        </div>
      </div>
    </App>
  );
}

export default Profile;
