import React from 'react'
import { InputSearch } from '../inputs/Inputs'

function SubNav() {
  return (
    <nav>
        <div className="item">Explorar</div>
        <div className="item">Recomendaciones</div>
        <div className="item">Categorías</div>
        <div className="item">Más</div>
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