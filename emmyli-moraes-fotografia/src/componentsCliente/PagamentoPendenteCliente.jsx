import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PagamentoPendenteCliente = () => {
  const [count, setCount] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    if (count === 0) {
      navigate("/perfilCliente");
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, navigate]);

  return (
    <div className="p-20 flex flex-col gap-5 items-center justify-center font-serif bg-[#F9F9F9] w-screen h-screen">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4">
        Pagamento pendente!
      </h1>

      <p className="mt-3">
        Em 15 segundos você será redirecionado para o seu Perfil.
      </p>
      <p className=" text-lg">
        Seu pagamento está <b>pendente</b>.
      </p>
            <p className=" text-lg">
        Mas não se preocupe! Você pode visualizar o status da compra no menu <b>"Minhas compras"</b>.
      </p>
      <button className="w-10 h-10 bg-[#c09b2d] text-white rounded-full flex items-center justify-center">
        {count}
      </button>
      <button
        onClick={() => navigate("/perfilCliente")}
        className="px-6 py-4 rounded bg-[#c09b2d] text-white hover:bg-[#7e6931] mt-8"
      >
        Ir para loja
      </button>

      <div className="overflow-x-auto"></div>
    </div>
  );
};

export default PagamentoPendenteCliente;
