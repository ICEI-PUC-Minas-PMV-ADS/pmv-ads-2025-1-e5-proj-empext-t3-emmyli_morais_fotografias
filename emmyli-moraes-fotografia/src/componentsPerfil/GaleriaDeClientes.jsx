import { useState } from "react";
import aniversario from "../imagemteste/aniversario.jpg";
import casamento from "../imagemteste/casamento.jpg";
import chadebebe from "../imagemteste/casamento.jpg";
import corporativo from "../imagemteste/corporativo.jpg";
import festa from "../imagemteste/festa.jpg";
import infantil from "../imagemteste/infantil.jpg";
import FormAdicionarEnsaio from "../componentsPerfil/FormAdicionarEnsaio"; // Agora importamos o Form

const GaleriaDeClientes = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const galerias = [
    { id: 1, cliente: "Maria Souza", nome: "Aniversário", fotos: 68, data: "10 jan, 2025", imagem: aniversario },
    { id: 2, cliente: "Lucas e Ana", nome: "Casamento", fotos: 150, data: "18 fev, 2025", imagem: casamento },
    { id: 3, cliente: "João Silva", nome: "Chá de Bebê", fotos: 45, data: "25 mar, 2025", imagem: chadebebe },
    { id: 4, cliente: "Empresa X", nome: "Corporativo", fotos: 102, data: "02 abr, 2025", imagem: corporativo },
    { id: 5, cliente: "Carla Mendes", nome: "Festa", fotos: 88, data: "15 abr, 2025", imagem: festa },
    { id: 6, cliente: "Pedro Santos", nome: "Infantil", fotos: 74, data: "22 abr, 2025", imagem: infantil },
  ];

  return (
    <div className="relative p-4 sm:p-6 font-serif bg-[#F9F9F9] min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-2">
          Galeria de Clientes
        </h1>
        <button
          onClick={() => setMostrarModal(true)}
          className="mt-4 bg-[#c09b2d] hover:bg-[#a48322] text-white px-4 py-2 rounded-xl shadow-md transition duration-300"
        >
          Criar nova galeria
        </button>
      </div>

      {/* Galerias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {galerias.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform hover:scale-105 w-full max-w-sm mx-auto cursor-pointer"
          >
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center text-[#252525] text-lg font-semibold mt-3">
              {item.cliente}
            </div>
            <p className="text-center text-[#252525] text-sm">
              {item.nome}
            </p>
            <p className="text-center text-[#c09b2d] text-sm mb-4">
              {item.fotos} fotos | {item.data}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => setMostrarModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Criar Nova Galeria</h2>
            {/* Chamando o FormAdicionarEnsaio dentro do Modal */}
            <FormAdicionarEnsaio onClose={() => setMostrarModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaDeClientes;
