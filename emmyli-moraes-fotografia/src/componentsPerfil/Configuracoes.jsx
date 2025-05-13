import { useState, useEffect, useRef, useCallback } from "react";
import {
  Image as ImageIcon,
  Settings,
  Edit2,
  Plus,
  ArrowLeft,
  Trash,
  MoreVertical
} from "lucide-react";
import ImageUploader from "../components/ImageUploader";
import { api } from "../services/api";

const Configuracoes = () => {
  // --- Estados principais ---
  const [abaAtiva, setAbaAtiva] = useState("marca_dagua");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [galerias, setGalerias] = useState([]);
  const [albumAberto, setAlbumAberto] = useState(null);
  const [fotosVisuais, setFotosVisuais] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [menuAberto, setMenuAberto] = useState(null);

  // --- Confirmações ---
  const [mostrarConfirmacaoFoto, setMostrarConfirmacaoFoto] = useState(false);
  const [fotoParaExcluir, setFotoParaExcluir] = useState({ id_foto: null, idx: null });
  const [mostrarConfirmacaoAlbum, setMostrarConfirmacaoAlbum] = useState(false);
  const [albumParaExcluir, setAlbumParaExcluir] = useState(null);

  // --- Zoom de imagem ---
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [indiceSelecionado, setIndiceSelecionado] = useState(0);

  const inputRef = useRef();

  
  const handleSucesso = (msg) => {
    setTipoMensagem("sucesso");
    setMensagem(msg);
    fetchAlbuns();
  };
  const handleErro = (msg) => {
    setTipoMensagem("erro");
    setMensagem(msg);
  };

  
  const fetchAlbuns = useCallback(async () => {
    try {
      const { data } = await api.get("/api/albuns");
      const publicas = data
        .filter((a) => a.origem === "publico")
        .map((a) => ({
          id: a.id,
          nome: a.nome,
          descricao: a.descricao,
          fotos: a.fotos.map((f) => ({
            url: f.foto.foto,
            id_foto: f.foto.id
          })),
          imagem: a.fotos[0]?.foto?.foto || "",
          data: new Date(a.dtinclusao).toLocaleDateString("pt-BR")
        }));
      setGalerias(publicas);
    } catch {
      handleErro("Erro ao buscar galerias.");
    }
  }, []);

  
  useEffect(() => {
    if (!mensagem) return;
    const id = setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 5000);
    return () => clearTimeout(id);
  }, [mensagem]);

  
  useEffect(() => {
    if (abaAtiva === "criar_galeria") fetchAlbuns();
  }, [abaAtiva, fetchAlbuns]);

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
  };

  
 const handleAdicionarFotos = async (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  const fd = new FormData();
  files.forEach((f) => fd.append("fotos", f));
  fd.append("album_id", albumAberto.id);

  try {
    setLoadingUpload(true);

    // mantém o mesmo POST do endpoint
    const response = await api.post(
      "/api/fotos/adicionar",
      fd
    );

    const novasFotos = response.data.urls;

    const fotosAtualizadas = [...fotosVisuais, ...novasFotos];
    setFotosVisuais(fotosAtualizadas);

    setAlbumAberto((prev) => ({
      ...prev,
      fotos: fotosAtualizadas,
    }));

    handleSucesso(
      files.length > 1
        ? "Fotos adicionadas com sucesso!"
        : "Foto adicionada com sucesso!"
    );
  } catch (err) {
    console.error("Erro ao enviar imagens:", err.response?.data || err.message);
    handleErro("Erro ao enviar imagens.");
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

  // --- Exclusão de álbum ---
  const solicitarExcluirAlbum = (gal) => {
    setAlbumParaExcluir(gal);
    setMostrarConfirmacaoAlbum(true);
    setMenuAberto(null);
  };
  const confirmarExcluirAlbum = async () => {
    setMostrarConfirmacaoAlbum(false);
    try {
      setLoadingUpload(true);
      await api.delete(
        `/api/albuns/${albumParaExcluir.id}`
      );
      handleSucesso("Álbum apagado com sucesso!");
      fetchAlbuns();
      voltar();
    } catch {
      handleErro("Erro ao apagar álbum.");
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <div className="p-6 font-serif min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4 mb-12">
        Configuração
      </h1>

      {/* Abas */}
      <div className="flex border-b mb-6">
        {["marca_dagua", "criar_galeria", "criar_pacote"].map((aba) => (
          <button
            key={aba}
            className={`ml-4 px-4 py-2 font-semibold transition ${
              abaAtiva === aba
                ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
                : "text-gray-500 hover:text-[#c09b2d]"
            }`}
            onClick={() => setAbaAtiva(aba)}
          >
            {aba === "marca_dagua"
              ? "Marca d'água"
              : aba === "criar_galeria"
              ? "Trabalhos"
              : "Criar pacote"}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {mensagem && (
        <div
          className={`border px-4 py-3 rounded-md mb-6 ${
            tipoMensagem === "sucesso"
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          }`}
        >
          {mensagem}
        </div>
      )}

      {/* Marca d'água */}
      {abaAtiva === "marca_dagua" && (
        <ImageUploader onSucesso={handleSucesso} onErro={handleErro} />
      )}

      {/* Galerias Públicas */}
      {abaAtiva === "criar_galeria" && !albumAberto && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galerias.map((g) => (
            <div
              key={g.id}
              className="relative bg-white rounded-2xl shadow-md overflow-hidden transform transition hover:scale-105 cursor-pointer"
              onClick={() => abrirAlbum(g)}
            >
              {/* Três pontinhos para excluir álbum */}
              <div className="absolute top-2 right-2 z-10">
                <button
                  className="text-white bg-black bg-opacity-50 p-1 rounded-full hover:bg-gray-200 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(`album-${g.id}`);
                  }}
                >
                  <MoreVertical size={18} />
                </button>
                {menuAberto === `album-${g.id}` && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-300 rounded shadow-md transition-all duration-200 animate-fade-in">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        solicitarExcluirAlbum(g);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100"
                    >
                      <Trash size={16} /> Excluir
                    </button>
                  </div>
                )}
              </div>

              <img src={g.imagem} alt={g.nome} className="w-full h-60 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-[#252525]">{g.nome}</h3>
                <p className="text-gray-500 italic">{g.descricao}</p>
                <p className="text-sm text-[#c09b2d] mt-2">
                  {g.fotos.length} fotos | {g.data}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detalhe do álbum */}
      {abaAtiva === "criar_galeria" && albumAberto && (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={voltar}
              className="flex items-center text-[#c09b2d] hover:underline gap-1"
            >
              <ArrowLeft size={18} /> Voltar
            </button>
            {/* Três pontinhos de álbum aberto */}
            <div className="relative">
              <button
                className="text-black p-1 rounded-full hover:bg-gray-200 transition"
                onClick={() => toggleMenu("album-open")}
              >
                <MoreVertical size={18} />
              </button>
              {menuAberto === "album-open" && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      solicitarExcluirAlbum(albumAberto);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    <Trash size={16} /> Excluir álbum
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
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
                  />
                ) : (
                  <div className="text-center text-gray-400 p-8">Sem capa</div>
                )}
              </div>
              <div className="flex justify-around text-[#b1783d] text-2xl">
                <ImageIcon className="cursor-pointer hover:text-[#a76a2b]" />
                <Settings className="cursor-pointer hover:text-[#a76a2b]" />
                <Edit2 className="cursor-pointer hover:text-[#a76a2b]" />
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
                    className="relative break-inside-avoid overflow-hidden rounded-2xl shadow transform hover:scale-105 transition group"
                  >
                    <img
                      src={foto.url}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-auto object-contain rounded-2xl cursor-pointer"
                      onClick={() => {
                        setIndiceSelecionado(idx);
                        setImagemSelecionada(foto.url);
                      }}
                    />
                    {/* Três pontinhos em cada foto */}
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
                      <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-20">
                        <button
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            solicitarExcluirFoto(foto.id_foto, idx);
                          }}
                        >
                          <Trash size={16} /> Excluir
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
      )}

      {/* Modal de Zoom */}
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
                const novo =
                  (indiceSelecionado - 1 + fotosVisuais.length) %
                  fotosVisuais.length;
                setIndiceSelecionado(novo);
                setImagemSelecionada(fotosVisuais[novo].url);
              }}
            >
              ◀
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-black bg-opacity-10 rounded-full px-3 py-1 transition-transform duration-200 hover:scale-110 hover:bg-opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                const novo = (indiceSelecionado + 1) % fotosVisuais.length;
                setIndiceSelecionado(novo);
                setImagemSelecionada(fotosVisuais[novo].url);
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

      {/* Modal de confirmação de foto */}
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

      {/* Modal de confirmação de álbum */}
      {mostrarConfirmacaoAlbum && albumParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-6 py-5 w-full max-w-md shadow-xl font-serif">
            <h2 className="text-[#b88a1c] text-xl font-bold mb-4">
              Confirmar exclusão
            </h2>
            <p className="text-gray-800 mb-6">
              Tem certeza que deseja excluir o álbum{" "}
              <span className="font-semibold">
                “{albumParaExcluir.nome}”
              </span>{" "}
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
                onClick={confirmarExcluirAlbum}
                className="px-4 py-2 rounded bg-[#c09b2d] text-white hover:bg-[#a88724]"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {loadingUpload && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <img src="/loading.gif" alt="Carregando..." className="w-32 h-20" />
        </div>
      )}
    </div>
  );
};

export default Configuracoes;
