
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const ControleDeVendas = () => {

  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const [vendasFiltradas, setVendasFiltradas] = useState([
    {
      id: 1,
      idcliente: "Cliente 1",
      idevento: "Evento 1",
      qtd: 10,
      qtd_vendidas: 5,
      status: "Pendente", 
      pagamento: "Cartão de Crédito",
      data: "2023-10-01",
      valor: 100.00,
    }
  ]);
 
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
              <th className="py-4 px-6 text-center">Fotos</th>
              <th className="py-4 px-6 text-center">Vendidas</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6 text-center">Pagamento</th>
              <th className="py-4 px-6 text-center">Data</th>
              <th className="py-4 px-6 text-center">Valor</th>              
            </tr>
          </thead>
          <tbody>
            {vendasFiltradas.length > 0 ? (
              vendasFiltradas.map((venda, index) => (
                <tr
                  key={venda.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-200 transition-all`}
                >
                  <td className="py-4 px-6 text-center">{venda.id}</td>
                  <td className="py-4 px-6 text-center">{venda.idcliente}</td>
                  <td className="py-4 px-6 text-center">{venda.idevento}</td>
                  <td className="py-4 px-6 text-center">{venda.qtd}</td>
                  <td className="py-4 px-6 text-center">{venda.qtd_vendidas}</td>
                  <td className="py-4 px-6 text-center">{venda.status}</td>
                  <td className="py-4 px-6 text-center">{venda.pagamento}</td>
                  <td className="py-4 px-6 text-center">{new Date(venda.data).toLocaleDateString('pt-BR')}</td>
                  <td className="py-4 px-6 text-center">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(venda.valor)}</td>
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
          {vendasFiltradas.length > 0 ? (
            vendasFiltradas.map((venda) => (
              <div
                key={venda.id}
                className="bg-white p-4 rounded-lg shadow mb-4"
              >
                <p>
                  <strong># Pedido:</strong> {venda.id}
                </p>
                <p>
                  <strong>Cliente:</strong> {venda.idcliente}
                </p>
                <p>
                  <strong>Nome do evento:</strong> {venda.idevento}
                </p>
                <p>
                  <strong>Fotos:</strong> {venda.qtd}
                </p>
                <p>
                  <strong>Vendidas:</strong> {venda.qtd_vendidas}   
                </p>
                <p>
                  <strong>Status:</strong> {venda.status}
                </p>
                <p>
                  <strong>Pagamento:</strong> {venda.pagamento}
                </p>
                <p>
                  <strong>Data:</strong> {new Date(venda.data).toLocaleDateString('pt-BR')}
                </p>
                <p>
                  <strong>Valor:</strong >{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(venda.valor)}
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
