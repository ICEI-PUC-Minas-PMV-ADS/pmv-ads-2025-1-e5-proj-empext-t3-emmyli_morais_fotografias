import { useEffect, useState } from "react";
import { FaBolt, FaImage, FaDollarSign, FaUserPlus, FaCog, FaBox } from "react-icons/fa";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import { useAuth } from "../context/authContext";
import UserAvatar from "../components/UserAvatar";

const MenuNavPerfil = ({ onSelect, isOpen, toggleSidebar, selectedItem }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { name: "Acesso Rápido", icon: <FaBolt />, key: "acessoRapido" },
    { name: "Eventos", icon: <FaImage />, key: "eventos" },
    { name: "Albuns", icon: <FaImage />, key: "albuns" },
    { name: "Controle de Vendas", icon: <FaDollarSign />, key: "controleVendas" },
    { name: "Cadastros Realizados", icon: <FaUserPlus />, key: "cadastros" },
    { name: "Cadastros de Produtos", icon: <FaBox />, key: "produtos" },
    { name: "Configuração", icon: <FaCog />, key: "configuracao" },
    { name: "Perfil", icon: <FaCog />, key: "perfil" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowMobileMenu(false); // Garante que fecha o menu mobile ao voltar pro desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (key) => {
    onSelect(key);
    if (isMobile) setShowMobileMenu(false);
  };

  const computedMarginLeft = !isMobile ? (isOpen ? "16rem" : "5rem") : "0";

  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Menu */}
      {isMobile && (
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-green-900 text-white p-6 z-50 overflow-auto 
            transition-all duration-500 ease-in-out 
            ${showMobileMenu ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
        >
          <div className="flex items-center mb-4">
            <button
              onClick={() => setShowMobileMenu(false)}
              className="text-[#c09b2d] mr-4"
            >
              <Menu size={28} />
            </button>

            <Link to="/">
              <img src={logo} alt="Logo" className="h-20" />
            </Link>
          </div>

          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.key}
                onClick={() => handleItemClick(item.key)}
                className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer transition-all 
                text-[#c09b2d] shadow-md transform duration-300 ease-in-out
                ${selectedItem === item.key ? "bg-green-700 shadow-lg text-yellow-300" : "hover:bg-green-800"}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sidebar - Desktop */}
      {!isMobile && (
        <div
          className={`fixed top-0 left-0 h-full bg-green-900 text-white p-4 transition-all z-50 
          ${isOpen ? "w-64" : "w-20"}`}
        >
          <div className="h-6" />
          <div
            className={`flex justify-center mb-6 transition-opacity duration-300 
            ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            <Link to="/">
              <img src={logo} alt="Logo" className="h-24 mx-auto" />
            </Link>
          </div>

          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.key}
                onClick={() => onSelect(item.key)}
                className={`flex items-center p-4 cursor-pointer rounded-lg transition-all
                  shadow-md ${selectedItem === item.key ? "bg-green-700 shadow-lg text-yellow-300" : "hover:bg-green-800"} 
                  ${!isOpen ? "justify-center" : ""} text-[#c09b2d]`}
              >
                {item.icon}
                <span className={`ml-2 ${isOpen ? "block" : "hidden"}`}>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Topbar */}
      <div
        className={`fixed top-0 right-0 h-16 bg-white flex items-center justify-between px-4 shadow-md z-40 transition-all duration-300`}
        style={{ left: computedMarginLeft }}
      >
        <button
          onClick={() => {
            isMobile ? setShowMobileMenu((prev) => !prev) : toggleSidebar();
          }}
          className="text-[#c09b2d]"
        >
          <Menu size={28} />
        </button>

        <div className="relative">
          <UserAvatar name={user?.nome} onClick={toggleMenu} />

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2 z-50">
              <ul>
                <li className="cursor-pointer hover:text-yellow-700">Perfil</li>
                <li className="cursor-pointer hover:text-yellow-700">Configuração</li>
                <li onClick={logout} className="cursor-pointer hover:text-yellow-700">Sair</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuNavPerfil;
