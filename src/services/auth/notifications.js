// import axios from "axios";

// const BACK_URL = "http://localhost:5102";

// async function sendNotification(subscription, token) {
//   try {
//     const response = await axios.post(
//       `${BACK_URL}/auth/save-subscription`,
//       {
//         endpoint: subscription.endpoint,
//         keys: subscription.toJSON().keys,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//       }
//     );

//     console.log("Suscripción guardada:", response.data);
//   } catch (error) {
//     console.error("Error al guardar la suscripción:", error);
//   }
// }

// export { sendNotification };
