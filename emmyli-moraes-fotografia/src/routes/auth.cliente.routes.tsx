import React from "react";
import { Route } from "react-router-dom";
import Cliente from "../Pages/PerfilCliente/Cliente"

export const AuthClientRoutes = () => {
    return (
        <>
            <Route path="/PerfilCliente" element={<Cliente />} />
        </>
    );
}