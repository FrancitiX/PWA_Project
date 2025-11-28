import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import App from "../../../layout/App";
import { deleteCartItem, getCart } from "../../../../services/localData";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const items = await getCart();
    setCartItems(items);
  };

  const deleteItem = async (id) => {
    await deleteCartItem(id);
    loadCart();
  };

  useEffect(() => {
    let base = 0;
    if (cartItems.length > 0) {
      cartItems.map((game) => {
        base += game.price;
      });
    }

    setTotalPrice(base);
  }, [cartItems]);

  return (
    <App>
      <main className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <h2 className={styles.pageTitle}>Tu carrito de compra</h2>

          <div className={styles.contentWrapper}>
            <div className={styles.leftColumn}>
              <div className={styles.cartBox}>
                {cartItems.length === 0 ? (
                  <div className={styles.emptyMessage}>
                    Tu carrito está vacío.
                  </div>
                ) : (
                  <div className={styles.itemsList}>
                    {cartItems.map((item) => (
                      <div className={styles.cartItem} key={item.key}>
                        <div className={styles.imageBox}>
                          <img src={item.image} alt={item.name} />
                        </div>

                        <div className={styles.infoBox}>
                          <h3 className={styles.gameTitle}>{item.name}</h3>

                          <div className={styles.platforms}>
                            <span>{item.platform}</span>
                          </div>

                          <div className={styles.actions}>
                            {/* <span className={styles.actionLink}>Agregar</span> */}
                            <span
                              className={styles.actionLink}
                              onClick={() => deleteItem(item.key)}
                            >
                              Eliminar
                            </span>
                          </div>
                        </div>

                        <div className={styles.priceBox}>
                          {item.discount > 0 && (
                            <span className={styles.discountTag}>
                              -{item.discount}%
                            </span>
                          )}

                          <div className={styles.priceGroup}>
                            {item.discount > 0 && (
                              <span className={styles.oldPrice}>
                                Mex$ {item.totalPrice}
                              </span>
                            )}

                            <span className={styles.finalPrice}>
                              Mex$ {item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.actionButtons}>
                <button className={styles.btnSecondary}>
                  Seguir comprando
                </button>
                <button className={`${styles.btnSecondary} ${styles.disabled}`}>
                  Continuar con el pago
                </button>
              </div>

              {/* <div className={styles.recommendationsSection}>
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
            </div> */}
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.summaryBox}>
                <div className={styles.summaryRow}>
                  <span>Total estimado</span>
                  <span className={styles.totalPrice}>
                    Mex$ {totalPrice}.00
                  </span>
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
        </div>
      </main>
    </App>
  );
}

export default Cart;
