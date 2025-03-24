import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Cadastro from "./Pages/Cadastro/cadastro";
import Contato from "./Pages/Contatos/contato";
import Sobre from "./Pages/Sobre/sobre";
import AreaDoCliente from "./Pages/Area do cliente/areadocliente";
import Trabalhos from "./Pages/trabalhos/trabalhos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/areadocliente" element={<AreaDoCliente />} />
        <Route path="/trabalhos" element={<Trabalhos />} />
      </Routes>
    </Router>
  );
};

export default App;