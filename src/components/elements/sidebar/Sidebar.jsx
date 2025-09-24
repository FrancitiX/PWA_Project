import React from 'react'
import styles from './sidebar.module.css'

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#juegos">Mis Juegos</a></li>
          <li><a href="#tienda">Tienda</a></li>
          <li><a href="#amigos">Amigos</a></li>
          <li><a href="#configuracion">Configuración</a></li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar