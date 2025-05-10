import React, { ChangeEvent, MouseEvent, useState } from "react";
import { editarUsuario } from "../../services/userService";
import InputPassword from "../../components/InputPassword";

const PerfilCliente = () => {
  const [formData, setFormData] = useState({
    nome: localStorage.getItem("nome")!,
    email: localStorage.getItem("email")!,
    login: localStorage.getItem("login")!,
    senha: "",
    confirmarSenha: "",
  });

  const [nome, setNome] = useState(localStorage.getItem("nome")!)
  const [email, setEmail] = useState(localStorage.getItem("email")!)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e!.target!.name]: e!.target.value });
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() || !formData.login.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const payload = {
        nome: formData.nome,
        email: formData.email,
        login: formData.login,
        senha: formData.senha,
      };

      await editarUsuario(payload);
      alert("Usuário alterado com sucesso!");

      localStorage.setItem('nome', formData.nome);
      localStorage.setItem('login', formData.login);
      localStorage.setItem('email', formData.email);

      setNome(formData.nome)
      setEmail(formData.email)

    } catch (error) {
      const msg = error.response?.data?.error || "Erro ao editar usuário.";
      alert(msg);
    }
  };

  return (
    <div className="font-serif bg-[#F9F9F9] mt-[20px] mb-[20px] min-h-screen py-10 px-4">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-2 mb-6">
        Perfil
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://i.pravatar.cc/100"
          alt="Foto do usuário"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">{nome}</p>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Nome:</label>
          <input
            type="text"
            name="nome"
            placeholder="*Digite seu nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition placeholder-red-300"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">E-mail:</label>
          <input
            type="email"
            name="email"
            placeholder="*Digite seu email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition placeholder-red-300"
          />
        </div>
      </div>


      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6 max-w-[900px]">
        <div className="w-full md:w-1/3">
          <label className="block mb-1 font-medium text-gray-700">Login:</label>
          <input
            type="text"
            name="login"
            placeholder="*Digite seu login"
            value={formData.login}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition placeholder-red-300"
          />
        </div>
        <div className="w-full md:w-1/3">
          <label className="block mb-1 font-medium text-gray-700">Senha:</label>
          {/* Campo de Senha */}
          <InputPassword placeholder="senha" name="senha" value={formData.senha} onChange={handleChange} />
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="block mb-1 font-medium text-gray-700">Confirme a senha:</label>
          {/* Campo Confirmar Senha */}
          <InputPassword placeholder="Confirmar Senha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} />
        </div>
      </div>

      <button onClick={handleClick} className="mt-6 bg-green-800 hover:bg-green-700 transition text-white px-6 py-2 rounded-xl">
        Salvar
      </button>
    </div>
  );
};

export default PerfilCliente;

