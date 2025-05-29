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

const App = () => {

  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      // Bloqueia tecla PrintScreen e Ctrl+P
      if (e.key === "PrintScreen" || (e.ctrlKey && e.key.toLowerCase() === "p")) {
        e.preventDefault();
        setBlocked(true);
      }
    };
    const onContext = (e) => {
      // Bloqueia clique-direito em qualquer <img>
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        setBlocked(true);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("contextmenu", onContext);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("contextmenu", onContext);
    };
  }, []);

  if (blocked) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-white">
        <h1 className="text-3xl font-bold">
          Imagem protegida contra impressão
        </h1>
      </div>
    );
  }
  
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

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
