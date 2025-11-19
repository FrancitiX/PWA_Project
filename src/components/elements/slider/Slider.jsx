import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import styles from "./Slider.module.css";
import classNames from "classnames";

export default function Carrousel({ data, type, manual }) {
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
        loop={true}
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
                <a href={item.link}>
                  <div className={styles.gameSlide}>
                    <img
                      src={item.img}
                      alt="Game Slide"
                      className={styles.gameImage}
                    />
                    <div className={styles.gameInfo}>
                      <h3 className={styles.gameTitle}>{item.name}</h3>
                      <p className={styles.gameDescription}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </a>
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
