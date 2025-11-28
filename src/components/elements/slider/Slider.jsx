import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Slider.module.css";
import classNames from "classnames";
import { games } from "../../../utils/gamesExample";

function Carrousel({ data, type, manual }) {
  const items = data && data.length > 0 ? data : [];
  const actions = manual ? [Autoplay, Navigation] : [Autoplay];
  const sizeClass =
    type === "image"
      ? styles.images
      : type === "home"
      ? styles.home
      : type === "games"
      ? styles.games
      : styles.game;

  return (
    <>
      <Swiper
        className={classNames(styles.Carrousel, sizeClass)}
        modules={actions}
        slidesPerView={1}
        loop={items.length > 1}
        autoplay={{ delay: 4000 }}
        navigation={manual ? true : false}
      >
        {items ? (
          items.map((item, index) => (
            <SwiperSlide key={index}>
              {type === "image" ? (
                <a href={item.link}>
                  <img
                    src={item.img}
                    style={{ width: "100%", borderRadius: 10 }}
                  />
                </a>
              ) : type === "home" ? (
                <a href={item.link}>
                  <img
                    src={item.img}
                    style={{ width: "100%", borderRadius: 10 }}
                  />
                </a>
              ) : (
                <div className={styles.gameSlide}>
                  <img
                    src={item.img}
                    alt="Game Slide"
                    className={styles.gameImage}
                  />
                  <div className={styles.gameInfo}>
                    <h3 className={styles.gameTitle}>{item.name}</h3>
                    <p className={styles.gameDescription}>{item.description}</p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))
        ) : (
          <div>No hay nada w</div>
        )}
      </Swiper>
    </>
  );
}

function CarrouselGames() {
  const items = games;

  return (
    <>
      <Swiper
        className={styles.CarrouselGames}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation
      >
        <div className={styles.carrouselBorders}>
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.slideGames}>
                <div className={styles.left}>
                  <img src={item.image} className={styles.mainImage} />
                </div>

                <div className={styles.right}>
                  <h2 className={styles.title}>{item.name}</h2>

                  <div className={styles.thumbs}>
                    {item.images?.map((img, i) => (
                      <img key={i} src={img} className={styles.thumb} />
                    ))}
                  </div>

                  <p className={styles.available}>Ya disponible</p>

                  <button className={styles.tag}>Lo más vendido</button>

                  <p className={styles.price}>
                    {item.discount > 0 && (
                      <span className={styles.discount}>-{item.discount}%</span>
                    )}
                    <span className={styles.finalPrice}>${item.price}</span>
                  </p>

                  <p className={styles.platform}>{item.platform}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
}

function OffersCarousel({ data }) {
  const games = Array.isArray(data) ? data : [data];

  console.log(data);
  

  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={Math.max(1, Math.min(games.length, 3))}
        spaceBetween={20}
        navigation
        loop={false}
        autoplay={{ delay: 5000 }}
        className={styles.carouselOffer}
      >
        {games.map((game, i) => (
          <SwiperSlide key={i}>
            <div className={styles.card}>
              {game.tag && <div className={styles.tag}>{game.tag}</div>}

              <img src={game.image} className={styles.image} />

              {game.banner && (
                <div className={styles.banner}>{game.banner}</div>
              )}

              <div className={styles.bottom}>
                <div className={styles.discount}>-{game.discount}%</div>

                <div className={styles.prices}>
                  <span className={styles.oldPrice}>${game.totalPrice}.00 MXN</span>
                  <span className={styles.newPrice}>${game.price}.00 MXN</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export { Carrousel, CarrouselGames, OffersCarousel };
