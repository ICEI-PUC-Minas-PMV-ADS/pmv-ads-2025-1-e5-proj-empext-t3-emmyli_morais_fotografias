import React, { useState } from "react";
import MenuNav from "../../components/MenuNav";
import Categoria from "../../components/Categoria";
import Ensaios from "../../components/Ensaios";
import Galeria from "../../components/Galeria";
import ModalImagem from "../../components/ModalImagem";

import aniversario from "../../imagemteste/aniversario.jpg";
import casamento from "../../imagemteste/casamento.jpg";
import chadebebe from "../../imagemteste/chadebebe.jpg";
import corporativo from "../../imagemteste/corporativo.jpg";
import festa from "../../imagemteste/festa.jpg";
import infantil from "../../imagemteste/infantil.jpg";

const categorias = ["Todos", "Aniversário", "Festa", "Chá de Bebê", "Casamento", "Infantil", "Corporativo"];

const ensaios = [
  { id: "ensaio1", titulo: "Aniversário da Maria", cliente: "Maria Souza", categoria: "Aniversário", capa: aniversario, fotos: [aniversario, aniversario], visualizacoes: 100, curtidas: 50 },
  { id: "ensaio2", titulo: "Casamento na Praia", cliente: "Lucas e Ana", categoria: "Casamento", capa: casamento, fotos: [casamento, casamento], visualizacoes: 200, curtidas: 120 },
  { id: "ensaio3", titulo: "Chá do João", cliente: "João Silva", categoria: "Chá de Bebê", capa: chadebebe, fotos: [chadebebe, chadebebe], visualizacoes: 80, curtidas: 60 },
  { id: "ensaio4", titulo: "Festa Corporativa", cliente: "Empresa X", categoria: "Corporativo", capa: corporativo, fotos: [corporativo, corporativo], visualizacoes: 150, curtidas: 90 },
  { id: "ensaio5", titulo: "Sessão Infantil", cliente: "Pedro Santos", categoria: "Infantil", capa: infantil, fotos: [infantil, infantil], visualizacoes: 130, curtidas: 110 },
  { id: "ensaio6", titulo: "Festa na Piscina", cliente: "Carla Mendes", categoria: "Festa", capa: festa, fotos: [festa, festa], visualizacoes: 175, curtidas: 95 },
];

const Trabalhos = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [galeriaAberta, setGaleriaAberta] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(null);
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [curtidas, setCurtidas] = useState({});

  const ensaiosFiltrados = categoriaSelecionada === "Todos" ? ensaios : ensaios.filter((ensaio) => ensaio.categoria === categoriaSelecionada);

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-white overflow-x-hidden">
      <MenuNav />
      
      <Categoria categorias={categorias} categoriaSelecionada={categoriaSelecionada} setCategoriaSelecionada={setCategoriaSelecionada} setGaleriaAberta={setGaleriaAberta}/>
      
      {!galeriaAberta && (
        <Ensaios ensaiosFiltrados={ensaiosFiltrados} setGaleriaAberta={setGaleriaAberta} curtidas={curtidas} setCurtidas={setCurtidas} />
      )}

      {galeriaAberta && (
        <Galeria ensaio={galeriaAberta} setImagemAtual={setImagemAtual} setIndiceImagem={setIndiceImagem} fecharGaleria={() => setGaleriaAberta(null)} />
      )}

      {imagemAtual && (
        <ModalImagem imagemAtual={imagemAtual} setImagemAtual={setImagemAtual} indiceImagem={indiceImagem} setIndiceImagem={setIndiceImagem} fotos={galeriaAberta?.fotos || []} />
      )}
    </div>
  );
};

export default Trabalhos;