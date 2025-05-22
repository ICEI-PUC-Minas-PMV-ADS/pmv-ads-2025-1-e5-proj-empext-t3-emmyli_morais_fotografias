import React, { useContext, createContext, PropsWithChildren, useState, useCallback } from "react";
import { cleanUserInfos, LoginResponse, loginUser, logoutUser } from "../services/authService";
import { api } from "../services/api";

const AuthContext = createContext<AuthStorage>(
    {
        logar: async () => "",
        user: {} as UserStorage,
        logout: async () => { }
    }
);

interface AuthStorage {
    user: UserStorage;
    logar: (userEmailOrLogin: string, password: string) => Promise<string | LoginResponse>;
    logout: () => Promise<void>
}

interface UserStorage {
    token?: Token;
    refreshToken?: Token;
    nome?: string;
    login?: string;
    email?: string;
    perfil?: string;
}
interface Token {
    informacao: string;
    dataExpiracao: Date
}

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [userStorage, setUserStorage] = useState<UserStorage>(() => {
        const token = localStorage.getItem('informacaoToken')

        if (!token)
            return {}

        api.defaults.headers.Authorization = `Bearer ${token}`

        return {
            email: localStorage.getItem('email')!,
            login: localStorage.getItem('login')!,
            nome: localStorage.getItem('nome')!,
            perfil: localStorage.getItem('perfil')!,
            token: {
                informacao: localStorage.getItem('informacaoToken')!,
                dataExpiracao: new Date(localStorage.getItem('dataExpiracaoToken')!)
            },
            refreshToken: {
                informacao: localStorage.getItem('informacaoRefreshToken')!,
                dataExpiracao: new Date(localStorage.getItem('dataExpiracaoRefreshToken')!)
            },
        }
    });

    const logar =
        async (userEmailOrLogin: string, password: string) => {
            try {
                const data = await loginUser(userEmailOrLogin, password);

                const dataExpiracaoToken = new Date(Date.now() + data.token.expiresIn * 1000);// TODO: Fazer o backend já retornar essa informação
                const dataExpiracaoRefreshToken = new Date(Date.now() + data.refreshToken.expiresIn * 1000);// TODO: Fazer o backend já retornar essa informação

                localStorage.setItem('informacaoToken', data.token.informacao);
                localStorage.setItem('dataExpiracaoToken', dataExpiracaoToken.toString());
                localStorage.setItem('informacaoRefreshToken', data.refreshToken.informacao);
                localStorage.setItem('dataExpiracaoRefreshToken', dataExpiracaoRefreshToken.toString());
                localStorage.setItem('nome', data.usuario.nome);
                localStorage.setItem('login', data.usuario.login);
                localStorage.setItem('email', data.usuario.email);
                localStorage.setItem('perfil', data.usuario.perfil);
                setUserStorage({
                    email: data.usuario.email,
                    login: data.usuario.login,
                    nome: data.usuario.nome,
                    perfil: data.usuario.perfil,
                    token: {
                        informacao: data.token.informacao,
                        dataExpiracao: dataExpiracaoToken
                    },
                    refreshToken: {
                        informacao: data.refreshToken.informacao,
                        dataExpiracao: dataExpiracaoRefreshToken
                    }
                });

                api.defaults.headers.Authorization = `Bearer ${data.token.informacao}`

                return data;
            } catch (error) {
                return error.message as string;
            }
        };

    const logout =
        async () => {
            await logoutUser();
            cleanUserInfos()

            setUserStorage({});
        }

    return <AuthContext.Provider value={{ user: userStorage, logar: logar, logout: logout }}> {children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};  