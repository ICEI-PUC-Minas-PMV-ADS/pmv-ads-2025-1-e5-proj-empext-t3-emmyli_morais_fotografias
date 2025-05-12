import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalPacote from "../componentsPerfil/ModalPacote";
import { Plus, Trash2 } from "lucide-react";

const FormAdicionarEnsaio = ({ onClose, onSave }) => {
  const [abaAtiva, setAbaAtiva] = useState("informacoes");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(false);
  const [categoriasPersonalizadas, setCategoriasPersonalizadas] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [imagens, setImagens] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [pacotesSelecionados, setPacotesSelecionados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [origem, setOrigem] = useState("cliente");

  // carrega categorias do banco
  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categorias");
      setCategoriasPersonalizadas(res.data);
    } catch {
      // falha silenciosa
    }
  };

  const handleErro = (msg) => {
    setTipoMensagem("erro");
    setMensagem(msg);
  };

  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => {
        setMensagem("");
        setTipoMensagem("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  const handleImageChange = (e) => {
    setImagens(Array.from(e.target.files));
  };

  const removerImagem = (index) => {
    const nov = [...imagens];
    nov.splice(index, 1);
    setImagens(nov);
  };

  const abrirModalPacote = () => setMostrarModal(true);
  const fecharModalPacote = () => setMostrarModal(false);
  const adicionarNovoPacote = (novoPacote) => {
    setPacotes((prev) => [...prev, novoPacote]);
    setMostrarModal(false);
  };
  const handlePacoteChange = (pacote) => {
    setPacotesSelecionados((prev) =>
      prev.includes(pacote)
        ? prev.filter((p) => p !== pacote)
        : [...prev, pacote]
    );
  };

  const handleSubmit = (e) => e.preventDefault();

  const handleAvancar = async () => {
    if (!titulo || !categoria || imagens.length === 0) {
      handleErro("Preencha todas as informações e adicione imagens!");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("usuario_id", 1);
      formData.append("nome", titulo);
      formData.append("descricao", categoria);
      formData.append("origem", origem);
      imagens.forEach((img) => formData.append("fotos", img));
      await axios.post("http://localhost:3000/api/albuns", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSave?.("Ensaio criado com sucesso!");
      // reset
      setTitulo("");
      setCategoria("");
      setImagens([]);
      setPacotes([]);
      setPacotesSelecionados([]);
      setAbaAtiva("informacoes");
      onClose?.();
    } catch {
      handleErro("Erro ao criar ensaio!");
    } finally {
      setLoading(false);
    }
  };

  // criação de nova categoria no banco
  const handleAddCategoria = async () => {
    const nome = novaCategoria.trim();
    if (!nome) return;
    try {
      const res = await axios.post("http://localhost:3000/api/categorias", { nome });
      setCategoriasPersonalizadas((prev) => [...prev, res.data]);
      setCategoria(res.data.nome);
      setNovaCategoria("");
      setMostrarModalCategoria(false);
    } catch {
      handleErro("Erro ao criar categoria.");
    }
  };

  // remoção da categoria
  const handleDeleteCategoria = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/categorias/${id}`);
      setCategoriasPersonalizadas((prev) => prev.filter((c) => c.id !== id));
      if (categoriasPersonalizadas.find((c) => c.id === id)?.nome === categoria) {
        setCategoria("");
      }
    } catch {
      handleErro("Erro ao remover categoria.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-[#c09b2d] border-t-transparent rounded-full"></div>
        </div>
      )}

        <div className="bg-[#f2eee6] w-full max-w-4xl rounded-2xl p-6 shadow-lg relative font-serif">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold">
            ×
          </button>
          <div className="flex justify-center items-center border-b border-[#b1783d] pb-2 mb-6">
            <h1 className="text-3xl text-[#b1783d]">Galeria</h1>
          </div>
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-semibold transition ${
                abaAtiva === "informacoes"
                  ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
                  : "text-gray-500 hover:text-[#c09b2d]"
              }`}
              onClick={() => setAbaAtiva("informacoes")}
            >
              Informações
            </button>
            <button
              disabled={origem === "publico"}
              className={`ml-4 px-4 py-2 font-semibold transition ${
                abaAtiva === "configuracoes"
                  ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
                  : "text-gray-500 hover:text-[#c09b2d]"
              } ${origem === "publico" ? "opacity-40 cursor-not-allowed" : ""}`}
              onClick={() => origem !== "publico" && setAbaAtiva("configuracoes")}
            >
              Configurações
            </button>
          </div>

          {mensagem && tipoMensagem === "erro" && (
            <div className="border px-4 py-3 rounded-md w-full mb-4 bg-red-100 border-red-400 text-red-700">
              {mensagem}
            </div>
          )}

          {/** ABA INFORMAÇÕES **/}
          {abaAtiva === "informacoes" && (
            <form onSubmit={handleSubmit} className="space-y-6 overflow-auto max-h-[450px]">
              <div className="flex space-x-4 flex-wrap">
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="block font-medium mb-1">Título do Ensaio</label>
                    <input
                      type="text"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-medium">Categoria</label>
                      <button
                        type="button"
                        onClick={() => setMostrarModalCategoria(true)}
                        className="p-1 border rounded-full text-[#c09b2d] hover:bg-[#c09b2d] hover:text-white"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <select
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Selecione</option>
                      {categoriasPersonalizadas.map((cat) => (
                        <option key={cat.id} value={cat.nome}>
                          {cat.nome}
                        </option>
                      ))}
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

                  <div>
                    <p className="mb-2 font-medium">Visibilidade:</p>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="origem"
                        value="cliente"
                        checked={origem === "cliente"}
                        onChange={(e) => setOrigem(e.target.value)}
                      />{" "}
                      Privado
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="origem"
                        value="publico"
                        checked={origem === "publico"}
                        onChange={(e) => setOrigem(e.target.value)}
                      />{" "}
                      Público
                    </label>
                  </div>
                </div>

                {origem !== "publico" && (
                  <div className="w-full sm:w-[22rem]">
                    <label className="block font-medium mb-3">Pacotes:</label>
                    {pacotes.map((pacote, idx) => (
                      <div key={idx} className="border p-2 rounded mb-2">
                        <input
                          type="checkbox"
                          checked={pacotesSelecionados.includes(pacote)}
                          onChange={() => handlePacoteChange(pacote)}
                        />
                        <span className="ml-2 font-medium">{pacote.nome}</span>
                      </div>
                    ))}
                    <p
                      onClick={abrirModalPacote}
                      className="text-sm text-[#d4a531] cursor-pointer mt-2 hover:underline"
                    >
                      Adicionar Novo Pacote
                    </p>
                    <ModalPacote isOpen={mostrarModal} onClose={fecharModalPacote} onSave={adicionarNovoPacote} />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
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

          {/** ABA CONFIGURAÇÕES **/}
          {abaAtiva === "configuracoes" && origem !== "publico" && (
            <div className="space-y-6 mt-6">
              <div>
                <label className="block mb-1 text-[#996633]">URL do álbum:</label>
                <input
                  type="text"
                  placeholder="fotos-jerry"
                  className="w-full border rounded px-4 py-2"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#996633]">Download</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#ccc] rounded-full peer peer-checked:bg-[#b1783d]
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                    after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                    peer-checked:after:translate-x-full"
                  ></div>
                </label>
              </div>
              <div>
                <p className="mb-2">Ativar marca d'água:</p>
                <label className="mr-4">
                  <input type="radio" name="marca" defaultChecked /> Sim
                </label>
                <label>
                  <input type="radio" name="marca" /> Não
                </label>
              </div>
              <div>
                <label className="block mb-1 text-[#996633]">Marca d’água:</label>
                <select className="w-full border rounded px-4 py-2">
                  <option>Marca d’água 1</option>
                  <option>Marca d’água 2</option>
                </select>
              </div>
            </div>
          )}

          

          {/** MODAL CATEGORIA **/}
          {mostrarModalCategoria && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl px-6 py-5 w-full max-w-sm shadow-xl font-serif">
                <h2 className="text-[#b1783d] text-xl font-bold mb-4">Categorias</h2>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Nova categoria"
                    value={novaCategoria}
                    onChange={(e) => setNovaCategoria(e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    onClick={handleAddCategoria}
                    className="bg-[#c09b2d] text-white px-4 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <ul className="space-y-2 max-h-48 overflow-auto">
                  {categoriasPersonalizadas.map((cat) => (
                    <li key={cat.id} className="flex justify-between items-center border p-2 rounded">
                      <span>{cat.nome}</span>
                      <button onClick={() => handleDeleteCategoria(cat.id)} className="text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setMostrarModalCategoria(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      
    </div>
  );
};

export default FormAdicionarEnsaio;
