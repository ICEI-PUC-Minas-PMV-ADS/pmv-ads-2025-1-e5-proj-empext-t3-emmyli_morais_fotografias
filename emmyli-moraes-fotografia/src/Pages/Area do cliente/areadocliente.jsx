import React, { useState } from "react";
import MenuNav from "../../components/MenuNav";
import logo from "../../img/logo.png"; 
import { Link } from "react-router-dom";

const AreaDoCliente = () => {
  const [isCliente, setIsCliente] = useState(false);

  const handleToggle = () => {
    setIsCliente(!isCliente);
  };

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] overflow-auto flex flex-col">
      <MenuNav />
      <div className="flex items-center justify-center flex-grow p-4">
        <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg text-center relative min-h-[60vh] flex flex-col justify-center items-center sm:max-w-md overflow-hidden">
          
          
          <img src={logo} alt="Logo" className="w-48 sm:w-40 mb-6" />

          
          <p className="text-md text-gray-600 mb-8">
            "Ao clicar aqui, você irá descobrir imagens que irão surpreender seus olhos e tocar sua alma. Prepare-se para uma experiência visual única!"
          </p>

          
          <div className="w-full flex flex-col gap-6 mb-6">
            <button
              onClick={() => alert("Modo Visitante")}
              className="bg-[#c09b2d] text-white py-3 px-6 rounded-md hover:bg-[#a68523] transition-all text-lg"
            >
              Visitante

            </button>

            <button
              onClick={handleToggle}
              className="bg-[#c09b2d] text-white py-3 px-6 rounded-md hover:bg-[#a68523] transition-all text-lg"
            >
              {isCliente ? "Cliente" : "Cliente"}
            </button>

          </div>

          
          {isCliente && (
            <div className="w-full flex flex-col space-y-6 px-8 sm:px-4 mt-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
              />
              <button
                type="submit"
                className="bg-[#c09b2d] text-white py-3 px-6 rounded-md hover:bg-[#a68523] transition-all text-lg "
              >
                Entrar
              </button>

              
              <div className="form-links flex justify-center gap-20 mt-6 text-md text-gray-600 w-full px-8 sm:px-4">
                <a href="#" className="hover:underline">Esqueci minha senha</a>
                <a href="#" className="hover:underline">Cadastrar</a>
              </div>
            </div>
          )}

          
          {!isCliente && (
            <div className="mt-6 w-full">
              <Link to="/Cadastro"
                className="w-full bg-[#c09b2d] text-white py-4 px-36 rounded-md hover:bg-[#a68523] transition-all text-lg"
              >
                Cadastrar
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AreaDoCliente;