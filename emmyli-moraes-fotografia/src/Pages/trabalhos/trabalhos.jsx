import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import MenuNav from "../../components/MenuNav";
import Categoria from "../../components/Categoria";
import Ensaios from "../../components/Ensaios";
import Galeria from "../../components/Galeria";
import ModalImagem from "../../components/ModalImagem";
import { api } from "../../services/api";

const Trabalhos = () => {
  // “albumId” que veio da Home (via navigate state)
  const location = useLocation();
  const albumIdDaHome = location.state?.albumId ?? null;

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [categorias, setCategorias] = useState(["Todos"]);
  const [ensaios, setEnsaios] = useState([]);
  const [galeriaAberta, setGaleriaAberta] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(null);
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [curtidas, setCurtidas] = useState({});

  // Evita abrir mais de uma vez quando veio da Home
  const abriuRef = useRef(false);

  useEffect(() => {
    const buscarAlbunsPublicos = async () => {
      try {

        const { data } = await api.get("/api/eventos/?include=detalhes");

        // Filtra apenas aqueles marcados como “exibirtrabalho” = true e que têm pelo menos 1 foto
        const filtrados = data
          .filter((a) => a.exibirtrabalho === true && a.detalhes.length > 0)
          .map((a) => ({
            id: a.id,
            titulo: a.nome,
            categoria: a.descricao || "",
            capa: a.detalhes[0]?.foto || "",
            focusX: a.detalhes[0]?.focoX ?? 50,
            focusY: a.detalhes[0]?.focoY ?? 50,
            // Monta array de fotos de “detalhes”
            fotos: a.detalhes.map((f) => ({
              id: f.id,
              url: f.foto || "",
            })),
            visualizacoes: a.visualizacoes ?? 0,
            curtidas: a.totalCurtidas ?? 0,
          }));

        setEnsaios(filtrados);

        // Extrai cada categoria única (tirando strings vazias) para o filtro
        const unicas = Array.from(
          new Set(filtrados.map((e) => e.categoria).filter((c) => c))
        );
        setCategorias(["Todos", ...unicas]);

        // Se o usuário veio da Home com um albumId, abra esse álbum na galeria
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
      await api.post(`/api/visualizacoesCurtidas/view/evento/${ensaio.id}`);
    } catch (err) {
      console.error("Falha ao registrar view:", err);
    }
    setGaleriaAberta(ensaio);
  };

  // Filtra a lista de ensaios de acordo com a categoria selecionada (ou “Todos”)
  const ensaiosFiltrados =
    categoriaSelecionada === "Todos"
      ? ensaios
      : ensaios.filter((e) => e.categoria === categoriaSelecionada);

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
