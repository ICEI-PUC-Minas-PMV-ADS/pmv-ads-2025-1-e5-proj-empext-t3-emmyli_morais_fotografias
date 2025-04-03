// src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/usuarios"; // Ajuste conforme necessário

export const cadastrarUsuario = async (dados: { nome: string; email: string; login: string; senha_hash: string; tipo: string; }) => {
  try {

    console.log(dados);
    const response = await axios.post(API_URL, dados);
    return response.data; 
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
    throw error;
  }
};
