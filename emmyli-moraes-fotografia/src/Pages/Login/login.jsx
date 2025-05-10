import React, { useState } from "react";
import MenuNav from "../../components/MenuNav";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import InputPassword from "../../components/InputPassword";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const [userEmailOrLogin, setUserEmailOrLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { logar } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    if (!userEmailOrLogin.trim() || !password.trim()) {
      setErrorMessage("E-mail e senha são obrigatórios.");
      setLoading(false);
      return;
    }

    const response = await logar(userEmailOrLogin, password);

    if (typeof response === 'string') {
      setErrorMessage(response);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] overflow-auto flex flex-col">
      <MenuNav />
      <div className="flex items-center justify-center flex-grow p-4">
        <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg text-center relative min-h-[60vh] flex flex-col justify-center items-center sm:max-w-md overflow-hidden">
          <img src={logo} alt="Logo" className="w-48 sm:w-40 mb-6" />

          {/* Mensagem de erro estilizada */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md w-full mb-4">
              <strong className="font-bold">Erro:</strong> {errorMessage}
            </div>
          )}

          <p className="text-md text-gray-600 mb-8">
            Ao clicar aqui, você irá descobrir imagens que irão surpreender seus
            olhos e tocar sua alma. Prepare-se para uma experiência visual
            única!
          </p>

          {loading && (
            <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
              <img
                src="/loading.gif"
                alt="Carregando..."
                className="w-32 h-20"
              />
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col space-y-6 px-8 sm:px-4"
          >
            <input
              type="text"
              placeholder="Email ou Login"
              className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
              value={userEmailOrLogin}
              onChange={(e) => setUserEmailOrLogin(e.target.value)}
            />

            <InputPassword
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-[#c09b2d] text-white p-4 sm:p-3 rounded-md hover:bg-[#a68523] transition-all text-lg"
            >
              Entrar
            </button>
          </form>

          <div className="form-links flex justify-center gap-20 mt-6 text-md text-gray-600 w-full px-8 sm:px-4">
            <a href="#" className="hover:underline">
              Esqueci minha senha
            </a>

            <Link to="/cadastro" className="hover:underline">
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
