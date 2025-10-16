import React, { useState } from "react";
import styles from "./session.module.css";
import Header from "../../elements/header/Header";
import Footer from "../../elements/footer/Footer";
import { Link } from "react-router-dom";
import Logo from "/Gafoa.png";
import { singin } from "../../../services/users";
import { addUserToDB } from "../../../services/localData";
import { sendNotification } from "../../../services/notifications";

function Singin() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    paternalName: "",
    maternalName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const submit = async (e) => {
    // e.preventDefault();

    // Validación simple para confirmar las contraseñas
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      return;
    }

    addUserToDB(formData);
    try {
      const response = await singin(formData);
      console.log("Registro exitoso:", response);

      if (Notification.permission === "default") {
        await Notification.requestPermission();
      }

      if (Notification.permission === "granted") {
        const swRegistration = await navigator.serviceWorker.ready;

        const subscription = await swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            "BDlZ5FbW8mMk2_TfJ5OColWKrNvntu4Grfn2OOgPUNJnf4U06qEmMA2EA-2yW1UqGypWDq-c0NHcH5msyFEVBQI"
          ),
        });

        console.log("Suscripción creada:", subscription.toJSON());

        // 🔹 Envía la suscripción a tu backend
        sendNotification(subscription);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      navigator.serviceWorker.ready.then((swRegistration) => {
        return swRegistration.sync.register("sync-users");
      });
    }
  };

  navigator.serviceWorker.ready.then(async (reg) => {
    const key =
      "BDlZ5FbW8mMk2_TfJ5OColWKrNvntu4Grfn2OOgPUNJnf4U06qEmMA2EA-2yW1UqGypWDq-c0NHcH5msyFEVBQI";
    const convertedKey = (function urlBase64ToUint8Array(base64String) {
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
    })(key);

    try {
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey,
      });
      console.log("Suscripción creada manualmente:", sub.toJSON());
    } catch (err) {
      console.error("Error al suscribir manualmente:", err);
    }
  });

  navigator.serviceWorker.ready.then(r => console.log(r.scope));


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

  navigator.serviceWorker.ready.then(async (reg) => {
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      console.log("Eliminando suscripción previa...");
      await sub.unsubscribe();
    } else {
      console.log("No había suscripción previa.");
    }
  });

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <>
      <Header />
      <div className={styles.background}>
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

                    <div>
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
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={change}
                        placeholder="Crea una contraseña segura"
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="confirmPassword">
                        Confirmar contraseña
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={change}
                        placeholder="Vuelve a escribir la contraseña"
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

      <Footer />
    </>
  );
}

export default Singin;
