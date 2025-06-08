// src/componentsPerfil/AcessoRapido.jsx

import React, { useState, useEffect } from "react";
import { FaImages, FaHeart } from "react-icons/fa";
import { api } from "../services/api";
import CaixaDeNotificacoes from "./CaixaDeNotificacoes";
import CaixaDeNotificacoesVendas from "./CaixaDeNotificacoesVendas";
import { buscarNotificacao } from "../services/notificacaoService";

const AcessoRapido = ({ setPage }) => {
  const [colecoes, setColecoes] = useState([]);
  const [notificacao, setNotificacao] = useState([]);

  useEffect(() => {
    buscarNotificacao().then(setNotificacao);
    fetchRecentes();
  }, []);

  const fetchRecentes = async () => {
    try {
      // 1) carregar todos os eventos com detalhes
      const { data } = await api.get("/api/eventos", {
        params: { include: "detalhes" },
      });

      // 2) filtrar apenas os que têm pelo menos uma foto
      const todas = data.filter((e) => e.detalhes?.length > 0);

      // 3) ordenar por data de inclusão (desc) e pegar os 3 primeiros
      todas.sort((a, b) => new Date(b.dtinclusao) - new Date(a.dtinclusao));
      const top3 = todas.slice(0, 3);

      // 4) mapear para a shape do card
      const mapeadas = top3.map((a) => {
        const status = a.exibirtrabalho
          ? "Exibição"
          : a.publico
          ? "Público"
          : "Privado";

        return {
          id:        a.id,
          nome:      a.nome,
          data:      new Date(a.dtinclusao).toLocaleDateString("pt-BR"),
          status,
          imagens:   a.detalhes.length,
          favoritos: a.curtidasAlbum ?? 0,
          imagem:    a.detalhes[0]?.foto || "",
        };
      });

      setColecoes(mapeadas);
    } catch (err) {
      console.error("Erro ao buscar galerias recentes:", err);
    }
  };

  const handleClick = (colecao) => {
    if (colecao.status === "Exibição") {
      // abre a aba "Trabalhos" dentro de Configurações
      setPage("configuracao", colecao.id);
    } else {
      // abre a página de Eventos (privado ou público)
      setPage("eventos", colecao.id);
    }
  };

  return (
    <div className="p-6 font-serif bg-[#F9F9F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4">
        Acesso Rápido
      </h1>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 mt-4">
        {/* GALERIAS RECENTES */}
        <div className="bg-white rounded-lg p-5 shadow-md">
          <h2 className="text-lg font-semibold mb-4">📸 Galerias Recentes</h2>
          <div className="flex flex-col gap-4">
            {colecoes.length > 0 ? (
              colecoes.map((colecao) => (
                <div
                  key={colecao.id}
                  className="flex items-center bg-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md cursor-pointer transition"
                  onClick={() => handleClick(colecao)}
                >
                  <img
                    src={colecao.imagem}
                    alt={colecao.nome}
                    className="w-20 h-20 min-w-[5rem] object-cover rounded-md mr-4 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-sm">{colecao.nome}</h3>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          colecao.status === "Público"
                            ? "bg-green-500 text-white"
                            : colecao.status === "Exibição"
                            ? "bg-blue-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {colecao.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{colecao.data}</p>
                    <div className="flex gap-3 text-xs text-gray-600">
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
              ))
            ) : (
              <p className="text-gray-500 text-sm">Nenhuma galeria disponível.</p>
            )}
          </div>
        </div>

        <CaixaDeNotificacoes notificacoes={notificacao} />
        <CaixaDeNotificacoesVendas notificacoes={notificacao} />
      </div>
    </div>
  );
};

export default AcessoRapido;
