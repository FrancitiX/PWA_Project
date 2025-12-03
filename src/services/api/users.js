import axios from "axios";

const BACK_URL = "https://pwa-project-back.onrender.com";

const singin = async (userData) => {
  try {
    const response = await axios.post(`${BACK_URL}/api/singIn`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${BACK_URL}/api/login`, credentials);
    console.log(response);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", JSON.stringify(response.data.user_name));
    localStorage.setItem("email", JSON.stringify(response.data.user_email));
    localStorage.setItem("role", JSON.stringify(response.data.user_role));
    
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  } 
};

export { login, singin };