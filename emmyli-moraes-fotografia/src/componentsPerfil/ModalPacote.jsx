import React, { useState } from 'react';

const ModalPacote = ({ isOpen, onClose, onSave }) => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [fotos, setFotos] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !valor || !fotos) return alert('Preencha todos os campos');



    const novoPacote = {
      nome,
      valor,
      fotos
    };
    onSave(novoPacote);
    setNome('');
    setValor('');
    setFotos('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#f2eee6] rounded-xl shadow-lg p-8 w-full max-w-md relative">

          <div className="flex justify-center items-center border-b border-[#b1783d] pb-2">
            <h1 className="text-3xl text-[#b1783d]">Pacote</h1>
          </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <label className="block text-gray-700 mb-1">Nome do pacote:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: Pacote Básico"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Valor:</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: 199.90"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Número de fotos:</label>
            <input
              type="number"
              value={fotos}
              onChange={(e) => setFotos(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: 30"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#d4a531] hover:bg-[#c9a029] text-white font-bold px-6 py-2 rounded-md"
            >
              Cancelar
            </button>

            <button
              type="button" onClick={handleSubmit}
              className="bg-[#d4a531] hover:bg-[#c9a029] text-white font-bold px-6 py-2 rounded-md"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPacote;
