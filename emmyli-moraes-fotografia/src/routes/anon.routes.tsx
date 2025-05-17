import React from "react";
import { Route } from "react-router-dom";
import Login from "../Pages/Login/login";
import EsqueciSenha from "../Pages/Login/esqueciSenha";
import Cadastro from "../Pages/Cadastro/cadastro";

export const AnonRoutes = () => {
    return (
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/esqueciSenha" element={<EsqueciSenha />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </>
    );
}