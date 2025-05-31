import React from "react";
import { Route } from "react-router-dom";
import Cliente from "../Pages/PerfilCliente/Cliente"
import CarrinhoCliente from "../componentsCliente/CarrinhoCliente"

export const AuthClientRoutes = () => {
    return (
        <>
            <Route path="/PerfilCliente" element={<Cliente />} />
            <Route path="/carrinho" element={<Cliente />} />
        </>
    );
}