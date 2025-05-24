import React from "react";
import { Route } from "react-router-dom";
import Login from "../Pages/Login/login";
import Cadastro from "../Pages/Cadastro/cadastro";
import EsqueciSenha from "../Pages/EsqueciSenha/esqueciSenha";
import AcessandoEmail from "../Pages/EsqueciSenha/acessoEmail";

export const AnonRoutes = () => {
    return (
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/esqueciSenha" element={<EsqueciSenha />} />
            <Route path="/AcessandoEmail/:emailToken" element={<AcessandoEmail/>} />
        </>
    );
}