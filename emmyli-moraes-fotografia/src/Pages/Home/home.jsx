import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuNav from "../../components/MenuNav";
import { anonApi, api } from "../../services/api";
import fotografaa from "../../img/fotografaa.jpg";
import fotografaaaa from "../../img/fotografaaaa.jpg";
import { FaStar, FaTrash } from "react-icons/fa";

const Home = () => {
  const [recentes, setRecentes] = useState([]);
  const navigate = useNavigate();
  const [depoimentos, setDepoimentos] = useState([]);

  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);

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
        const allDepoimentos = response.data;
        setDepoimentos(allDepoimentos);
      } catch (error) {
        console.error("Erro ao buscar depoimentos:", error);
      }
    };
    fetchDepoimentos();
  }, []);

  // Se houver menos slides que slidesToShow, desliga infinite para não clonar
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
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, recentes.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(1, recentes.length),
        },
      },
    ],
  };

  const settingsDepoimentos = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const abrirNoTrabalhos = (id) => {
    navigate("/trabalhos", { state: { albumId: id } });
  };

  const buscarEventos = async () => {
    try {
      const response = await api.get("/api/eventos", {
        params: {
          publico: true,
          search: busca,
        },
      });
      setResultados(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] overflow-x-hidden">
      {/*Navegação entre paginas */}

      <MenuNav />

      {/** Campo de Foto e Frase */}

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
          <hr className="w-[90%] md:w-[60%] lg:w-[50%] border-[#d5bc6f]  my-4" />

          <p className="text-[#d5bc6f] text-4xl md:text-7xl lg:text-8xl  font-light">
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
                className="bg-[#E8E6E0] shadow-md rounded-full overflow-hidden flex flex-col cursor-pointer"
                onClick={() => abrirNoTrabalhos(album.id)}
              >
                <div className="w-full">
                  <img
                    src={album.imagem}
                    alt={album.nome}
                    onError={(e) => (e.currentTarget.src = fotografaa)}
                    className="inline-block hover:scale-105 ease-in-out rounded-full"
                  />
                </div>

                <div className="bg-[#E8E6E0] p-4 font-semibold">
                  <p className="text-[#252525]">{album.nome}</p>
                  <span className="text-[#c09b2d] text-sm">
                    {album.categoria}
                  </span>
                </div>

                {/* Rodapé com visualizações e curtidas */}
                <div className="bg-[#E8E6E0] flex justify-center items-center gap-4 py-2">
                  {/* Visualizações */}
                  <span className="text-[#252525] text-sm flex items-center gap-1">
                    👁 {album.visualizacoes}
                  </span>

                  {/* Curtidas */}
                  <span className="text-[#252525] text-sm flex items-center gap-1">
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

      <section className="p-10 text-center max-w-3xl mx-auto w-full">
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

        <div className="mt-6">
          {resultados.length > 0 ? (
            <ul className="space-y-2 text-left">
              {resultados.map((evento) => (
                <li key={evento.id}>
                  <a
                    href={`/evento/${evento.urlevento || evento.id}`}
                    className="text-[#d5bc6f] hover:underline"
                  >
                    {evento.nome}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            busca && <p className="text-[#a0a0a0] mt-4">Nenhum evento encontrado.</p>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
