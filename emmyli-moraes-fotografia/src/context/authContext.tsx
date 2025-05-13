import React, { useContext, createContext, PropsWithChildren, useState, useCallback } from "react";
import { LoginResponse, loginUser, logoutUser } from "../services/authService";
import { api } from "../services/api";

const AuthContext = createContext<AuthStorage>({ logar: async () => "", user: {} as UserStorage, logout: async () => { } });

interface AuthStorage {
    user: UserStorage;
    logar: (userEmailOrLogin: string, password: string) => Promise<string | LoginResponse>;
    logout: () => Promise<void>
}

interface UserStorage {
    token?: string;
    nome?: string;
    login?: string;
    email?: string;
    perfil?: string
}

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [armazemUsuario, setArmazemUsuario] = useState<UserStorage>(() => {
        const token = localStorage.getItem('token')

        if (!token)
            return {}

        setIsAuth(true);
        return {
            email: localStorage.getItem('email')!,
            login: localStorage.getItem('login')!,
            nome: localStorage.getItem('nome')!,
            perfil: localStorage.getItem('perfil')!,
            token: localStorage.getItem('token')!
        }
    });

    const logar =
        async (userEmailOrLogin: string, password: string) => {
            try {
                const data = await loginUser(userEmailOrLogin, password);
                localStorage.setItem('token', data.token);
                localStorage.setItem('nome', data.usuario.nome);
                localStorage.setItem('login', data.usuario.login);
                localStorage.setItem('email', data.usuario.email);
                localStorage.setItem('perfil', data.usuario.perfil);
                setArmazemUsuario({
                    email: data.usuario.email,
                    login: data.usuario.login,
                    nome: data.usuario.nome,
                    perfil: data.usuario.perfil,
                    token: data.token
                });

                setIsAuth(true)
                api.defaults.headers.Authorization = `Bearer ${data.token}`

                return data;
            } catch (error) {
                return error.message as string;
            }
        };

    const logout =
        async () => {
            await logoutUser();
            api.defaults.headers.Authorization = "";
            localStorage.removeItem('token');
            localStorage.removeItem('nome');
            localStorage.removeItem('login');
            localStorage.removeItem('email');
            localStorage.removeItem('perfil');

            setArmazemUsuario({});
            setIsAuth(false)
        }

    return <AuthContext.Provider value={{ user: armazemUsuario, logar: logar, logout: logout }}> {children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};  