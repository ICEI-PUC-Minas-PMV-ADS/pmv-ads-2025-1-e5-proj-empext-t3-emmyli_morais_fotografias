import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const Galeria = ({ ensaio, setImagemAtual, setIndiceImagem, fecharGaleria }) => {
  const [curtidasLocais, setCurtidasLocais] = useState({});

  useEffect(() => {
    async function carregarCurtidas() {
      try {
        const res = await api.get("/api/visualizacoesCurtidas/curtidas/foto");
        const map = res.data.fotos.reduce(
          (acc, id) => ({ ...acc, [id]: true }),
          {}
        );
        setCurtidasLocais(map);
      } catch (err) {
        console.error("Erro ao carregar curtidas locais:", err);
      }
    }
    carregarCurtidas();
  }, []);

  const curtirFoto = async (fotoId, idx) => {
    if (curtidasLocais[fotoId]) return;
    try {
      await api.post(`/api/visualizacoesCurtidas/like/foto/${fotoId}`);
      setCurtidasLocais(prev => ({ ...prev, [fotoId]: true }));
      ensaio.fotos[idx].curtidas = (ensaio.fotos[idx].curtidas || 0) + 1;
      setIndiceImagem(i => i);
    } catch (err) {
      console.error("Erro ao curtir foto:", err);
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <button onClick={fecharGaleria} className="text-[#c09b2d] underline mb-4">
        Voltar
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {ensaio.fotos.map((f, idx) => (
          <div key={idx} className="relative">
            <img
              src={f.url}
              alt={`Foto ${idx + 1}`}
              onError={e => (e.currentTarget.src = "/fallback.jpg")}
              className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition"
              onClick={() => {
                setImagemAtual({ id: f.id, url: f.url });
                setIndiceImagem(idx);
              }}
            />
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <img
                src={
                  curtidasLocais[f.id]
                    ? "/icons/coracao-vermelho.svg"
                    : "/icons/coracao-branco.svg"
                }
                alt="Curtir"
                onClick={e => {
                  e.stopPropagation();
                  curtirFoto(f.id, idx);
                }}
                className="w-7 h-7 cursor-pointer hover:scale-110 transition"
              />
              <span className="text-white font-semibold">{f.curtidas ?? 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;
