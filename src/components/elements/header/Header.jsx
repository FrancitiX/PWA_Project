import React from "react";
import styles from './header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="https://via.placeholder.com/150x50.png?text=MiLogo"
          alt="Logo del sitio"
        />
      </div>
      <nav className={styles.profileOptions}>
        <a href="#login">Iniciar Sesión</a>
        <a href="#register">Registrarse</a>
      </nav>
    </header>
  );
}

export default Header;
