import React, { Children } from 'react'
import Header from '../elements/header/Header'
import Footer from '../elements/footer/Footer'

function App( { Children } ) {
  return (
    <>
      <Header/>

      {Children}

      <Footer />
        
    </>
  )
}

export default App