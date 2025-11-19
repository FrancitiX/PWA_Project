import React from "react";
import styles from "./GameItems.module.css";
import { Link } from "react-router-dom";

// interface Game { //Typescript interface
//   image: string;
//   name: string;
//   description: string;
//   price: number;
//   discount: number;
//   date: string[];
//   platform: string[];
//   rating: number;
//   labels: string[];
//   totalPrice: number;
//   images: string[];
// }

const GameItem = ({ game }) => {
  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameInfo}>
        <div>
          <div>
            <h3 className={styles.gameinfo_title}>{game.name}</h3>
            <p>{game.price}</p>
          </div>
          <p className={styles.description}>{game.description}</p>
          {game.labels &&
            game.labels.map(
              (label, index) =>
                index <= 8 && (
                  <span key={index} className={styles.label}>
                    {label}
                  </span>
                )
            )}
        </div>
        <div className={styles.gameScreenshots}>
          {game.images.map(
            (img, index) =>
              index <= 3 && (
                <img
                  key={index}
                  src={img}
                  alt={`${game.name} screenshot ${index + 1}`}
                />
              )
          )}
        </div>
      </div>

      <Link to={`/game/${game.id}/${game.name}`} className={styles.gameItem}>
        <div className={styles.gameImage}>
          <img src={game.image} alt={`${game.name} image`} />
        </div>
        <div className={styles.gameItemInfo}>
          <div className={styles.gameItemLeft}>
            <div className={styles.gameName}>
              <h3 className={styles.game_title}>{game.name}</h3>
              <span className={styles.rating}>{game.rating}</span>
            </div>
            <div className={styles.labels}>
              {game.labels &&
                game.labels.map((label, index) => (
                  <span key={index} className={styles.label}>
                    {label}
                  </span>
                ))}
            </div>
            <span>{game.platform.join(", ")}</span>
          </div>
          <div className={styles.priceContent}>
            <div className={styles.discount}>
              <span>{game.discount}</span>
            </div>
            <div>
              <span className={styles.totalPrice}>{game.totalPrice}</span>
              <p className={styles.price}>{game.price}</p>
              <span className={styles.date}>{game.date.join(" ")}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const GameCartItem = ({ game }) => {
  return <div>gameItem</div>;
};

export { GameItem, GameCartItem };
