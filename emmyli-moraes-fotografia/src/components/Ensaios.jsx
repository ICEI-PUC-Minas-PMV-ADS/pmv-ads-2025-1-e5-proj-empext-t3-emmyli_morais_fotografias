import React, { useState, useEffect } from "react";
import axios from "axios";

const Ensaios = ({ ensaiosFiltrados, abrirGaleria, curtidas, setCurtidas }) => {
  const [curtidosAlbuns, setCurtidosAlbuns] = useState({});

  useEffect(() => {
    const carregarCurtidos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/visualizacoesCurtidas/curtidas/album");
        const marcados = res.data.albuns.reduce((acc, id) => ({ ...acc, [id]: true }), {});
        setCurtidosAlbuns(marcados);
      } catch (err) {
        console.error("Erro ao carregar curtidas de álbuns:", err);
      }
    };
    carregarCurtidos();
  }, []);

  const curtirAlbum = async (albumId) => {
    if (curtidosAlbuns[albumId]) return;

    try {
      await axios.post(`http://localhost:3000/api/visualizacoesCurtidas/like/album/${albumId}`);
      setCurtidosAlbuns(prev => ({ ...prev, [albumId]: true }));
      setCurtidas(prev => ({ ...prev, [albumId]: (prev[albumId] || 0) + 1 }));
    } catch (err) {
      console.error("Erro ao curtir álbum:", err.response?.data || err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-8">
      {ensaiosFiltrados.map(ensaio => (
        <div
          key={ensaio.id}
          className="relative bg-[#E8E6E0] rounded-2xl shadow-xl cursor-pointer hover:scale-105 transform mx-auto w-[90%] max-w-[600px]"
          onClick={() => abrirGaleria(ensaio)}
        >
          <img
            src={ensaio.capa}
            alt={ensaio.titulo}
            onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
            className="w-full h-80 object-cover rounded-t-2xl"
          />

          <div className="p-2 text-center">
            <p className="text-[#252525] font-semibold">{ensaio.titulo}</p>
            <p className="text-[#c09b2d] text-sm">{ensaio.categoria}</p>
          </div>

          <div className="absolute top-2 right-2 flex gap-2 items-center">
            <span className="text-white">👁 {ensaio.visualizacoes}</span>
            <img
              src={
                curtidosAlbuns[ensaio.id]
                  ? "/icons/coracao-vermelho.svg"
                  : "/icons/coracao-branco.svg"
              }
              alt="Curtir"
              className="w-6 h-6 cursor-pointer hover:scale-110 transition"
              onClick={(e) => {
                e.stopPropagation();
                curtirAlbum(ensaio.id);
              }}
            />
            <span className="text-white">{curtidas[ensaio.id] || ensaio.curtidas}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ensaios;
