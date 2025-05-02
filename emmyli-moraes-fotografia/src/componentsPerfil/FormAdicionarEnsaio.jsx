import { useState } from "react";
import axios from "axios";
import ModalPacote from "../componentsPerfil/ModalPacote";
const FormAdicionarEnsaio = ({ onClose, onSave }) => {
  const [abaAtiva, setAbaAtiva] = useState("informacoes");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagens, setImagens] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [pacotesSelecionados, setPacotesSelecionados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImagens(Array.from(e.target.files));
  };

  const removerImagem = (index) => {
    const novasImagens = [...imagens];
    novasImagens.splice(index, 1);
    setImagens(novasImagens);
  };

  const abrirModalPacote = () => {
    setMostrarModal(true);
  };

  const fecharModalPacote = () => {
    setMostrarModal(false);
  };

  const adicionarNovoPacote = (novoPacote) => {
    setPacotes((prev) => [...prev, novoPacote]);
    setMostrarModal(false);
  };

  const handlePacoteChange = (pacote) => {
    if (pacotesSelecionados.includes(pacote)) {
      setPacotesSelecionados((prev) => prev.filter((p) => p !== pacote));
    } else {
      setPacotesSelecionados((prev) => [...prev, pacote]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAvancar = async () => {
    if (!titulo || !categoria || imagens.length === 0) {
      alert("Preencha todas as informações e adicione imagens antes de criar o ensaio!");
      return;
    }
  
    try {
      setLoading(true);
  
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Usuário não autenticado!");
        return;
      }
  
      const formData = new FormData();
      formData.append('usuario_id', 1); // fixo no momento
      formData.append('nome', titulo);
      formData.append('descricao', categoria);
  
      imagens.forEach((img) => {
        formData.append('fotos', img);
      });
  
      await axios.post('http://localhost:3000/api/albuns', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      alert("Ensaio criado com sucesso!");
  
      // Resetar tudo
      setTitulo("");
      setCategoria("");
      setImagens([]);
      setPacotes([]);
      setPacotesSelecionados([]);
      setAbaAtiva("informacoes");
  
      if (onClose) onClose();
      if (onSave) onSave();
  
    } catch (error) {
      console.error("Erro ao criar ensaio:", error.response?.data || error.message);
      alert("Erro ao criar ensaio!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#f2eee6] w-full max-w-4xl rounded-2xl p-6 shadow-lg relative font-serif">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          ×
        </button>

        
        <div className="flex justify-center items-center border-b border-[#b1783d] pb-2">
          <h1 className="text-3xl text-[#b1783d]">Galeria</h1>
        </div>

        {/* Abas */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-semibold transition ${
              abaAtiva === 'informacoes'
                ? 'border-b-4 border-[#c09b2d] text-[#c09b2d]'
                : 'text-gray-500 hover:text-[#c09b2d]'
            }`}
            onClick={() => setAbaAtiva('informacoes')}
          >
            Informações
          </button>
          <button
            className={`ml-4 px-4 py-2 font-semibold transition ${
              abaAtiva === 'configuracoes'
                ? 'border-b-4 border-[#c09b2d] text-[#c09b2d]'
                : 'text-gray-500 hover:text-[#c09b2d]'
            }`}
            onClick={() => setAbaAtiva('configuracoes')}
          >
            Configurações
          </button>
        </div>

        {/* Conteúdo das abas */}
        {abaAtiva === 'informacoes' && (
          <form onSubmit={handleSubmit} className="space-y-6 overflow-auto max-h-[450px]">
            <div className="flex space-x-4 flex-wrap">
              {/* Lado esquerdo */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block font-medium mb-1">Título do Ensaio</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-[20rem] sm:w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">Categoria</label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-[20rem] sm:w-full p-2 border rounded"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="aniversario">Aniversário</option>
                    <option value="casamento">Casamento</option>
                    <option value="infantil">Infantil</option>
                    <option value="festa">Festa</option>
                    <option value="corporativo">Corporativo</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">Imagens do Ensaio</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="mb-2"
                  />
                  {imagens.length > 0 && (
                    <div className="mt-2 bg-white p-4 border border-gray-300 rounded w-[20rem] sm:w-full">
                      <h3 className="text-lg font-medium mb-2">Fotos Selecionadas:</h3>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 max-h-80 overflow-auto">
                        {imagens.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`preview-${idx}`}
                              className="h-32 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removerImagem(idx)}
                              className="absolute top-1 text-white bg-[#c09b2d] p-1 rounded-full hover:bg-[#a88724]"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Lado direito */}
              <div className="w-full sm:w-[22rem]">
                <label className="block font-medium mb-3 mt-4">Selecionar Tipo de Pacote:</label>

                {pacotes.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-2">
                    {pacotes.map((pacote, index) => (
                      <div
                        key={index}
                        className={`flex w-[20rem] items-center justify-between p-3 border rounded-lg transition hover:border-custom-yellow ${
                          pacotesSelecionados.includes(pacote)
                            ? 'bg-yellow-50 border-custom-yellow'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            checked={pacotesSelecionados.includes(pacote)}
                            onChange={() => handlePacoteChange(pacote)}
                            className="mr-3 mt-5"
                          />
                          <div>
                            <p className="font-semibold">{pacote.nome}</p>
                            <p className="text-sm text-gray-500">
                              R$ {pacote.valor} - {pacote.fotos} fotos
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p
                  onClick={abrirModalPacote}
                  className="text-[#d4a531] text-sm cursor-pointer hover:underline"
                >
                  Adicionar Novo Pacote
                </p>

                <ModalPacote
                  isOpen={mostrarModal}
                  onClose={fecharModalPacote}
                  onSave={adicionarNovoPacote}
                />
              </div>
            </div>

            {/* Botão Avançar */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleAvancar}
                disabled={loading}
                className="bg-[#c09b2d] text-white px-6 py-2 rounded hover:bg-[#a88724]"
              >
                {loading ? "Enviando..." : "Criar"}
              </button>
            </div>
          </form>
        )}

       {/*configuracoes */}

      </div>
    </div>
  );
};

export default FormAdicionarEnsaio;

