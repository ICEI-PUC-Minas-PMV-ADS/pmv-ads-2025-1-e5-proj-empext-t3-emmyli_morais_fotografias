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

  //const [status, setStatus] = useState < null | "success" | "error" > (null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ContatoEmail(form);
      alert("Mensagem enviada com sucesso!");
      setForm({ nome: "", email: "", telefone: "", mensagem: "" });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
    }
  };

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
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[#25D366] transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 sm:w-8 sm:h-8" />
              (00) 00000-0000
            </a>
            <a href="https://www.instagram.com/seuusuario" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-[#E4405F] transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-6 h-6 sm:w-8 sm:h-8" />
              Instagram
            </a>
          </div>
        </div>

        {/* Formulário */}
        <div className="w-full md:w-1/2">
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
              className="mt-4 bg-[#c09b2d] text-white font-bold py-2 sm:py-3 rounded-md hover:bg-[#d9a766] transition text-sm sm:text-base"
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
