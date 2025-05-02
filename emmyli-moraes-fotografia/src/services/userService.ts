// src/services/userService.js
import axios from "axios";

const CREATE_API_URL = "http://localhost:3000/api/usuarios"; // Ajuste conforme necessário

interface Usuario {
  nome: string;
  email: string; 
  login: string; 
  senha: string;
}

export const cadastrarUsuario = async (dados: Usuario) => {
  try {

    console.log(dados);
    const response = await axios.post(CREATE_API_URL, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
    throw error;
  }
};
const UPDATE_API_URL = "http://localhost:3000/api/myAccount"
export const editarUsuario = async (dados: Usuario) => {
  try {
   await axios.put(UPDATE_API_URL, dados,{
    headers:{
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
   });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.response?.data || error.message);
    throw error;
  }
}
