import axios from "axios";

const BACK_URL = "http://localhost:5102";

async function sendNotification(subscription, user) {
  try {
    const response = await axios.post(
      `${BACK_URL}/api/save-subscription`,
      {
        endpoint: subscription.endpoint,
        keys: subscription.toJSON().keys,
        user: user
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Suscripción guardada:", response.data);
  } catch (error) {
    console.error("Error al guardar la suscripción:", error);
  }
}

async function notifyUser() {
    try {
    const response = await axios.get(`${BACK_URL}/api/send-test`);
    console.log("Notificaciones enviadas:", response.data);
  } catch (error) {
    console.error("Error al enviar notificaciones:", error);
  }
}

export { sendNotification, notifyUser };
