import { useState, useEffect, useRef, use } from "react";
import { Plus, ArrowLeft, Trash, MoreVertical } from "lucide-react";
import FormAdicionarAlbum from "./FormAdicionarAlbum";
import { api } from "../services/api";
import { uploadDiretoBunny } from "../utils/uploadBunny";

const Albuns = () => {
  const [galerias, setGalerias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [albumAberto, setAlbumAberto] = useState(null);
  const [fotosVisuais, setFotosVisuais] = useState([]);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [indiceSelecionado, setIndiceSelecionado] = useState(null);
  const [menuAberto, setMenuAberto] = useState(null);
  const inputRef = useRef();
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [fotoParaExcluir, setFotoParaExcluir] = useState(null);
  const [mostrarConfirmacaoAlbum, setMostrarConfirmacaoAlbum] = useState(false);
  const [albumParaExcluir, setAlbumParaExcluir] = useState(null);
  const [albunsComprados, setAlbunsComprados] = useState([]);
  const [download, setDownload] = useState(true);

  useEffect(() => {
    console.log("imagemSelecionada:", imagemSelecionada);
    console.log("indiceSelecionado:", indiceSelecionado);
  }, [imagemSelecionada, indiceSelecionado]);

  useEffect(() => {
    buscarAlbuns();
  }, []);

  useEffect(() => {
    setDownload(albumAberto?.downloadFoto);
  }, [albumAberto]);

  const handleSucesso = (msg) => {
    setTipoMensagem("sucesso");
    setMensagem(msg);
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

  const buscarAlbuns = async () => {
    try {
      const response = await api.get("/api/albuns");

      const albunsFormatados = response.data.map((album) => ({
        id: album.id,
        nome: album.nome,
        descricao: album.descricao || "",
        usuario: album.usuario?.nome || "",
        downloadFoto: album.downloadfoto,
        fotos:
          album.fotos?.map((f) => ({
            id_foto: f.id_foto || f.id || null,
            url:
              typeof f.foto_url === "string" && f.foto_url
                ? f.foto_url
                : f.foto?.foto || "", // Se for fluxo 1, pega f.foto.foto
            comentarios: f.foto?.comentarios || [],
          })) || [],
        imagem:
          album.fotos?.find((f) => f.foto?.foto)?.foto?.foto || // Fluxo 1
          album.fotos?.find((f) => f.foto_url)?.foto_url || // Fluxo 2
          "",
        data: album.dtinclusao
          ? new Date(album.dtinclusao).toLocaleDateString("pt-BR")
          : "",
      }));

      setAlbunsComprados(albunsFormatados);
    } catch (error) {
      console.error(
        "Erro ao buscar álbuns:",
        error.response?.data || error.message
      );
    }
  };

  const abrirAlbum = (galeria) => {
    setMensagem("");
    setTipoMensagem("");
    setAlbumAberto(galeria);
    setFotosVisuais(galeria.fotos || []);
  };

  const voltarParaGalerias = () => {
    setAlbumAberto(null);
    setMenuAberto(null);
    setMensagem("");
    setTipoMensagem("");
  };

  const handleAdicionarFotos = async (event) => {
    const arquivos = Array.from(event.target.files);
    if (!arquivos.length) return;

    setLoadingUpload(true);

    try {
      // 1. Faz o upload BunnyCDN
      const urls = await Promise.all(
        arquivos.map(async (file) => {
          if (file instanceof File) {
            return await uploadDiretoBunny(file);
          }
          return null;
        })
      );

      const urlsValidas = urls.filter((url) => url);

      if (urlsValidas.length === 0) {
        handleErro("Nenhuma foto válida para upload.");
        return;
      }

      // 2. Faz o PUT enviando as URLs
      const response = await api.put(`/api/albuns/${albumAberto.id}`, {
        urls: urlsValidas,
      });

      // 3. Atualiza o estado local com as novas fotos recebidas
      const novasFotos = response.data.novasFotos.map((f) => ({
        id_foto: f.id_foto || f.id || null,
        url: f.foto_url || "",
        comentarios: [],
      }));

      setFotosVisuais((prev) => [...prev, ...novasFotos]);

      handleSucesso(
        arquivos.length > 1
          ? "Fotos adicionadas com sucesso!"
          : "Foto adicionada com sucesso!"
      );
    } catch (error) {
      console.error(
        "Erro ao adicionar fotos:",
        error.response?.data || error.message
      );
      handleErro("Erro ao adicionar fotos.");
    } finally {
      setLoadingUpload(false);
    }
  };

  const toggleMenu = (id) => {
    setMenuAberto(menuAberto === id ? null : id);
  };

  const excluirFoto = async (fotoId, idx) => {
    if (!fotoId) {
      handleErro("Foto ainda não foi salva no banco.");
      return;
    }

    try {
      setLoadingUpload(true);
      await api.delete(`/api/albumFotos/${albumAberto.id}/${fotoId}`);

      const novaLista = fotosVisuais.filter((_, i) => i !== idx);
      setFotosVisuais(novaLista);
      handleSucesso("Foto excluída com sucesso!");
    } catch (error) {
      console.error(
        "Erro ao apagar imagem:",
        error.response?.data || error.message
      );
      handleErro("Erro ao apagar imagem.");
    } finally {
      setLoadingUpload(false);
    }
  };

  const excluirAlbum = async () => {
    setMostrarConfirmacaoAlbum(false);
    setLoadingUpload(true);
    try {
      await api.delete(`/api/albuns/${albumParaExcluir.id}`);
      handleSucesso("Álbum apagado com sucesso!");
      buscarAlbuns();
    } catch {
      handleErro("Erro ao apagar álbum.");
    } finally {
      setLoadingUpload(false);
    }
  };

  const confirmaEditarDownload = (id, value) => {
    const booleanValue = value === "true"; // Converte string para booleano

    api
      .put(`/api/albuns/${id}`, { downloadfoto: booleanValue })
      .then(() => {
        setDownload(booleanValue); // Atualiza o estado local após sucesso
        handleSucesso("Album atualizado com sucesso!");
      })
      .catch(() => {
        handleErro("Erro ao atualizar album.");
      });
  };

  return (
    <div className="relative p-4 sm:p-6 font-serif bg-[#F9F9F9] min-h-screen">
      {loadingUpload && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
          <img src="/loading.gif" alt="Carregando..." className="w-32 h-20" />
        </div>
      )}

      <div className="relative p-4 sm:p-6 font-serif bg-[#F9F9F9] min-h-screen">
        {albumAberto ? (
          <>
            <div className="flex justify-end">
              <button
                onClick={voltarParaGalerias}
                className="text-[#c09b2d] hover:underline flex items-center mb-4"
              >
                <ArrowLeft className="mr-1" /> Voltar
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="bg-white p-4 rounded-xl shadow-lg max-w-sm w-full lg:min-h-[80vh]">
                <p className="text-[#c09b2d] text-xl font-bold text-center mb-2">
                  {albumAberto.nome}
                </p>

                <div className="w-full h-[300px] bg-gray-100 rounded-xl overflow-hidden mb-4">
                  {albumAberto.imagem ? (
                    <img
                      src={albumAberto.imagem}
                      alt="Capa"
                      className="w-full h-full object-cover object-top rounded-xl"
                    />
                  ) : (
                    <div className="text-center text-gray-400 p-8">
                      Sem capa
                    </div>
                  )}
                </div>
                <p className="text-center text-lg text-[#b1783d] font-bold">
                  {albumAberto?.usuario}
                </p>
                <div className="bg-[#b1783d] w-0.2 h-0.5 my-4"></div>
                <div className="flex flex-col items-center text-[#b1783d]">
                  <p className="font-bold mb-2">Download:</p>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="opcoes"
                        value={true}
                        checked={download === true}
                        onChange={(e) =>
                          confirmaEditarDownload(albumAberto.id, e.target.value)
                        }
                      />
                      <span>Ativado</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="opcoes"
                        value={false}
                        checked={download === false}
                        onChange={(e) =>
                          confirmaEditarDownload(albumAberto.id, e.target.value)
                        }
                      />
                      <span>Desativado</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-8 border-b-2 border-[#c09b2d] pb-2">
                  <h2 className="text-2xl text-[#b1783d] font-bold">Fotos</h2>

                  <div className="relative inline-flex items-center">
                    <button
                      onClick={() => inputRef.current.click()}
                      title="Adicionar fotos"
                      className="rounded-full p-2 border-2 border-[#c09b2d] text-[#c09b2d] hover:bg-[#c09b2d] hover:text-white transition"
                      disabled={loadingUpload}
                    >
                      <Plus size={20} />
                    </button>

                    {/* INPUT ESCONDIDO DE UPLOAD */}
                    <input
                      ref={inputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleAdicionarFotos}
                    />
                  </div>
                </div>

                {mensagem && tipoMensagem === "sucesso" && (
                  <div className="border px-4 py-3 rounded-md w-full mb-4 bg-green-100 border-green-400 text-green-700">
                    {mensagem}
                  </div>
                )}

                {mensagem && tipoMensagem === "erro" && (
                  <div className="border px-4 py-3 rounded-md w-full mb-4 bg-red-100 border-red-400 text-red-700">
                    {mensagem}
                  </div>
                )}

                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {fotosVisuais.map((foto, idx) => (
                    <div
                      key={idx}
                      className="relative break-inside-avoid overflow-hidden rounded-xl shadow transform transition-transform duration-200 hover:scale-105 group"
                    >
                      <img
                        src={
                          typeof foto.url === "string"
                            ? foto.url
                            : foto.url?.foto || "/placeholder.png" // fallback se for nulo
                        }
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-auto object-contain rounded-xl cursor-pointer"
                        onClick={() => {
                          setImagemSelecionada({
                            url:
                              typeof foto.url === "string"
                                ? foto.url
                                : foto.url?.foto || "",
                          });
                          setIndiceSelecionado(idx);
                        }}
                      />

                      <div className="absolute top-2 right-2 z-10">
                        <button
                          className="text-white bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-70"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu(`foto-${idx}`);
                          }}
                        >
                          <MoreVertical size={18} />
                        </button>
                        {menuAberto === `foto-${idx}` && (
                          <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md animate-fade-in">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFotoParaExcluir({
                                  id_foto: foto.id_foto,
                                  idx,
                                });
                                setMostrarConfirmacao(true);
                              }}
                              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100"
                            >
                              <Trash size={16} />
                              Excluir
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-2">
                Albuns
              </h1>

              <button
                onClick={() => setMostrarModal(true)}
                className="mt-4 bg-[#c09b2d] hover:bg-[#a48322] text-white px-4 py-2 rounded-xl shadow-md transition duration-300"
              >
                Criar novo album
              </button>
            </div>

            {mensagem && tipoMensagem === "sucesso" && (
              <div className="border px-4 py-3 rounded-md w-full mb-4 bg-green-100 border-green-400 text-green-700">
                {mensagem}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {albunsComprados.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform hover:scale-105 w-full max-w-sm mx-auto cursor-pointer"
                  onClick={() => abrirAlbum(item)}
                >
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      className="text-white bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-70"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(`album-${item.id}`);
                      }}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {menuAberto === `album-${item.id}` && (
                      <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md transition-all duration-200 animate-fade-in">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAlbumParaExcluir(item);
                            setMostrarConfirmacaoAlbum(true);
                            setMenuAberto(null);
                          }}
                          className="flex items-center  text-sm gap-2 px-2 py-2 font-semibold text-red-600 hover:text-red-800 whitespace-nowrap"
                        >
                          <Trash size={14} />
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="w-full h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item.imagem ? (
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: `${item.focusX ?? 50}% ${
                            item.focusY ?? 50
                          }%`,
                        }}
                      />
                    ) : (
                      <span className="text-gray-400">Sem imagem</span>
                    )}
                  </div>
                  <div className="text-center text-[#252525] text-lg font-semibold mt-3">
                    {item.nome}
                  </div>
                  <p className="text-center text-gray-500 text-lg italic">
                    {item.descricao}
                  </p>
                  <p className="text-center text-[#c09b2d] text-sm mb-4">
                    {item.fotos.length} fotos | {item.data}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {mostrarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-3xl">
              <FormAdicionarAlbum
                onSave={(mensagemSucesso) => {
                  setMostrarModal(false);
                  buscarAlbuns();
                  if (mensagemSucesso) handleSucesso(mensagemSucesso); // ✅ exibe a mensagem por cima do botão
                }}
                onClose={() => setMostrarModal(false)}
              />
            </div>
          </div>
        )}

        {imagemSelecionada && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
            onClick={() => setImagemSelecionada(null)}
          >
            <div className="relative inline-block">
              <img
                src={imagemSelecionada.url}
                alt="Zoom"
                className="max-h-[90vh] w-auto object-contain rounded-xl shadow-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute top-2 right-2 text-white text-3xl font-bold z-50 bg-black bg-opacity-10 rounded-full px-3 transition-transform duration-200 hover:scale-110 hover:bg-opacity-80"
                onClick={(e) => {
                  e.stopPropagation();
                  setImagemSelecionada(null);
                }}
              >
                ×
              </button>
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-black bg-opacity-10 rounded-full px-3 py-1 transition-transform duration-200 hover:scale-110 hover:bg-opacity-80"
                onClick={(e) => {
                  e.stopPropagation();
                  const novoIndice =
                    (indiceSelecionado - 1 + fotosVisuais.length) %
                    fotosVisuais.length;
                  setIndiceSelecionado(novoIndice);
                  setImagemSelecionada({ url: fotosVisuais[novoIndice].url });
                }}
              >
                ◀
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-black bg-opacity-10 rounded-full px-3 py-1 transition-transform duration-200 hover:scale-110 hover:bg-opacity-80"
                onClick={(e) => {
                  e.stopPropagation();
                  const novoIndice =
                    (indiceSelecionado + 1) % fotosVisuais.length;
                  setIndiceSelecionado(novoIndice);
                  setImagemSelecionada({ url: fotosVisuais[novoIndice].url });
                }}
              >
                ▶
              </button>
              <button
                className="absolute bottom-4 right-4 text-white text-xl z-50 bg-red-600 bg-opacity-90 rounded-full p-2 hover:bg-red-700 transition"
                title="Excluir imagem"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Deseja mesmo apagar esta foto?")) {
                    const fotoId = fotosVisuais[indiceSelecionado]?.id_foto;
                    excluirFoto(fotoId, indiceSelecionado);
                    setImagemSelecionada(null);
                  }
                }}
              >
                <Trash />
              </button>
            </div>
          </div>
        )}

        {/* Modal de confirmação padronizado */}
        {mostrarConfirmacao && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl px-6 py-5 w-full max-w-md shadow-xl font-serif">
              <h2 className="text-[#b88a1c] text-xl font-bold mb-4">
                Confirmar exclusão
              </h2>
              <p className="text-gray-800 mb-6">
                Tem certeza que deseja excluir esta foto?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setMostrarConfirmacao(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    excluirFoto(fotoParaExcluir.id_foto, fotoParaExcluir.idx);
                    setMostrarConfirmacao(false);
                    setMenuAberto(false);
                  }}
                  className="px-4 py-2 rounded bg-[#c09b2d] text-white hover:bg-[#a88724]"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {mostrarConfirmacaoAlbum && albumParaExcluir && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl px-6 py-5 w-full max-w-md shadow-xl font-serif">
              <h2 className="text-[#b88a1c] text-xl font-bold mb-4">
                Confirmar exclusão
              </h2>
              <p className="text-gray-800 mb-6">
                Tem certeza que deseja excluir o álbum{" "}
                <span className="font-semibold">“{albumParaExcluir.nome}”</span>{" "}
                e todas as suas fotos?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setMostrarConfirmacaoAlbum(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={excluirAlbum}
                  className="px-4 py-2 rounded bg-[#c09b2d] text-white hover:bg-[#a88724]"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Albuns;
