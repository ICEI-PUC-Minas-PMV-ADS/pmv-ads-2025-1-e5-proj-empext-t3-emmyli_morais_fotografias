import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MenuNavPerfilCliente from "../../componentsCliente/MenuNavPerfilCliente";
import GaleriaCliente from "../../componentsCliente/GaleriaCliente";
import CarrinhoCliente from "../../componentsCliente/CarrinhoCliente";
import PerfilCliente from "../../Pages/PerfilCliente/PerfilCliente";
import FeedbackCliente from "../../componentsCliente/FeedbackCliente";

const Cliente = () => {
  const [selectedItem, setSelectedItem] = useState("perfil");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (selectedItem) {
      case "galeria":
        return <GaleriaCliente />;
      case "carrinho":
        return <CarrinhoCliente />;
      case "perfil":
        return <PerfilCliente />;
      case "feedback":
        return <FeedbackCliente />;
      default:
        return <PerfilCliente />;
    }
  };

  const location = useLocation();

  // Atualiza selectedItem conforme a rota atual
  useEffect(() => {
    console.log("inclui carrinho?", location.pathname.includes("carrinho"))
    if (location.pathname.includes("carrinho")) setSelectedItem("carrinho");
  }, [location.pathname]);


  return (
    <div
      className={`
        bg-gray-100 overflow-x-hidden flex flex-col sm:flex-row
        h-screen
        sm:overflow-hidden   
        overflow-auto        
      `}
    >
      {/* Menu lateral */}
      
      <MenuNavPerfilCliente
        onSelect={setSelectedItem}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        selectedItem={selectedItem}
      />

      <div
        className={`mt-16 px-4 transition-all duration-300 w-full max-w-full ${
          sidebarOpen ? " md:ml-64" : " md:ml-20"
          }`}
        >
        {renderContent()}
      </div>
    </div>
  );
};

export default Cliente;
