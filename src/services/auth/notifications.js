import axios from "axios";

const BACK_URL = "http://localhost:5102";

async function sendNotification(subscription) {
  try {
    const response = await axios.post(
      `${BACK_URL}/api/sendPush`,
      subscription,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Notificación enviada:", response.data);
  } catch (error) {
    console.error("Error al enviar notificación:", error);
  }
}

export { sendNotification };
