import React, { useState, useEffect } from "react";
import axios from "axios";

const ModalImagem = ({
  imagemAtual,
  setImagemAtual,
  setIndiceImagem,
  indiceImagem,
  fotos
}) => {
  const [curtidasLocais, setCurtidasLocais] = useState({});

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/visualizacoesCurtidas/curtidas/foto");
        const map = res.data.fotos.reduce((acc, id) => ({ ...acc, [id]: true }), {});
        setCurtidasLocais(map);
      } catch (err) {
        console.error("Erro ao carregar curtidas no modal:", err);
      }
    };
    carregar();
  }, []);

  
  useEffect(() => {
  if (fotos[indiceImagem]) {
    setImagemAtual({
      id: fotos[indiceImagem].id,
      url: fotos[indiceImagem].url
    });
  }
}, [indiceImagem, fotos, setImagemAtual]);

  if (!imagemAtual) return null;

  const curtirFoto = async () => {
    const id = imagemAtual.id;
    if (curtidasLocais[id]) return;

    try {
      await axios.post(`http://localhost:3000/api/visualizacoesCurtidas/like/foto/${id}`);
      setCurtidasLocais(prev => ({ ...prev, [id]: true }));
    } catch (err) {
      console.error("Erro ao curtir foto no modal:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="relative">
        {/* Imagem principal */}
        <img
          src={imagemAtual.url}
          alt="Imagem ampliada"
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          onError={(e) => (e.currentTarget.src = '/fallback.jpg')}
        />

        {/* Botão Fechar ✖ */}
        <button
          onClick={() => setImagemAtual(null)}
          className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-30 px-3 py-1 rounded-full hover:bg-opacity-70 transition"
        >
          ✖
        </button>

        {/* Botão Voltar ◀ */}
        <button
          onClick={() =>
            setIndiceImagem(prev => (prev > 0 ? prev - 1 : fotos.length - 1))
          }
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xl bg-black bg-opacity-30 px-3 py-1 rounded-full hover:bg-opacity-70 transition"
        >
          ◀
        </button>

        {/* Botão Avançar ▶ */}
        <button
          onClick={() =>
            setIndiceImagem(prev => (prev < fotos.length - 1 ? prev + 1 : 0))
          }
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xl bg-black bg-opacity-30 px-3 py-1 rounded-full hover:bg-opacity-70 transition"
        >
          ▶
        </button>

        {/* Botão Curtir ❤️ */}
        <img
          src={
            curtidasLocais[imagemAtual.id]
              ? "/icons/coracao-vermelho.svg"
              : "/icons/coracao-branco.svg"
          }
          alt="Curtir"
          onClick={curtirFoto}
          className="absolute bottom-4 right-4 w-8 h-8 cursor-pointer hover:scale-110 transition"
        />
      </div>
    </div>
  );
};

export default ModalImagem;
