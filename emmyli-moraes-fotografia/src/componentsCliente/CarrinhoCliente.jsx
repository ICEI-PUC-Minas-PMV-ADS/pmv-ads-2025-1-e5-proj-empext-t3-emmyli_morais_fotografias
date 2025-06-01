import { useEffect, useState } from "react";
import { api } from "../services/api";
import { parseJwt } from "../utils/jwtUtils";
import { FaTrash } from "react-icons/fa";
import Modal from "../components/Modal";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago("APP_USR-3598e018-902e-4145-b2c0-83d905737675"); //PUBLIC KEY TESTE

const CarrinhoCliente = () => {
  const [carrinhoInfo, setCarrinhoInfo] = useState([]);
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [carrinhoSelecionado, setCarrinhoSelecionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [isModalPagamentoOpen, setIsModalPagamentoOpen] = useState(false);
  const [compra, setCompra] = useState(null);

  //O preference_id é unico a cada compra e é importante passá-lo para o wallet pois contem as informações da compra
  const [preferenceId, setPreferenceId] = useState(null);

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
      console.log("carrinhoInfo", carrinhoInfo);
    };
    getCarrinho();
  }, [usuarioInfo]);

  useEffect(() => {
    if (!mensagem) return;
    const id = setTimeout(() => {
      setMensagem("");
      setTipoMensagem("");
    }, 5000);
    return () => clearTimeout(id);
  }, [mensagem]);

  useEffect(() => {
    console.log("preferenceId:", preferenceId);
    console.log("carrinhoSelecionado:", carrinhoSelecionado);
    console.log("carrinho:", carrinhoInfo);
    console.log("compra:", compra);
  }, [preferenceId, carrinhoSelecionado, compra]);

  const handleSucesso = (msg) => {
    setTipoMensagem("sucesso");
    setMensagem(msg);
  };
  const handleErro = (msg) => {
    setTipoMensagem("erro");
    setMensagem(msg);
  };

  const handleComprar = async (
    evento_id,
    usuario_id,
    descricao,
    qtd,
    preco_unitario,
    carrinho_id,
  ) => {
    try {

      console.log('carrinho_id', carrinho_id)
      // 1. Cria a compra no backend
      const data = {
        usuario_id,
        idevento: evento_id,
        descricao,
        total: qtd * preco_unitario,
        status: "pending",
        carrinho_id: carrinho_id,
      };

      const compraResponse = await api.post("/api/compras", data);
      const compraId = compraResponse.data.id;
      const carrinhoId = compraResponse.data.carrinho_id;

      // 2. Cria a preferência de pagamento com o ID da compra como external_reference
      const pagamentoResponse = await api.post("/api/pagamento", {
        items: [
          {
            title: `Fotos ${descricao}`,
            quantity: qtd,
            unit_price: Number(preco_unitario),
          },
        ],
        external_reference: JSON.stringify({ compra_id: compraId, carrinho_id: carrinhoId })
      });

      setPreferenceId(pagamentoResponse.data.result.id);
    } catch (error) {
      console.error("Erro ao criar compra e preferência:", error);
    }
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
                          checked={carrinho.id === carrinhoSelecionado?.id}
                          onChange={(e) => {
                            e.stopPropagation();
                            if (e.target.checked) {
                              setCarrinhoSelecionado(carrinho);
                              console.log(
                                "CarrinhoSelecionado",
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
                    if (!carrinhoSelecionado) {
                      setIsModalOpen(false);
                      handleErro("Selecione o item que deseja excluir.");
                      return;
                    }
                    excluirCarrinho(carrinhoSelecionado.id);
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

              <button
                className="bg-[#c09b2d] text-white px-4 py-2 rounded-md hover:bg-[#a07b2d] transition"
                onClick={() => {
                  if (!carrinhoSelecionado) {
                    setIsModalOpen(false);
                    handleErro("Selecione o item que deseja comprar.");
                    return;
                  }
                  handleComprar(
                    carrinhoSelecionado?.evento_id,
                    carrinhoSelecionado?.usuario_id,
                    carrinhoSelecionado?.descricao,
                    carrinhoSelecionado?.quantidade,
                    carrinhoSelecionado?.preco_unitario,
                    carrinhoSelecionado?.id,
                  );
                  setIsModalPagamentoOpen(true);
                }}
              >
                Comprar
              </button>
            </div>
            {isModalPagamentoOpen && preferenceId && (
              <Modal
                isOpen={isModalPagamentoOpen}
                onClose={() => setIsModalPagamentoOpen(false)}
                title={"Pagamento"}
                content={
                  "Clique no botão abaixo para realizar sua compra de forma segura com o Mercado Pago."
                }
              >
                <Wallet initialization={{ preferenceId: preferenceId }} />
              </Modal>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CarrinhoCliente;
