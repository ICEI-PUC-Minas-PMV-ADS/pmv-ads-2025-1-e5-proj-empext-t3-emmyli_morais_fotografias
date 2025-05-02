import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Image, Settings, Edit2, Plus, ArrowLeft } from "lucide-react";
import FormAdicionarEnsaio from "../componentsPerfil/FormAdicionarEnsaio";

const GaleriaDeClientes = () => {
  const [galerias, setGalerias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [albumAberto, setAlbumAberto] = useState(null);
  const [fotosVisuais, setFotosVisuais] = useState([]);

  const [imagemSelecionada, setImagemSelecionada] = useState(null);
const [indiceSelecionado, setIndiceSelecionado] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    buscarAlbuns();
  }, []);

  const buscarAlbuns = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/albuns', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const albunsFormatados = response.data.map((album) => ({
        id: album.id,
        cliente: album.usuario?.nome || "Cliente",
        nome: album.nome,
        fotos: album.fotos?.map(f => f.foto?.foto) || [],
        imagem: album.fotos?.[0]?.foto?.foto || "",
        data: new Date(album.dtinclusao).toLocaleDateString('pt-BR') || '',
      }));

      setGalerias(albunsFormatados);
    } catch (error) {
      console.error("Erro ao buscar galerias:", error.response?.data || error.message);
    }
  };

  const adicionarNovaGaleria = () => {
    setMostrarModal(false);
    buscarAlbuns();
  };

  const abrirAlbum = (galeria) => {
    setAlbumAberto(galeria);
    setFotosVisuais(galeria.fotos || []);
  };

  const voltarParaGalerias = () => {
    setAlbumAberto(null);
  };

  const handleAdicionarFotos = (event) => {
    const arquivos = Array.from(event.target.files);
    const novas = arquivos.map(file => URL.createObjectURL(file));
    setFotosVisuais(prev => [...prev, ...novas]);
  };

  return (
    <div className="relative p-4 sm:p-6 font-serif bg-[#F9F9F9] min-h-screen">
      {!albumAberto ? (
        <>
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-2">
              Galeria de Clientes
            </h1>
            <button
              onClick={() => setMostrarModal(true)}
              className="mt-4 bg-[#c09b2d] hover:bg-[#a48322] text-white px-4 py-2 rounded-xl shadow-md transition duration-300"
            >
              Criar nova galeria
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {galerias.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform hover:scale-105 w-full max-w-sm mx-auto cursor-pointer"
                onClick={() => abrirAlbum(item)}
              >
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
                <p className="text-center text-[#252525] text-sm">{item.nome}</p>
                <p className="text-center text-[#c09b2d] text-sm mb-4">
                  {item.fotos.length} fotos | {item.data}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-end">
            <button
              onClick={voltarParaGalerias}
              className="text-[#c09b2d] hover:underline flex items-center mb-4"
            >
              <ArrowLeft className="mr-1" /> Voltar
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lado esquerdo: Capa + Ações */}
            <div className="bg-white p-4 rounded-xl shadow-lg max-w-sm w-full lg:min-h-[80vh]">
              <p className="text-[#c09b2d] text-xl font-bold text-center mb-2">{albumAberto.nome}</p>
              
              <div className="w-full h-[300px] bg-gray-100 rounded-xl overflow-hidden mb-4">
                {albumAberto.imagem ? (
                  <img
                    src={albumAberto.imagem}
                    alt="Capa"
                    className="w-full h-full object-cover object-top rounded-xl"
                  />
                ) : (
                  <div className="text-center text-gray-400 p-8">Sem capa</div>
                )}
              </div>

              <div className="flex justify-around text-[#b1783d] text-2xl">
                <Image className="cursor-pointer hover:text-[#a76a2b]" title="Ver fotos" />
                <Settings className="cursor-pointer hover:text-[#a76a2b]" title="Configurações" />
                <Edit2 className="cursor-pointer hover:text-[#a76a2b]" title="Editar álbum" />
              </div>
            </div>

            {/* Lado direito: Galeria de fotos */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8 border-b-2 border-[#c09b2d] pb-2">
                <h2 className="text-2xl text-[#b1783d] font-bold">Fotos</h2>
                <div>
                  <button
                    onClick={() => inputRef.current.click()}
                    title="Adicionar fotos"
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
              </div>

              {fotosVisuais.length > 0 ? (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {fotosVisuais.map((foto, idx) => (
                    <div
                      key={idx}
                      className="break-inside-avoid overflow-hidden rounded-xl shadow cursor-pointer transform transition-transform duration-200 hover:scale-105"
                      onClick={() => {
                        setImagemSelecionada(foto);
                        setIndiceSelecionado(idx);
                      }}
                    >
                      <img
                        src={foto}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-auto object-contain rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Nenhuma foto nesse álbum.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl">
            <FormAdicionarEnsaio
              onSave={adicionarNovaGaleria}
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
            {/* Imagem principal */}
            <img
              src={imagemSelecionada}
              alt="Zoom"
              className="max-h-[90vh] w-auto object-contain rounded-xl shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Botão fechar */}
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
                const novoIndice = (indiceSelecionado - 1 + fotosVisuais.length) % fotosVisuais.length;
                setIndiceSelecionado(novoIndice);
                setImagemSelecionada(fotosVisuais[novoIndice]);
              }}
            >
              ◀
            </button>

            {/* Botão próximo */}
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-50 bg-black bg-opacity-10 rounded-full px-3 py-1 transition-transform duration-200 hover:scale-110 hover:bg-opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                const novoIndice = (indiceSelecionado + 1) % fotosVisuais.length;
                setIndiceSelecionado(novoIndice);
                setImagemSelecionada(fotosVisuais[novoIndice]);
              }}
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaDeClientes;
