import React from "react";

const Galeria = ({ ensaio, setImagemAtual, setIndiceImagem, fecharGaleria }) => {
  return (
    <div className="p-10 max-w-8xl mx-auto">

      <button onClick={fecharGaleria} className="text-[#c09b2d] mb-4 underline hover:opacity-80 transition-opacity">Voltar</button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {ensaio.fotos.map((foto, idx) => (

          <div key={idx} className="relative">
            <img
              src={foto}
              alt={`Foto ${idx + 1}`}
              className="w-full h-[400px] object-cover rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
              onClick={() => {
                setImagemAtual(foto);
                setIndiceImagem(idx);
              }}
            />
          </div>

        ))}
      </div>
    </div>
  );
};

export default Galeria;
