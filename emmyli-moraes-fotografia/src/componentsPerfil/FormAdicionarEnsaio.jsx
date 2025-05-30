import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Plus } from "lucide-react";
import ModalPacote from "../componentsPerfil/ModalPacote";

const FormAdicionarEnsaio = ({ onClose, onSave, dadosIniciais }) => {
  const [abaAtiva, setAbaAtiva] = useState("informacoes");
  const [titulo, setTitulo] = useState("");
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [origem, setOrigem] = useState("cliente");

  const [descricao, setDescricao] = useState("");
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

  useEffect(() => {
    if (origem === "cliente") {
      const chaveUnica = crypto.randomUUID().slice(0, 8);
      setUrlAlbum(`http://localhost:5173/album/${chaveUnica}`);
    } else {
      setUrlAlbum("");
    }
  }, [origem]);

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
    if (dadosIniciais) {
      setTitulo(dadosIniciais.nome || "");
      setDescricao(dadosIniciais.descricao || "");
      setDataEvento(dadosIniciais.data_evento || "");
      setHoraEvento(dadosIniciais.hora_evento || "");
      setLocalEvento(dadosIniciais.local || "");
      setUrlAlbum(dadosIniciais.urlevento || "");
      setMarcaSelecionada(dadosIniciais.idmarcadagua || "");

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
    /*if (!titulo || imagens.length === 0) {
      handleErro("Preencha todas as informações e adicione imagens!");
      return;
    }*/

    try {
      setLoading(true);

      //console.log(dadosIniciais);return;

      const formData = new FormData();
      imagens.forEach((img, index) => {
        formData.append("imagens[]", img);
      });

      // Dados do evento
      formData.append("nome", titulo);
      formData.append("descricao", descricao);
      formData.append("data_evento", dataEvento);
      formData.append("hora_evento", horaEvento);
      formData.append("local", localEvento);
      formData.append("publico", origem === "publico");
      formData.append("exibirtrabalho", origem === "exibirtrabalho");
      formData.append("idmarcadagua", marcaSelecionada || 0);
      formData.append("urlevento", urlAlbum);

      let data = null;
      if (dadosIniciais?.id) {
        const response = await api.put(`/api/eventos/${dadosIniciais.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        data = response.data;
      } else {
        const response = await api.post("/api/eventos", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
      onSave?.(data);
      onClose();
    } catch (err) {
      handleErro("Erro ao criar ensaio!" + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      const response = await api.get("/api/produtos");
      setProdutos(response.data);
    };
    fetchProdutos();
  }, [modalPacote]);

  //Lembrar de apagar isso dps
  useEffect(() => {
    console.log("produtosSelecionados:", produtosSelecionados);
  }, [produtosSelecionados]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-[#c09b2d] border-t-transparent rounded-full"></div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-8 overflow-auto max-h-[650px]"
      >
        <div className="bg-[#f2eee6] w-full max-w-4xl rounded-2xl p-6 shadow-lg relative font-serif">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
          >
            ×
          </button>
          <div className="flex justify-center items-center border-b border-[#b1783d] pb-2 mb-6">
            <h1 className="text-3xl text-[#b1783d]">Eventos</h1>
          </div>
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-semibold transition ${abaAtiva === "informacoes"
                ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
                : "text-gray-500 hover:text-[#c09b2d]"
                }`}
              onClick={() => setAbaAtiva("informacoes")}
            >
              Informações
            </button>
            <button
              /*disabled={origem === "publico"}*/
              className={`ml-4 px-4 py-2 font-semibold transition ${abaAtiva === "configuracoes"
                ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
                : "text-gray-500 hover:text-[#c09b2d]"
                } `}
              onClick={() => setAbaAtiva("configuracoes")}
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
            <div className="space-y-6 mt-6">
              <div className="flex space-x-4 flex-wrap">
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="block font-medium mb-1">
                      Título do Evento
                    </label>
                    <input
                      type="text"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Descrição</label>
                    <textarea
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={3}
                    />
                  </div>

                  <div>
                    <div className="flex gap-4 justify-between items-center">
                      <p className="mb-2 text-lg">Selecione o pacote:</p>
                      <button
                        onClick={() => setModalPacote(true)}
                        title="Adicionar produto"
                        className="rounded-full w-8 h-8 flex items-center justify-center p-2 border-2 border-[#c09b2d] text-[#c09b2d] hover:bg-[#c09b2d] hover:text-white transition"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex flex-col">
                        {produtos.map((produto) => (
                          <div
                            className="flex items-center space-x-2"
                            key={produto.id}
                          >
                            <input
                              type="checkbox"
                              id={`produto-${produto.id}`}
                              value={produto.id}
                              checked={produtosSelecionados.includes(
                                produto.id
                              )}
                              onChange={(e) => {
                                const id = parseInt(e.target.value);

                                if (e.target.checked) {
                                  // Adiciona ao array
                                  setProdutosSelecionados((prev) => [
                                    ...prev,
                                    id,
                                  ]);
                                } else {
                                  // Remove do array
                                  setProdutosSelecionados((prev) =>
                                    prev.filter((item) => item !== id)
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={`produto-${produto.id}`}
                              className="text-gray-700"
                            >
                              {produto.descricao}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

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
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block font-medium mb-1">
                        Data do Evento
                      </label>
                      <input
                        type="date"
                        value={dataEvento}
                        onChange={(e) => setDataEvento(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block font-medium mb-1">
                        Hora do Evento
                      </label>
                      <input
                        type="time"
                        value={horaEvento}
                        onChange={(e) => setHoraEvento(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">
                      Local do Evento
                    </label>
                    <input
                      type="text"
                      value={localEvento}
                      onChange={(e) => setLocalEvento(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>


                  {!dadosIniciais?.id && (
                    <div>
                      <label className="block font-medium mb-1">
                        Imagens do Ensaio
                      </label>
                      <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="mb-2"
                      />
                      {imagens.length > 0 && (
                        <div className="mt-2 bg-white p-4 border border-gray-300 rounded w-[20rem] sm:w-full">
                          <h3 className="text-lg font-medium mb-2">
                            Fotos Selecionadas:
                          </h3>
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
                  )}




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
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="origem"
                        value="publico"
                        checked={origem === "publico"}
                        onChange={(e) => setOrigem(e.target.value)}
                      />{" "}
                      Público
                    </label>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="origem"
                        value="exibirtrabalho"
                        checked={origem === "exibirtrabalho"}
                        onChange={(e) => setOrigem(e.target.value)}
                      />{" "}
                      Exibir no site como Trabalho
                    </label>
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
                  {loading ? "Enviando..." : "Criar"}
                </button>
              </div>
            </div>
          )}

          {/** ABA CONFIGURAÇÕES **/}
          {abaAtiva === "configuracoes" && (
            <div className="space-y-6 mt-6">
              <div className="flex gap-2 mt-2">
                <label className="block mb-1 text-[#996633]">
                  URL do álbum:
                </label>
                <input
                  type="text"
                  value={urlAlbum}
                  readOnly
                  className="flex-1 border rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(urlAlbum);
                  }}
                  className="bg-[#c09b2d] text-white px-3 py-2 rounded hover:bg-[#a88724]"
                  type="button"
                >
                  Copiar
                </button>
              </div>
              <div>
                <p className="mb-2">Ativar marca d'água:</p>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="marca"
                    checked={ativarMarca}
                    onChange={() => setAtivarMarca(true)}
                  />{" "}
                  Sim
                </label>
                <label>
                  <input
                    type="radio"
                    name="marca"
                    checked={!ativarMarca}
                    onChange={() => setAtivarMarca(false)}
                  />{" "}
                  Não
                </label>
              </div>
              {ativarMarca && (
                <div>
                  <label className="block mb-1 text-[#996633]">
                    Marca d’água:
                  </label>
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
                  {loading ? "Enviando..." : "Criar"}
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormAdicionarEnsaio;
