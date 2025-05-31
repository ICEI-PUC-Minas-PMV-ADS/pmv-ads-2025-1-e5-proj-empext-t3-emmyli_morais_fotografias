import { useEffect, useState } from "react";
import { useCarrinho } from "../context/carrinhoContext";
import { api } from "../services/api";
import { parseJwt } from "../utils/jwtUtils";

const CarrinhoCliente = () => {
  const { carrinho } = useCarrinho();
  const [carrinhoInfo, setCarrinhoInfo] = useState([]);
  const [usuarioInfo, setUsuarioInfo] = useState(null);

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
      console.log("usuarioInfo", usuarioInfo);
      const filter = `?usuario_id=${usuarioInfo?.idusuario}`;
      const response = await api.get(`/api/carrinho${filter}`);

      setCarrinhoInfo(response.data);
    };
    getCarrinho();
  }, [usuarioInfo]);

  return (
    <>
      <div className="p-6 font-serif min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4 mb-12">
          Carrinho
        </h1>

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
                  <th className="py-4 px-6 text-center">Produto</th>
                  <th className="py-4 px-6 text-center">Preço</th>
                  <th className="py-4 px-6 text-center">Quantidade</th>
                  <th className="py-4 px-6 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {carrinhoInfo.map((carrinho, idx) => (
                  <tr className="border-b bg-gray-50 hover:bg-gray-200 transition-all">
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
                  </tr>
                ))}
              </tbody>
            </table>

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
