import React from "react";

const ModalImagem = ({ imagemAtual, setImagemAtual, setIndiceImagem, fotos }) => {
  if (!imagemAtual) return null; // Se não houver imagem, não renderiza nada

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50">
      <button className="absolute top-5 right-5 text-white text-3xl" onClick={() => setImagemAtual(null)}>
        ✖
      </button>
      <button
        className="absolute left-5 text-white text-3xl hover:opacity-70"
        onClick={() =>
          setIndiceImagem((prev) => (prev > 0 ? prev - 1 : fotos.length - 1))
        }
      >
        ◀
      </button>
      <img src={imagemAtual} alt="Imagem ampliada" className="max-w-[90%] max-h-[90%] object-contain" />
      <button
        className="absolute right-5 text-white text-3xl hover:opacity-70"
        onClick={() =>
          setIndiceImagem((prev) => (prev < fotos.length - 1 ? prev + 1 : 0))
        }
      >
        ▶
      </button>
    </div>
  );
};

export default ModalImagem;