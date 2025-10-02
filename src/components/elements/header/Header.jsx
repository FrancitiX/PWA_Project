import React from "react";
import styles from './header.module.css'
import logo from '/Gafoa.png'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src={logo}
          alt="Logo del sitio"
        />
        <h3>Gafoa</h3>
      </div>
      <nav className={styles.profileOptions}>
        <a href="#login">Iniciar Sesión</a>
        <a href="#register">Registrarse</a>
      </nav>
    </header>
  );
}

export default Header;
