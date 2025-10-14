import React from "react";
import styles from "./header.module.css";
import logo from "/Gafoa.png";
import { MdShoppingCart } from "react-icons/md";
import SubNav from "./SubNav";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <nav className={styles.navbar}>
          <div className={styles.navOptions}>
            <div className={styles.logo}>
              <div className={styles.logoImage}>
                <img src={logo} alt="Gafoa" />
              </div>
              <h3 className={styles.title}>GaFoa</h3>
            </div>

            <div className={styles.navigationLinks}>
              <Link to="#home">Tienda</Link>
              <Link to="#products">Biblioteca</Link>
              <Link to="#about">Acerca de</Link>
              <Link to="#contact">Contacto</Link>
            </div>
          </div>

          <div className={styles.profileOptions}>
            <div>{/* <i className="fas fa-user"></i> */}</div>
            <Link to="#cart">
              <MdShoppingCart />
            </Link>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/singin">Registrarse</Link>
          </div>
        </nav>
      </div>

      <div className={styles.subnavContainer}>
        <SubNav />
      </div>
    </header>
  );
}

export default Header;
