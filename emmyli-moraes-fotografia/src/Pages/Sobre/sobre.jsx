import React from "react";
import { Link } from "react-router-dom";
import MenuNav from "../../components/MenuNav";  
import logo from "../../img/logo.png";
import fotografaPS from "../../img/FotoPaginaSobre.jpg";  

const Sobre = () => {
  return (
<div className="w-full min-h-screen font-serif bg-[#0B3727] text-[#c09b2d]">

      {/* MenuNav importado */}
      
      <MenuNav />

      
      <section className="p-20 flex items-center justify-center max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">

          
          <div className="w-1/2 md:ml-[-5rem] mr-20">
            <img
              src={fotografaPS}
              alt="Fotógrafa"
              className="w-full h-auto object-cover"
            />
          </div>

          
          <div className="text-center md:w-1/2 md:pl-12">
            <img
              src={logo}  
              alt="Logo da Fotógrafa"
              className="h-20 mx-auto flex items-center "
            />
            <p className="text-lg text-white mt-6 mb-4">

              Meu nome é Emmyli, sou fotógrafa em Mateus Leme/MG. Sou advogada, mas na fotografia que
              me encontrei fazendo oque mais amo.
            </p>
            <p className="text-lg text-white mt-6 mb-4">

            Olhando através da lente me sinto completa, capturando a essência de cada cena e de cada pessoa.

            </p>

            <p className="text-lg text-white mt-6 mb-4">

            Uma das coisas que mais me encanta nessa jornada fotográfica é a conexão que estabeleço com as pessoas que fotografo. Cada sessão é uma experiência única e especial, onde crio um ambiente acolhedor e descontraído para que meus clientes se sintam à vontade. É nessa atmosfera de confiança que consigo revelar a verdadeira essência de cada indivíduo, capturando sorrisos genuínos, olhares sinceros e momentos espontâneos.


            </p>

            <p className="text-lg text-white mt-6 mb-4">

            Cada projeto, cada desafio me impulsiona a evoluir e a aprimorar minhas habilidades. Através do meu trabalho, desejo criar imagens que toquem o coração das pessoas, que despertem emoções e que se transformem em memórias eternas.

            </p>


          </div>
        </div>
      </section>
    </div>
  );
};


export default Sobre;
