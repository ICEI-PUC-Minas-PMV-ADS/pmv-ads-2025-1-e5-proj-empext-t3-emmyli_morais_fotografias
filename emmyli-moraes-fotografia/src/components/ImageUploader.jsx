import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Modal from "./Modal";

const ImageUploader = ({ onSucesso, onErro }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3000";
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/marcaDagua`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImages(response.data);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imagem", file);

    try {
      setLoading(true);
      await axios.post(API_URL + "/api/marcaDagua", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchImages();
      onSucesso("Upload realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      onErro("Erro ao fazer upload.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async (id) => {
    console.log("ID selecionado:", selectedImageId);
    try {
      setLoading(true);
      await axios.delete(API_URL + "/api/marcaDagua/" + selectedImageId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchImages();
      setModalOpen(false);
      onSucesso("Marca d`água excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
      onSucesso("Ocorreu um erro ao excluir a marca d`água!");
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
          <img src="/loading.gif" alt="Carregando..." className="w-32 h-20" />
        </div>
      )}
      <div className="flex gap-4 p-4 flex-wrap">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative w-40 h-40 border-2 rounded-md overflow-hidden"
          >
            <img
              src={`${img.imagem}`}
              alt="uploaded"
              className="object-contain w-full h-full"
            />

            <button
              onClick={() => {
                setModalOpen(true);
                setSelectedImageId(img.id);
              }}
              className="absolute top-1 right-1 text-black rounded-full p-1"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        ))}

        <label className="w-40 h-40 cursor-pointer bg-gray-300 flex items-center justify-center rounded-md hover:bg-gray-400">
          <span className="text-3xl text-gray-600">+</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={"Confirmar exclusão"} content={"Tem certeza que deseja excluir esta marca dàgua?"}>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded bg-[#c09b2d] text-white hover:bg-[#7e6931]"
            >
              Excluir
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ImageUploader;
