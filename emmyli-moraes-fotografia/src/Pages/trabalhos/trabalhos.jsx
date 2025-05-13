import { useEffect, useState } from "react";
import MenuNav   from "../../components/MenuNav";
import Categoria from "../../components/Categoria";
import Ensaios   from "../../components/Ensaios";
import Galeria   from "../../components/Galeria";
import ModalImagem from "../../components/ModalImagem";
import { api } from "../../services/api";

const Trabalhos = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [categorias, setCategorias] = useState(["Todos"]);
  const [ensaios, setEnsaios] = useState([]);
  const [galeriaAberta, setGaleriaAberta] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(null);
  const [indiceImagem, setIndiceImagem] = useState(0);
  const [curtidas, setCurtidas] = useState({});

  useEffect(() => {
    buscarAlbunsPublicos();
  }, []);

  const buscarAlbunsPublicos = async () => {
    try {
      const { data } = await api.get("/api/albuns");
      const filtrados = data
      
        .filter(a => a.origem === "publico" && a.descricao && a.fotos.length > 0)
        .map(a => ({
          id: a.id,
          titulo: a.nome,
          categoria: a.descricao,
          capa: a.fotos[0]?.foto?.foto,
          fotos: a.fotos.map(f => ({
            id: f.foto?.id,
            url: f.foto?.foto
          })).filter(f => f.url),
          visualizacoes: a.visualizacoes || 0,
          curtidas: a.totalCurtidas || 0
        }));

      const unicas = [...new Set(filtrados.map(e=>e.categoria))];
      setCategorias(["Todos", ...unicas]);
      setEnsaios(filtrados);
    } catch (err) {
      console.error("Erro ao buscar públicos:", err);
    }
  };

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
    categoriaSelecionada==="Todos"
      ? ensaios
      : ensaios.filter(e=>e.categoria===categoriaSelecionada);

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
