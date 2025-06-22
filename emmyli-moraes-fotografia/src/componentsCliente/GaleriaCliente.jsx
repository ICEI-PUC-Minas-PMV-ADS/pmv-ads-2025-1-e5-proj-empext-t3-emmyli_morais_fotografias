import { useEffect, useState } from "react";
import { parseJwt } from "../utils/jwtUtils";
import { api } from "../services/api";
import { ArrowLeft, Download } from "lucide-react";


const GaleriaCliente = () => {
  const [loading, setLoading] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("fotos_compradas");
  const [compras, setCompras] = useState([]);
  const [favoritas, setFavoritas] = useState([]);
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [albunsComprados, setAlbunsComprados] = useState([]);
  const [albumAberto, setAlbumAberto] = useState(null);
  const [menuAberto, setMenuAberto] = useState(null);
  const [fotosVisuais, setFotosVisuais] = useState([]);
  const [download, setDownload] = useState(false);
  //  Zoom de imagem
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [indiceSelecionado, setIndiceSelecionado] = useState(0);

  const [isSnipping, setIsSnipping] = useState(false);

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "PrintScreen" || e.keyCode === 44) {
      e.preventDefault?.();
      setIsSnipping(true);
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
      e.preventDefault?.();
      setIsSnipping(true);
    }
    if (e.key === "Shift" || e.key === "Meta") {
      setIsSnipping(true);
    }
  };

  const handleKeyUp = (e) => {
    if (["Shift", "Meta"].includes(e.key)) {
      setIsSnipping(false);
    }
  };

  const onVisibilityChange = () => {
    setIsSnipping(document.visibilityState === "hidden");
  };

  const onBlur = () => setIsSnipping(true);
  const onFocus = () => setIsSnipping(false);

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("blur", onBlur);
  window.addEventListener("focus", onFocus);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.removeEventListener("keyup", handleKeyUp);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("blur", onBlur);
    window.removeEventListener("focus", onFocus);
  };
}, []);

const handleContextMenu = (e) => e.preventDefault();

  useEffect(() => {
    const fetchUsuarioInfo = () => {
      const token = localStorage.getItem("informacaoToken");
      const payload = parseJwt(token);
      setUsuarioInfo(payload);
    };
    fetchUsuarioInfo();
  }, []);

  useEffect(() => {
    if (!usuarioInfo) return;
    fetchAlbuns();
  }, [usuarioInfo]);

  useEffect(() => {
    if (!albumAberto) return;
    setDownload(albumAberto.downloadfoto);
    console.log("Album aberto:", albumAberto);
  }, [albumAberto]);

  const fetchAlbuns = async () => {
    try {
      const response = await api.get("/api/albuns", {
        params: {
          usuario_id: `${usuarioInfo?.idusuario}`,
        },
      });

      const albunsFormatados = response.data.map((album) => {
        const fotosFormatadas =
          album.fotos?.map((f) => {
            // Fluxo 1: tem detalhe_evento associado
            if (f.id_foto && f.foto) {
              return {
                id_foto: f.id_foto,
                url: f.foto.foto,
              };
            }

            // Fluxo 2: imagem enviada direto, sem detalhe_evento
            return {
              id_foto: null,
              url: f.foto_url || "",
            };
          }) || [];

        return {
          id: album.id,
          nome: album.nome,
          descricao: album.descricao || "",
          usuario: album.usuario?.nome || "Desconhecido",
          downloadfoto: album.downloadfoto,
          fotos: fotosFormatadas,
          imagem: fotosFormatadas[0]?.url || "",
          data: new Date(album.dtinclusao).toLocaleDateString("pt-BR") || "",
        };
      });

      setAlbunsComprados(albunsFormatados);
    } catch (error) {
      console.error(
        "Erro ao buscar eventos:",
        error.response?.data || error.message
      );
    }
  };

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

  const baixarFotosIndividualmente = async () => {
    for (let i = 0; i < fotosVisuais.length; i++) {
      const foto = fotosVisuais[i];
      try {
        const response = await fetch(foto.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `foto_${i + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // Pequeno atraso entre downloads para evitar bloqueio dos navegadores
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Erro ao baixar a foto ${i + 1}:`, error);
      }
    }
  };

  return (

    <div 
      onContextMenu={handleContextMenu}
      className="relative p-4 sm:p-6 font-serif bg-[#F9F9F9] min-h-screen"
      style={{ filter: isSnipping ? "blur(8px)" : "none", userSelect: "none" }}>
        <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4 mb-12">
          Galeria
        </h1>

      {/* Abas */}
      <div className="flex border-b mb-6 ">
        {["fotos_compradas"].map((aba) => (
          <button
            key={aba}
            className={`ml-4 px-4 py-2 font-semibold transition ${
              abaAtiva === aba
                ? "border-b-4 border-[#c09b2d] text-[#c09b2d]"
                : "text-gray-500 hover:text-[#c09b2d]"
            }`}
            onClick={() => setAbaAtiva(aba)}
          >
            {aba === "fotos_compradas" ? "Fotos Compradas" : ""}
          </button>
        ))}
      </div>

      {/* Fotos compradas em cards menores */}
      {abaAtiva === "fotos_compradas" && !albumAberto && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
          {albunsComprados.length > 0 ? (
            <>
              {albunsComprados.map((g) => (
                <div
                  key={g.id}
                  className="relative bg-white rounded-2xl shadow-md overflow-hidden transform transition hover:scale-105 cursor-pointer"
                >
                  <div onClick={() => abrirAlbum(g)}>
                    <div className="w-full h-60 bg-gray-100 overflow-hidden">
                      {g.fotos[0]?.url ? (
                        <img
                          src={g.fotos[0].url}
                          className="w-full h-full object-cover rounded-t-2xl"
                        />
                      ) : (
                        <div className="text-center text-gray-400 p-8">
                          Sem capa
                        </div>
                      )}
                    </div>

                    <div className="p-4 text-center">
                      <h3 className="text-xl font-semibold text-[#252525]">
                        {g.nome}
                      </h3>
                      {g.descricao && (
                        <p className="text-gray-500 italic">{g.descricao}</p>
                      )}
                      <p className="text-sm text-[#c09b2d] mt-2">
                        {g.fotos.length} fotos | {g.data}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="py-6 px-4 text-center text-gray-500 col-span-4">
              Nenhuma compra encontrada.
            </p>
          )}
        </div>
      )}

      {/* Detalhe do álbum (trabalho)  */}
      {abaAtiva === "fotos_compradas" && albumAberto && (
        <>
          <div className="flex  items-center mb-4 ">
            <button
              onClick={voltar}
              className="flex items-center text-[#c09b2d] hover:underline gap-1"
            >
              <ArrowLeft size={18} /> Voltar
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 ">
            {/* Sidebar do álbum */}

            <div className="bg-white p-4 rounded-xl shadow-lg max-w-sm w-full lg:min-h-[80vh]">
              <p className="text-[#c09b2d] text-xl font-bold text-center mb-2">
                {albumAberto.nome}
              </p>
              <div className="w-full h-[300px] bg-gray-100 rounded-2xl overflow-hidden mb-4">
                {albumAberto.imagem ? (
                  <img
                    src={albumAberto.fotos[0].url}
                    alt="Capa"
                    className="w-full h-full object-cover object-top rounded-xl"
                    
                  />
                ) : (
                  <div className="text-center text-gray-400 p-8">Sem capa</div>
                )}
              </div>
            </div>

            {/* Grid de fotos do álbum */}
            <div className="flex-1 ">
              <div className="flex justify-between items-center mb-8 border-b-2 border-[#c09b2d] pb-2 ">
                <h2 className="text-2xl text-[#b1783d] font-bold">Fotos</h2>
                {download === true && (
                  <button
                    onClick={baixarFotosIndividualmente}
                    className="bg-[#c09b2d] text-white px-4 py-2 rounded-xl hover:bg-[#a88325] transition font-semibold shadow"
                  >
                    Baixar todas as fotos
                  </button>
                )}
              </div>
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 ">
                {fotosVisuais.map((foto, idx) => (
                  <div
                    key={idx}
                    className="relative break-inside-avoid transform hover:scale-105 transition group"
                  >

                    {/* Wrapper fixo e responsivo */}
                    
                    <img
                      src={foto.url}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-auto object-contain rounded-2xl cursor-pointer"
                      onClick={() => {
                        if (download) {
                          setIndiceSelecionado(idx);
                          setImagemSelecionada(foto.url);
                        }
                      }}
                    />

                    
                    {!download && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-2xl pointer-events-none">
                        <span className="text-white text-2xl font-bold">🔒 Bloqueado</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/*  Modal de Zoom de Imagem  */}
      {imagemSelecionada && download === true && (
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

            {/* Botão de fechar */}
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold z-50 bg-black bg-opacity-10 rounded-full px-3 transition-transform duration-200 hover:scale-110 hover:bg-opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                setImagemSelecionada(null);
              }}
            >
              ×
            </button>

            {/* Botão anterior */}
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-black bg-opacity-10 rounded-full px-3 py-1 transition-transform duration-200 hover:scale-110 hover:bg-opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                const novoIndice =
                  (indiceSelecionado - 1 + fotosVisuais.length) %
                  fotosVisuais.length;
                setIndiceSelecionado(novoIndice);
                setImagemSelecionada(fotosVisuais[novoIndice].url);
              }}
            >
              ◀
            </button>

            {/* Botão próximo */}
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-black bg-opacity-10 rounded-full px-3 py-1 transition-transform duration-200 hover:scale-110 hover:bg-opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                const novoIndice =
                  (indiceSelecionado + 1) % fotosVisuais.length;
                setIndiceSelecionado(novoIndice);
                setImagemSelecionada(fotosVisuais[novoIndice].url);
              }}
            >
              ▶
            </button>

            {/* Tarja preta no rodapé com botão de download */}
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-40 py-2 px-4 flex justify-center rounded-b-xl">
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    const response = await fetch(imagemSelecionada, {
                      mode: "cors",
                    });
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download =
                      imagemSelecionada.split("/").pop() || "imagem.jpg";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url); // libera memória
                  } catch (error) {
                    console.error("Erro ao baixar a imagem:", error);
                  }
                }}
                className="text-white hover:text-gray-300 transition"
                title="Baixar imagem"
              >
                <Download size={28} />
              </button>
            </div>
          </div>

          <button>
            <Download />
          </button>
        </div>
      )}
    </div>
  );
};

export default GaleriaCliente;
