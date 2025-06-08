// src/componentsPerfil/ShareUrlModal.jsx

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import Modal from "../components/Modal";

const ShareUrlModal = ({ isOpen, onClose, url }) => {
  if (!isOpen) return null;

  // 1) monta a mensagem personalizada
  const mensagemPersonalizada = 
    "Ao clicar aqui, você irá descobrir imagens que irão surpreender seus olhos e tocar sua alma. " +
    "Prepare-se para uma experiência visual única! " +
    url;

  // 2) dispara o WhatsApp e dá um feedback
  const enviarWhatsApp = () => {
    const texto = encodeURIComponent(mensagemPersonalizada);
    window.open(`https://api.whatsapp.com/send?text=${texto}`, "_blank");
    
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Compartilhar Álbum">
      <label className="block font-medium mb-1">URL do álbum:</label>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          readOnly
          className="flex-1 border rounded px-3 py-2 bg-gray-100 text-sm"
          value={url}
        />
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(url);
            alert("URL copiada para a área de transferência!");
          }}
          className="bg-[#c09b2d] hover:bg-[#a88724] text-white text-xs font-semibold px-4 py-2 rounded"
        >
          Copiar
        </button>
      </div>
      <button
        type="button"
        onClick={enviarWhatsApp}
        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded"
      >
        <FaWhatsapp size={16} />
        Compartilhar pelo WhatsApp
      </button>
    </Modal>
  );
};

export default ShareUrlModal;
