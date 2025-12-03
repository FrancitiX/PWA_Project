import axios from "axios";

const BACK_URL = "https://pwa-project-back.onrender.com";

async function getUserData() {
  try {
    const response = await axios.get(
      `${BACK_URL}/auth/userData`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Datos del usuario obtenidos:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
  }
}

export { getUserData };