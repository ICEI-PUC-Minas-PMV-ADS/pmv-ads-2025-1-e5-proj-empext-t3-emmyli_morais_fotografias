import { api } from "./api";

export const buscarNotificacao = async () => {
    const {data} = await api.get(`/api/notificacao`);
    return data;
}

