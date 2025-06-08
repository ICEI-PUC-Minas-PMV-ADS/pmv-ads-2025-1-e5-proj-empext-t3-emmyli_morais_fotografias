import React, { useState, useEffect } from "react";
import { api } from "../services/api";
// novo: import do ícone de olho
import { FaEye } from "react-icons/fa";

const Ensaios = ({ ensaiosFiltrados, abrirGaleria, curtidas, setCurtidas }) => {
  const [curtidosEventos, setCurtidosEventos] = useState({});

  useEffect(() => {
    async function carregarCurtidas() {
      try {
        const res = await api.get("/api/visualizacoesCurtidas/curtidas/evento");
        const map = res.data.eventos.reduce(
          (acc, id) => ({ ...acc, [id]: true }),
          {}
        );
        setCurtidosEventos(map);
      } catch (error) {
        console.error("Erro ao carregar curtidas de eventos:", error);
      }
    }
    carregarCurtidas();
  }, []);


  const curtirEvento = async (eventoId, e) => {
    e.stopPropagation();
    if (curtidosEventos[eventoId]) return;
    try {
      await api.post(`/api/visualizacoesCurtidas/like/evento/${eventoId}`);
      setCurtidosEventos(prev => ({ ...prev, [eventoId]: true }));
      setCurtidas(prev => ({
        ...prev,
        [eventoId]: (prev[eventoId] || 0) + 1
      }));
    } catch (err) {
      console.error("Erro ao curtir evento:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-8">
      {ensaiosFiltrados.map(ensaio => (
        <div
          key={ensaio.id}
          className="relative bg-[#E8E6E0] rounded-2xl shadow-xl cursor-pointer hover:scale-105 transform mx-auto w-[90%] max-w-[600px]"
          onClick={() => {
            abrirGaleria(ensaio);
          }}
        >
          <img
            src={ensaio.capa}
            alt={ensaio.titulo}
            onError={e => (e.currentTarget.src = "/fallback.jpg")}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-t-2xl"
          />

          <div className="p-2 text-center">
            <p className="text-[#252525] font-semibold">{ensaio.titulo}</p>
            <p className="text-[#c09b2d] text-sm">{ensaio.categoria}</p>
          </div>

          <div className="absolute top-2 right-2 flex gap-2 items-center">
            {/* ícone de olho corrigido */}
            <span className="flex items-center gap-1 text-white text-lg">
              <FaEye className="w-5 h-5" />
              {ensaio.visualizacoes}
            </span>
            <img
              src={
                curtidosEventos[ensaio.id]
                  ? "/icons/coracao-vermelho.svg"
                  : "/icons/coracao-branco.svg"
              }
              alt="Curtir"
              className="w-6 h-6 cursor-pointer hover:scale-110 transition"
              onClick={e => curtirEvento(ensaio.id, e)}
            />
            <span className="text-white text-lg">
              {curtidas[ensaio.id] || ensaio.curtidas}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ensaios;
