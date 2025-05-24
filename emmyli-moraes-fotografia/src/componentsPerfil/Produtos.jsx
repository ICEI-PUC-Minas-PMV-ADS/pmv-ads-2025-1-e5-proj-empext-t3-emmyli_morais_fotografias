import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { api } from "../services/api";

const Produtos = () => {

  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [editandoProduto, setEditandoProduto] = useState(null);
  const [dadosEditados, setDadosEditados] = useState({
    descricao: "",
    quantidade_fotos: 0,
    preco: "",
    observacoes: "",
  });

  //novo produto
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [dadosNovoProduto, setDadosNovoProduto] = useState({
    descricao: "",
    quantidade_fotos: 0,
    preco: "",
    observacoes: "",
    evento_id: "",
  });

  const buscarProdutos = () => {
    api
      .get("/api/produtos?include=evento")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProdutos(response.data);
        } else {
          console.error("Resposta inesperada:", response.data);
          setProdutos([]);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  };

 /* const buscarEventos = () => {
    api
      .get("/api/eventos")
      .then((res) => {
        setEventos(res.data || []);
      })
      .catch((err) => {
        console.error("Erro ao buscar eventos:", err);
      });
  };*/

  useEffect(() => {
    buscarProdutos();
    //buscarEventos();
  }, []);

  const produtosFiltrados = produtos.filter((produto) => {
    const termo = busca.toLowerCase();
    return (
      produto.descricao.toLowerCase().includes(termo) ||
      produto.observacoes?.toLowerCase().includes(termo)
    );
  });

  const abrirModalEdicao = (produto) => {
    setEditandoProduto(produto);
    setDadosEditados({
      descricao: produto.descricao,
      quantidade_fotos: produto.quantidade_fotos,
      preco: produto.preco,
      observacoes: produto.observacoes,
      evento_id: produto.evento?.id || "",
    });
  };

  const fecharModal = () => setEditandoProduto(null);

  const salvarEdicao = () => {
    api
      .put(`/api/produtos/${editandoProduto.id}`, dadosEditados)
      .then(() => {
        alert("Produto atualizado com sucesso!");
        buscarProdutos();
        fecharModal();
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao salvar alterações.");
      });
  };

  const removerProduto = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    api
      .delete(`/api/produtos/${id}`)
      .then(() => {
        alert("Produto removido com sucesso!");
        setProdutos((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto.");
      });
  };

  const salvarNovoProduto = () => {
    api
      .post("/api/produtos", dadosNovoProduto)
      .then(() => {
        alert("Produto cadastrado com sucesso!");
        buscarProdutos();
        setModalCadastroAberto(false);
        setDadosNovoProduto({
          descricao: "",
          quantidade_fotos: 0,
          preco: "",
          observacoes: "",
          id_evento: "",
        });
      })
      .catch((error) => {
        console.error("Erro ao cadastrar produto:", error);
        alert("Erro ao cadastrar produto.");
      });
  };

  return (
    <div className="p-6 font-serif bg-[#F9F9F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4">
        Lista de Produtos
      </h1>

      <div className="flex items-center justify-between mt-4 mb-4">
        <div className="flex items-center gap-2 w-full max-w-md">
          <FiSearch className="text-[#c09b2d] text-xl" />
          <input
            type="text"
            placeholder="Buscar por descrição ou observação..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
          />
        </div>
        <button
          onClick={() => setModalCadastroAberto(true)}
          className="ml-4 bg-[#c09b2d] text-white px-4 py-2 rounded hover:bg-[#b0891a] transition"
        >
          Novo Produto
        </button>
      </div>

      {/* Tabela Desktop */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-[#c09b2d] text-white">
            <tr>

              <th className="py-4 px-6 text-left">Descrição</th>
              <th className="py-4 px-6 text-left">Qtd. Fotos</th>
              <th className="py-4 px-6 text-left">Preço</th>
              <th className="py-4 px-6 text-left">Observações</th>
              <th className="py-4 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto, index) => (
                <tr
                  key={produto.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-200 transition-all`}
                >
                  <td className="py-4 px-6">{produto.descricao}</td>
                  <td className="py-4 px-6">{produto.quantidade_fotos}</td>
                  <td className="py-4 px-6">
                    R$ {parseFloat(produto.preco).toFixed(2)}
                  </td>
                  <td className="py-4 px-6">{produto.observacoes}</td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <button
                      onClick={() => abrirModalEdicao(produto)}
                      className="text-blue-500 hover:text-blue-700 text-xl"
                      aria-label="Editar produto"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => removerProduto(produto.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                      aria-label="Excluir produto"
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

      {/* Mobile Cards */}
      <div className="block sm:hidden space-y-4 mt-4">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <div key={produto.id} className="bg-white rounded-lg shadow p-4">
              <p><strong>Descrição:</strong> {produto.descricao}</p>
              <p><strong>Qtd. Fotos:</strong> {produto.quantidade_fotos}</p>
              <p><strong>Preço:</strong> R$ {parseFloat(produto.preco).toFixed(2)}</p>              
              <p><strong>Observações:</strong> {produto.observacoes}</p>
              <div className="flex justify-end mt-2 space-x-4">
                <button
                  onClick={() => abrirModalEdicao(produto)}
                  className="text-blue-500 hover:text-blue-700 text-xl"
                  aria-label="Editar"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => removerProduto(produto.id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                  aria-label="Excluir"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
        )}
      </div>

      {/* Modal Edição com animação */}
      {editandoProduto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity animate-fade-in">
          <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg text-center">
            <h2 className="text-2xl font-bold text-[#c09b2d] mb-6">
              Editar Produto
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                salvarEdicao();
              }}
              className="space-y-4 text-left"
            >
              <div>
                <label className="block mb-1">Descrição</label>
                <input
                  required
                  value={dadosEditados.descricao}
                  onChange={(e) =>
                    setDadosEditados({ ...dadosEditados, descricao: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Quantidade de Fotos</label>
                <input
                  type="number"
                  min={0}
                  required
                  value={dadosEditados.quantidade_fotos}
                  onChange={(e) =>
                    setDadosEditados({
                      ...dadosEditados,
                      quantidade_fotos: parseInt(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  required
                  value={dadosEditados.preco}
                  onChange={(e) =>
                    setDadosEditados({
                      ...dadosEditados,
                      preco: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Observações</label>
                <textarea
                  value={dadosEditados.observacoes}
                  onChange={(e) =>
                    setDadosEditados({
                      ...dadosEditados,
                      observacoes: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>              

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#c09b2d] hover:bg-[#b0891a] text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/*modal cadastro novo produto*/}

      {modalCadastroAberto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity animate-fade-in">
          <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg text-center">
            <h2 className="text-2xl font-bold text-[#c09b2d] mb-6">
              Cadastrar Produto
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                salvarNovoProduto();
              }}
              className="space-y-4 text-left"
            >
              <div>
                <label className="block mb-1">Descrição</label>
                <input
                  required
                  value={dadosNovoProduto.descricao}
                  onChange={(e) =>
                    setDadosNovoProduto({ ...dadosNovoProduto, descricao: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Quantidade de Fotos</label>
                <input
                  type="number"
                  min={0}
                  required
                  value={dadosNovoProduto.quantidade_fotos}
                  onChange={(e) =>
                    setDadosNovoProduto({
                      ...dadosNovoProduto,
                      quantidade_fotos: parseInt(e.target.value),
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  required
                  value={dadosNovoProduto.preco}
                  onChange={(e) =>
                    setDadosNovoProduto({
                      ...dadosNovoProduto,
                      preco: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Observações</label>
                <textarea
                  value={dadosNovoProduto.observacoes}
                  onChange={(e) =>
                    setDadosNovoProduto({
                      ...dadosNovoProduto,
                      observacoes: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>             

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setModalCadastroAberto(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#c09b2d] hover:bg-[#b0891a] text-white px-4 py-2 rounded"
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
