import { AxiosError } from 'axios';
import { api, anonApi } from './api';

// Função para realizar o login

export interface LoginResponse {
  token: Token,
  refreshToken: Token,
  usuario: {
    id: number,
    nome: string,
    login: string,
    email: string,
    perfil: string,
  }
}
interface Token {
  informacao: string;
  expiresIn: number
}

interface Error { message: string }

export const loginUser = async (usernameOrEmail: string, password: string) => {
  try {
    const { data } = await anonApi.post<LoginResponse>("/api/auth/login", { usernameOrEmail, password });

    return data;
  } catch (error) {
    const axiosError = error as AxiosError<Error>;
    throw new Error(axiosError.response?.data.message || error.message || 'Ocorreu um erro, tente novamente');
  }
};

interface RefreshTokenResponse {
  token: Token,
  refreshToken: Token
}

export const refreshToken = async (refreshToken: string) => {
  try {
    const { data } = await anonApi.post<RefreshTokenResponse>('api/auth/token', {
      refreshToken
    });

    return data
  } catch (error) {
    const axiosError = error as AxiosError<Error>;
    console.error(axiosError.response?.data.message)
  }
}

export const logoutUser = async () => {
  await api.post("/api/auth/logout")
}

export const forgotPassword = async (email: string) => {
     await anonApi.post('api/auth/forgot_password', {
      email
     })
}

export const ContatoEmail = async (formData) => {
  return await anonApi.post("api/auth/contatoEmail", formData);
};

// Metodo para logout
export const cleanUserInfos = () => {
  api.defaults.headers.Authorization = "";
  localStorage.clear();
}
