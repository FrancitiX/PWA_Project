import React from "react";
import styles from "./header.module.css";
import logo from "/Gafoa.png";
import { MdShoppingCart } from "react-icons/md";
import SubNav from "./SubNav";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();

  const Library = location.pathname.split("/")[1] === "Library";

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
              <Link to="/">Tienda</Link>
              <Link to="/Library/yo">Biblioteca</Link>
              {/* <Link to="#about">Acerca de</Link>
              <Link to="#contact">Contacto</Link> */}
            </div>
          </div>

          <div className={styles.profileOptions}>
            <Link to="/user/cart">
              <MdShoppingCart />
            </Link>

            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/singin">Registrarse</Link>
          </div>
        </nav>
      </div>

      {!Library && (
        <div className={styles.subnavContainer}>
          <SubNav />
        </div>
      )}
    </header>
  );
}

export default Header;
