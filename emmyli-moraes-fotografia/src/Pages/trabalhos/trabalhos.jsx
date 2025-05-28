import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import MenuNav from "../../components/MenuNav";
import Categoria from "../../components/Categoria";
import Ensaios from "../../components/Ensaios";
import Galeria from "../../components/Galeria";
import ModalImagem from "../../components/ModalImagem";
import { api } from "../../services/api";

const Trabalhos = () => {
  // captura o albumId vindo da Home (via navigate state)
  const location = useLocation();
  const albumIdDaHome = location.state?.albumId ?? null;

  // ref para garantir que só abrimos o álbum vindo da Home uma única vez
  

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Todos");
  const [categorias, setCategorias] = useState(["Todos"]);
  const [ensaios, setEnsaios] = useState([]);
  const [galeriaAberta, setGaleriaAberta] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(null);
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [curtidas, setCurtidas] = useState({});

  const abriuRef = useRef(false);

  useEffect(() => {
    const buscarAlbunsPublicos = async () => {
      try {
        const { data } = await api.get("/api/eventos/?include=detalhes");

        const filtrados = data
          .filter((a) => a.exibirtrabalho === true && a.detalhes.length > 0 )
          .map((a) => ({
            id: a.id,
            titulo: a.nome,
            categoria: a.descricao,
            capa: a.detalhes[0]?.foto?.foto || "",
            fotos: a.detalhes.map((f) => ({
              id: f.id,
              url: f.foto?.foto,
            })),
            visualizacoes: a.visualizacoes ?? 0,
            curtidas: a.totalCurtidas ?? 0,
          }));

        setEnsaios(filtrados);

        const unicas = Array.from(
          new Set(filtrados.map((e) => e.categoria))
        );
        setCategorias(["Todos", ...unicas]);

        // se veio da Home e ainda não abrimos, já abre direto
        if (albumIdDaHome && !abriuRef.current) {
          abriuRef.current = true;
          const en = filtrados.find((e) => e.id === albumIdDaHome);
          if (en) abrirGaleria(en);
        }
      } catch (err) {
        console.error("Erro ao buscar públicos:", err);
      }
    };

    buscarAlbunsPublicos();
  }, [albumIdDaHome]);

  const abrirGaleria = async (ensaio) => {
    try {
      await api.post(
        `/api/visualizacoesCurtidas/view/album/${ensaio.id}`
      );
    } catch (err) {
      console.error("Falha ao registrar view:", err);
    }
    setGaleriaAberta(ensaio);
  };

  const ensaiosFiltrados =
    categoriaSelecionada === "Todos"
      ? ensaios
      : ensaios.filter(
          (e) => e.categoria === categoriaSelecionada
        );

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen text-white">
      <MenuNav />

      <Categoria
        categorias={categorias}
        categoriaSelecionada={categoriaSelecionada}
        setCategoriaSelecionada={setCategoriaSelecionada}
        setGaleriaAberta={setGaleriaAberta}
      />

      {!galeriaAberta ? (
        <Ensaios
          ensaiosFiltrados={ensaiosFiltrados}
          abrirGaleria={abrirGaleria}
          curtidas={curtidas}
          setCurtidas={setCurtidas}
        />
      ) : (
        <Galeria
          ensaio={galeriaAberta}
          setImagemAtual={setImagemAtual}
          setIndiceImagem={setIndiceImagem}
          fecharGaleria={() => setGaleriaAberta(null)}
        />
      )}

      {imagemAtual && (
        <ModalImagem
          imagemAtual={imagemAtual}
          setImagemAtual={setImagemAtual}
          indiceImagem={indiceImagem}
          setIndiceImagem={setIndiceImagem}
          fotos={galeriaAberta?.fotos || []}
        />
      )}
    </div>
  );
};

export default Trabalhos;
