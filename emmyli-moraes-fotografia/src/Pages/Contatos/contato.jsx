import React, { useState } from "react";
import MenuNav from "../../components/MenuNav";
import { ContatoEmail } from "../../services/authService";

const Contato = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await ContatoEmail(form);
      setForm({ nome: "", email: "", telefone: "", mensagem: "" });
      setStatus("success");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] flex flex-col">
      <MenuNav />

      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-[10%] pt-28 pb-16 gap-12">

        {/* Texto e Contatos */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-[#d9a766] text-4xl sm:text-5xl font-bold mb-6">Fale Comigo!</h1>
          <p className="text-white text-lg sm:text-xl mb-6">
            Se preferir, entre em contato diretamente:
          </p>

          <div className="flex flex-col items-center md:items-start gap-4 text-base sm:text-lg">
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-[#25D366] transition"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
              (00) 00000-0000
            </a>
            <a
              href="https://www.instagram.com/seuusuario"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-[#E4405F] transition"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-6 h-6" />
              @seuusuario
            </a>
          </div>
        </div>

        {/* Formulário */}
        <div className="w-full md:w-1/2 bg-white rounded-lg p-6 sm:p-8 shadow-lg">
          <h2 className="text-xl font-bold text-[#0B3727] mb-4">Envie sua mensagem</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm sm:text-base">

            <div>
              <label htmlFor="nome" className="block text-gray-700 font-semibold mb-1">Nome completo</label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={form.nome}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-100 text-black rounded-md outline-none focus:ring-2 focus:ring-[#c09b2d]"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Seu Melhor E-Mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-100 text-black rounded-md outline-none focus:ring-2 focus:ring-[#c09b2d]"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-gray-700 font-semibold mb-1">Telefone / WhatsApp</label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                value={form.telefone}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 text-black rounded-md outline-none focus:ring-2 focus:ring-[#c09b2d]"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-gray-700 font-semibold mb-1">Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-3 bg-gray-100 text-black rounded-md outline-none focus:ring-2 focus:ring-[#c09b2d]"
                placeholder="Digite sua mensagem..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#c09b2d] text-white font-bold py-3 rounded-md hover:bg-[#d9a766] transition disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>

          {/* Status */}
          {status === "success" && (
            <p className="mt-4 text-green-600 font-medium">Mensagem enviada com sucesso!</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-600 font-medium">Ocorreu um erro ao enviar. Tente novamente.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contato;
