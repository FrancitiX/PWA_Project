import React, { useState } from "react";
import styles from "./Cart.module.css";
import App from "../../../layout/app";

const recommendations = [
  {
    id: 1,
    title: "Celeste",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/504230/header.jpg", // URL de ejemplo de Steam
    discount: "-75%",
    originalPrice: "Mex$ 227.99",
    price: "Mex$ 56.99",
    platform: "win",
  },
  {
    id: 2,
    title: "DISPATCH",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2111160/header.jpg",
    discount: null,
    originalPrice: null,
    price: "Mex$ 334.99",
    platform: "win",
  },
  {
    id: 3,
    title: "PEAK",
    image:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2635390/header.jpg",
    discount: null,
    originalPrice: null,
    price: "Mex$ 89.99",
    platform: "win",
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <App>
      <main className={styles.mainContainer}>
        <h2 className={styles.pageTitle}>Tu carrito de compra</h2>

        <div className={styles.contentWrapper}>
          <div className={styles.leftColumn}>
            <div className={styles.cartBox}>
              {cartItems.length === 0 ? (
                <div className={styles.emptyMessage}>
                  Tu carrito está vacío.
                </div>
              ) : (
                <div>Items en el carrito...</div>
              )}
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.btnSecondary}>Seguir comprando</button>
              <button className={`${styles.btnSecondary} ${styles.disabled}`}>
                Continuar con el pago
              </button>
            </div>

            <div className={styles.recommendationsSection}>
              <h3>RECOMENDACIONES PARA TI</h3>
              <div className={styles.recGrid}>
                {recommendations.map((game) => (
                  <div key={game.id} className={styles.gameCard}>
                    <div className={styles.cardImage}>
                      <img src={game.image} alt={game.title} />
                    </div>
                    <div className={styles.cardInfo}>
                      <div className={styles.platformIcon}>
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="#8f98a0"
                        >
                          <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm10.949-1.68L24 0v11.551H10.949V1.769zM0 12.877h9.75V22.32L0 20.976V12.877zm10.949 0H24v11.551l-13.051-1.769V12.877z" />
                        </svg>
                      </div>
                      <div className={styles.priceBlock}>
                        {game.discount && (
                          <div className={styles.discountBadge}>
                            {game.discount}
                          </div>
                        )}
                        <div className={styles.priceText}>
                          {game.originalPrice && (
                            <span className={styles.originalPrice}>
                              {game.originalPrice}
                            </span>
                          )}
                          <span
                            className={
                              game.discount
                                ? styles.discountedPrice
                                : styles.normalPrice
                            }
                          >
                            {game.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span>Total estimado</span>
                <span className={styles.totalPrice}>Mex$ 0.00</span>
              </div>
              <p className={styles.taxNote}>
                Los impuestos de venta se calcularán durante el pago (si es
                aplicable).
              </p>
              <button className={styles.btnPrimary} disabled>
                Continuar con el pago
              </button>
            </div>

            <div className={styles.infoBox}>
              <div className={styles.infoIcon}>
                {/* Simulación de la imagen de monitor/escudo */}
                <div className={styles.fakeIcon}>🛡️</div>
              </div>
              <p>
                La compra de un producto digital otorga una licencia para el
                producto en Steam.
              </p>
              <p className={styles.smallNote}>
                Para conocer los términos y condiciones completos, consulta el{" "}
                <a href="#">Acuerdo de Suscriptor a Steam</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </App>
  );
}

export default Cart;
