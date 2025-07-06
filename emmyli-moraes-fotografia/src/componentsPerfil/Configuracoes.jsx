import { useState, useEffect, useRef, useCallback } from "react";
import {
  Settings,
  Edit2,
  Plus,
  ArrowLeft,
  Trash,
  MoreVertical,
  Star,
} from "lucide-react";
import ImageUploader from "../components/ImageUploader";
import { api } from "../services/api";
import { FaStar } from "react-icons/fa";
import Modal from "../components/Modal";
import FormAdicionarEnsaio from "../componentsPerfil/FormAdicionarEnsaio";
import ImageFocusSelector from "../components/ImageFocusSelector";
import MenuFlutuante from "../components/MenuFlutuante"

import { uploadDiretoBunny } from "../utils/uploadBunny";

const Configuracoes = ({ albumId }) => {

  const [abaAtiva, setAbaAtiva] = useState(albumId ? "trabalhos" : "marca_dagua");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");


  const [galerias, setGalerias] = useState([]);
  const [albumAberto, setAlbumAberto] = useState(null);
  const [fotosVisuais, setFotosVisuais] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [menuAberto, setMenuAberto] = useState(null);
  const [menuPosicao, setMenuPosicao] = useState({ top: 0, left: 0 });


  const [feedbacks, setFeedbacks] = useState([]);
  const [showModalDeletarFeedback, setShowModalDeletarFeedback] = useState(false);
  const [feedbackIdSelecionado, setFeedbackIdSelecionado] = useState(null);


  const [mostrarConfirmacaoFoto, setMostrarConfirmacaoFoto] = useState(false);
  const [fotoParaExcluir, setFotoParaExcluir] = useState({ id_foto: null, idx: null });
  const [mostrarConfirmacaoAlbum, setMostrarConfirmacaoAlbum] = useState(false);
  const [albumParaExcluir, setAlbumParaExcluir] = useState(null);


  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [indiceSelecionado, setIndiceSelecionado] = useState(0);

  const inputRef = useRef();


  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [albumSelecionado, setAlbumSelecionado] = useState(null);



  const handleSucesso = (msg) => {
    setTipoMensagem("sucesso");
    setMensagem(msg);

    fetchEventos();
    fetchFeedbacks();
  };
  const handleErro = (msg) => {
    setTipoMensagem("erro");
    setMensagem(msg);
  };


  const fetchEventos = useCallback(async () => {
    try {
      const { data } = await api.get("/api/eventos?include=detalhes");


      const trabalhos = data
        .filter((evento) => evento.exibirtrabalho === true)
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

      setGalerias(trabalhos);
    } catch (error) {
      handleErro("Erro ao buscar trabalhos.");
      console.error("Erro fetchEventos:", error);
    }
  }, []);


  const fetchFeedbacks = useCallback(async () => {
    try {
      const filter = "?orderBy=dtinclusao&order=DESC&include=usuario,album";
      const response = await api.get("/api/feedbacks" + filter);
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Erro ao buscar feedbacks:", error);
    }
  }, []);


  useEffect(() => {
    if (abaAtiva === "trabalhos") fetchEventos();
    if (abaAtiva === "feedbacks") fetchFeedbacks();
  }, [abaAtiva, fetchEventos, fetchFeedbacks]);


  useEffect(() => {
    if (albumId && galerias.length > 0 && !albumAberto) {
      const gal = galerias.find((g) => g.id === albumId);
      if (gal) abrirAlbum(gal);
    }
  }, [albumId, galerias]);


  useEffect(() => {
    if (!mensagem) return;
    const id = setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 5000);
    return () => clearTimeout(id);
  }, [mensagem]);


  const toggleMenu = (key) => setMenuAberto((prev) => (prev === key ? null : key));


  const abrirAlbum = (gal) => {
    setAlbumAberto(gal);
    setFotosVisuais(gal.fotos);
    setMenuAberto(null);
  };


  const voltar = () => {
    setAlbumAberto(null);
    setFotosVisuais([]);
    setMenuAberto(null);
    setMensagem("");
    setTipoMensagem("");
  };


  // === NOVO FLOW DE UPLOAD ===
  const handleAdicionarFotos = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setLoadingUpload(true);

    try {
      // 1) upload direto
      const urls = await Promise.all(files.map((f) => uploadDiretoBunny(f)));
      // 2) persiste URLs
      const { data } = await api.post("/api/fotos/adicionar-urls", {
        evento_id: albumAberto.id,
        urls,
      });
      setFotosVisuais((prev) => [...prev, ...data.fotos]);
      // atualiza objeto do álbum
      setAlbumAberto((prev) => ({
        ...prev,
        fotos: [...prev.fotos, ...data.fotos],
      }));
    } catch (err) {
      console.error("Erro ao enviar imagens:", err);
    } finally {
      setLoadingUpload(false);
    }
  };


  const solicitarExcluirFoto = (id_foto, idx) => {
    setFotoParaExcluir({ id_foto, idx });
    setMostrarConfirmacaoFoto(true);
    setMenuAberto(null);
  };


  const confirmarExcluirFoto = async () => {
    const { id_foto, idx } = fotoParaExcluir;
    setMostrarConfirmacaoFoto(false);
    try {
      setLoadingUpload(true);
      await api.delete(`/api/fotos/${id_foto}`);
      setFotosVisuais((prev) => prev.filter((_, i) => i !== idx));
      handleSucesso("Foto excluída com sucesso!");
    } catch {
      handleErro("Erro ao apagar imagem.");
    } finally {
      setLoadingUpload(false);
    }
  };


  const solicitarExcluirAlbum = (gal) => {
    setAlbumParaExcluir(gal);
    setMostrarConfirmacaoAlbum(true);
    setMenuAberto(null);
  };


  const confirmarExcluirAlbum = async () => {
    setMostrarConfirmacaoAlbum(false);
    try {
      setLoadingUpload(true);
      await api.delete(`/api/eventos/${albumParaExcluir.id}`);
      handleSucesso("Álbum apagado com sucesso!");
      fetchEventos();
      voltar();
    } catch {
      handleErro("Erro ao apagar álbum.");
    } finally {
      setLoadingUpload(false);
    }
  };


  const handleAbrirEdicao = (album) => {
    setAlbumSelecionado(album);
    setModalEditarAberto(true);
  };


  const handleFecharModal = () => {
    setModalEditarAberto(false);
    setAlbumSelecionado(null);
  };


  const confirmaEditarFeedack = (id, value) => {
    api
      .put(`/api/feedbacks/${id}`, { exibirfeedback: value === "true" })
      .then(() => {
        handleSucesso("Feedback atualizado com sucesso!");
        setFeedbacks((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, exibirfeedback: value === "true" } : f
          )
        );
      })
      .catch(() => {
        handleErro("Erro ao atualizar feedback.");
      });
  };


  const excluirFeedbackPorId = (id) => {
    api
      .delete(`/api/feedbacks/${id}`)
      .then(() => {
        handleSucesso("Feedback excluído com sucesso!");
        setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      })
      .catch(() => {
        handleErro("Erro ao excluir feedback.");
      });
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
    <div className="p-6 font-serif min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4 mb-12">
        Configuração
      </h1>

      <div className="flex border-b mb-6">
        {["marca_dagua", "trabalhos", "feedbacks"].map((aba) => (
          <button
            key={aba}
            className={`ml-4 px-4 py-2 font-semibold transition ${abaAtiva === aba
              ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
              : "text-gray-500 hover:text-[#c09b2d]"
              }`}
            onClick={() => setAbaAtiva(aba)}
          >
            {aba === "marca_dagua"
              ? "Marca d'água"
              : aba === "trabalhos"
                ? "Trabalhos"
                : "Feedbacks"}
          </button>
        ))}
      </div>

      {mensagem && (
        <div
          className={`border px-4 py-3 rounded-md mb-6 ${tipoMensagem === "sucesso"
            ? "bg-green-100 border-green-400 text-green-700"
            : "bg-red-100 border-red-400 text-red-700"
            }`}
        >
          {mensagem}
        </div>
      )}


      {abaAtiva === "marca_dagua" && (
        <ImageUploader onSucesso={handleSucesso} onErro={handleErro} />
      )}


      {abaAtiva === "trabalhos" && !albumAberto && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galerias.map((g) => (
            <div
              key={g.id}
              className="relative bg-white rounded-2xl shadow-md overflow-hidden transform transition hover:scale-105 cursor-pointer"
              onClick={() => abrirAlbum(g)}
            >
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(`album-${g.id}`);
                  }}
                  className="text-white bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-70"
                >
                  <MoreVertical size={18} />
                </button>
                {menuAberto === `album-${g.id}` && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        solicitarExcluirAlbum(g);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 whitespace-nowrap"
                    >
                      <Trash size={16} /> Excluir
                    </button>
                  </div>
                )}
              </div>

              <div>
                <div className="w-full h-60 bg-gray-100 overflow-hidden">
                  {g.imagem ? (
                    <img
                      src={g.imagem}
                      alt={g.nome}
                      className="w-full h-full object-cover rounded-t-2xl"
                      style={{
                        objectPosition: `${g.focusX ?? 50}% ${g.focusY ?? 50}%`
                      }}
                    />
                  ) : (
                    <div className="text-center text-gray-400 p-8">Sem capa</div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-[#252525]">{g.nome}</h3>


                  <p className="text-sm text-gray-500 italic mt-1">{g.descricao}</p>

                  <p className="text-sm text-[#c09b2d] mt-2">
                    {g.fotos.length} fotos | {g.data}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {abaAtiva === "trabalhos" && albumAberto && (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={voltar}
              className="flex items-center text-[#c09b2d] hover:underline gap-1"
            >
              <ArrowLeft size={18} /> Voltar
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            <div className="bg-white p-4 rounded-2xl shadow-lg max-w-sm w-full lg:min-h-[80vh]">
              <p className="text-[#c09b2d] text-xl font-bold text-center mb-2">
                {albumAberto.nome}
              </p>
              <div className="w-full h-[300px] bg-gray-100 rounded-2xl overflow-hidden mb-4">
                {albumAberto.imagem ? (
                  <img
                    src={albumAberto.imagem}
                    alt="Capa"
                    className="w-full h-full object-cover rounded-2xl"
                    style={{
                      objectPosition: `${albumAberto.focusX ?? 50}% ${albumAberto.focusY ?? 50}%`
                    }}
                  />
                ) : (
                  <div className="text-center text-gray-400 p-8">Sem capa</div>
                )}
              </div>
              <div className="flex justify-around text-[#b1783d] text-2xl">
                <Settings
                  className="cursor-pointer hover:text-[#a76a2b]"
                  onClick={() => handleAbrirEdicao(albumAberto)}
                />
                <Edit2
                  className="cursor-pointer hover:text-[#a76a2b]"
                  onClick={(e) => {
                    e.stopPropagation();
                    const fotoCapa = albumAberto.fotos?.find(
                      (foto) => foto.url === albumAberto.imagem
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

            {/* Grid de fotos */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8 border-b-2 border-[#c09b2d] pb-2">
                <h2 className="text-2xl text-[#b1783d] font-bold">Fotos</h2>
                <button
                  onClick={() => inputRef.current.click()}
                  disabled={loadingUpload}
                  className="rounded-full p-2 border-2 border-[#c09b2d] text-[#c09b2d] hover:bg-[#c09b2d] hover:text-white transition"
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
                      className="w-full h-auto object-contain rounded-2xl cursor-pointer"
                      onClick={() => {
                        setIndiceSelecionado(idx);
                        setImagemSelecionada(foto.url);
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

                        {/* MENU FLUTUANTE */}
                      </button>
                      {menuAberto === `foto-${idx}` && (
                        <MenuFlutuante position={menuPosicao}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              api.put(`/api/eventos/${albumAberto.id}/primeira_imagem`, {
                                detalheId: foto.id_foto
                              });
                              albumAberto.imagem = foto.url;
                              setAlbumAberto({ ...albumAberto });
                              setMenuAberto(null);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-100 whitespace-nowrap"
                          >
                            <Star size={16} />
                            Definir Capa
                          </button>
                          <button
                            className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 whitespace-nowrap"
                            onClick={(e) => {
                              e.stopPropagation();
                              solicitarExcluirFoto(foto.id_foto, idx);
                              setMenuAberto(null);
                            }}
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
          </div>
        </>
      )}

    {abaAtiva === "feedbacks" && (
  <>
    {/* Versão mobile: cards */}
    <div className="block lg:hidden space-y-4">
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
          >
            <p className="text-sm"><strong>Cliente:</strong> {feedback.usuario.nome}</p>
            <p className="text-sm"><strong>Álbum:</strong> {feedback.album.nome}</p>
            <p className="text-sm"><strong>Feedback:</strong> {feedback.feedback}</p>
            <p className="text-sm flex items-center gap-1">
              <strong>Satisfação:</strong>
              {Array.from({ length: feedback.satisfacao }).map((_, i) => (
                <FaStar key={i} color="#c09b2d" size={14} />
              ))}
            </p>
            <div className="text-sm mt-2">
              <strong>Exibir na tela inicial:</strong><br />
              <label className="mr-4">
                <input
                  type="radio"
                  name={`exibirInicio-${feedback.id}`}
                  value="true"
                  checked={feedback.exibirfeedback === true}
                  onChange={(e) =>
                    confirmaEditarFeedack(feedback.id, e.target.value)
                  }
                />{" "}
                Sim
              </label>
              <label>
                <input
                  type="radio"
                  name={`exibirInicio-${feedback.id}`}
                  value="false"
                  checked={feedback.exibirfeedback === false}
                  onChange={(e) =>
                    confirmaEditarFeedack(feedback.id, e.target.value)
                  }
                />{" "}
                Não
              </label>
            </div>
            <button
              className="mt-2 text-red-500 hover:underline text-sm"
              onClick={() => {
                setFeedbackIdSelecionado(feedback.id);
                setShowModalDeletarFeedback(true);
              }}
            >
              <Trash className="inline-block mr-1" size={16} />
              Excluir
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Não há feedbacks disponíveis.</p>
      )}
    </div>

    {/* Versão desktop: tabela */}
    <div className="hidden lg:block overflow-x-auto">
      <table className="table-auto w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#c09b2d]">
          <tr className="text-sm text-white text-center">
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Álbum</th>
            <th className="px-4 py-2">Feedback</th>
            <th className="px-4 py-2">Satisfação</th>
            <th className="px-4 py-2">Exibir</th>
            <th className="px-4 py-2">Excluir</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800 text-center">
          {feedbacks.map((feedback) => (
            <tr
              key={feedback.id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2">{feedback.usuario.nome}</td>
              <td className="px-4 py-2">{feedback.album.nome}</td>
              <td className="px-4 py-2">{feedback.feedback}</td>
              <td className="px-4 py-2">
                <div className="flex justify-center space-x-1">
                  {Array.from({ length: feedback.satisfacao }).map((_, i) => (
                    <FaStar key={i} color="#c09b2d" />
                  ))}
                </div>
              </td>
              <td className="px-4 py-2">
                <label className="mr-4">
                  <input
                    type="radio"
                    name={`exibirInicio-${feedback.id}`}
                    value="true"
                    checked={feedback.exibirfeedback === true}
                    onChange={(e) =>
                      confirmaEditarFeedack(feedback.id, e.target.value)
                    }
                  />{" "}
                  Sim
                </label>
                <label>
                  <input
                    type="radio"
                    name={`exibirInicio-${feedback.id}`}
                    value="false"
                    checked={feedback.exibirfeedback === false}
                    onChange={(e) =>
                      confirmaEditarFeedack(feedback.id, e.target.value)
                    }
                  />{" "}
                  Não
                </label>
              </td>
              <td className="px-4 py-2">
                <Trash
                  size={16}
                  className="text-red-500 cursor-pointer inline-block"
                  onClick={() => {
                    setFeedbackIdSelecionado(feedback.id);
                    setShowModalDeletarFeedback(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}


      <Modal
        isOpen={showModalDeletarFeedback}
        onClose={() => setShowModalDeletarFeedback(false)}
        title="Excluir Feedback"
        content="Tem certeza que deseja excluir este feedback?"
        onConfirm={() => {
          excluirFeedbackPorId(feedbackIdSelecionado);
          setShowModalDeletarFeedback(false);
        }}
      >
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setShowModalDeletarFeedback(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              excluirFeedbackPorId(feedbackIdSelecionado);
              setShowModalDeletarFeedback(false);
            }}
            className="px-4 py-2 rounded bg-[#c09b2d] text-white hover:bg-[#7e6931]"
          >
            Excluir
          </button>
        </div>
      </Modal>


      {mostrarConfirmacaoFoto && (
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
                onClick={() => setMostrarConfirmacaoFoto(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarExcluirFoto}
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
                onClick={confirmarExcluirAlbum}
                className="px-4 py-2 rounded bg-[#c09b2d] text-white hover:bg-[#a88724]"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}


      {loadingUpload && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <img src="/loading.gif" alt="Carregando..." className="w-32 h-20" />
        </div>
      )}


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
                confirmarExcluirFoto();
              }}
            >
              <Trash />
            </button>
          </div>
        </div>
      )}


      {modalEditarAberto && (
        <FormAdicionarEnsaio
          dadosIniciais={albumSelecionado}
          onClose={handleFecharModal}
          onSave={() => {
            handleSucesso("Álbum atualizado com sucesso!");
            setModalEditarAberto(false);
            setAlbumSelecionado(null);
            fetchEventos();
          }}
        />
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
                    setAlbumAberto((prev) => ({
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

    </div>
  );
};

export default Configuracoes;
