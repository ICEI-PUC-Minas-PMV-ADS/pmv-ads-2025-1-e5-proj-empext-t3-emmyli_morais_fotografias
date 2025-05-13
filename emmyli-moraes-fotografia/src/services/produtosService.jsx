import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const buscarProdutos = () =>
  axios.get(`${API_URL}/produtos?include=evento`, getAuthHeader());

const buscarEventos = () =>
  axios.get(`${API_URL}/eventos`, getAuthHeader());

const criarProduto = (produto) =>
  axios.post(`${API_URL}/produtos`, produto, getAuthHeader());

const atualizarProduto = (id, dados) =>
  axios.put(`${API_URL}/produtos/${id}`, dados, getAuthHeader());

const removerProduto = (id) =>
  axios.delete(`${API_URL}/produtos/${id}`, getAuthHeader());

export default {
  buscarProdutos,
  buscarEventos,
  criarProduto,
  atualizarProduto,
  removerProduto,
};


