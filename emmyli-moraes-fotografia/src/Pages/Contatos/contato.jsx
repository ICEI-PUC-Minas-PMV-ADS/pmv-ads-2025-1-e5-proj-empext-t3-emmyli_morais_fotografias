import React, { useState } from "react";
import MenuNav from "../../components/MenuNav";
import { ContatoEmail } from "../../services/authService";

const Contato = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: ""
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!form.nome.trim() || !form.email.trim() || !form.telefone.trim() || !form.mensagem.trim()) {
      setError("Por favor, preencha todos os campos antes de enviar.");
      setSuccess(null);
      return;
    }

    try {
      await ContatoEmail(form);
      setSuccess("Mensagem enviada com sucesso!");
      setError(null);
      setForm({ nome: "", email: "", telefone: "", mensagem: "" });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setError("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
      setSuccess(null);
    }
  };

  // Checa se algum campo está vazio para desabilitar o botão
  const isFormIncomplete =
    !form.nome.trim() ||
    !form.email.trim() ||
    !form.telefone.trim() ||
    !form.mensagem.trim();

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] flex flex-col">
      <MenuNav />
      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-[15%] pt-28 pb-16 gap-12">

        {/* Texto e Contatos */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-[#d9a766] text-3xl sm:text-4xl md:text-6xl font-bold mb-8">Fale Comigo!</h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl mb-8">
            Se preferir, pode usar outros meios de contato:
          </p>

          <div className="flex flex-col items-center md:items-start gap-6 text-base sm:text-lg md:text-xl">
            <a href="https://api.whatsapp.com/send?phone=5531971851469&text=" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[#25D366] transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 sm:w-8 sm:h-8" />
              (31) 97185-1469
            </a>
            <a href="https://www.instagram.com/emy.fotografias_?igsh=MXJ1N21ndXFlZzhteg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[#E4405F] transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-6 h-6 sm:w-8 sm:h-8" />
              Instagram
            </a>
          </div>
        </div>

        {/* Formulário */}
        <div className="w-full md:w-1/2">
          {/* Mensagens de feedback */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md w-full mb-4">
              <strong className="font-bold">Sucesso:</strong> {success}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md w-full mb-4">
              <strong className="font-bold">Erro:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm sm:text-base">
            <label className="text-white font-semibold text-sm sm:text-base">Seu Nome Completo:</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="p-2 sm:p-3 bg-gray-200 text-black rounded-md outline-none text-sm sm:text-base"
              placeholder="Digite seu nome"
            />

            <label className="text-white font-semibold text-sm sm:text-base">Seu Melhor E-Mail:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="p-2 sm:p-3 bg-gray-200 text-black rounded-md outline-none text-sm sm:text-base"
              placeholder="Digite seu e-mail"
            />

            <label className="text-white font-semibold text-sm sm:text-base">Seu Telefone/WhatsApp:</label>
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="p-2 sm:p-3 bg-gray-200 text-black rounded-md outline-none text-sm sm:text-base"
              placeholder="Digite seu telefone"
            />

            <label className="text-white font-semibold text-sm sm:text-base">Mensagem:</label>
            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              className="p-2 sm:p-3 bg-gray-200 text-black rounded-md outline-none text-sm sm:text-base"
              placeholder="Digite sua mensagem"
              rows="4"
            ></textarea>

            <button
              type="submit"
              disabled={isFormIncomplete}
              className={`mt-4 font-bold py-2 sm:py-3 rounded-md text-sm sm:text-base transition
                ${isFormIncomplete ? "bg-gray-400 cursor-not-allowed" : "bg-[#c09b2d] hover:bg-[#d9a766] text-white"}`}
            >
              Enviar
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Contato;
