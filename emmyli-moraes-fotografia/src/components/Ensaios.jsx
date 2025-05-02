import React from "react";

const Ensaios = ({ ensaiosFiltrados, setGaleriaAberta, curtidas, setCurtidas }) => {
  const curtirFoto = (id) => {
    setCurtidas((prevCurtidas) => ({
      ...prevCurtidas,
      [id]: (prevCurtidas[id] || 0) + 1,
    }));
  };

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 px-5 py-8 w-full">
      {ensaiosFiltrados.map((ensaio) => (

        <div key={ensaio.id} className="relative bg-[#E8E6E0] overflow-hidden  rounded-2xl shadow-xl cursor-pointer transform transition-transform hover:scale-105 mx-auto w-[90%] max-w-[600px]" onClick={() => setGaleriaAberta(ensaio)}>

          <img src={ensaio.capa} alt={ensaio.titulo} className="w-full h-80 object-cover rounded-t-2xl" />

          <div className="text-center text-[#252525] text-lg font-semibold mt-2">{ensaio.cliente}</div>

          <div className="text-center text-[#c09b2d] text-1sm mb-2">{ensaio.categoria}</div>

          <div className="absolute top-2 right-2 flex gap-2">

            <span>👁 {ensaio.visualizacoes}</span>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                curtirFoto(ensaio.id);
              }}
              className="text-white"
            >
              ❤️ {curtidas[ensaio.id] || ensaio.curtidas}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ensaios;
