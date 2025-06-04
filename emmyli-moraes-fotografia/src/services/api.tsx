import axios from "axios";
import { cleanUserInfos, refreshToken } from "./authService";

const url = 'http://localhost:3000'
//const url = 'https://emmylifotografias.com.br/api'
const api = axios.create({ baseURL: url })

api.interceptors.request.use(async (config) => {
    if (Date.parse(localStorage.getItem('dataExpiracaoToken')!) <= Date.now()) {
        if (Date.parse(localStorage.getItem('dataExpiracaoRefreshToken')!) <= Date.now()) {
            cleanUserInfos();
            window.location.href = "/"
            return Promise.reject(new Error("Sessão expirada. Faça login novamente."));
        }

        const response = await refreshToken(localStorage.getItem('informacaoRefreshToken')!);

        if (response === undefined) {
            cleanUserInfos();
            window.location.href = "/"
            return Promise.reject(new Error("Sessão expirada. Faça login novamente."));
        }

        const dataExpiracaoToken = new Date(Date.now() + response.token.expiresIn * 1000);// TODO: Fazer o backend já retornar essa informação
        const dataExpiracaoRefreshToken = new Date(Date.now() + response.refreshToken.expiresIn * 1000);// TODO: Fazer o backend já retornar essa informação

        localStorage.setItem('informacaoToken', response.token.informacao);
        localStorage.setItem('dataExpiracaoToken', dataExpiracaoToken.toString());
        localStorage.setItem('informacaoRefreshToken', response.refreshToken.informacao);
        localStorage.setItem('dataExpiracaoRefreshToken', dataExpiracaoRefreshToken.toString());

        const bearerToken = `Bearer ${response.token.informacao}`;
        api.defaults.headers.Authorization = bearerToken;
        config.headers.Authorization = bearerToken;
    }

    return config
})

const anonApi = axios.create({ baseURL: url });

export { api, anonApi };
