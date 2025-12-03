import React, { useState } from "react";
import styles from "./header.module.css";
import logo from "/Gafoa.png";
import { MdShoppingCart, MdMenu, MdClose } from "react-icons/md";
import SubNav from "./SubNav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

function Header() {
  const location = useLocation();

  const Library = location.pathname.split("/")[1] === "Library";

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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

          <div
            className={styles.mobileToggle}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <MdClose /> : <MdMenu />}
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

      <div className={classNames(styles.navMobile, { [styles.open]: menuOpen })}>
        <div className={styles.navMobileLinks}>
          <Link to="/login" onClick={closeMenu}>
            Iniciar Sesión
          </Link>
          <Link to="/singin" onClick={closeMenu}>
            Registrarse
          </Link>
          <Link to="/" onClick={closeMenu}>
            Tienda
          </Link>
          <Link to="/Library/yo" onClick={closeMenu}>
            Biblioteca
          </Link>
          <Link to="/user/cart" onClick={closeMenu}>
            <MdShoppingCart className={styles.cartIcon} />
          </Link>
        </div>
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
