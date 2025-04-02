// src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/usuarios"; // Ajuste conforme necessário

export const cadastrarUsuario = async (dados) => {
  try {
    const response = await axios.post(API_URL, dados);
    return response.data; // Retorna os dados do usuário cadastrado
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
    throw error;
  }
};
