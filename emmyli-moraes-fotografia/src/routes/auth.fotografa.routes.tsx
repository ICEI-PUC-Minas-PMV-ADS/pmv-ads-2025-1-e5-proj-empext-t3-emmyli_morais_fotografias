import React from "react";
import { Route } from "react-router-dom";
import PerfilFotografo from '../Pages/Perfil/perfilFotografa'

export const AuthFotografaRoutes = () => {
    return (
        <>
            <Route path="/Perfil" element={< PerfilFotografo />} />
        </>
    );
}