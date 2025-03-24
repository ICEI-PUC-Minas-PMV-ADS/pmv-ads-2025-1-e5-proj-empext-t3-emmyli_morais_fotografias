import React from "react";
import MenuNav from "../../components/MenuNav";
import logo from "../../img/logo.png";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    const navigate = useNavigate();

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] overflow-auto">
      <MenuNav />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg text-center relative h-[60vh] flex flex-col justify-center items-center sm:max-w-md overflow-hidden">
          <img src={logo} alt="Logo" className="w-48 sm:w-40 mb-6" />


          <form className="w-full flex flex-col space-y-6 px-8 sm:px-4">
            <input
              type="text"
              placeholder="Usuário"
              className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
            />
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
              className="w-full bg-[#c09b2d] text-white p-4 sm:p-3 rounded-md hover:bg-[#a68523] transition-all text-lg"
            >
              Cadastrar
            </button>
          </form>

          <div className="form-links flex justify-center gap-16 mt-6 text-md text-gray-600 w-full px-8 sm:px-4">

          <button onClick={() => navigate(-1)} className="hover:underline">Voltar</button>

            <Link to="/login" className="hover:underline">Ja tem uma conta? Faça Login</Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Cadastro;