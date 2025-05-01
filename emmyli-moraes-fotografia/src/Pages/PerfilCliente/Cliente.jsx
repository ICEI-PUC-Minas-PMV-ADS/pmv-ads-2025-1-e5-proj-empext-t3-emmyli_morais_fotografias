import React, { useState } from "react";
import MenuNavPerfilCliente from "../../componentsCliente/MenuNavPerfilCliente";
import GaleriaCliente from "../../componentsCliente/GaleriaCliente";
import CarrinhoCliente from "../../componentsCliente/CarrinhoCliente";
import PerfilCliente from "../../Pages/PerfilCliente/PerfilCliente";

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
      default:
        return <PerfilCliente />;
    }
  };

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
