// src/services/userService.js
import { api } from "./api";

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

    const response = await api.post("/api/usuarios", dados);

    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
    throw error;
  }
};

export const getMinhaConta = async () => {
  const { data } = await api.get("/api/myAccount");
  return data;
};

export const buscaTodosUsuarios = async () => {
  try {
    const response = await api.get("/api/usuarios");
    console.log("usuarios:", response)
    return response.data; 
  } catch (error){
    console.error("Erro ao buscar usuários:", error.response?.data || error.message);
    throw error;
  }
}

export const removeUsuario = async (id : Number) => {
  try {
    const response = await api.delete(`/api/usuarios/${id}`);
    return response.data; 
  } catch (error){
    console.error("Erro ao deletar usuário:", error.response?.data || error.message);
    throw error;
  }
}

export const editaUsuario = async (dados: { id: number, nome: string; email: string; login:string; senha: string; }) => {
  try {
    console.log("dados enviados para alteração:", dados)
    const response = await api.put(`/api/usuarios/${dados.id}`, dados);
    return response.data; 
  } catch (error){
    console.error("Erro ao editar usuário:", error.response?.data || error.message);
    throw error;
  }
}

export const editarMinhaConta = async (dados: Usuario) => {
  try {
   await api.put("/api/myAccount", dados);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.response?.data || error.message);
    throw error;
  }
}