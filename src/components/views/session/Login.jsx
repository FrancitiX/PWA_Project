import React, { useState } from "react";
import styles from "./session.module.css";
import Header from "../../elements/header/Header";
import Footer from "../../elements/footer/Footer";
import { Link } from "react-router-dom";
import Logo from "/Gafoa.png";

function Login() {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    rememberMe: false,
  });

  const change = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />
      <div className={styles.background}>
        <h2 className={styles.title}>Iniciar sesión</h2>

        <div className={styles.container}>
          <form className={styles.formContainer}>
            <div className={styles.subContainer}>
              <div className={styles.sliderContainer}>
                <div className={styles.slider}>
                  <div className={styles.slide}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="username">Usuario</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.user}
                        onChange={change}
                        placeholder="Elige un nombre de usuario"
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="email">Contraseña</label>
                      <input
                        type="password"
                        id="email"
                        name="email"
                        value={formData.password}
                        onChange={change}
                        placeholder="Escriba su contraseña"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.imageContainer}>
                <img src={Logo} alt="Gafoa logo" />
              </div>
            </div>

            <div className={styles.buttonsContainer}>
              <button type="submit" className={styles.submitButton}>
                Iniciar sesión
              </button>
            </div>

            <p className={styles.redirectLink}>
              ¿No tienes una cuenta? <Link to="/login">Registrate aquí</Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
