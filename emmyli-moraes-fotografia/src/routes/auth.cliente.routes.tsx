import React from "react";
import { Route } from "react-router-dom";
import Cliente from "../Pages/PerfilCliente/Cliente"
import PagamentoAprovado from "../componentsCliente/PagamentoAprovadoCliente";
import PagamentoPendente from "../componentsCliente/PagamentoPendenteCliente";
import PagamentoRecusado from "../componentsCliente/PagamentoRecusadoCliente";

export const AuthClientRoutes = () => {
    return (
        <>
            <Route path="/PerfilCliente" element={<Cliente />} />
            <Route path="/carrinho" element={<Cliente />} />
            <Route path="/pagamento-aprovado" element={<PagamentoAprovado />} />
            <Route path="/pagamento-pendente" element={<PagamentoPendente />} />
            <Route path="/pagamento-recusado" element={<PagamentoRecusado />} />


        </>
    );
}