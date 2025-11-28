import React from "react";
import styles from './Cards.module.css'

const GameCard = () => {
  return <div>Cards</div>;
};

const GameOfferCard = ({ game}) => {

  return (
    <div className={styles.slideGames}>
      <div className={styles.left}>
        <img src={game.img} className={styles.mainImage} />
      </div>

      <div className={styles.right}>
        <h2 className={styles.title}>{game.name}</h2>

        <div className={styles.thumbs}>
          {game.images?.map((img, i) => (
            <img key={i} src={img} className={styles.thumb} />
          ))}
        </div>

        <p className={styles.available}>Ya disponible</p>

        <button className={styles.tag}>Lo más vendido</button>

        <p className={styles.price}>
          {game.discount > 0 && (
            <span className={styles.discount}>-{game.discount}%</span>
          )}
          <span className={styles.finalPrice}>${game.price}</span>
        </p>

        <p className={styles.platform}>{game.platform}</p>
      </div>
    </div>
  );
};

export { GameCard, GameOfferCard };
