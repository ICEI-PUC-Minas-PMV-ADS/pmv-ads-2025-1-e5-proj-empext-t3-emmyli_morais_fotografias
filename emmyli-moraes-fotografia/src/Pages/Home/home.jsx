import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuNav from "../../components/MenuNav";
import { api } from "../../services/api";
import fotografaa from "../../img/fotografaa.jpg";
import fotografaaaa from "../../img/fotografaaaa.jpg";
import { FaStar } from "react-icons/fa";

const Home = () => {
  const [recentes, setRecentes] = useState([]);
  const navigate = useNavigate();
  const [depoimentos, setDepoimentos] = useState([]);

  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);

  // 1) Carrega trabalhos recentes (álbuns “Exibir como Trabalho”)
  useEffect(() => {
    const fetchRecentes = async () => {
      try {
        const { data } = await api.get("/api/eventos/?include=detalhes");
        const publicos = data
          .filter((a) => a.exibirtrabalho === true && a.detalhes.length > 0)
          .sort(
            (a, b) =>
              new Date(b.dtinclusao).getTime() -
              new Date(a.dtinclusao).getTime()
          )
          .slice(0, 4)
          .map((a) => ({
            id: a.id,
            nome: a.nome,
            imagem: a.detalhes[0].foto,
            categoria: a.descricao || "",
            visualizacoes: a.visualizacoes || 0,
            curtidas: a.totalCurtidas || 0,
          }));
        setRecentes(publicos);
      } catch (err) {
        console.error("Erro ao buscar álbuns públicos:", err);
      }
    };
    fetchRecentes();
  }, []);

  // 2) Carrega depoimentos (feedbacks com exibirfeedback = true)
  useEffect(() => {
    const fetchDepoimentos = async () => {
      try {
        const response = await api.get("/api/feedbacks", {
          params: {
            filters: {
              exibirfeedback: true,
            },
            include: "usuario,album",
          },
        });
        setDepoimentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar depoimentos:", error);
      }
    };
    fetchDepoimentos();
  }, []);

  // 3) Configuração do slider para Trabalhos Recentes
  const slidesToShow = 3;
  const settings = {
    dots: true,
    infinite: recentes.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        // até 1024px de largura, mostra no máximo 2
      breakpoint: 1024,
      settings: {
        slidesToShow: Math.min(2, recentes.length),
        infinite: recentes.length > Math.min(2, recentes.length)
      },
      },
      {
        // até 768px de largura, mostra 1
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        infinite: recentes.length > 1
      },
      },
    ],
  };

  // 4) Configuração do slider para Depoimentos
  const slidesToShowDepoimentos = 1;
  const settingsDepoimentos = {
    dots: true,
    infinite: depoimentos.length > slidesToShowDepoimentos,
    speed: 500,
    slidesToShow: Math.min(slidesToShowDepoimentos, depoimentos.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, depoimentos.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(1, depoimentos.length),
        },
      },
    ],
  };

  // 5) Função para abrir o álbum na rota “/trabalhos”
  const abrirNoTrabalhos = (id) => {
    navigate("/trabalhos", { state: { albumId: id } });
  };

  // 6) Busca eventos públicos (com include=detalhes para obter capa)
  const buscarEventos = async () => {
    try {
      const response = await api.get("/api/eventos", {
        params: {
          search: busca,
          include: "detalhes", // traz a array de fotos no resultado
        },
      });
      // Filtra apenas os eventos marcados como público e não “exibirtrabalho”
      const eventosFiltrados = response.data.filter(
        (evento) => evento.publico === true && evento.exibirtrabalho !== true
      );
      setResultados(eventosFiltrados);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] overflow-x-hidden">
      {/* Navegação principal */}
      <MenuNav />

      {/* Banner de destaque */}
      <section className="relative w-full">
        <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
          <img
            src={fotografaaaa}
            alt="Fotógrafa"
            className="w-full h-full object-cover object-top transition-all duration-500"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/70 px-5">
          <p className="text-[#d5bc6f] text-lg md:text-3xl lg:text-4xl tracking-widest uppercase font-light">
            O MUNDO ATRAVÉS DAS MINHAS LENTES:
          </p>
          <hr className="w-[90%] md:w-[60%] lg:w-[50%] border-[#d5bc6f] my-4" />
          <p className="text-[#d5bc6f] text-4xl md:text-7xl lg:text-8xl font-light">
            ÚNICO, INTENSO <br /> E ETERNO
          </p>
        </div>
      </section>

      {/* Trabalhos recentes */}
      <section className="p-20 text-center max-w-7xl mx-auto w-full">
        <h2 className="text-2xl sm:text-4xl mb-6 whitespace-nowrap">
          Trabalhos recentes
        </h2>
        <Slider {...settings}>
          {recentes.map((album) => (
            <div key={album.id} className="p-4">
              <div
                className="bg-[#E8E6E0] shadow-md rounded-full overflow-hidden flex flex-col cursor-pointer max-w-[250px] mx-auto aspect-[1/2]" // Tamanho fixo para o container
                onClick={() => abrirNoTrabalhos(album.id)}
              >
                <div className="w-full h-[400px] overflow-hidden rounded-full">
                  {" "}
                  {/* Container da imagem com altura fixa */}
                  <img
                    src={album.imagem}
                    alt={album.nome}
                    onError={(e) => (e.currentTarget.src = fotografaa)}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="bg-[#E8E6E0] p-4 font-semibold">
                  <p className="text-[#252525]">{album.nome}</p>
                  <span className="text-[#c09b2d] text-sm">
                    {album.categoria}
                  </span>
                </div>
                <div className="bg-[#E8E6E0] flex justify-center items-center gap-4 py-2">
                  <span className="text-[#252525] text-ml flex items-center gap-1">
                    👁 {album.visualizacoes}
                  </span>
                  <span className="text-[#252525] text-ml flex items-center gap-1">
                    <img
                      src="/icons/coracao-vermelho.svg"
                      alt="Curtidas"
                      className="w-5 h-5"
                    />
                    {album.curtidas}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Depoimentos */}
      {depoimentos.length > 0 && (
        <section className="p-20 text-center justify-center max-w-6xl mx-auto w-full">
          <h2 className="text-3xl mb-10">Depoimentos</h2>
          <Slider {...settingsDepoimentos}>
            {depoimentos.map((depoimento) => (
              <div key={depoimento.id} className="p-4">
                <div className="bg-[#E8E6E0] p-6 shadow-md rounded-lg flex items-center justify-center mb-6">
                  <div>
                    <p className="text-lg text-[#252525] m-4">
                      "{depoimento.feedback}"
                    </p>
                    <p className="font-semibold">{depoimento.usuario.nome}</p>
                    <p className="text-[#A0A0A0]">{depoimento.album.nome}</p>
                    <span className="text-[#a0a0a0]">
                      <p className="flex items-center mt-2 justify-center">
                        {Array.from(
                          { length: depoimento.satisfacao },
                          (_, i) => (
                            <FaStar key={i} color="#c09b2d" />
                          )
                        )}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      )}

      {/* Busca de eventos públicos como “cards” em grid */}
      <section className="p-10 text-center max-w-7xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl mb-4">Buscar eventos públicos</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite o nome do evento..."
            className="p-2 rounded border text-black"
          />
          <button
            onClick={buscarEventos}
            className="bg-[#c09b2d] text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Buscar
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resultados.length > 0
            ? resultados.map((evento) => {
                // Usa a primeira foto como capa (thumbnail)
                const capa = evento.detalhes?.[0]?.foto || fotografaa;
                // Formata data de inclusão (dtinclusao) em pt-BR
                const dataFormatada = new Date(
                  evento.dtinclusao
                ).toLocaleDateString("pt-BR");
                return (
                  <a
                    key={evento.id}
                    href={evento.urlevento}
                    className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition cursor-pointer"
                  >
                    {/* Imagem de capa em tamanho menor */}
                    <div className="w-full h-40 bg-gray-100 overflow-hidden">
                      <img
                        src={capa}
                        alt={`Capa de ${evento.nome}`}
                        className="w-full h-full object-cover rounded-t-2xl"
                        onError={(e) => (e.currentTarget.src = fotografaa)}
                      />
                    </div>
                    {/* Informações abaixo da imagem */}
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-[#252525]">
                        {evento.nome}
                      </h3>
                      <p className="text-[#c09b2d] text-xs mt-2">
                        {dataFormatada}
                      </p>
                    </div>
                  </a>
                );
              })
            : busca && (
                <p className="text-[#a0a0a0] mt-4">Nenhum evento encontrado.</p>
              )}
        </div>
      </section>
    </div>
  );
};

export default Home;
