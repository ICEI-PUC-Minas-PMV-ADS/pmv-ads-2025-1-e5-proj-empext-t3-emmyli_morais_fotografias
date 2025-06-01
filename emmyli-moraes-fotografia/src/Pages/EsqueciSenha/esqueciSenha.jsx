import React, { useState } from "react";
import MenuNav from "../../components/MenuNav";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/authService";
import { useEffect } from "react";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    if (!email.trim()) {
      setError("O e-mail é obrigatório.");
      setLoading(false);
      return;
    }

    try {
      
      forgotPassword(email)
      setError(null);
      setSuccess("Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha pelo email.");
    } catch (error) {
      setError("Ocorreu um erro ao tentar enviar o e-mail. Tente novamente.");
    }

    setLoading(false);
  };

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] overflow-auto flex flex-col">
      <MenuNav />
      <div className="flex items-center justify-center flex-grow p-4">
        <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg text-center relative min-h-[60vh] flex flex-col justify-center items-center sm:max-w-md overflow-hidden">
          <img src={logo} alt="Logo" className="w-48 sm:w-40 mb-6" />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md w-full mb-4">
              <strong className="font-bold">Erro:</strong> {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md w-full mb-4">
              <strong className="font-bold">Sucesso:</strong> {success}
            </div>
          )}

          <p className="text-md text-gray-600 mb-8">
            Informe o seu e-mail para receber um link de redefinição de senha.
          </p>

          {loading && (
            <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
              <img src="/loading.gif" alt="Carregando..." className="w-32 h-20" />
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col space-y-6 px-8 sm:px-4"
          >
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-[#c09b2d] text-white p-4 sm:p-3 rounded-md hover:bg-[#a68523] transition-all text-lg"
            >
              Enviar e-mail
            </button>
          </form>

          <div className="form-links flex justify-center gap-20 mt-6 text-md text-gray-600 w-full px-8 sm:px-4">
            <Link to="/login" className="hover:underline">
              Voltar para login
            </Link>
            <Link to="/cadastro" className="hover:underline">
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsqueciSenha;