// src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/usuarios"; // Ajuste conforme necessário
const token = localStorage.getItem("token");

interface Usuario {
  nome: string;
  email: string; 
  login: string; 
  senha: string;
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

export const buscaTodosUsuarios = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log("usuarios:", response)
    return response.data; 
  } catch (error){
    console.error("Erro ao buscar usuários:", error.response?.data || error.message);
    throw error;
  }
}

export const removeUsuario = async (id : Number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data; 
  } catch (error){
    console.error("Erro ao deletar usuário:", error.response?.data || error.message);
    throw error;
  }
}

export const editaUsuario = async (dados: { id: number, nome: string; email: string; senha_hash: string; }) => {
  try {
    console.log("dados enviados para alteração:", dados)
    const response = await axios.put(`${API_URL}/${dados.id}`, dados, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data; 
  } catch (error){
    console.error("Erro ao deletar usuário:", error.response?.data || error.message);
    throw error;
  }
}

const ACCOUNT_API_URL = "http://localhost:3000/api/myAccount"
export const editarUsuario = async (dados: Usuario) => {
  try {
   await axios.put(ACCOUNT_API_URL, dados,{
    headers:{
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
   });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.response?.data || error.message);
    throw error;
  }
}