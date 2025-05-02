import React, { useState } from "react";
import MenuNav from "../../components/MenuNav";
import logo from "../../img/logo.png"; 
import { loginUser } from "../../services/authService";
import { Link } from "react-router-dom";

const Login = () => {

  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userEmail.trim() || !password.trim()) {
      setErrorMessage('E-mail e senha são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(userEmail, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('nome', data.usuario.nome);
      localStorage.setItem('login', data.usuario.login);
      localStorage.setItem('email', data.usuario.email);
      localStorage.setItem('perfil', data.usuario.perfil);
      window.location.href = '/PerfilCliente';
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
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
            Ao clicar aqui, você irá descobrir imagens que irão surpreender seus olhos e tocar sua alma. Prepare-se para uma experiência visual única!
          </p>

          {loading ? 'Entrando...' : ''}
          
          <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6 px-8 sm:px-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
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

            <a href="#" className="hover:underline">Esqueci minha senha</a>

            <Link to="/cadastro" className="hover:underline">Cadastrar</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;