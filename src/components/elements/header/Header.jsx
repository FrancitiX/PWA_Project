import React, { useContext, useState } from "react";
import styles from "./header.module.css";
import logo from "/Gafoa.png";
import { MdShoppingCart, MdMenu, MdClose } from "react-icons/md";
import SubNav from "./SubNav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { AuthContext } from "../../../context/AuthContext";

function Header() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

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

            {!user ? (
              <>
                <Link to="/login">Iniciar Sesión</Link>
                <Link to="/signin">Registrarse</Link>
              </>
            ) : (
              <>
                <Link
                  to={`/profile/${user.user_name}`}
                  className={styles.userName}
                >
                  {user.user_name}
                </Link>
                <button onClick={logout} className={styles.logoutBtn}>
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </nav>
      </div>

      <div
        className={classNames(styles.navMobile, { [styles.open]: menuOpen })}
      >
        <div className={styles.navMobileLinks}>
          {!user ? (
            <>
              <Link to="/login" onClick={closeMenu}>
                Iniciar Sesión
              </Link>
              <Link to="/signin" onClick={closeMenu}>
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
            </>
          ) : (
            <>
              <Link
                to={`/profile/${user.user_name}`}
                className={styles.userName}
                onClick={closeMenu}
              >
                {user.user_name}
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

              <button onClick={() => { logout(); closeMenu(); }} className={styles.logoutBtn}>
                Cerrar sesión
              </button>
            </>
          )}
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
