import { api } from "./api";

const buscarProdutos = () =>
  api.get("/api/produtos?include=evento");

const buscarEventos = () =>
  api.get(`/api/eventos`);

const criarProduto = (produto) =>
  api.post(`/api/produtos`, produto);

const atualizarProduto = (id, dados) =>
  api.put(`/api/produtos/${id}`, dados);

const removerProduto = (id) =>
  api.delete(`/api/produtos/${id}`);

export default {
  buscarProdutos,
  buscarEventos,
  criarProduto,
  atualizarProduto,
  removerProduto,
};


