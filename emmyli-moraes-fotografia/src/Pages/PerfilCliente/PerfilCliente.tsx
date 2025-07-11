import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { editarMinhaConta, getMinhaConta } from "../../services/userService";
import { useAuth } from "../../context/authContext";
import InputPassword from "../../components/InputPassword";
import UserAvatar from "../../components/UserAvatar";

const PerfilCliente = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    login: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
  });

  const { update } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const usuario = await getMinhaConta();
        setFormData({
          nome: usuario.nome,
          email: usuario.email,
          login: usuario.login,
          telefone: usuario.telefone || "",
          senha: "",
          confirmarSenha: "",
        });
        setNome(usuario.nome);
        setEmail(usuario.email);
      } catch (err) {
        setError("Erro ao carregar dados do usuário.");
        console.error(err);
      }
    };

    fetchDados();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  if (!formData.nome.trim() || !formData.email.trim() || !formData.login.trim()) {
    setError("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  if (formData.senha !== formData.confirmarSenha) {
    setError("As senhas não coincidem.");
    return;
  }

  try {
    const payload = {
      nome: formData.nome,
      email: formData.email,
      login: formData.login,
      senha: formData.senha,
      telefone: formData.telefone,
    };

    await editarMinhaConta(payload);
    setError(null);
    setSuccess("Usuário alterado com sucesso!");

    setNome(formData.nome);
    setEmail(formData.email);

    // Pega o usuário atualizado com ID incluso
    const usuarioAtualizado = await getMinhaConta();

    // Atualiza contexto com todos os dados necessários
    update({
      usuario: {
        id: usuarioAtualizado.id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        login: usuarioAtualizado.login,
        perfil: usuarioAtualizado.perfil,
      },
      token: {
        informacao: localStorage.getItem("informacaoToken")!,
        expiresIn: Math.floor(
          (new Date(localStorage.getItem("dataExpiracaoToken")!).getTime() - Date.now()) / 1000
        ),
      },
      refreshToken: {
        informacao: localStorage.getItem("informacaoRefreshToken")!,
        expiresIn: Math.floor(
          (new Date(localStorage.getItem("dataExpiracaoRefreshToken")!).getTime() - Date.now()) / 1000
        ),
      },
    });

  } catch (error) {
    const msg = error.response?.data?.error || "Erro ao editar usuário.";
    setError(msg);
  }
};

  return (
    <div className="font-serif bg-[#F9F9F9] mt-[20px] mb-[20px] min-h-screen py-10 px-4">

      {/* Mensagem de erro estilizada */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md w-full mb-4">
          <strong className="font-bold">Erro:</strong> {error}
        </div>
      )}

      {/* Mensagem de sucesso estilizada */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md w-full mb-4">
          <strong className="font-bold">Sucesso:</strong> {success}
        </div>
      )}

      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-2 mb-6">
        Perfil
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <UserAvatar name={nome} size={100} />
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

        <div>
          <label className="block mb-1 font-medium text-gray-700">Telefone:</label>
          <input
            type="text"
            name="telefone"
            placeholder="(xx) xxxxx-xxxx"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
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
        Salvar Alterações
      </button>
    </div>
  );
};

export default PerfilCliente;

