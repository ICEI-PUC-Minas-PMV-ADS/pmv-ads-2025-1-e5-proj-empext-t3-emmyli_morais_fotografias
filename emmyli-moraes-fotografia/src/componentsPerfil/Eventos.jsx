import { useState, useEffect, useRef } from "react";
import {
  Settings,
  Edit2,
  Plus,
  ArrowLeft,
  Trash,
  MoreVertical,
  Star,
} from "lucide-react";
import FormAdicionarEnsaio from "./FormAdicionarEnsaio";
import { api } from "../services/api";
import ShareUrlModal from "./ShareUrlModal";
import ImageFocusSelector from "../components/ImageFocusSelector";
import MenuFlutuante from "../components/MenuFlutuante"

const Eventos = ({ albumId }) => {
  // --- Estados principais ---
  const [galerias, setGalerias] = useState([]); // Todas as galerias (filtramos somente por público/privado)
  const [mostrarModal, setMostrarModal] = useState(false);
  const [eventoAberto, setEventoAberto] = useState(null);
  const [fotosVisuais, setFotosVisuais] = useState([]);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [indiceSelecionado, setIndiceSelecionado] = useState(null);
  const [menuAberto, setMenuAberto] = useState(null);
  const [menuPosicao, setMenuPosicao] = useState({ top: 0, left: 0 });
  const inputRef = useRef();
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [fotoParaExcluir, setFotoParaExcluir] = useState(null);
  const [mostrarConfirmacaoAlbum, setMostrarConfirmacaoAlbum] = useState(false);
  const [albumParaExcluir, setAlbumParaExcluir] = useState(null);

  // Modal de edição
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  // Estado para alternar entre as abas “privado” e “publico”
  const [abaEventos, setAbaEventos] = useState("privado");

  const [shareModal, setShareModal] = useState({ open: false, url: "" });

  const handleAbrirConfiguracoes = (evento) => {
    setEventoSelecionado(evento);
    setModalEditarAberto(true);
  };

  const handleFecharModal = () => {
    setModalEditarAberto(false);
    setEventoSelecionado(null);
  };

  useEffect(() => {
    buscarEventos();
  }, [albumId]);

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

  const buscarEventos = async () => {
    try {
      // Inclui "detalhes" para pegar as fotos em evento.detalhes
      const response = await api.get("/api/eventos?include=detalhes");

      const eventosFormatados = response.data
        .filter((ev) => ev.exibirtrabalho !== true)
        .map((evento) => {
          const primeiraFoto = evento.detalhes?.[0];
          return {
            id: evento.id,
            nome: evento.nome,
            descricao: evento.descricao || "",
            data_evento: evento.data_evento || "",
            hora_evento: evento.hora_evento || "",
            local: evento.local || "",
            publico: evento.publico === true,
            exibirtrabalho: evento.exibirtrabalho === true,
            idmarcadagua: evento.idmarcadagua || "",
            urlevento: evento.urlevento || "",
            fotos: evento.detalhes?.map((f) => ({
              id_foto: f.id,
              url: f.foto,
              focoX: f.focoX ?? 50,
              focoY: f.focoY ?? 50,
            })) || [],
            imagem: primeiraFoto?.foto || "",
            focusX: primeiraFoto?.focoX ?? 50,
            focusY: primeiraFoto?.focoY ?? 50,
            data: new Date(evento.dtinclusao).toLocaleDateString("pt-BR") || "",
          };
        });


      setGalerias(eventosFormatados);

      // Se veio albumId pela rota, abre automático
      if (albumId) {
        const encontrado = eventosFormatados.find((e) => e.id === albumId);
        if (encontrado) {
          setEventoAberto(encontrado);
          setFotosVisuais(encontrado.fotos);
        }
      }
    } catch (error) {
      console.error(
        "Erro ao buscar eventos:",
        error.response?.data || error.message
      );
    }
  };

  const abrirAlbum = (galeria) => {
    setMensagem("");
    setTipoMensagem("");
    setEventoAberto(galeria);
    setFotosVisuais(galeria.fotos || []);
  };

  const voltarParaGalerias = () => {
    setEventoAberto(null);
    setMenuAberto(null);
    setMensagem("");
    setTipoMensagem("");
  };

  const handleAdicionarFotos = async (event) => {
    const arquivos = Array.from(event.target.files);
    if (!arquivos.length) return;

    const formData = new FormData();
    arquivos.forEach((file) => formData.append("fotos", file));
    formData.append("evento_id", eventoAberto.id);

    try {
      setLoadingUpload(true);
      const response = await api.post("/api/fotos/adicionar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFotosVisuais((prev) => [...prev, ...response.data.urls]);
      handleSucesso(
        arquivos.length > 1
          ? "Fotos adicionadas com sucesso!"
          : "Foto adicionada com sucesso!"
      );
    } catch (error) {
      console.error("Erro ao enviar imagens:", error.response?.data || error.message);
      handleErro("Erro ao enviar imagens.");
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
      await api.delete(`/api/fotos/${fotoId}`);

      const novaLista = fotosVisuais.filter((_, i) => i !== idx);
      setFotosVisuais(novaLista);
      handleSucesso("Foto excluída com sucesso!");
    } catch {
      handleErro("Erro ao apagar imagem.");
    } finally {
      setLoadingUpload(false);
    }
  };

  const excluirAlbum = async () => {
    setMostrarConfirmacaoAlbum(false);
    setLoadingUpload(true);
    try {
      await api.delete(`/api/eventos/${albumParaExcluir.id}`);
      handleSucesso("Álbum apagado com sucesso!");
      buscarEventos();
      voltarParaGalerias();
    } catch {
      handleErro("Erro ao apagar álbum.");
    } finally {
      setLoadingUpload(false);
    }
  };

  // Editor de Foco da Imagem
  const [mostrarEditorFoco, setMostrarEditorFoco] = useState(false);
  const [fotoParaEditarFoco, setFotoParaEditarFoco] = useState(null);

  const abrirEditorFoco = (foto) => {
    setFotoParaEditarFoco(foto);
    setMostrarEditorFoco(true);
  };

  const fecharEditorFoco = () => {
    setFotoParaEditarFoco(null);
    setMostrarEditorFoco(false);
  };

  return (
    <div className="relative p-4 sm:p-6 font-serif bg-[#F9F9F9] min-h-screen">
      {loadingUpload && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
          <img src="/loading.gif" alt="Carregando..." className="w-32 h-20" />
        </div>
      )}

      {eventoAberto ? (
        <>

          {/*  Detalhe do Álbum Aberto  */}

          <div className="flex justify-end">
            <button
              onClick={voltarParaGalerias}
              className="text-[#c09b2d] hover:underline flex items-center mb-4"
            >
              <ArrowLeft className="mr-1" /> Voltar
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* SIDEBAR */}
            <div className="bg-white p-4 rounded-xl shadow-lg max-w-sm w-full lg:min-h-[80vh]">
              <p className="text-[#c09b2d] text-xl font-bold text-center mb-2">
                {eventoAberto.nome}
              </p>

              <div className="w-full h-[300px] bg-gray-100 rounded-xl overflow-hidden mb-4">
                {eventoAberto.imagem ? (
                  <img
                    src={eventoAberto.imagem}
                    alt="Capa"
                    className="w-full h-full object-cover rounded-xl"
                    style={{
                      objectPosition: `${eventoAberto.focusX ?? 50}% ${eventoAberto.focusY ?? 50}%`
                    }}
                  />
                ) : (
                  <div className="text-center text-gray-400 p-8">Sem capa</div>
                )}
              </div>

              <div className="flex justify-around text-[#b1783d] text-2xl">
                <Settings
                  className="cursor-pointer hover:text-[#a76a2b]"
                  onClick={() => handleAbrirConfiguracoes(eventoAberto)}
                />
                <Edit2
                  className="cursor-pointer hover:text-[#a76a2b]"
                  onClick={(e) => {
                    e.stopPropagation();
                    const fotoCapa = eventoAberto.fotos?.find(
                      (foto) => foto.url === eventoAberto.imagem
                    );
                    if (fotoCapa) {
                      abrirEditorFoco(fotoCapa);
                    } else {
                      handleErro("Imagem de capa não encontrada na lista de fotos.");
                    }
                  }}
                />
              </div>
            </div>

            {/* GRID DE FOTOS */}

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
                    className="relative break-inside-avoid overflow-visible rounded-xl shadow transform transition-transform duration-200 hover:scale-105 group"
                  >
                    {/* IMAGEM */}
                    <img
                      src={foto.url}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-auto object-contain rounded-xl cursor-pointer"
                      onClick={() => {
                        setImagemSelecionada(foto.url);
                        setIndiceSelecionado(idx);
                      }}
                    />

                    {/* BOTÃO DE MENU */}
                    <div className="absolute top-2 right-2 z-20">
                      <button
                        className="text-white bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-70"
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setMenuPosicao({
                            top: rect.bottom + window.scrollY, // ou top: rect.top + window.scrollY + alturaBotao
                            left: rect.left + window.scrollX - 160 + 18, // ajuste a posição horizontal (largura do menu)
                          });
                          toggleMenu(`foto-${idx}`);
                        }}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* MENU FLUTUANTE */}
                      {menuAberto === `foto-${idx}` && (
                        <MenuFlutuante position={menuPosicao}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              api.put(`/api/eventos/${eventoAberto.id}/primeira_imagem`, {
                                detalheId: foto.id_foto,
                              });
                              eventoAberto.imagem = foto.url;
                              setEventoAberto({ ...eventoAberto });
                              setMenuAberto(null);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-100 whitespace-nowrap"
                          >
                            <Star size={16} />
                            Definir Capa
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFotoParaExcluir({ id_foto: foto.id_foto, idx });
                              setMostrarConfirmacao(true);
                              setMenuAberto(null);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 whitespace-nowrap"
                          >
                            <Trash size={16} />
                            Excluir
                          </button>
                        </MenuFlutuante>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MODAL DE EDIÇÃO */}

            {modalEditarAberto && (
              <FormAdicionarEnsaio
                onClose={handleFecharModal}
                dadosIniciais={eventoSelecionado}
              />
            )}
          </div>
        </>
      ) : (
        <>
          {/* TÍTULO + BOTÃO DE CRIAR */}

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-2">
              Eventos
            </h1>
            <button
              onClick={() => setMostrarModal(true)}
              className="mt-4 bg-[#c09b2d] hover:bg-[#a48322] text-white px-4 py-2 rounded-xl shadow-md transition duration-300"
            >
              Criar novo Evento
            </button>
          </div>

          {/* Mensagem de Sucesso */}
          {mensagem && tipoMensagem === "sucesso" && (
            <div className="border px-4 py-3 rounded-md w-full mb-4 bg-green-100 border-green-400 text-green-700">
              {mensagem}
            </div>
          )}

          {/* Abas: Privado / Público  */}

          <div className="flex border-b mb-6">
            <button
              onClick={() => setAbaEventos("privado")}
              className={`px-4 py-2 font-semibold transition ${abaEventos === "privado"
                ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
                : "text-gray-500 hover:text-[#c09b2d]"
                }`}
            >
              Privados
            </button>
            <button
              onClick={() => setAbaEventos("publico")}
              className={`ml-4 px-4 py-2 font-semibold transition ${abaEventos === "publico"
                ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
                : "text-gray-500 hover:text-[#c09b2d]"
                }`}
            >
              Públicos
            </button>
          </div>

          {/*  Grid de galerias, filtrando por público  */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {galerias
              .filter((item) =>
                abaEventos === "privado" ? item.publico === false : item.publico === true
              )
              .map((item) => (
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

                        {/* Botão Compartilhar URL */}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuAberto(null);
                            setShareModal({ open: true, url: item.urlevento });
                          }}
                          className="flex items-center text-sm gap-2 px-2 py-2 font-semibold text-blue-600 hover:text-blue-800 whitespace-nowrap"
                        >
                          🔗 Compartilhar URL
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

      {/*  Modal de criação  */}

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl">
            <FormAdicionarEnsaio
              onSave={(mensagemSucesso) => {
                setMostrarModal(false);
                buscarEventos();
                if (mensagemSucesso) handleSucesso(mensagemSucesso);
              }}
              onClose={() => setMostrarModal(false)}
            />
          </div>
        </div>
      )}

      {/*  Modal de Zoom da Imagem  */}

      {imagemSelecionada && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={() => setImagemSelecionada(null)}
        >
          <div className="relative inline-block">
            <img
              src={imagemSelecionada}
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
                  (indiceSelecionado - 1 + fotosVisuais.length) % fotosVisuais.length;
                setIndiceSelecionado(novoIndice);
                setImagemSelecionada(fotosVisuais[novoIndice].url);
              }}
            >
              ◀
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-black bg-opacity-10 rounded-full px-3 py-1 transition-transform duration-200 hover:scale-110 hover:bg-opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                const novoIndice = (indiceSelecionado + 1) % fotosVisuais.length;
                setIndiceSelecionado(novoIndice);
                setImagemSelecionada(fotosVisuais[novoIndice].url);
              }}
            >
              ▶
            </button>
            <button
              className="absolute bottom-4 right-4 text-white text-xl z-50 bg-red-600 bg-opacity-90 rounded-full p-2 hover:bg-red-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                excluirFoto(fotoParaExcluir?.id_foto, indiceSelecionado);
                setImagemSelecionada(null);
              }}
            >
              <Trash />
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmação para excluir foto  */}

      {mostrarConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-6 py-5 w-full max-w-md shadow-xl font-serif">
            <h2 className="text-[#b88a1c] text-xl font-bold mb-4">
              Confirmar exclusão
            </h2>
            <p className="text-gray-800 mb-6">Tem certeza que deseja excluir esta foto?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarConfirmacao(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  excluirFoto(fotoParaExcluir?.id_foto, fotoParaExcluir?.idx);
                  setMostrarConfirmacao(false);
                }}
                className="px-4 py-2 rounded bg-[#c09b2d] text-white hover:bg-[#a88724]"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/*  Modal de confirmação para excluir álbum  */}

      {mostrarConfirmacaoAlbum && albumParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-6 py-5 w-full max-w-md shadow-xl font-serif">
            <h2 className="text-[#b88a1c] text-xl font-bold mb-4">
              Confirmar exclusão
            </h2>
            <p className="text-gray-800 mb-6">
              Tem certeza que deseja excluir o álbum{" "}
              <span className="font-semibold">“{albumParaExcluir.nome}”</span> e todas as suas fotos?
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

      {/*  Modal de Ediição de Foco  */}
      {mostrarEditorFoco && fotoParaEditarFoco && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-auto max-w-full relative shadow-xl">
            <button
              onClick={fecharEditorFoco}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <ImageFocusSelector
              imageUrl={fotoParaEditarFoco.url}
              onSave={(foco) => {
                api.put(`/api/eventos/foco/${fotoParaEditarFoco.id_foto}`, {
                  focoX: foco.x,
                  focoY: foco.y,
                })
                  .then(() => {
                    setEventoAberto((prev) => ({
                      ...prev,
                      focusX: foco.x,
                      focusY: foco.y,
                    }));
                    handleSucesso("Foco atualizado com sucesso!");
                    fecharEditorFoco();
                  })
                  .catch(() => {
                    handleErro("Erro ao salvar foco.");
                  });
                fecharEditorFoco();
              }}
            />
          </div>
        </div>
      )}

      <ShareUrlModal
        isOpen={shareModal.open}
        url={shareModal.url}
        onClose={() => setShareModal({ open: false, url: "" })}
      />
    </div>
  );
};

export default Eventos;