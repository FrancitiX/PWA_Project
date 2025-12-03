import React, { useEffect, useState, version } from "react";
import styles from "./Game.module.css";
import Header from "../../elements/header/Header";
import Footer from "../../elements/footer/Footer";
import classNames from "classnames";
import { gamesDetails, games } from "../../../utils/gamesExample";
import { Link, useParams } from "react-router-dom";
import { Carrousel } from "../../elements/slider/Slider";
import SubFooter from "../../elements/subFooter/SubFooter";
import CommentsSection from "../../elements/comments/Comments";
import {
  addToCartDB,
  existsInLibrary,
  saveGame,
} from "../../../services/localData";
import App from "../../layout/App";

function Game() {
  const { id } = useParams();
  const game = games.find((game) => game.id === parseInt(id));
  const gameDetails = gamesDetails.find((game) => game.gameID === parseInt(id));
  const [alreadyOwned, setAlreadyOwned] = useState(false);

  // console.log(game);

  const free =
    !game.price ||
    game.price === 0 ||
    game.price === "Free to play" ||
    game.price === "Free";

  const addToLibrary = async (game) => {
    const result = await saveGame(game);

    if (result === "already-exists") {
      alert("Este juego ya está en tu biblioteca.");
    } else {
      alert("Juego agregado a tu biblioteca.");
    }
  };

  useEffect(() => {
    existsInLibrary(game.key).then(setAlreadyOwned);
  }, []);

  return (
    <>
      <App>
        <main className={classNames(styles.main)}>
          <div className={styles.page}>
            <section className={styles.firstSection}>
              <div className={styles.left}>
                <Carrousel data={game.images} type="game" manual={true} />
              </div>

              <div className={styles.right}>
                <div className={styles.gameImage}>
                  <img src={game.image} alt={game.name} />
                </div>
                <h1 className={styles.title}>{game.name}</h1>

                <div className={styles.tags}>
                  {game.labels.map((label, index) => (
                    <span key={index}>{label}</span>
                  ))}
                </div>

                <p className={styles.description}>{game.description}</p>

                <div className={styles.info}>
                  <p>
                    Fecha de lanzamiento: <span>{game.date.join(" ")}</span>
                  </p>

                  <p>
                    Desarrollador: <span>{game.developer}</span>
                  </p>

                  <p>
                    Distribuidor: <span>{game.publisher}</span>
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.Actions}>
              <div className={styles.actionsButtons}>
                <button className={styles.favButton}>
                  Agregar a favoritos
                </button>
                <button>No me interesa</button>
                <button>Ignorar</button>
              </div>

              <button className={styles.buttonWishList}>
                Mi Lista de deseos
              </button>
            </section>

            <section className={classNames("container", styles.gameDetails)}>
              <div className={styles.salesPackages}>
                <h2 className={styles.subtitle}>Ediciones de {game.name}</h2>

                {/* <div className={free ? styles.freePack : styles.salesPack}>
                <div className={styles.packInfo}>
                  <h3>Adquirir {game.name}</h3>

                  <ul className={styles.featureList}>
                    {/* {pack.features.map((packFeature, idx) => (
                        <li key={idx}>{packFeature}</li>
                      ))} 
                  </ul>
                </div>

                <div className={styles.gamePurchase}>
                  <div className={styles.gamePrice}>
                    {game.discount && <span>{game.discount}</span>}
                    <p>Mex$ {game.price}</p>
                  </div>
                  <div className={styles.packBuy}>
                    <button className={styles.buyButton}>
                      Agregar al carrito
                    </button>
                    <Link to="#" className={styles.buyNowButton}>
                      Comprar ahora
                    </Link>
                  </div>
                </div>
              </div> */}

                <div className={styles.salesPackagesContent}>
                  {gameDetails.salesPackages.map((pack, i) => (
                    <div
                      key={i}
                      className={classNames(
                        styles.package,
                        pack.price > 0 ? styles.salesPack : styles.freePack
                      )}
                    >
                      <div className={styles.packInfo}>
                        {pack.price > 0 ? (
                          <h3>{pack.name}</h3>
                        ) : (
                          <h3>Jugar a {game.name}</h3>
                        )}

                        <ul className={styles.featureList}>
                          {pack.features.map((f, idx) => (
                            <li key={idx}>{f}</li>
                          ))}
                        </ul>
                      </div>

                      <div className={styles.packBuy}>
                        {pack.price > 0 ? (
                          <>
                            {pack.discount > 0 ? (
                              <>
                                <div className={styles.packButtons}>
                                  <span className={styles.discount}>
                                    {" "}
                                    -{pack.discount}%{" "}
                                  </span>
                                  <div className={styles.priceDiscount}>
                                    <span className={styles.oldPrice}>
                                      Mex$ {pack.price.toFixed(2)}
                                    </span>
                                    <span className={styles.price}>
                                      Mex${" "}
                                      {(
                                        pack.price -
                                        (pack.price * pack.discount) / 100
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <span className={styles.price}>
                                  Mex$ {pack.price.toFixed(2)}
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <span className={styles.price}>Free to play</span>
                          </>
                        )}

                        <div className={styles.packButtons}>
                          {alreadyOwned ? (
                            <button className={styles.disabledButton}>
                              Ya en tu biblioteca
                            </button>
                          ) : (
                            <>
                              {pack.price > 0 ? (
                                <>
                                  <button
                                    className={classNames(
                                      styles.button,
                                      styles.buyButton
                                    )}
                                  >
                                    Comprar
                                  </button>
                                  <button
                                    className={classNames(
                                      styles.button,
                                      styles.cartButton
                                    )}
                                    onClick={() => addToCartDB(game)}
                                  >
                                    Agregar al carrito
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className={classNames(
                                      styles.button,
                                      styles.buyButton
                                    )}
                                    onClick={() => addToLibrary(game)}
                                  >
                                    Agregar a la biblioteca
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className={styles.subtitle}>CONTENIDO PARA ESTE JUEGO</h3>

                {gameDetails.features && (
                  <div className={styles.extraContent}>
                    {gameDetails.features.map((f, i) => (
                      <div key={i} className={styles.extraRow}>
                        {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.details}>
                <h2 className={styles.subtitle}>DETALLES</h2>

                <div className={styles.detailsBox}>
                  <div>
                    <strong>Desarrollador:</strong> {gameDetails.developer}
                  </div>
                  <div>
                    <strong>Editor:</strong> {gameDetails.publisher}
                  </div>
                  <div>
                    <strong>Versión:</strong> {gameDetails.version}
                  </div>
                  {gameDetails.beta.status && (
                    <div>
                      <strong>Beta:</strong> Disponible el{" "}
                      {gameDetails.beta.date}
                    </div>
                  )}

                  <h3 className={styles.detailsSub}>Categorías</h3>
                  <div className={styles.badges}>
                    {gameDetails.category.map((c, i) => (
                      <span key={i}>{c}</span>
                    ))}
                  </div>

                  <h3 className={styles.detailsSub}>Idiomas</h3>
                  <table className={styles.languagesTable}>
                    <thead>
                      <tr>
                        <th>Idioma</th>
                        <th>Interfaz</th>
                        <th>Voces</th>
                        <th>Subtítulos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameDetails.languages.map((lang, i) => (
                        <tr key={i}>
                          <td>{lang.name}</td>
                          <td>{lang.interface ? "✔️" : "✖"}</td>
                          <td>{lang.voice ? "✔️" : "✖"}</td>
                          <td>{lang.subtitles ? "✔️" : "✖"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className={styles.descriptionSection}>
              <div
                className={classNames("container", styles.descriptionSection)}
              >
                <h2>Descripción</h2>
                <p>{game.description}</p>
              </div>
            </section>
          </div>

          <section className={styles.requirementsSection}>
            <div className={classNames("container", styles.requirements)}>
              <h2 className={styles.subtitle}>Requisitos del sistema</h2>
              <div className={styles.requirementsBoxes}>
                <div className={styles.requirementBox}>
                  <h3>Requisitos mínimos</h3>
                  <ul>
                    <li>
                      <strong>SO:</strong> Windows 95
                    </li>
                    <li>
                      <strong>Procesador:</strong> Intel pentium / AMD similar
                    </li>
                    <li>
                      <strong>Memoria:</strong> 1 GB de RAM
                    </li>
                    <li>
                      <strong>Gráficos (opcional):</strong> Intel HD Grafics /
                      AMD Radeon
                    </li>
                    <li>
                      <strong>DirectX:</strong> Versión 11
                    </li>
                    <li>
                      <strong>Almacenamiento:</strong> 20 GB de espacio
                      disponible
                    </li>
                  </ul>
                </div>

                <div className={styles.requirementBox}>
                  <h3>Requisitos recomendados</h3>
                  <ul>
                    <li>
                      <strong>SO:</strong> Windows 10 64-bit
                    </li>
                    <li>
                      <strong>Procesador:</strong> Intel Core i7-4770 / AMD
                      Ryzen 5 1500X
                    </li>
                    <li>
                      <strong>Memoria:</strong> 16 GB de RAM
                    </li>
                    <li>
                      <strong>Gráficos:</strong> NVIDIA GeForce GTX 1060 / AMD
                      Radeon RX 580
                    </li>
                    <li>
                      <strong>DirectX:</strong> Versión 11
                    </li>
                    <li>
                      <strong>Almacenamiento:</strong> 20 GB de espacio
                      disponible
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* <section>
          <div className={classNames("container", styles.recommendations)}>
            <h2>Recomendaciones</h2>
            <Carrousel data={games} type="game" manual={true} />
          </div>
        </section> */}

          <div className={styles.page}>
            <section>
              <CommentsSection />
            </section>
          </div>
        </main>
      </App>
    </>
  );
}

export default Game;
