import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../../services/userService";
import MenuNav from "../../components/MenuNav";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Ícones para mostrar/ocultar senha

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    login: "",
    senha: "",
    confirmarsenha: "",
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.senha !== formData.confirmarsenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const payload = {
        nome: formData.nome,
        email: formData.email,
        login: formData.login,
        senha: formData.senha
      };

      await cadastrarUsuario(payload);
      alert("Usuário cadastrado com sucesso!");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] overflow-auto flex flex-col">
      <MenuNav />
      <div className="flex items-center justify-center flex-grow p-4">
        <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-lg text-center relative min-h-[60vh] flex flex-col justify-center items-center sm:max-w-md overflow-hidden">
          <img src={logo} alt="Logo" className="w-48 sm:w-40 mb-6" />

          {/* Mensagem de erro estilizada */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md w-full mb-4">
              <strong className="font-bold">Erro:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6 px-8 sm:px-4">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
            />
            <input
              type="text"
              name="login"
              placeholder="Login"
              value={formData.login}
              onChange={handleChange}
              className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
            />

            {/* Campo de Senha */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Campo Confirmar Senha */}
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmarsenha"
                placeholder="Confirmar Senha"
                value={formData.confirmarsenha}
                onChange={handleChange}
                className="w-full p-4 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c09b2d] text-white p-4 sm:p-3 rounded-md hover:bg-[#a68523] transition-all text-lg"
            >
              Cadastrar
            </button>
          </form>

          <div className="form-links flex justify-center gap-16 mt-6 text-md text-gray-600 w-full px-8 sm:px-4">
            <button onClick={() => navigate(-1)} className="hover:underline">Voltar</button>
            <Link to="/login" className="hover:underline">Já tem uma conta? Faça Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
