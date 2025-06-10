import React, { useEffect, useState } from "react";
import AuthProvider from "./context/authContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IsValidRouter } from "./routes/ValidateRouter";
import Home from "./Pages/Home/home";
import Contato from "./Pages/Contatos/contato";
import Sobre from "./Pages/Sobre/sobre";
import Trabalhos from "./Pages/trabalhos/trabalhos";
import { AuthFotografaRoutes } from "./routes/auth.fotografa.routes";
import { AuthClientRoutes } from "./routes/auth.cliente.routes";
import { AnonRoutes } from "./routes/anon.routes";
import Evento from "./Pages/Evento/evento";

import NotFound from "./Pages/NotFound";

const App = () => {


  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/trabalhos" element={<Trabalhos />} />
          
          <Route element={<IsValidRouter isFotografo />}>
            {AuthFotografaRoutes()}
          </ Route>

          <Route element={<IsValidRouter isCliente />}>
            {AuthClientRoutes()}
          </ Route>

          <Route element={<IsValidRouter isAnon />}>
            {AnonRoutes()}
          </ Route>

          <Route path="/album/:id" element={<Evento />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
