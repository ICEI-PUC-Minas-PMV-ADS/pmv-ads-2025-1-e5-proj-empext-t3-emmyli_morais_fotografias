import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";

const Configuracoes = () => {
  const [abaAtiva, setAbaAtiva] = useState("marca_dagua");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4 mb-12">
        Configuração
      </h1>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-semibold transition ${
            abaAtiva === "marca_dagua"
              ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
              : "text-gray-500 hover:text-[#c09b2d]"
          }`}
          onClick={() => setAbaAtiva("marca_dagua")}
        >
          Marca d`água
        </button>
        <button
          className={`ml-4 px-4 py-2 font-semibold transition ${
            abaAtiva === "criar_galeria"
              ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
              : "text-gray-500 hover:text-[#c09b2d]"
          }`}
          onClick={() => setAbaAtiva("criar_galeria")}
        >
          Criar galeria
        </button>
        <button
          className={`ml-4 px-4 py-2 font-semibold transition ${
            abaAtiva === "criar_pacote"
              ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
              : "text-gray-500 hover:text-[#c09b2d]"
          }`}
          onClick={() => setAbaAtiva("criar_pacote")}
        >
          Criar pacote
        </button>
      </div>

      <div className="min-h-screen bg-gray-100">
        <ImageUploader />
      </div>
    </div>
  );
};

export default Configuracoes;
