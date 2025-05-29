import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../img/logo.png";
import { useAuth } from "../context/authContext";
import UserAvatar from "./UserAvatar";

const MenuNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useAuth();

  const location = useLocation();
  const menuItems = [
    { name: "Início", path: "/" },
    { name: "Trabalhos", path: "/trabalhos" },
    { name: "Contatos", path: "/contato" },
    { name: "Sobre", path: "/sobre" },
    /*  { name: "Área do Cliente", path: "/areadocliente" }, */
  ];

  return (
    <header className="bg-[#E8E6E0] p-6 flex justify-between items-center relative">

      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo Emmyli Fotografias" className="h-20 cursor-pointer" />
        </Link>
      </div>

      {/* Botão de Menu Responsivo */}
      <button className="md:hidden text-[#252525]" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Menu normal em telas grandes */}
      <nav className="hidden md:flex">
        <ul className="flex gap-8 list-none text-xl mr-10 items-center justify-center">
          {menuItems.map((item) => (
            <li key={item.name} className="cursor-pointer">
              <Link
                to={item.path}
                className={`${location.pathname === item.path ? "text-[#c09b2d]" : "text-[#252525]"
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {
            user.token ?
              <Link to="/PerfilCliente" className="flex items-center justify-center">
                <UserAvatar name={user.nome} size={60} className="bg-gray-300" />
              </Link> :
              <li key="login" className="cursor-pointer">
                <Link
                  to="/login"
                  className={`${location.pathname === "/login" ? "text-[#c09b2d]" : "text-[#252525]"}`}
                >
                  Login
                </Link>
              </li>
          }

        </ul>
      </nav>

      {/* Menu Responsivo */}
      {menuOpen && (
        <nav className="fixed top-0 left-0 w-full h-full bg-[#E8E6E0] flex flex-col items-center justify-center md:hidden z-50">
          <button className="absolute top-5 right-5 text-[#252525]" onClick={() => setMenuOpen(false)}>
            <X size={30} />
          </button>
          <ul className="text-lg space-y-6 text-[#252525]">
            {
              menuItems.map((item) => (
                <li key={item.name} className="cursor-pointer">
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`${location.pathname === item.path ? "text-[#c09b2d]" : "text-[#252525]"
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))
            }

            {
              user.token ?
                <Link to="/PerfilCliente" className="flex items-center justify-center">
                  <UserAvatar name={user.nome} size={50} />
                </Link> :
                <li key="login" className="cursor-pointer">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className={`${location.pathname === "/login" ? "text-[#c09b2d]" : "text-[#252525]"}`}
                  >
                    Login
                  </Link>
                </li>
            }

          </ul>
        </nav>
      )}
    </header>
  );
};

export default MenuNav;