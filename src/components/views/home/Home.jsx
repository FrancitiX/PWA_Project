import React from "react";
import App from "../../layout/app";
import styles from "./home.module.css";
import {
  Carrousel,
  CarrouselGames,
  OffersCarousel,
} from "../../elements/slider/Slider";
import classNames from "classnames";
import { GameItem } from "../../elements/gameItem/GameItems";
import SubFooter from "../../elements/subFooter/SubFooter";
import { games } from "../../../utils/gamesExample";

function home() {
  const test = () => {
    try {
      const data = {};
    } catch (e) {
      self.registration.sync.test();
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
      };
    };
  };

  const Covers = [
    {
      img: "src/assets/images/Covers/EchoesTimeBG.jpg",
      link: "/promocion1",
    },
  ];

  const gamesList = games;

  return (
    <App>
      <main className={styles.main}>
        <div className={styles.carrousel}>
          <Carrousel data={Covers} type="image" manual={false} />
        </div>
        <div
          className={classNames(
            styles.highlights,
            "container",
            styles.mainContent
          )}
        >
          <div className={styles.subContent}>
            <h2>Destacados</h2>
            <div className={styles.carrouselHighlights}>
              <CarrouselGames
                data={[
                  {
                    img: "src/assets/images/EchoesTime/EchoesTimeBG.jpg",
                    link: "/promocion1",
                  },
                  {
                    name: "Counter-Strike 2",
                    img: "/img/cs2-banner.jpg",
                    images: [
                      "/img/cs2-1.jpg",
                      "/img/cs2-2.jpg",
                      "/img/cs2-3.jpg",
                      "/img/cs2-4.jpg",
                    ],
                    price: "Free to Play",
                    discount: 0,
                    platform: "SteamOS + Windows",
                  },
                  { img: "/img/banner3.jpg", link: "/promocion3" },
                ]}
              />
            </div>
          </div>
        </div>
        <div
          className={classNames(
            styles.offert,
            "container",
            styles.mainContent,
          )}
        >
          <div className={styles.subContent}>
            <h2>Ofertas</h2>

            <div className={styles.carrouselOffer}>
              <OffersCarousel
                data={[
                  {
                    img: "/img/dyinglight.webp",
                    tag: "EN DIRECTO",
                    discount: 25,
                    oldPrice: "Mex$ 999.00",
                    newPrice: "Mex$ 749.25",
                    banner: null,
                  },
                  {
                    img: "/img/codbo3.webp",
                    discount: 67,
                    oldPrice: "Mex$ 1,199.00",
                    newPrice: "Mex$ 395.67",
                    tag: "",
                    banner: null,
                  },
                  {
                    img: "/img/doom.webp",
                    discount: 50,
                    oldPrice: "Mex$ 1,399.00",
                    newPrice: "Mex$ 699.50",
                    tag: "★ EN LISTA DE DESEADOS",
                    banner: "ACTUALIZACIÓN 3 YA DISPONIBLE",
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div
          className={classNames(
            styles.recomendations,
            "container",
            styles.mainContent,
            styles.d_none
          )}
        >
          <div className={styles.subContent}>
            <h2>Recomendaciones</h2>
          </div>
        </div>

        <div
          className={classNames(
            styles.allGames,
            "container",
            styles.mainContent
          )}
        >
          <div className={styles.subContainer}>
            <div className={styles.subContent}>
              <h2>Todos los juegos</h2>
              <div className={styles.listContainer}>
                {gamesList.map((game, index) => (
                  <GameItem key={index} game={game} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className={classNames(
            styles.recomendations,
            "container",
            styles.mainContent
          )}
        >
          <SubFooter />
        </div> */}
      </main>
    </App>
  );
}

export default home;
