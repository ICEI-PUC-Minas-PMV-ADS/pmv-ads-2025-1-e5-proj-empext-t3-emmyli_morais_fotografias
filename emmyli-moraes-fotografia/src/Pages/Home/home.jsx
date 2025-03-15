import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import fotografaaa from "../../assets/img/fotografaa.jpg";
import fotografaa from "../../assets/img/fotografaa.jpg";
import fotografaaaa from "../../assets/img/fotografaaaa.jpg";

import logo from "../../assets/img/logo.png";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] overflow-x-hidden">

      {/* Cabeçalho */}

      <header className=" bg-[#E8E6E0] p-6 flex justify-between items-center relative ">
      
      <div className="flex items-center">
          <img
            src={logo}
            alt="Logo Emmyli Fotografias"
            className="h-20" 
          />
        </div>

        {/* Botão de Menu Responsivo */}
        <button className="md:hidden text-[#252525]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Menu normal em telas grandes */}
        <nav className="  hidden md:flex">
          <ul className="flex  gap-8 list-none text-xl mr-10">
            <li className=" text-[#252525] cursor-pointer">Início</li>
            <li className=" text-[#252525] cursor-pointer">Trabalhos</li>
            <li className=" text-[#252525] cursor-pointer">Contatos</li>
            <li className=" text-[#252525] cursor-pointer">Sobre</li>
            <li className=" text-[#252525] cursor-pointer">Área do Cliente</li>
            <li className=" text-[#252525] cursor-pointer">Login</li>
          </ul>
        </nav>

        {/* Menu Responsivo */}
        {menuOpen && (
          <nav className="fixed top-0 left-0 w-full h-full bg-[#E8E6E0] flex flex-col items-center justify-center md:hidden z-50">
            <button className="absolute top-5 right-5 text-[#252525]" onClick={() => setMenuOpen(false)}>
              <X size={30} />
            </button>
            <ul className="  text-lg space-y-6 text-[#252525]">
              <li className=" cursor-pointer">Início</li>
              <li className=" cursor-pointer">Trabalhos</li>
              <li className=" cursor-pointer">Contatos</li>
              <li className=" cursor-pointer">Sobre</li>
              <li className=" cursor-pointer">Área do Cliente</li>
              <li className=" cursor-pointer">Login</li>
            </ul>
          </nav>
        )}
      </header>

      <section className="relative w-full">
        <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-[90vh] overflow-hidden">
          <img 
            src={fotografaaaa} 
            alt="Fotógrafa" 
            className="w-full h-full object-cover object-top transition-all duration-500"
          />
        </div>

        {/* Texto posicionado à esquerda */}
        <div className="absolute inset-0 flex items-center justify-start text-left p-10">
          <p className="font-serif text-[#d5bc6f] text-lg md:text-2xl lg:text-3xl font-bold bg-transparent max-w-[40%] transition-all duration-500">
          O mundo através das minhas Lentes:<br />Único, intenso e eterno.
          </p>
        </div>
      </section>

      {/* Trabalhos Recentes */}

      <section className="p-20 text-center justify-center max-w-7xl mx-auto w-full">
        <h2 className="text-3xl mb-6">Trabalhos recentes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">

          {/* pasta 1 */}

          <div className="bg-[#E8E6E0] shadow-md rounded-t-full overflow-hidden flex flex-col">

            <div className="w-full">
              <img src={fotografaa} alt="Pri & Janaina" className="w-full h-full object-cover rounded-t-full" />
            </div>
            <div className="bg-[#E8E6E0] p-4">
              <p className="text-[#252525] font-semibold">PRI & JANAINA</p>
              <span>Ensaio</span>
            </div>
          </div>

          {/* pasta 2 */}

          <div className="bg-[#E8E6E0] shadow-md rounded-t-full overflow-hidden flex flex-col">
            <div className="w-full">
              <img src={fotografaa} alt="Chris & Kleber" className="w-full h-full object-cover rounded-t-full" />
            </div>
            <div className="bg-[#E8E6E0] p-4">
              <p className="text-[#252525] font-semibold">CHRIS & KLEBER</p>
              <span>Ensaio</span>
            </div>
          </div>

          {/* pasta 3 */}

          <div className="bg-[#E8E6E0] shadow-md rounded-t-full overflow-hidden flex flex-col">
            <div className="w-full">
              <img src={fotografaa} alt="Su & Carla" className="w-full h-full object-cover rounded-t-full" />
            </div>
            <div className="bg-[#E8E6E0] p-4">
              <p className="text-[#252525] font-semibold">SU & CARLA</p>
              <span>Ensaio</span>
            </div>
          </div>


        </div>

      </section>

      {/* Seção de Depoimento */}

      <section className="p-20 text-center justify-center max-w-6xl mx-auto w-full">

        <h2 className="text-3xl mb-10">Depoimentos</h2>

        <div className="bg-[#E8E6E0] p-6 shadow-md rounded-lg flex items-center justify-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mr-6">
            <img src={fotografaaa} alt="Cliente" className="object-cover w-full h-full" />
          </div>

          <div>
            <p className="text-lg text-[#252525] mb-4">"Foi uma experiência incrível! As fotos ficaram maravilhosas e capturaram momentos únicos do nosso dia!"</p>
            <p className="font-semibold">João e Ana</p>
            <span className="text-[#a0a0a0]">Clientes satisfeitos</span>
          </div>

        </div>

      </section>


    </div>
  );
};

export default Home;