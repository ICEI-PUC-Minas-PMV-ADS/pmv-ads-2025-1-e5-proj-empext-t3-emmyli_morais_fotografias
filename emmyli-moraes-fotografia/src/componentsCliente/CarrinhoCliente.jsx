import { useEffect, useState } from "react";
import { api } from "../services/api";
import { parseJwt } from "../utils/jwtUtils";
import { FaTrash } from "react-icons/fa";
import Modal from "../components/Modal";

const CarrinhoCliente = () => {
  const [carrinhoInfo, setCarrinhoInfo] = useState([]);
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [carrinhoSelecionado, setCarrinhoSelecionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  useEffect(() => {
    const fetchUsuarioInfo = () => {
      const token = localStorage.getItem("informacaoToken");
      const payload = parseJwt(token);
      setUsuarioInfo(payload);
    };
    fetchUsuarioInfo();
  }, []);

  useEffect(() => {
    if (!usuarioInfo) return;
    const getCarrinho = async () => {
      const filter = `?usuario_id=${usuarioInfo?.idusuario}`;
      const response = await api.get(`/api/carrinho${filter}`);

      setCarrinhoInfo(response.data);
    };
    getCarrinho();
  }, [usuarioInfo, carrinhoInfo]);

  useEffect(() => {
    if (!mensagem) return;
    const id = setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 5000);
    return () => clearTimeout(id);
  }, [mensagem]);
  
  const handleSucesso = (msg) => {
    setTipoMensagem("sucesso");
    setMensagem(msg);
  };
  const handleErro = (msg) => {
    setTipoMensagem("erro");
    setMensagem(msg);
  };

  const excluirCarrinho = (id) => {
    api
      .delete(`/api/carrinho/${id}`)
      .then(() => {
        handleSucesso("Item excluído com sucesso!");
        setCarrinhoInfo((prev) => prev.filter((f) => f.id !== id));
      })
      .catch(() => {
        handleErro("Erro ao excluir item.");
      });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-6 font-serif min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4 mb-12">
          Carrinho
        </h1>

        {mensagem && (
          <div
            className={`border px-4 py-3 rounded-md mb-6 ${
              tipoMensagem === "sucesso"
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-red-100 border-red-400 text-red-700"
            }`}
          >
            {mensagem}
          </div>
        )}

        {carrinhoInfo.length === 0 && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-center">
            <p className="text-gray-500">Carrinho vazio</p>
          </div>
        )}

        {carrinhoInfo.length > 0 && (
          <>
            <table className="w-full bg-white shadow-lg overflow-hidden hidden sm:table">
              <thead className="bg-[#c09b2d] text-white">
                <tr>
                  <th></th>
                  <th className="py-4 px-6 text-center">Produto</th>
                  <th className="py-4 px-6 text-center">Preço</th>
                  <th className="py-4 px-6 text-center">Quantidade</th>
                  <th className="py-4 px-6 text-center">Total</th>
                  <th className="py-4 px-6 text-center">Excluir</th>
                </tr>
              </thead>
              <tbody>
                {carrinhoInfo.map((carrinho, idx) => (
                  <>
                    <tr className="border-b bg-gray-50 hover:bg-gray-200 transition-all">
                      <td className="py-4 px-6 text-center">
                        <input
                          type="checkbox"
                          checked={
                            carrinho.id === carrinhoSelecionado?.carrinho_id
                          }
                          onChange={(e) => {
                            e.stopPropagation();
                            if (e.target.checked) {
                              setCarrinhoSelecionado({
                                carrinho_id: carrinho.id,
                              });
                              console.log(
                                "carrinhoSelecionado",
                                carrinhoSelecionado
                              );
                            } else {
                              setCarrinhoSelecionado([]);
                            }
                          }}
                        />
                      </td>
                      <td className="py-4 px-6 text-center">
                        {carrinho.quantidade}{" "}
                        {carrinho.quantidade > 1 ? "fotos" : "foto"} -{" "}
                        {carrinho.descricao}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(carrinho.preco_unitario)}
                      </td>
                      <td className="py-4 px-6 text-center disabled">
                        {carrinho.quantidade}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(carrinho.total)}
                      </td>
                      <td className="py-4 px-6 flex items-center justify-center">
                        <FaTrash
                          className="text-red-400 hover:text-red-600 cursor-pointer"
                          onClick={() => setIsModalOpen(true)}
                        />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={"Carrinho"}
              content={"Tem certeza que deseja apagar esse item?"}
            >
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    excluirCarrinho(carrinhoSelecionado.carrinho_id);
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 rounded bg-[#c09b2d] text-white hover:bg-[#7e6931]"
                >
                  Excluir
                </button>
              </div>
            </Modal>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => window.history.back()}
                className="border border-[#c09b2d] text-[#c09b2d] px-4 py-2 rounded-md hover:bg-[#c09b2d] hover:text-white transition"
              >
                Retornar às fotos
              </button>

              <button className="bg-[#c09b2d] text-white px-4 py-2 rounded-md hover:bg-[#a07b2d] transition">
                Comprar
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CarrinhoCliente;
