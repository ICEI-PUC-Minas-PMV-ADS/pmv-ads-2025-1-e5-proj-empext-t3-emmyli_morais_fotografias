import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuNav from "../../components/MenuNav";
import fotografaaa from "../../img/fotografaaa.jpg";
import fotografaa from "../../img/fotografaa.jpg";
import fotografaaaa from "../../img/fotografaaaa.jpg";

const Home = () => {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
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

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] overflow-x-hidden">

      {/*Navegação entre paginas */}

      <MenuNav />

      {/** Campo de Foto e Frase */}

      <section className="relative w-full">
        <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[90vh] overflow-hidden">
          <img 
            src={fotografaaaa} 
            alt="Fotógrafa" 
            className="w-full h-full object-cover object-top transition-all duration-500"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-start text-left p-10">
          <p className="font-serif text-[#d5bc6f] text-lg md:text-2xl lg:text-3xl font-bold bg-transparent max-w-[40%] transition-all duration-500">
            O mundo através das minhas Lentes:<br />Único, intenso e eterno.
          </p>
        </div>
      </section>

        {/*Trabalhos recentes*/ }

      <section className="p-20 text-center max-w-7xl mx-auto w-full">
        <h2 className="text-3xl mb-6">Trabalhos recentes</h2>
        <Slider {...settings}>
          {["PRI & JANAINA", "CHRIS & KLEBER", "SU & CARLA", "Emyli"].map((nome, index) => (
            <div key={index} className="p-4">
              <div className="bg-[#E8E6E0] shadow-md rounded-full overflow-hidden flex flex-col">
                <div className="w-full">
                  <img 
                    src={fotografaa} 
                    alt={nome} 
                    className="inline-block cursor-pointer hover:scale-105 ease-in-out rounded-full" 
                  />
                </div>
                <div className="bg-[#E8E6E0] p-4">
                  <p className="text-[#252525] font-semibold">{nome}</p>
                  <span>Ensaio</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>

      </section>

       

        {/* Seção de Depoimentos */}

      <section className="p-20 text-center justify-center max-w-6xl mx-auto w-full">
        <h2 className="text-3xl mb-10">Depoimentos</h2>

        <Slider {...settingsDepoimentos}>
          <div className="bg-[#E8E6E0] p-6 shadow-md rounded-lg flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden mr-6">
              <img src={fotografaaa} alt="Cliente" className="object-cover w-full h-full" />
            </div>

            <div>
              <p className="text-lg text-[#252525] mb-4">"Foi uma experiência incrível! As fotos ficaram maravilhosas e capturaram momentos únicos do nosso dia!"</p>
              <p className="font-semibold">João e Ana</p>
              <span className="text-[#a0a0a0]">Clientes satisfeitos</span>
            </div>
          </div>

          <div className="bg-[#E8E6E0] p-6 shadow-md rounded-lg flex items-center justify-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mr-6">
              <img src={fotografaaa} alt="Cliente" className="object-cover w-full h-full" />
            </div>

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