import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, use } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { FaCommentDots, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal";
import { parseJwt } from "../../utils/jwtUtils";

const Evento = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [imagemClickada, setImagemClickada] = useState(null);
  const [indiceSelecionado, setIndiceSelecionado] = useState(null);
  const [imagemSelecionada, setImagemSelecionada] = useState([]);
  const [evento, setEvento] = useState(null);
  const [pacoteSelecionado, setPacoteSelecionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comentario, setComentario] = useState("");
  const [comentariosFoto, setComentariosFoto] = useState([]);
  const [abrirComentarios, setAbrirComentarios] = useState(null);
  const [mostrarIconComentario, setMostrarIconComentario] = useState(true);
  const [indiceImagemAtual, setIndiceImagemAtual] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const carregarComentarios = async () => {
      if (indiceImagemAtual !== null && fotos[indiceImagemAtual]) {
        try {
          const response = await api.get(
            `/api/comentarios?detalhe=${fotos[indiceImagemAtual].id}&include=usuario`
          );
          setComentariosFoto(response.data);
        } catch (error) {
          console.error("Erro ao buscar comentários:", error.message);
        }
      }
    };

    carregarComentarios();
  }, [indiceImagemAtual, comentario]);

  useEffect(() => {
    const fetchUsuarioInfo = () => {
      const token = localStorage.getItem("informacaoToken");
      const payload = parseJwt(token);
      setUsuarioInfo(payload);
    };
    fetchUsuarioInfo();
  }, []);

  useEffect(() => {
    buscarEvento();
  }, []);

  useEffect(() => {
    if (!evento) return;

    const detalhes = evento.detalhes || [];
    setFotos(detalhes);
    console.log("Detalhes do evento:", detalhes);
  }, [evento]);

  useEffect(() => {
    console.log("evento", evento);
    console.log("fotos", fotos);
    console.log("imagemSelecionada:", imagemSelecionada);
    console.log("imagemClickada:", imagemClickada);
    console.log("indiceImagemAtual", indiceImagemAtual);
  }, [imagemSelecionada, imagemClickada, indiceImagemAtual]);

  useEffect(() => {
    const mostrarComentarios = async () => {
      if (imagemClickada) {
        try {
          const filter = `?detalhe=${fotos}&include=usuario`;
          const response = await api.get("/api/comentarios/" + filter);
          setComentariosFoto(response.data);
        } catch (error) {
          console.error("Erro ao buscar imagem:", error.message);
        }
      }
    };
    mostrarComentarios();
  }, [imagemClickada, comentario]);

  
    useEffect(() => {
      const fetchProdutos = async () => {
        const response = await api.get("/api/produtos");
        setProdutos(response.data);
      };
      fetchProdutos();
    }, []);

  const buscarEvento = async () => {
    try {
      // A URL base da sua API
      const baseUrl = "http://localhost:3000/api/eventos";

      // Construindo a URL de requisição com os filtros corretamente
      const filter = `?filters%5Burlevento%5D=http%3A%2F%2Flocalhost%3A5173%2Falbum%2F${id}&include=detalhes,marcaDagua`;

      // Fazendo a requisição GET com o filtro correto
      const response = await api.get(baseUrl + filter);

      // Salvando os dados do evento
      setEvento(response.data[0]);
      console.log("Evento:", response.data);
    } catch (error) {
      console.error("Erro ao buscar evento:", error.message);
    }
  };

  const handleImagemAnterior = () => {
    if (indiceImagemAtual > 0) {
      const novoIndice = indiceImagemAtual - 1;
      setIndiceImagemAtual(novoIndice);
      setImagemClickada(fotos[novoIndice]);
    }
  };

  const handleProximaImagem = () => {
    if (indiceImagemAtual < fotos.length - 1) {
      const novoIndice = indiceImagemAtual + 1;
      setIndiceImagemAtual(novoIndice);
      setImagemClickada(fotos[novoIndice]);
    }
  };

  const handleComprar = () => {
    if (imagemSelecionada.length === 0) {
      alert("Selecione pelo menos uma imagem para comprar.");
      return;
    }

    setSelectedItem("carrinho");
  };

  const handleComentario = async (e) => {
    e.stopPropagation();
    if (!comentario.trim()) {
      alert("Por favor, escreva um comentário.");
      return;
    }
    try {
      console.log("comentario:", comentario);
      const response = await api.post("/api/comentarios", {
        usuarioId: usuarioInfo.idusuario,
        detalheEventoId: imagemClickada.id,
        Comentario: comentario,
      });

      console.log("Comentário salvo:", response.data);
      setShowModal(false);
      setComentario("");
    } catch (error) {
      console.error("Erro ao salvar comentário:", error.message);
    }
  };

  const apagarComentario = async (idComentario) => {
    try {
      const response = await api.delete(`/api/comentarios/${idComentario}`);
      console.log("Comentário apagado:", response.data);
      setComentariosFoto(
        comentariosFoto.filter((comentario) => comentario.id !== idComentario)
      );
    } catch (error) {
      console.error("Erro ao apagar comentário:", error.message);
    }
  };

  return (
    <div className="relative font-serif bg-[#0B3727] min-h-screen pb-8">
      <div className="relative font-serif bg-[#0B3727] min-h-screen">
        <>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="relative mb-8 border-b-2 border-[#c09b2d]">
                {fotos && (
                  <img
                    className="w-screen h-screen object-cover opacity-40"
                    alt="Capa do evento"
                    src={fotos[0]?.foto}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  {evento?.nome && (
                    <h1 className="text-white text-3xl font-bold text-center px-4">
                      {evento.nome.toUpperCase()}
                    </h1>
                  )}
                </div>

                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => {
                      document
                        .getElementById("galeria-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3 bg-white/80 text-gray-800 font-semibold text-lg rounded-mdS shadow-lg hover:bg-white transition-all duration-300 backdrop-blur-sm border border-white/60 hover:scale-105"
                  >
                    VER GALERIA
                  </button>
                </div>
              </div>
              {produtos && (
                <div className="flex flex-col justify-center items-center border-b-2 border-[#c09b2d]">
                  <p className="text-white mb-2 text-lg">Selecione o pacote:</p>
                 
                  <select
                    className="max-w-1/2 p-2 border border-gray-300 rounded-lg mb-8"
                    onChange={(e) => {
                      const pacoteSelecionado = e.target.value;
                      setPacoteSelecionado(pacoteSelecionado);
                    }}
                  >
                     {produtos.map((produto) => (
                    <option value={produto.id}>
                      {produto.quantidade_fotos} fotos por R$ {produto.preco}
                    </option>
 
                    ))}
                  </select>
                </div>
              )}

              <div
                className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-8"
                id="galeria-section"
              >
                {fotos.map((foto) => (
                  <div
                    key={foto.id}
                    className="relative break-inside-avoid overflow-hidden rounded-xl shadow group"
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      className="absolute top-2 left-2 z-20 w-5 h-5 accent-yellow-600"
                      checked={imagemSelecionada.includes(foto)}
                      onChange={(e) => {
                        e.stopPropagation();
                        if (e.target.checked) {
                          setImagemSelecionada([...imagemSelecionada, foto]);
                        } else {
                          setImagemSelecionada(
                            imagemSelecionada.filter((i) => i !== foto)
                          );
                        }
                      }}
                    />

                    {/* Foto principal */}
                    <img
                      src={foto.foto}
                      alt={`Foto ${foto.id + 1}`}
                      className="w-full h-auto object-contain rounded-xl cursor-pointer"
                      onClick={() => {
                        setImagemClickada(foto);
                        setIndiceSelecionado(foto);
                      }}
                    />

                    {evento?.marcaDagua?.imagem && (
                      <div
                        className="absolute inset-0 z-10 pointer-events-none opacity-40"
                        style={{
                          backgroundImage: `url(${evento.marcaDagua.imagem})`,
                          backgroundRepeat: "repeat",
                          backgroundSize: "200px auto",
                          mixBlendMode: "multiply",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {imagemSelecionada.length > 0 && (
                <div className="fixed bottom-4 right-4 z-50">
                  <button
                    className="bg-[#c09b2d] text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition"
                    onClick={handleComprar}
                  >
                    Comprar ({imagemSelecionada.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </>

        {imagemClickada && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
            onClick={() => {
              setImagemClickada(null);
              setIndiceImagemAtual(null);
              setAbrirComentarios(false);
              setMostrarIconComentario(true);
            }}
          >
            <div
              className="relative inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imagemClickada.foto}
                alt="Zoom"
                className="max-h-[90vh] w-auto object-contain rounded-xl shadow-lg"
              />

              {/* Marca d'água sobreposta com repetição */}
              {evento?.marcaDagua?.imagem && (
                <div
                  className="absolute inset-0 z-10 pointer-events-none opacity-40"
                  style={{
                    backgroundImage: `url(${evento.marcaDagua.imagem})`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px auto",
                    mixBlendMode: "multiply",
                  }}
                />
              )}

              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <button
                  onClick={handleImagemAnterior}
                  className="text-white text-3xl"
                >
                  {"‹"}
                </button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <button
                  onClick={handleProximaImagem}
                  className="text-white text-3xl"
                >
                  {"›"}
                </button>
              </div>

              {mostrarIconComentario && (
                <div className="absolute bottom-2 right-2 z-10 flex items-center justify-center bg-white bg-opacity-90 rounded-full p-2 shadow-md cursor-pointer">
                  <button
                    onClick={() => {
                      setAbrirComentarios(true);
                      setMostrarIconComentario(false);
                    }}
                  >
                    <FaCommentDots className="text-gray-700 text-lg" />
                  </button>
                </div>
              )}

              {abrirComentarios && (
                <div className="absolute bottom-0 left-0 w-full max-h-[20vh] overflow-y-auto bg-black bg-opacity-20 text-white p-4 rounded-xl">
                  <button
                    onClick={() => {
                      setAbrirComentarios(false);
                      setMostrarIconComentario(true);
                    }}
                    className="absolute top-2 right-2 text-white text-md font-bold bg-black bg-opacity-10 rounded-full px-3 hover:bg-opacity-80"
                  >
                    x
                  </button>
                  {comentariosFoto.length > 0 ? (
                    comentariosFoto
                      .filter(
                        (comentario) =>
                          Number(comentario.detalheEventoId) ===
                          Number(imagemClickada.id)
                      )
                      .map((comentario) => (
                        <div
                          key={comentario.id}
                          className="mb-4 border-b border-white pb-2"
                        >
                          <p className="font-bold text-yellow-300">
                            {comentario.usuario.nome}
                          </p>
                          <p className="text-md">{comentario.Comentario}</p>
                          <p className="text-xs text-gray-300">
                            {new Date(comentario.dtinclusao).toLocaleDateString(
                              "pt-BR",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </p>

                          {comentario.usuarioId === usuarioInfo.idusuario && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                apagarComentario(comentario.id);
                              }}
                              className="mt-2 text-red-400 hover:text-red-600"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      ))
                  ) : (
                    <p className="text-sm text-gray-300">
                      Nenhum comentário ainda.
                    </p>
                  )}

                  <button
                    className="w-10 h-10 bg-[#c09b2d] text-white rounded-full flex items-center justify-center hover:bg-[#a88724]"
                    onClick={() => setShowModal(true)}
                  >
                    +
                  </button>
                  {showModal && (
                    <Modal
                      isOpen={showModal}
                      onClose={() => setShowModal(false)}
                      title="Comentário"
                    >
                      <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4 h-28 text-black"
                      />
                      <button
                        type="button"
                        onClick={handleComentario}
                        className="bg-[#c09b2d] text-white px-6 py-2 rounded hover:bg-[#a88724]"
                      >
                        Enviar
                      </button>
                    </Modal>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Evento;
