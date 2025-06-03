import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const PagamentoRecusadoCliente = () => {
  const navigate = useNavigate();

  return (
    <div className="p-20 flex flex-col gap-5 items-center justify-center font-serif bg-[#F9F9F9] w-screen h-screen">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4">
        Pagamento recusado!
      </h1>

      <p className="mt-3 text-lg">
        Infelizmente seu pagamento foi <b>recusado</b>.
      </p>
      <p className=" text-lg flex flex-col items-center gap-5">
        Mas não se preocupe! Entre em contato fotógrafa clicando no ícone do Whatsapp abaixo:
        <a
          href="https://api.whatsapp.com/send?phone=5531971851469&text="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white transition"
        >
          <FaWhatsapp color="#25D366" size={50}/>
        </a>
      </p>
      <button
        onClick={() => navigate("/perfilCliente")}
        className="px-6 py-4 rounded bg-[#c09b2d] text-white hover:bg-[#7e6931] mt-5"
      >
        Ir para loja
      </button>

      <div className="overflow-x-auto"></div>
    </div>
  );
};

export default PagamentoRecusadoCliente;
