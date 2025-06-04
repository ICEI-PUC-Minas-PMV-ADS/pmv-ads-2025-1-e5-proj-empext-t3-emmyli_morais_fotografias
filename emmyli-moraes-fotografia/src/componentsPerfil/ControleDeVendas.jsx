import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "../services/api";

const ControleDeVendas = () => {
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const [vendas, setVendas] = useState([]);

  const statusLabels = {
    pending: "Pendente",
    approved: "Aprovado",
    authorized: "Autorizado",
    in_process: "Em processamento",
    in_mediation: "Em mediação",
    rejected: "Rejeitado",
    cancelled: "Cancelado",
    refunded: "Reembolsado",
    charged_back: "Estornado",
  };

  const statusColors = {
    pending: "bg-gray-200 text-gray-800",
    authorized: "bg-gray-200 text-gray-800",
    in_process: "bg-gray-200 text-gray-800",
    in_mediation: "bg-gray-200 text-gray-800",
    approved: "bg-green-200 text-green-800",
    rejected: "bg-red-200 text-red-800",
    cancelled: "bg-red-200 text-red-800",
    refunded: "bg-red-200 text-red-800",
    charged_back: "bg-red-200 text-red-800",
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  const fetchVendas = async () => {
    const filter = `?include=usuario,evento`;
    const response = await api.get("/api/compras" + filter);
    setVendas(response.data);
  };

  return (
    <div className="p-6 font-serif bg-[#F9F9F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4">
        Controle de vendas
      </h1>

      <div className="flex items-center gap-2 mt-4 mb-4">
        <FiSearch className="text-[#c09b2d] text-xl" />
        <input
          type="text"
          placeholder="Buscar por número do pedido"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
        />
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
          <img src="/loading.gif" alt="Carregando..." className="w-32 h-20" />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden hidden sm:table">
          <thead className="bg-[#c09b2d] text-white">
            <tr>
              <th className="py-4 px-6 text-center"># Pedido</th>
              <th className="py-4 px-6 text-center">Cliente</th>
              <th className="py-4 px-6 text-center">Nome do evento</th>
              <th className="py-4 px-6 text-center">Qtd. fotos</th>
              <th className="py-4 px-6 text-center">Preço unitário</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-center">Data</th>
              <th className="py-4 px-6 text-center">Valor</th>
            </tr>
          </thead>
          <tbody>
            {vendas.length > 0 ? (
              vendas.map((venda, index) => (
                <tr
                  key={venda.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-200 transition-all`}
                >
                  <td className="py-4 px-6 text-center">
                    {venda.pagamento_id}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {venda.usuario.nome}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {venda.evento.nome}
                  </td>
                  <td className="py-4 px-6 text-center">{venda.quantidade}</td>
                  <td className="py-4 px-6 text-center">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(venda.preco_unitario)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        statusColors[venda.status]
                      }`}
                    >
                      {statusLabels[venda.status] || venda.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {new Date(venda.dtinclusao).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(venda.total)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 px-4 text-center text-gray-500">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Layout para telas pequenas */}

        <div className="sm:hidden">
          {vendas.length > 0 ? (
            vendas.map((venda) => (
              <div
                key={venda.id}
                className="bg-white p-4 rounded-lg shadow mb-4"
              >
                <p>
                  <strong># Pedido:</strong> {venda.pagamento_id}
                </p>
                <p>
                  <strong>Cliente:</strong> {venda.usuario.nome}
                </p>
                <p>
                  <strong>Nome do evento:</strong> {venda.evento.nome}
                </p>
                <p>
                  <strong>Qtd. fotos:</strong> {venda.quantidade}
                </p>
                <p>
                  <strong>Preço unitário:</strong>{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(venda.preco_unitario)}
                </p>
                <p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColors[venda.status]
                    }`}
                  >
                    {statusLabels[venda.status] || venda.status}
                  </span>
                </p>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(venda.dtinclusao).toLocaleDateString("pt-BR")}
                </p>
                <p>
                  <strong>Valor:</strong>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(venda.total)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Nenhum cliente encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControleDeVendas;
