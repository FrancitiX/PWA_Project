import React from 'react'
import { InputSearch } from '../inputs/Inputs'
import styles from './header.module.css'

function SubNav() {
  return (
    <nav className={styles.subnav}>
        <div className={styles.item}>Explorar</div>
        <div className={styles.item}>Recomendaciones</div>
        <div className={styles.item}>Categorías</div>
        {/* <div className={styles.item}>Más</div> */}
        <div>
            <InputSearch 
                value=""
                onChange={() => {}}
            />
        </div>
    </nav>
  )
}

export default SubNav