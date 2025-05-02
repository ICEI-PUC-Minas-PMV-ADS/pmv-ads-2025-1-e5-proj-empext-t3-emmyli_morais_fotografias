// Produtos.tsx
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoProduto, setEditandoProduto] = useState(null);
  const [dadosEditados, setDadosEditados] = useState({
    descricao: "",
    preco: "",
    quantidade_fotos: 0,
    observacoes: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/produtos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos da API:", data); // 👈 Aqui você vê no console do navegador
        setProdutos(data);
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  const produtosFiltrados = produtos.filter((produto) => {
    const termo = busca.toLowerCase();
    return (
      produto.descricao.toLowerCase().includes(termo) ||
      produto.observacoes.toLowerCase().includes(termo)
    );
  });

  const abrirModalEdicao = (produto) => {
    setEditandoProduto(produto);
    setDadosEditados({
      descricao: produto.descricao,
      preco: produto.preco,
      quantidade_fotos: produto.quantidade_fotos,
      observacoes: produto.observacoes,
    });
  };

  const fecharModal = () => setEditandoProduto(null);

  const salvarEdicao = () => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === editandoProduto.id ? { ...p, ...dadosEditados } : p
      )
    );
    fecharModal();
  };

  const removerProduto = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };
console.log(produtosFiltrados);
  return (
    <div className="p-6 font-serif bg-[#F9F9F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4">
        Lista de Produtos
      </h1>

      <div className="flex items-center gap-2 mt-4 mb-4">
        <FiSearch className="text-[#c09b2d] text-xl" />
        <input
          type="text"
          placeholder="Buscar por descrição ou observações"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden hidden sm:table">
          <thead className="bg-[#c09b2d] text-white">
            <tr>
              <th className="py-4 px-6 text-left">Descrição</th>
              <th className="py-4 px-6 text-left">Preço</th>
              <th className="py-4 px-6 text-left">Qtd. Fotos</th>
              <th className="py-4 px-6 text-left">Observações</th>
              <th className="py-4 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto, index) => (
                <tr
                  key={produto.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition-all`}
                >
                  <td className="py-4 px-6">{produto.descricao}</td>
                  <td className="py-4 px-6">R$ {parseFloat(produto.preco).toFixed(2)}</td>
                  <td className="py-4 px-6">{produto.quantidade_fotos}</td>
                  <td className="py-4 px-6">{produto.observacoes}</td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <button
                      onClick={() => abrirModalEdicao(produto)}
                      className="text-blue-500 hover:text-blue-700 text-xl"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => removerProduto(produto.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 px-4 text-center text-gray-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editandoProduto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg text-center flex flex-col">
            <h2 className="text-2xl font-bold text-[#c09b2d] mb-6">
              Editar Produto
            </h2>

            <form className="w-full flex flex-col space-y-4 text-left">
              <label>Descrição</label>
              <input
                value={dadosEditados.descricao}
                onChange={(e) =>
                  setDadosEditados({ ...dadosEditados, descricao: e.target.value })
                }
                className="border p-2 rounded"
              />
              <label>Preço</label>
              <input
                type="number"
                value={dadosEditados.preco}
                onChange={(e) =>
                  setDadosEditados({ ...dadosEditados, preco: e.target.value })
                }
                className="border p-2 rounded"
              />
              <label>Quantidade de Fotos</label>
              <input
                type="number"
                value={dadosEditados.quantidade_fotos}
                onChange={(e) =>
                  setDadosEditados({ ...dadosEditados, quantidade_fotos: e.target.value })
                }
                className="border p-2 rounded"
              />
              <label>Observações</label>
              <input
                value={dadosEditados.observacoes}
                onChange={(e) =>
                  setDadosEditados({ ...dadosEditados, observacoes: e.target.value })
                }
                className="border p-2 rounded"
              />
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={salvarEdicao}
                  className="bg-[#c09b2d] text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos;
