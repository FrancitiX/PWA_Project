import React from "react";
import styles from "./footer.module.css";
import Logo from "/Gafoa.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.firstContainer}>
        <section className={styles.sectionRight}>
          <div className={styles.logoContainer}>
            <div className={styles.logoImage}>
              <img src={Logo} alt="GaFoa" className={styles.logo} />
            </div>
            <h3 className={styles.logoText}>GaFoa</h3>
          </div>
          <p>Tu tienda de videojuegos en línea</p>
        </section>
      </div>
      <div className={styles.container}>
        <Link to="#home">Tienda</Link>
        <Link to="#products">Biblioteca</Link>
        <Link to="#about">Acerca de</Link>
        <Link to="#contact">Contáctanos</Link>
        <Link to="#terms" title="Términos y condiciones de Servicio">TyC</Link>
        <Link to="#privacy" title="Política de Privacidad">PP</Link>
        <Link to="/">Regresar arriba</Link>
      </div>
      <p className={styles.footerCopyright}>
        © 2024 GaFoa. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;
