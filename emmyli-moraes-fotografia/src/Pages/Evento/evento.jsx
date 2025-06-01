import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { FaCommentDots, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal";
import { parseJwt } from "../../utils/jwtUtils";

const Evento = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //  Estados de dados
  const [loading, setLoading] = useState(true);
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [evento, setEvento] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [pacoteSelecionado, setPacoteSelecionado] = useState(null);

  //  Estados de seleção de imagens
  const [imagemSelecionada, setImagemSelecionada] = useState([]);
  const [imagemClickada, setImagemClickada] = useState(null);
  const [indiceImagemAtual, setIndiceImagemAtual] = useState(null);

  // Estados de comentários
  const [comentario, setComentario] = useState("");
  const [comentariosFoto, setComentariosFoto] = useState([]);
  const [abrirComentarios, setAbrirComentarios] = useState(false);
  const [mostrarIconComentario, setMostrarIconComentario] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Flag para embaçar imagens quando:

  const [isSnipping, setIsSnipping] = useState(false);

  // Buscar informações do usuário a partir do token (uma única vez)
  useEffect(() => {
    const token = localStorage.getItem("informacaoToken");
    if (!token) return;
    try {
      const payload = parseJwt(token);
      setUsuarioInfo(payload);
    } catch {
      // se token inválido ou expirado, não setamos nada
    }
  }, []);

  //  Buscar detalhes do evento (fotos + marcaDagua)

  useEffect(() => {
    const buscarEvento = async () => {
      try {
        const baseUrl = "http://localhost:3000/api/eventos";
        const filter = `?filters%5Burlevento%5D=http%3A%2F%2Flocalhost%3A5173%2Falbum%2F${id}&include=detalhes,marcaDagua`;
        const response = await api.get(baseUrl + filter);
        if (Array.isArray(response.data) && response.data.length > 0) {
          const ev = response.data[0];
          setEvento(ev);
          setFotos(ev.detalhes || []);
        }
      } catch (error) {
        console.error("Erro ao buscar evento:", error.message);
      } finally {
        setLoading(false);
      }
    };
    buscarEvento();
  }, [id]);

  // Buscar lista de produtos (pacotes)

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/api/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error.message);
      }
    };
    fetchProdutos();
  }, []);

  //  Selecionar automaticamente o primeiro pacote, quando produtos chegam

  useEffect(() => {
    if (produtos && produtos.length > 0) {
      setPacoteSelecionado(produtos[0]);
    }
  }, [produtos]);

  //  Carregar comentários sempre que a imagem ampliada mudar

  useEffect(() => {
    if (indiceImagemAtual === null || !fotos[indiceImagemAtual]) return;
    const carregarComentarios = async () => {
      try {
        const fotoId = fotos[indiceImagemAtual].id;
        const response = await api.get(
          `/api/comentarios?detalhe=${fotoId}&include=usuario`
        );
        setComentariosFoto(response.data);
      } catch (error) {
        console.error("Erro ao buscar comentários:", error.message);
      }
    };
    carregarComentarios();
  }, [indiceImagemAtual, comentario]);

  //  BLOQUEIO “PrintScreen” e “Ctrl+P / ⌘+P” (bloqueio de impressão)

  useEffect(() => {
    const handleKeyDown = (e) => {
      // “PrintScreen” ou keyCode 44
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault?.();
        try {
          navigator.clipboard.writeText("");
        } catch {}
        setIsSnipping(true);
      }
      // Bloquear Ctrl+P / ⌘+P (impressão de página)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault?.();
      }
      // Apertou Shift → embaçar todas as imagens
      if (e.key === "Shift") {
        setIsSnipping(true);
      }
      // Apertou Windows/Meta → embaçar todas as imagens
      if (e.key === "Meta") {
        setIsSnipping(true);
      }
    };

    // 2) Ao soltar Shift ou Meta, removemos o blur (se não houver outro motivo ativo)
    const handleKeyUp = (e) => {
      if (e.key === "Shift") {
        setIsSnipping(false);
      }
      if (e.key === "Meta") {
        setIsSnipping(false);
      }
    };

    // 3) Quando a aba fica oculta (“hidden”), embaçamos
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsSnipping(true);
      } else {
        setIsSnipping(false);
      }
    };

    // 4) Quando a janela dispara blur, embaçamos
    const onBlur = () => {
      setIsSnipping(true);
    };
    // 5) Quando a janela retoma o foco, removemos o blur
    const onFocus = () => {
      setIsSnipping(false);
    };

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

  //  Bloquear clique-direito em todo o container principal
  const handleContextMenu = (e) => {
    e.preventDefault();
    setIsSnipping(true);
  };

  //  Funções para navegar entre as imagens no modo “zoom”
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

  const handleComprar = async () => {
    let total;
    let preco_unitario;
    let quantidade;

    if (imagemSelecionada.length === 0) {
      alert("Selecione pelo menos uma imagem para comprar.");
      return;
    }

    if (pacoteSelecionado.quantidade_fotos == 1) {
      // se o pacote for por foto individual
      total = imagemSelecionada.length * pacoteSelecionado.preco;
      preco_unitario = pacoteSelecionado.preco;
      quantidade = imagemSelecionada.length;
    } else {
      if (imagemSelecionada.length < pacoteSelecionado.quantidade_fotos) {
        alert(`Selecione as ${pacoteSelecionado.quantidade_fotos} fotos`);
        return;
      }
      total = pacoteSelecionado.preco;
      preco_unitario =
        pacoteSelecionado.preco / pacoteSelecionado.quantidade_fotos;
      quantidade = pacoteSelecionado.quantidade_fotos;
    }

    const payload = {
      usuario_id: usuarioInfo.idusuario,
      evento_id: evento.id,
      descricao: evento.descricao,
      preco_unitario: preco_unitario,
      quantidade,
      total,
      fotos: imagemSelecionada.map((id) => ({ id_foto: id })),
    };
    console.log("fotos enviadas: ", payload.fotos);
    try {
      // Verifica se o carrinho já existe para o evento
      const { data: carrinhosExistentes } = await api.get(
        `/api/carrinho?usuario_id=${usuarioInfo.idusuario}`
      );

      const carrinhoExistente = carrinhosExistentes.find(
        (c) => c.evento_id === evento.id
      );

      if (carrinhoExistente) {
        // Atualiza carrinho
        const response = await api.put(
          `/api/carrinho/${carrinhoExistente.id}`,
          payload
        );
        console.log("Carrinho atualizado:", response.data);
      } else {
        // Cria novo carrinho
        const response = await api.post("/api/carrinho", payload);
        console.log("Carrinho criado:", response.data);
      }
      navigate("/carrinho");
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  };

  //  Salvar comentário da foto ampliada

  const handleComentario = async (e) => {
    e.stopPropagation();
    if (!comentario.trim()) {
      alert("Por favor, escreva um comentário.");
      return;
    }
    try {
      await api.post("/api/comentarios", {
        usuarioId: usuarioInfo.idusuario,
        detalheEventoId: imagemClickada.id,
        Comentario: comentario,
      });
      setShowModal(false);
      setComentario("");
    } catch (error) {
      console.error("Erro ao salvar comentário:", error.message);
    }
  };

  //  Apagar comentário

  const apagarComentario = async (idComentario) => {
    try {
      await api.delete(`/api/comentarios/${idComentario}`);
      setComentariosFoto((prev) => prev.filter((c) => c.id !== idComentario));
    } catch (error) {
      console.error("Erro ao apagar comentário:", error.message);
    }
  };

  // Se ainda estiver carregando, exiba um “loading” genérico

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="text-white">Carregando…</div>
      </div>
    );
  }

  return (
    <div className="relative font-serif bg-[#0B3727] min-h-screen pb-8">
      <div onContextMenu={handleContextMenu}>
        {/* BANNER E BOTÃO “VER GALERIA” */}

        <div className="relative mb-8 border-b-2 border-[#c09b2d]">
          {fotos && fotos[0] && (
            <img
              className="w-full h-screen object-cover opacity-40"
              alt="Capa do evento"
              src={fotos[0].foto}
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
              className="px-6 py-3 bg-white/80 text-gray-800 font-semibold text-lg rounded-md shadow-lg hover:bg-white transition-all duration-300 backdrop-blur-sm border border-white/60 hover:scale-105"
            >
              VER GALERIA
            </button>
          </div>
        </div>

        {/* SELETOR DE PACOTES */}

        {produtos && produtos.length > 0 && (
          <div className="flex flex-col justify-center items-center border-b-2 border-[#c09b2d] mb-8">
            <p className="text-white mb-2 text-lg">Selecione o pacote:</p>
            <select
              className="max-w-1/2 p-2 border border-gray-300 rounded-lg mb-8"
              value={pacoteSelecionado?.id || ""}
              onChange={(e) => {
                const idSel = Number(e.target.value);
                const prod = produtos.find((p) => p.id === idSel);
                setPacoteSelecionado(prod);
              }}
            >
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.quantidade_fotos}{" "}
                  {produto.quantidade_fotos > 1 ? "fotos" : "foto"} por{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(produto.preco)}
                </option>
              ))}
            </select>
          </div>
        )}

        <section className={`protectable-imgs ${isSnipping ? "blurred" : ""}`}>
          {/* GALERIA DE MINIATURAS */}

          <div
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-8"
            id="galeria-section"
          >
            {fotos.map((foto, idx) => (
              <div
                key={foto.id}
                className="relative break-inside-avoid overflow-hidden rounded-xl shadow group"
              >
                {/* Checkbox para seleção */}

                <input
                  type="checkbox"
                  className="absolute top-2 left-2 z-20 w-5 h-5 accent-yellow-600"
                  checked={imagemSelecionada.some((f) => f.id === foto.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (e.target.checked) {
                      setImagemSelecionada((prev) => [...prev, foto]);
                    } else {
                      setImagemSelecionada((prev) =>
                        prev.filter((f) => f.id !== foto.id)
                      );
                    }
                  }}
                />

                {/* Miniatura da foto */}

                <img
                  src={foto.foto}
                  alt={`Foto ${foto.id}`}
                  className="w-full h-auto object-contain rounded-xl cursor-pointer transition-all duration-200"
                  onClick={() => {
                    setImagemClickada(foto);
                    setIndiceImagemAtual(idx);
                  }}
                />

                {/* Marca d’água sobreposta (se existir). Mesmo que a imagem
                    interna receba blur, essa div permanece sobreposta. */}

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

          {/* BOTÃO “COMPRAR” */}

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

          {/* MODAL DE ZOOM + COMENTÁRIOS */}

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
                  className={`
                    max-h-[90vh]
                    w-auto
                    object-contain
                    rounded-xl
                    shadow-lg
                    transition-all
                    duration-200
                    ${isSnipping ? "filter blur-lg opacity-50" : ""}
                  `}
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

                {/* Botão “‹” imagem anterior */}

                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <button
                    onClick={handleImagemAnterior}
                    className="text-white text-3xl"
                  >
                    ‹
                  </button>
                </div>

                {/* Botão “›” imagem próxima */}

                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <button
                    onClick={handleProximaImagem}
                    className="text-white text-3xl"
                  >
                    ›
                  </button>
                </div>

                {/* Ícone “+” para abrir comentários */}

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

                {/* Seção de comentários */}

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
                          (c) =>
                            Number(c.detalheEventoId) ===
                            Number(imagemClickada.id)
                        )
                        .map((c) => (
                          <div
                            key={c.id}
                            className="mb-4 border-b border-white pb-2"
                          >
                            <p className="font-bold text-yellow-300">
                              {c.usuario.nome}
                            </p>
                            <p className="text-md">{c.Comentario}</p>
                            <p className="text-xs text-gray-300">
                              {new Date(c.dtinclusao).toLocaleDateString(
                                "pt-BR",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </p>
                            {c.usuarioId === usuarioInfo?.idusuario && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  apagarComentario(c.id);
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
        </section>
      </div>
    </div>
  );
};

export default Evento;
