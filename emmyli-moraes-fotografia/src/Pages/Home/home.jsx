import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuNav from "../../components/MenuNav";
import { api } from "../../services/api";
import fotografaa from "../../img/fotografaa.jpg";
import fotografaaaa from "../../img/fotografaaaa.jpg";

const Home = () => {
 const [recentes, setRecentes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentes = async () => {
      try {
        const { data } = await api.get("/api/albuns");
        const publicos = data
          .filter((a) => a.origem === "publico" && a.fotos.length > 0)
          .sort(
            (a, b) =>
              new Date(b.dtinclusao).getTime() - new Date(a.dtinclusao).getTime()
          )
          .slice(0, 4)
          .map((a) => ({
            id: a.id,
            nome: a.nome,
            imagem: a.fotos[0].foto.foto,
            categoria: a.descricao,           // ← adiciona categoria aqui
            visualizacoes: a.visualizacoes || 0,
            curtidas: a.totalCurtidas  || 0
          }));
        setRecentes(publicos);
      } catch (err) {
        console.error("Erro ao buscar álbuns públicos:", err);
      }
    };
    fetchRecentes();
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
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const abrirNoTrabalhos = (id) => {
    navigate("/trabalhos", { state: { albumId: id } });
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
                  <span className="text-[#c09b2d] text-sm">{album.categoria}</span>
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

      <section className="p-20 text-center justify-center max-w-6xl mx-auto w-full">
        <h2 className="text-3xl mb-10">Depoimentos</h2>

        <Slider {...settingsDepoimentos}>

          <div className="bg-[#E8E6E0] p-6 shadow-md rounded-lg flex items-center justify-center mb-6">


            <div>
              <p className="text-lg text-[#252525] mb-4">"Foi uma experiência incrível! As fotos ficaram maravilhosas e capturaram momentos únicos do nosso dia!"</p>
              <p className="font-semibold">João e Ana</p>
              <span className="text-[#a0a0a0]">Clientes satisfeitos</span>
            </div>
          </div>

          <div className="bg-[#E8E6E0] p-6 shadow-md rounded-lg flex items-center justify-center">


            <div>
              <p className="text-lg text-[#252525] mb-4">"O serviço foi impecável! As fotos ficaram lindas e capturaram a essência do nosso evento. Super recomendo!"</p>
              <p className="font-semibold">Carlos e Maria</p>
              <span className="text-[#a0a0a0]">Clientes felizes</span>
            </div>
          </div>
        </Slider>

      </section>

    </div>
  );
};

export default Home;