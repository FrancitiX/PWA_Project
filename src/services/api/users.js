import axios from "axios";

const BACK_URL = "http://localhost:5102";

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
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  } 
};

export { login, singin };