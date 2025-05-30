import React, { useState } from "react";
import { api } from "../services/api";

const ModalPacote = ({ isOpen, onClose, onSave }) => {
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidadeFotos, setQuantidadeFotos] = useState("");
  const [observacao, setObservacao] = useState("");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!descricao || !preco || !quantidadeFotos) {
      alert("Preencha todos os campos");
      return;
    }

    const novoPacote = {
      descricao,
      preco,
      quantidade_fotos: quantidadeFotos,
      observacao,
    };

    try {
      const response = await api.post("/api/produtos", novoPacote);

      onSave(response.data);

      setDescricao("");
      setPreco("");
      setQuantidadeFotos("");
      setObservacao("");
    } catch (err) {
      console.error("Erro ao salvar pacote:", err);
      alert("Erro ao salvar o pacote.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#f2eee6] rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <div className="flex justify-center items-center border-b border-[#b1783d] pb-2">
          <h1 className="text-3xl text-[#b1783d]">Produto</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <label className="block text-gray-700 mb-1">
              Descrição do produto:
            </label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: Pacote Básico"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Preço:</label>
            <input
              type="text"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: 199.90"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Quantidade de fotos:
            </label>
            <input
              type="number"
              value={quantidadeFotos}
              onChange={(e) => setQuantidadeFotos(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: 30"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Observação:</label>
            <input
              type="text"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: Promoção dia das mães!"
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
              type="button"
              onClick={handleSubmit}
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
