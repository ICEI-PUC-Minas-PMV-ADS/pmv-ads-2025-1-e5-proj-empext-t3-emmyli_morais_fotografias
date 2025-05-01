import { useState } from "react";

const ControleDeVendas = () => {
  const [vendas] = useState([
    {
      id: "P35900602",
      cliente: "rafaelcassiano",
      email: "rassiano@jayahoo.com.br",
      galeria: "Teste",
      fotos: 21,
      vendidas: 3,
      status: "PENDENTE",
      pagamento: "Pendente",
      data: "18/02/2025",
      valor: "R$ 60,00",
    },
    {
      id: "P06257580",
      cliente: "barbara.sena",
      email: "barbara.fsena@hotmail.com",
      galeria: "Teste",
      fotos: 25,
      vendidas: 5,
      status: "PENDENTE",
      pagamento: "Pendente",
      data: "18/02/2025",
      valor: "R$ 100,00",
    },
    {
      id: "P07668981",
      cliente: "Kasuteme",
      email: "rafaelkasuteme@gmail.com",
      galeria: "Bakise Mona ki - 06/10/2024",
      fotos: 374,
      vendidas: 10,
      status: "PAGO",
      pagamento: "Pago",
      data: "07/10/2024",
      valor: "R$ 50,00",
    },
    {
      id: "P52939319",
      cliente: "Ana carolina pinheiro Osório",
      email: "sophiepinheiro2020@gmail.com",
      galeria: "BMI - Gira de Exu",
      fotos: 253,
      vendidas: 4,
      status: "CANCELADO",
      pagamento: "Pendente",
      data: "08/09/2024",
      valor: "R$ 20,00",
    },
  ]);

  return (
    <div className="p-6 font-serif bg-[#F9F9F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4">
        Controle de Vendas
      </h1>
      <p className="mt-4 mb-6">Aqui você pode visualizar as vendas realizadas.</p>

      {/* Tabela visível apenas em telas médias e grandes */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-[#c09b2d] text-white">
            <tr>
              <th className="py-4 px-6 text-left"># Pedido</th>
              <th className="py-4 px-6 text-left">Cliente</th>
              <th className="py-4 px-6 text-left">Nome da Galeria</th>
              <th className="py-4 px-6 text-center">Fotos</th>
              <th className="py-4 px-6 text-center">Vendidas</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-center">Pagamento</th>
              <th className="py-4 px-6 text-center">Data</th>
              <th className="py-4 px-6 text-center">Valor</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda, index) => (
              <tr
                key={venda.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-200 transition-all`}
              >
                <td className="py-4 px-6">{venda.id}</td>
                <td className="py-4 px-6">
                  <div className="font-semibold">{venda.cliente}</div>
                  <div className="text-sm text-gray-500">{venda.email}</div>
                </td>
                <td className="py-4 px-6">{venda.galeria}</td>
                <td className="py-4 px-6 text-center">{venda.fotos}</td>
                <td className="py-4 px-6 text-center">{venda.vendidas}</td>
                <td
                  className={`py-4 px-6 text-center font-bold ${
                    venda.status === "PAGO"
                      ? "text-green-600"
                      : venda.status === "CANCELADO"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {venda.status}
                </td>
                <td className="py-4 px-6 text-center">{venda.pagamento}</td>
                <td className="py-4 px-6 text-center">{venda.data}</td>
                <td className="py-4 px-6 text-center font-semibold">{venda.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exibição em formato de Card no Mobile */}
      <div className="md:hidden mt-6">
        {vendas.map((venda) => (
          <div key={venda.id} className="bg-white p-4 shadow-md rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#c09b2d]">{venda.id}</span>
              <span
                className={`px-3 py-1 text-xs font-bold uppercase rounded ${
                  venda.status === "PAGO"
                    ? "bg-green-200 text-green-700"
                    : venda.status === "CANCELADO"
                    ? "bg-red-200 text-red-700"
                    : "bg-blue-200 text-blue-700"
                }`}
              >
                {venda.status}
              </span>
            </div>
            <p className="text-gray-600">{venda.cliente} - {venda.email}</p>
            <p className="text-sm mt-2">Galeria: {venda.galeria}</p>
            <p className="text-sm">Fotos: {venda.fotos} | Vendidas: {venda.vendidas}</p>
            <p className="text-sm">Pagamento: {venda.pagamento}</p>
            <p className="text-sm font-bold mt-2">Valor: {venda.valor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControleDeVendas;
