import React, { useState } from "react";
import styles from "./session.module.css";
import { Link } from "react-router-dom";
import Logo from "/Gafoa.png";
import classNames from "classnames";
import App from "../../layout/App";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    remember: false,
  });

  const change = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const Login = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <App>
        <main className={styles.bgImage}>
          <div className={classNames(styles.background, styles.subBottom)}>
            <h2 className={styles.title}>Iniciar sesión</h2>

            <div className={styles.container}>
              <form className={styles.formContainer} onSubmit={Login}>
                <div className={styles.subContainer}>

                  <div className={styles.sliderContainer}>
                    <div className={styles.slider}>
                      <div className={styles.slide}>
                        <div className={styles.inputGroup}>
                          <label htmlFor="username">Usuario</label>
                          <input
                            type="text"
                            id="username"
                            name="user"
                            value={formData.user}
                            onChange={change}
                            placeholder="Nombre de usuario o correo"
                            required
                          />
                        </div>

                        <div className={styles.inputGroup}>
                          <label htmlFor="password">Contraseña</label>

                          <div className={styles.passwordWrapper}>
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={change}
                              placeholder="Escribe tu contraseña"
                              required
                            />

                            <button
                              type="button"
                              className={styles.togglePasswordBtn}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <FaEyeSlash size={20} />
                              ) : (
                                <FaEye size={20} />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className={styles.rememberGroup}>
                          <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={formData.remember}
                            onChange={change}
                          />
                          <label htmlFor="remember">Recrodar mi sesión</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={classNames(
                      styles.imageContainer,
                      styles.loginImage
                    )}
                  >
                    <img src={Logo} alt="Gafoa logo" />
                  </div>
                </div>

                <div className={styles.buttonsContainer}>
                  <button type="submit" className={classNames(styles.submitButton, styles.loginButton)}>
                    Iniciar sesión
                  </button>
                </div>

                <p className={styles.redirectLink}>
                  ¿No tienes una cuenta?{" "}
                  <Link to="/singin">Registrate aquí</Link>
                </p>
              </form>
            </div>
          </div>
        </main>
      </App>
    </>
  );
}

export default Login;
