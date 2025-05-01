// src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/usuarios"; // Ajuste conforme necessário

interface Usuario {
  nome: string;
  email: string; 
  login: string; 
  senha: string; 
  tipo: string;
}

export const cadastrarUsuario = async (dados: Usuario) => {
  try {

    console.log(dados);
    const response = await axios.post(API_URL, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
    throw error;
  }
};

export const editarUsuario = async (id:number, dados: Usuario) =>{
  
}
