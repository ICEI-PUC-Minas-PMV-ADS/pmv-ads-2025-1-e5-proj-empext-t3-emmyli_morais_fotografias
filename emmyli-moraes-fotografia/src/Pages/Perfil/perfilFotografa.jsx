import { useState } from "react";
import MenuNavPerfil from "../../componentsPerfil/MenuNavPerfil";
import AcessoRapido from "../../componentsPerfil/AcessoRapido";
import GaleriaDeClientes from "../../componentsPerfil/GaleriaDeClientes";
import ControleDeVendas from "../../componentsPerfil/ControleDeVendas";
import CadastrosRealizados from "../../componentsPerfil/CadastrosRealizados";
import ProdutosEventos from "../../componentsPerfil/Produtos";
import Configuracoes from "../../componentsPerfil/Configuracoes";

const PerfilFotografa = () => {
  const [currentPage, setCurrentPage] = useState("acessoRapido");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("acessoRapido");
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const handleSelect = (item, albumId = null) => {
    setSelectedItem(item);
    setCurrentPage(item);
    setSelectedAlbumId(albumId);

  };

  const renderPage = () => {
    switch (currentPage) {
      case "galeria":
        return <GaleriaDeClientes albumId={selectedAlbumId} />;
      case "controleVendas":
        return <ControleDeVendas />;
      case "cadastros":
        return <CadastrosRealizados />;
      case "produtos":
        return <ProdutosEventos />;
      case "configuracao":
        return <Configuracoes albumId={selectedAlbumId} />;

      default:
        return <AcessoRapido setPage={handleSelect} />;
    }
  };

  return (
    <div className="h-screen bg-gray-100 overflow-x-hidden flex flex-col sm:flex-row">
     
      <MenuNavPerfil
        onSelect={handleSelect}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        selectedItem={selectedItem}
      />

      {/* Conteúdo principal */}
      
      <div
        className={`pt-16 px-4 transition-all duration-300 w-full max-w-full ${
          isSidebarOpen ? "sm:ml-64" : "sm:ml-20"
        }`}
      >
        <div className="p-4">{renderPage()}</div>
      </div>
    </div>
  );
};

export default PerfilFotografa;
