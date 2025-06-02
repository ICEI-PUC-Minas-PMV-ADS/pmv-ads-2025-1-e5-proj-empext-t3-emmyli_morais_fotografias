import React, { useState, useEffect } from "react";
import { FaImages, FaHeart, FaShoppingCart } from "react-icons/fa";
import { api } from "../services/api";
import CaixaDeNotificacoes from "./CaixaDeNotificacoes";
import  {buscarNotificacao}  from "../services/notificacaoService"

const AcessoRapido = ({ setPage }) => {
  const [colecoes, setColecoes] = useState([]);
  const [notificacao, setNotificacao] = useState([]);

  useEffect(() => {

      buscarNotificacao()
        .then((buscaDeNotificacoes) => setNotificacao(buscaDeNotificacoes));
    
    fetchRecentes();
  }, []);
  const fetchRecentes = async () => {
    try {
      const { data } = await api.get("/api/eventos/?include=detalhes");
      const todas = data.filter(
        (a) => (a.exibirtrabalho === true || a.publico === true) && a.detalhes.length > 0
      );
      // ordena por data (desc) e pega top 3
      todas.sort((a, b) => new Date(b.dtinclusao) - new Date(a.dtinclusao));
      const top3 = todas.slice(0, 3);

      // mapeia para a shape do card
      const mapeadas = top3.map((a) => ({
        id: a.id,
        nome: a.nome,
        data: new Date(a.dtinclusao).toLocaleDateString("pt-BR"),
        status: a.publico === true ? "Público" : "Privado",
        imagens: a.detalhes?.length || 0,
        favoritos: a.curtidasAlbuns || 0, // suposição: já veio via include no getAll
        imagem: a.detalhes?.[0]?.foto || "",
      }));

      setColecoes(mapeadas);
    } catch (err) {
      console.error("Erro ao buscar galerias recentes:", err);
    }
  };

  return (
    <div className="p-6 font-serif bg-[#F9F9F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4">
        Acesso Rápido
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 ">
        {/* GALERIAS RECENTES */}
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h2 className="text-lg font-semibold mb-4">📸 Galerias Recentes</h2>
          <div className="flex flex-col gap-4">
            {colecoes.map((colecao) => (
              <div
                key={colecao.id}
                className="flex items-center bg-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer"

                onClick={() => {
                  if (colecao.status === "Público") {
                    // abre na aba “Configuração” (públicos)
                    setPage("configuracao", colecao.id);
                  } else {
                    // abre na galeria de cliente (privados)
                    setPage("galeria", colecao.id);
                  }
                }}
              >
                <img
                  src={colecao.imagem}
                  alt={colecao.nome}
                  className="w-20 h-20 min-w-[5rem] object-cover rounded-md mr-4 flex-shrink-0"
                />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm">{colecao.nome}</h3>

                    <span className={`text-xs font-bold px-2 py-1 rounded ${colecao.status === "Público" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                      {colecao.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{colecao.data}</p>
                  <div className="flex gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaImages className="text-gray-500" />
                      <span>{colecao.imagens} fotos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaHeart className="text-gray-500" />
                      <span>{colecao.favoritos} curtidas</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CaixaDeNotificacoes notificacoes={notificacao} />

        {/* CONTROLE DE VENDAS */}
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h1 className="text-lg font-semibold mb-4">🛒 Controle de Vendas</h1>
          <div className="flex flex-col gap-3">
            <div className="bg-gray-200 p-3 rounded flex items-center gap-3 text-sm">
              <FaShoppingCart className="text-gray-600" />
              <p>3 Novas Compras</p>
            </div>
            <div className="bg-gray-200 p-3 rounded flex items-center gap-3 text-sm">
              <FaHeart className="text-gray-600" />
              <p>10 Fotos Favoritadas</p>
            </div>
            <div className="bg-gray-200 p-3 rounded flex items-center gap-3 text-sm">
              <FaImages className="text-gray-600" />
              <p>5 Coleções Atualizadas</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcessoRapido;
