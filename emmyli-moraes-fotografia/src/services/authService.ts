import { AxiosError } from 'axios';
import { api } from './api';

// Função para realizar o login

export interface LoginResponse {
  token: string,
  usuario: {
    id: number,
    nome: string,
    login: string,
    email: string,
    perfil: string,
  }
}

export const loginUser = async (usernameOrEmail: string, password: string) => {
  try {
    const { data } = await api.post<LoginResponse>("/api/auth/login", { usernameOrEmail, password });

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{message: string}>;
    throw new Error(axiosError.response?.data.message || error.message || 'Ocorreu um erro, tente novamente');
  }
};

export const logoutUser = async () => {
  await api.post("/api/auth/logout")
}