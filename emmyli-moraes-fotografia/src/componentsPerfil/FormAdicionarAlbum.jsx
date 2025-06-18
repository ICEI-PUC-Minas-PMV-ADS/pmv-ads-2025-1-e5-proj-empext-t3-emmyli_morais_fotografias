import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { api } from "../services/api";
import ModalPacote from "../componentsPerfil/ModalPacote";
import { uploadDiretoBunny } from "../utils/uploadBunny";

const FormAdicionarEnsaio = ({ onClose, onSave, dadosIniciais }) => {
  const [abaAtiva, setAbaAtiva] = useState("informacoes");
  const [titulo, setTitulo] = useState("");
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [origem, setOrigem] = useState("cliente");
  const [download, setDownload] = useState("false");

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  useEffect(() => {
    setAbaAtiva("informacoes");
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get("/api/usuarios");
      // espera-se que retorne algo como [{ id, nome }, ...]
      setUsuarios(res.data);
    } catch {
      // falha silenciosa; você pode exibir uma mensagem se quiser
    }
  };

  /*   // ** PRENDER DADOS PARA EDIÇÃO **
  useEffect(() => {
    if (dadosIniciais) {
      setTitulo(dadosIniciais.nome || "");
      setTitulo(dadosIniciais.descricao || "");
      setOrigem("cliente");
      setUsuarioSelecionado(dadosIniciais.usuario?.id || "");
    }
  }, [dadosIniciais]);
 */
  const handleErro = (msg) => {
    setTipoMensagem("erro");
    setMensagem(msg);
  };

  // Limpar mensagem após 5 segundos
  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => {
        setMensagem("");
        setTipoMensagem("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  // ** Funções de imagem no preview **
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

      // 1. Primeiro faz o upload de todas as imagens direto pro BunnyCDN
      const urls = await Promise.all(
        imagens.map(async (img) => {
          if (img instanceof File) {
            return await uploadDiretoBunny(img);
          }
          return null;
        })
      );

      // 2. Filtra possíveis nulls (se houver)
      const urlsValidas = urls.filter((url) => url);

      // 3. Monta o payload apenas com dados e as URLs
      const payload = {
        usuario_id: usuarioSelecionado.id,
        nome: titulo,
        descricao: titulo,
        origem: "admin",
        downloadfoto: download,
        urls: urlsValidas,
      };

      // 4. Envia apenas os dados e URLs para o backend
      await api.post("/api/albuns/createAdmin", payload);

      onSave?.("Álbum salvo com sucesso!");
      onClose();
    } catch (err) {
      console.error("Erro ao salvar álbum:", err);
      handleErro("Erro ao salvar álbum: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      {/* Overlay de loading */}
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
          <h1 className="text-3xl text-[#b1783d]">Albuns</h1>
        </div>

        {/* Abas: Informações e (condicional) Configurações */}
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
        </div>

        {/* Mensagem de erro */}
        {mensagem && tipoMensagem === "erro" && (
          <div className="border px-4 py-3 rounded-md w-full mb-4 bg-red-100 border-red-400 text-red-700">
            {mensagem}
          </div>
        )}

        {/* === Aba: Informações === */}
        {abaAtiva === "informacoes" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block font-medium mb-1">
                    Título do Album
                  </label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                {/* === CAMPO USUARIOS === */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-medium">Usuário</label>
                  </div>
                  <select
                    value={usuarioSelecionado?.id || ""}
                    onChange={(e) => {
                      const selectedUser = usuarios.find(
                        (u) => u.id.toString() === e.target.value
                      );
                      setUsuarioSelecionado(selectedUser);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Selecione</option>
                    {usuarios.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.nome}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Campo de Imagens do Ensaio */}
                {/*  {!dadosIniciais?.id && ( */}
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
                    <div className="mt-2 bg-white p-4 border border-gray-300 rounded w-full">
                      <h3 className="text-lg font-medium mb-2">
                        Fotos Selecionadas:
                      </h3>
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
                {/*  )} */}

                <div>
                  <p className="mb-2 font-medium">Download:</p>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="download"
                        value="true"
                        checked={download === "true"}
                        onChange={(e) => setDownload(e.target.value)}
                      />
                      <span>Ativado</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="download"
                        value="false"
                        checked={download === "false"}
                        onChange={(e) => setDownload(e.target.value)}
                      />
                      <span>Desativado</span>
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
                {loading
                  ? "Enviando..."
                  : dadosIniciais
                  ? "Atualizar"
                  : "Criar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormAdicionarEnsaio;
