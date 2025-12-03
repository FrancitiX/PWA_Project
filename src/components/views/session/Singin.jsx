import React, { useState } from "react";
import styles from "./session.module.css";
import Header from "../../elements/header/Header";
import Footer from "../../elements/footer/Footer";
import { Link } from "react-router-dom";
import Logo from "/Gafoa.png";
import { singin } from "../../../services/api/users";
import { addUserToDB } from "../../../services/localData";
import {
  notifyUser,
  sendNotification,
} from "../../../services/api/notifications";
import classNames from "classnames";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Singin() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    paternalName: "",
    maternalName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 5,
  });

  const change = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  }; 
  // Esto es un comentario

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const submit = async () => {
    try {
      const response = await singin(formData);
      console.log("Registro exitoso:", response);

      if (Notification.permission === "default") {
        await Notification.requestPermission();
      }

      if ("serviceWorker" in navigator) {
        const swReg = await navigator.serviceWorker.ready;

        const applicationServerKey = urlBase64ToUint8Array(
          "BMmsIRKY5PY5nonO_tHVjgYCt1wd8mnewHM3aaljEqd2gqccehKWeaNs4vmdHZM1PduoQej6rk6qFv9o8XJwUHY"
        );

        const subscription = await swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });

        console.log("Subscription:", subscription);

        await sendNotification(subscription, formData.username);
      }

      if (response.status === "ok") {
        const title = "Usuario registrado correctamente!";
        const message =
          "Se ah registrado correctamente tu usuario " + formData.username;

        await notifyUser(title, message);
      }
    } catch (err) {
      console.error("Error al registrar usuario:", err);

      alert("Error al registrar usuario. Por favor, intenta de nuevo.");

      addUserToDB(formData);

      if ("serviceWorker" in navigator) {
        const sw = await navigator.serviceWorker.ready;
        await sw.sync.register("sync-users");
        console.log("Sync registrado: sync-users");
      }
    }
  };

  const nextStep = () => {
    if (step < 2) {
      if (
        step === 0 &&
        (!formData.name || !formData.paternalName || !formData.maternalName)
      ) {
        alert("Por favor, completa todos los campos antes de continuar.");
        return;
      }
      if (step === 1 && (!formData.username || !formData.email)) {
        alert("Por favor, completa todos los campos antes de continuar.");
        return;
      }
      setStep(step + 1);
    } else if (step === 2) {
      if (
        !formData.name ||
        !formData.paternalName ||
        !formData.maternalName ||
        !formData.username ||
        !formData.email ||
        !formData.password
      ) {
        alert("Por favor, completa todos los campos antes de registrarte.");
        return;
      }
      submit();
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <>
      <Header />

      <div className={styles.bgImage}>
        <div className={classNames(styles.background, styles.subBottom)}>
          <h2 className={styles.title}>Crea tu cuenta</h2>

          <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={submit}>
              <div className={styles.subContainer}>
                <div className={styles.sliderContainer}>
                  <div
                    className={styles.slider}
                    style={{ transform: `translateX(-${step * 100}%)` }}
                  >
                    {/* Paso 0 */}
                    <div className={styles.slide}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="name">Nombre</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={change}
                          placeholder="Escribe tu nombre"
                          required
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="paternalName">Apellido paterno</label>
                        <input
                          type="text"
                          id="paternalName"
                          name="paternalName"
                          value={formData.paternalName}
                          onChange={change}
                          placeholder="Escribe tus apellidos"
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label htmlFor="maternalName">Apellido materno</label>
                        <input
                          type="text"
                          id="maternalName"
                          name="maternalName"
                          value={formData.maternalName}
                          onChange={change}
                          placeholder="Escribe tus apellidos"
                          required
                        />
                      </div>
                    </div>

                    {/* Paso 1 */}
                    <div className={styles.slide}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={change}
                          placeholder="Elige un nombre de usuario"
                          required
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={change}
                          placeholder="ejemplo@correo.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Paso 2 */}
                    <div className={styles.slide}>
                      <div className={styles.inputGroup}>
                        <label htmlFor="password">Contraseña</label>
                        <div className={styles.passwordWrapper}>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={change}
                            placeholder="Crea una contraseña"
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

                      <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">
                          Confirmar contraseña
                        </label>

                        <div className={styles.passwordWrapper}>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={change}
                            placeholder="Vuelve a escribir la contraseña"
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
                    </div>
                  </div>
                </div>

                <div className={styles.imageContainer}>
                  <img src={Logo} alt="Gafoa logo" />
                </div>
              </div>

              <div
                className={classNames(
                  styles.buttonsContainer,
                  styles.singinButtons
                )}
              >
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={prevStep}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className={styles.submitButton}
                  onClick={nextStep}
                >
                  {step === 2 ? "Registrarse" : "Siguiente"}
                </button>
              </div>

              <p className={styles.redirectLink}>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Singin;
