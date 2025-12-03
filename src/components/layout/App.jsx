import React, { Children } from "react";
import Header from "../elements/header/Header";
import Footer from "../elements/footer/Footer";

function App({ children }) {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
}

export default App;
