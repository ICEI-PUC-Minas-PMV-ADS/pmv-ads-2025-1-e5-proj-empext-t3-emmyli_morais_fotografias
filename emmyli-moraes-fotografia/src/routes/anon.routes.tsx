import React from "react";
import { Route } from "react-router-dom";
import Login from "../Pages/Login/login";
import Cadastro from "../Pages/Cadastro/cadastro";

export const AnonRoutes = () => {
    return (
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </>
    );
}