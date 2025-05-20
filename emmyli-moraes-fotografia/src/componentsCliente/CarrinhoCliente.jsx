import React from "react";

const CarrinhoCliente = () => {
  return (
  
    <div className="p-6 font-serif min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4 mb-12">
      Carrinho
    </h1>

    <table className="w-full bg-white shadow-lg overflow-hidden hidden sm:table">
          <thead className="bg-[#c09b2d] text-white">
            <tr>
              <th className="py-4 px-6 text-center">Produto</th>
              <th className="py-4 px-6 text-center">Preço</th>
              <th className="py-4 px-6 text-center">Quantidade</th>
              <th className="py-4 px-6 text-center">Total</th>             
            </tr>
          </thead>
          <tbody>
                  <tr className="border-b bg-gray-50 hover:bg-gray-200 transition-all">
                  <td className="py-4 px-6 text-center">Fotos</td>
                  <td className="py-4 px-6 text-center">R$20,00</td>
                  <td className="py-4 px-6 text-center disabled">10</td>
                  <td className="py-4 px-6 text-center">R$200,00</td>
                </tr>
          </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button className="border border-[#c09b2d] text-[#c09b2d] px-4 py-2 rounded-md hover:bg-[#c09b2d] hover:text-white transition">
          Retornar às fotos
        </button>

        <button className="bg-[#c09b2d] text-white px-4 py-2 rounded-md hover:bg-[#a07b2d] transition">
          Comprar
        </button>
      </div>

  </div>
  );
};

export default CarrinhoCliente;
