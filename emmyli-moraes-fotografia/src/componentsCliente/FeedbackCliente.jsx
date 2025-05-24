import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { api } from "../services/api";
import Modal from "../components/Modal";
import { parseJwt } from "../utils/jwtUtils";

const FeedbackCliente = () => {
  const [loading, setLoading] = useState(false);
  const [albumSelecionado, setAlbumSelecionado] = useState([]);
  const [albuns, setAlbuns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [satisfacao, setSatisfacao] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [usuarioInfo, setUsuarioInfo] = useState(null);

  useEffect(() => {
    const fetchAlbuns = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/albuns");
        setAlbuns(response.data);
        const albunsCliente = response.data.filter(
          (album) => album.origem === "cliente"
        );

        const albunsFormatados = albunsCliente.map((album) => ({
          id: album.id,
          cliente: album.usuario?.nome || "Cliente",
          nome: album.nome,
          descricao: album.descricao || "",
          fotos:
            album.fotos?.map((f) => ({
              id_foto: f.foto?.id,
              url: f.foto?.foto,
            })) || [],
          imagem: album.fotos?.[0]?.foto?.foto || "",
          data: new Date(album.dtinclusao).toLocaleDateString("pt-BR") || "",
        }));

        setAlbuns(albunsFormatados);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbuns();
  }, []);

  useEffect(() => {
    const fetchUsuarioInfo = () => {
      const token = localStorage.getItem("informacaoToken");
      const payload = parseJwt(token);
      setUsuarioInfo(payload);
    };
    fetchUsuarioInfo();
  }, []);

  const handleFeedback = async () => {
    setLoading(true);
    try {
      const response = await api.post("/api/feedbacks", {
        usuarioId: usuarioInfo.idusuario,
        albumId: albumSelecionado.album_id,
        feedback,
        satisfacao,
      });
      if (response.status === 201) {
        alert("Feedback enviado com sucesso!");
        setIsModalOpen(false);
        setAlbumSelecionado(null);
        setFeedback("");
        setSatisfacao(0);
      } else {
        alert("Erro ao enviar feedback.");
      }
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
    }
  };

  return (
    <div className="relative p-4 sm:p-6 font-serif bg-[#F9F9F9] min-h-screen">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
          <img src="/loading.gif" alt="Carregando..." className="w-32 h-20" />
        </div>
      )}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4 mb-8">
          Feedback
        </h1>
        <p>Escolha um álbum para realizar o feedback.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {albuns.length > 0 ? (
          <>
            {albuns.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform hover:scale-105 w-full max-w-sm mx-auto cursor-pointer"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  className="absolute top-2 left-2 z-10 w-5 h-5 accent-[#c09b2d] "
                  checked={item.id === albumSelecionado.album_id}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (e.target.checked) {
                      setAlbumSelecionado({
                        album_id: item.id,
                        album_nome: item.nome,
                        album_cliente: "Bárbara Sena",
                      });
                      setIsModalOpen(true);
                    } else {
                      setAlbumSelecionado([]);
                    }
                  }}
                />

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
          </>
        ) : (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-center">
            <p className="text-gray-500">Não há nenhum álbum disponível para realizar feedback.</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Feedback álbum"
        >
          <div className="flex flex-col gap-3 mt-2">
            <label className="font-medium mb-1">Escreva seu comentário:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 h-28"
            />
            <label className="font-medium mb-1">
              Qual o seu nível de satisfação?
            </label>
            <div className="flex gap-2 mt-2 w-full">
              {[1, 2, 3, 4, 5].map((nivel) => (
                <button
                  key={nivel}
                  type="button"
                  onClick={() => setSatisfacao(nivel)}
                  className={`text-3xl transition-transform ${
                    nivel <= satisfacao ? "text-[#c09b2d]" : "text-gray-300"
                  }`}
                >
                  <FaStar />
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleFeedback}
              disabled={loading}
              className="bg-[#c09b2d] text-white px-6 py-2 rounded hover:bg-[#a88724]"
            >
              Enviar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FeedbackCliente;
