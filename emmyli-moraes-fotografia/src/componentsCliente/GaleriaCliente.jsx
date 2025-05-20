import { useState } from "react";

const GaleriaCliente = () => {

  const [loading, setLoading] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState([]);
  const [compras, setCompras] = useState([]);
  const [favoritas, setFavoritas] = useState([]);
  
  return (
    <div className="p-6 font-serif min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4 mb-12">
        Galeria
      </h1>

      {/* Abas */}
      <div className="flex border-b mb-6">
        {["fotos_compradas", "fotos_favoritas"].map((aba) => (
          <button
            key={aba}
            className={`ml-4 px-4 py-2 font-semibold transition ${
              abaAtiva === aba
                ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
                : "text-gray-500 hover:text-[#c09b2d]"
            }`}
            onClick={() => setAbaAtiva(aba)}
          >
            {aba === "fotos_compradas"
              ? "Fotos Compradas"
              : "Fotos Favoritas"}
          </button>
        ))}
      </div>

      {/* Fotos compradas */}
      {abaAtiva === "fotos_compradas" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <p>Suas fotos</p>
        </div>
      )}

      {/* Fotos favoritas */}
      {abaAtiva === "fotos_favoritas" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <p>Fotos favoritas</p>
          </div>
        </>
      )}

    </div>

    
  );
};

export default GaleriaCliente;
