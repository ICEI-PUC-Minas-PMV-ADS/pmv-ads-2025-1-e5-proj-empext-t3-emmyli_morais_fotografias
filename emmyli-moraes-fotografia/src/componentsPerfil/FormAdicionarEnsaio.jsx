import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Plus, Trash2 } from "lucide-react";
import ModalPacote from "../componentsPerfil/ModalPacote";

const FormAdicionarEnsaio = ({ onClose, onSave, dadosIniciais }) => {

  const [abaAtiva, setAbaAtiva] = useState("informacoes");
  const [titulo, setTitulo] = useState("");
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [origem, setOrigem] = useState("cliente");

  /*const [descricao, setDescricao] = useState("");*/
  const [dataEvento, setDataEvento] = useState("");
  const [horaEvento, setHoraEvento] = useState("");
  const [localEvento, setLocalEvento] = useState("");

  const [urlAlbum, setUrlAlbum] = useState("");
  const [ativarMarca, setAtivarMarca] = useState(true);

  const [marcasDagua, setMarcasDagua] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState("");

  const [produtos, setProdutos] = useState([]);
  const [modalPacote, setModalPacote] = useState(false);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);


  const [categorias, setCategorias] = useState([]); 
  const [categoriasPersonalizadas, setCategoriasPersonalizadas] = useState([]); 
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");

  useEffect(() => {
    if (origem === "exibirtrabalho" && abaAtiva === "configuracoes") {
      setAbaAtiva("informacoes");
    }
  }, [origem, abaAtiva]);


  useEffect(() => {
    if (dadosIniciais && dadosIniciais.id) {
      return;
    }
    const chaveUnica = crypto.randomUUID().slice(0, 8);
    setUrlAlbum(`http://localhost:5173/album/${chaveUnica}`);
  }, [dadosIniciais]);


  useEffect(() => {
    const buscarMarcas = async () => {
      try {
        const response = await api.get("/api/marcaDagua");
        setMarcasDagua(response.data || []);
      } catch (err) {
        console.error("Erro ao buscar marcas d’água:", err);
      }
    };
    buscarMarcas();
  }, []);


  useEffect(() => {
    const buscaCategorias = async () => {
      try {
        const response = await api.get("/api/categorias");

        setCategorias(response.data || []);
        setCategoriasPersonalizadas(response.data || []);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };
    buscaCategorias();
  }, []);


  useEffect(() => {
    if (dadosIniciais) {
      setTitulo(dadosIniciais.nome || "");
      /*setDescricao(dadosIniciais.descricao || "");*/
      setDataEvento(dadosIniciais.data_evento || "");
      setHoraEvento(dadosIniciais.hora_evento || "");
      setLocalEvento(dadosIniciais.local || "");
      setUrlAlbum(dadosIniciais.urlevento || "");
      setMarcaSelecionada(dadosIniciais.idmarcadagua || "");

      setCategoriaSelecionada(
        dadosIniciais.categoria_id
          ? dadosIniciais.categoria_id.toString()
          : ""
      );

      setOrigem(
        dadosIniciais.publico
          ? "publico"
          : dadosIniciais.exibirtrabalho
          ? "exibirtrabalho"
          : "cliente"
      );
    }
  }, [dadosIniciais]);


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

  const handleSubmit = (e) => e.preventDefault();


  const handleAvancar = async () => {
    try {
      setLoading(true);

      // Montagem de FormData:
      const formData = new FormData();

      imagens.forEach((img) => {
        formData.append("imagens[]", img);
      });

      formData.append("nome", titulo);
      formData.append("data_evento", dataEvento);
      formData.append("hora_evento", horaEvento);
      formData.append("local", localEvento);
      formData.append("publico", origem === "publico");
      formData.append("exibirtrabalho", origem === "exibirtrabalho");


      if (categoriaSelecionada && Number(categoriaSelecionada) > 0) {
        formData.append("categoria_id", Number(categoriaSelecionada));
      }

      if (origem !== "exibirtrabalho" && marcaSelecionada) {
        formData.append("idmarcadagua", Number(marcaSelecionada));
      }

      if (origem !== "exibirtrabalho") {
        formData.append("urlevento", urlAlbum);
      }

      let data = null;
      if (dadosIniciais?.id) {

        const response = await api.put(
          `/api/eventos/${dadosIniciais.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        data = response.data;
      } else {

        const response = await api.post("/api/eventos", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        data = response.data;
      }


      const eventoId = data.id;
      const vincularProdutos = produtosSelecionados.map((produtoId) =>
        api.post("/api/EventoProduto", {
          eventoId,
          produtoId,
        })
      );
      await Promise.all(vincularProdutos);


      onSave?.("Evento criado com sucesso!");
      onClose();
    } catch (err) {
      handleErro(
        "Erro ao criar ensaio! " +
          (err?.response?.data?.error ||
            err?.response?.data?.message ||
            err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/api/produtos");
        setProdutos(response.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };
    fetchProdutos();
  }, [modalPacote]);


  const handleAddCategoria = async () => {
    const nome = novaCategoria.trim();
    if (!nome) return;
    try {
      const res = await api.post("/api/categorias", { nome });

      setCategoriasPersonalizadas((prev) => [...prev, res.data]);
      setCategorias((prev) => [...prev, res.data]); 

      setCategoriaSelecionada(res.data.id.toString());
      setNovaCategoria("");
      setMostrarModalCategoria(false);
    } catch (error) {
      handleErro("Erro ao criar categoria.");
    }
  };


  const handleDeleteCategoria = async (id) => {
    try {
      await api.delete(`/api/categorias/${id}`);
      setCategoriasPersonalizadas((prev) =>
        prev.filter((c) => c.id !== id)
      );
      setCategorias((prev) =>
        prev.filter((c) => c.id !== id)
      );

      if (categoriaSelecionada === id.toString()) {
        setCategoriaSelecionada("");
      }
    } catch {
      handleErro("Erro ao remover categoria.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-[#c09b2d] border-t-transparent rounded-full"></div>
        </div>
      )}

      <div className="bg-[#f2eee6] w-full max-w-4xl rounded-2xl p-6 shadow-lg relative font-serif max-h-[90vh] overflow-auto sm:p-8 md:max-w-3xl lg:max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="flex justify-center items-center border-b border-[#b1783d] pb-2 mb-6">
          <h1 className="text-3xl text-[#b1783d]">Eventos</h1>
        </div>


        <div className="flex border-b mb-6 flex-wrap gap-2">
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

          {origem !== "exibirtrabalho" && (
            <button
              className={`px-4 py-2 font-semibold transition ${
                abaAtiva === "configuracoes"
                  ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
                  : "text-gray-500 hover:text-[#c09b2d]"
              }`}
              onClick={() => setAbaAtiva("configuracoes")}
            >
              Configurações
            </button>
          )}
        </div>


        {mensagem && tipoMensagem === "erro" && (
          <div className="border px-4 py-3 rounded-md w-full mb-4 bg-red-100 border-red-400 text-red-700">
            {mensagem}
          </div>
        )}


        {abaAtiva === "informacoes" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1 space-y-6">

                <div>
                  <label className="block font-medium mb-1">Título do Evento</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                {/*<div>
                  <label className="block font-medium mb-1">Descrição</label>
                  <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows={3}
                  />
                </div>*/}


                <div>
                  <label className="block font-medium mb-1">
                    Imagens do Ensaio
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {imagens.length > 0 && (
                    <div className="mt-2 bg-white p-4 border border-gray-300 rounded w-full">
                      <h3 className="text-lg font-medium mb-2">Pré‐visualização:</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-80 overflow-auto">
                        {imagens.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`preview-${idx}`}
                              className="h-24 sm:h-32 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removerImagem(idx)}
                              className="absolute top-1 right-1 text-white bg-[#c09b2d] p-1 rounded-full hover:bg-[#a88724]"
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
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-medium">Categoria</label>
                    <button
                      type="button"
                      onClick={() => setMostrarModalCategoria(true)}
                      className="rounded-full w-8 h-8 flex items-center justify-center p-2 border-2 border-[#c09b2d] text-[#c09b2d] hover:bg-[#c09b2d] hover:text-white transition"
                      title="Adicionar nova categoria"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <select
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Selecione</option>
                    {categoriasPersonalizadas.map((cat) => (
                      <option key={cat.id} value={cat.id.toString()}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </div>


                {origem !== "exibirtrabalho" && (
                  <>
                    <div className="flex gap-4 justify-between items-center">
                      <p className="mb-2 text-lg">Selecione o pacote:</p>
                      <button
                        type="button"
                        onClick={() => setModalPacote(true)}
                        title="Adicionar produto"
                        className="rounded-full w-8 h-8 flex items-center justify-center p-2 border-2 border-[#c09b2d] text-[#c09b2d] hover:bg-[#c09b2d] hover:text-white transition"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <div className="max-h-48 overflow-auto">
                      <div className="flex flex-wrap gap-2 max-w-full">
                        {produtos.map((produto) => (
                          <label
                            key={produto.id}
                            htmlFor={`produto-${produto.id}`}
                            className="flex items-center space-x-2 bg-white p-1 rounded border cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              id={`produto-${produto.id}`}
                              value={produto.id}
                              checked={produtosSelecionados.includes(produto.id)}
                              onChange={(e) => {
                                const id = parseInt(e.target.value);
                                if (e.target.checked) {
                                  setProdutosSelecionados((prev) => [...prev, id]);
                                } else {
                                  setProdutosSelecionados((prev) =>
                                    prev.filter((item) => item !== id)
                                  );
                                }
                              }}
                            />
                            <span className="text-gray-700">
                              {produto.descricao}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {modalPacote && (
                  <ModalPacote
                    isOpen={modalPacote}
                    onSave={(resposta) => {
                      console.log("Pacote salvo:", resposta);
                      setModalPacote(false);
                    }}
                    onClose={() => setModalPacote(false)}
                  />
                )}


                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="flex-1">
                    <label className="block font-medium mb-1">Data do Evento</label>
                    <input
                      type="date"
                      value={dataEvento}
                      onChange={(e) => setDataEvento(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex-1 mt-4 sm:mt-0">
                    <label className="block font-medium mb-1">Hora do Evento</label>
                    <input
                      type="time"
                      value={horaEvento}
                      onChange={(e) => setHoraEvento(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>


                <div>
                  <label className="block font-medium mb-1">Local do Evento</label>
                  <input
                    type="text"
                    value={localEvento}
                    onChange={(e) => setLocalEvento(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>


                <div>
                  <p className="mb-2 font-medium">Visibilidade:</p>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="origem"
                        value="cliente"
                        checked={origem === "cliente"}
                        onChange={(e) => setOrigem(e.target.value)}
                      />
                      <span>Privado</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="origem"
                        value="publico"
                        checked={origem === "publico"}
                        onChange={(e) => setOrigem(e.target.value)}
                      />
                      <span>Público</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="origem"
                        value="exibirtrabalho"
                        checked={origem === "exibirtrabalho"}
                        onChange={(e) => setOrigem(e.target.value)}
                      />
                      <span>Exibir no site como Trabalho</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAvancar}
                disabled={loading}
                className="bg-[#c09b2d] text-white px-6 py-2 rounded hover:bg-[#a88724]"
              >
                {loading ? "Enviando..." : dadosIniciais?.id ? "Atualizar" : "Criar"}
              </button>
            </div>
          </form>
        )}


        {abaAtiva === "configuracoes" && origem !== "exibirtrabalho" && (
          <div className="space-y-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
              <label className="block mb-1 text-[#996633]">URL do álbum:</label>
              <input
                type="text"
                value={urlAlbum}
                readOnly
                className="flex-1 border rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
              />
              <button
                onClick={() => navigator.clipboard.writeText(urlAlbum)}
                className="bg-[#c09b2d] text-white px-3 py-2 rounded hover:bg-[#a88724]"
                type="button"
              >
                Copiar
              </button>
            </div>

            <div>
              <p className="mb-2">Ativar marca d’água:</p>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="marca"
                    checked={ativarMarca}
                    onChange={() => setAtivarMarca(true)}
                  />
                  <span>Sim</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="marca"
                    checked={!ativarMarca}
                    onChange={() => setAtivarMarca(false)}
                  />
                  <span>Não</span>
                </label>
              </div>
            </div>

            {ativarMarca && (
              <div>
                <label className="block mb-1 text-[#996633]">Marca d’água:</label>
                <select
                  className="w-full border rounded px-4 py-2"
                  value={marcaSelecionada}
                  onChange={(e) => setMarcaSelecionada(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {marcasDagua.map((marca) => (
                    <option key={marca.id} value={marca.id}>
                      {marca.imagem}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAvancar}
                disabled={loading}
                className="bg-[#c09b2d] text-white px-6 py-2 rounded hover:bg-[#a88724]"
              >
                {loading ? "Enviando..." : dadosIniciais?.id ? "Atualizar" : "Criar"}
              </button>
            </div>
          </div>
        )}
      </div>


      {mostrarModalCategoria && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#f2eee6] rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <div className="flex justify-center items-center border-b border-[#b1783d] mb-4">
              <h2 className="text-3xl text-[#b1783d]">Categorias</h2>
            </div>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Nova categoria"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleAddCategoria}
                className="bg-[#d4a531] hover:bg-[#c9a029] text-white font-bold px-4 py-2 rounded-md"
                title="Salvar nova categoria"
              >
                <Plus size={16} />
              </button>
            </div>
            <ul className="space-y-2 max-h-48 overflow-auto">
              {categoriasPersonalizadas.map((cat) => (
                <li
                  key={cat.id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <span>{cat.nome}</span>
                  <button
                    onClick={() => handleDeleteCategoria(cat.id)}
                    className="text-red-600 "
                    title="Remover categoria"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setMostrarModalCategoria(false)}
                className="bg-[#d4a531] hover:bg-[#c9a029] text-white font-bold px-6 py-2 rounded-md"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormAdicionarEnsaio;
