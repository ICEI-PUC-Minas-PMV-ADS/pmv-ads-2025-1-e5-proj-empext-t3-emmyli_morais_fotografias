import React from "react";

const PerfilCliente = () => {
  return (
    <div className="font-serif bg-[#F9F9F9] mt-[20px] mb-[20px] min-h-screen py-10 px-4">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-2 mb-6">
        Perfil
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://i.pravatar.cc/100"
          alt="Foto do usuário"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">Usuário</p>
          <p className="text-gray-600">usuario@gmail.com</p>
          <button className="text-sm text-blue-600 underline mt-1">alterar</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Nome:</label>
          <input
            type="text"
            value="Usuário"
            className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">E-mail:</label>
          <input
            type="email"
            value="usuario@gmail.com"
            className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition "
            readOnly
          />
        </div>
      </div>

      
      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-6 max-w-[900px]">
        <div className="w-full md:w-1/3">
          <label className="block mb-1 font-medium text-gray-700">Login:</label>
          <input
            type="text"
            value="usuario"
            className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
        </div>
        <div className="w-full md:w-1/3">
          <label className="block mb-1 font-medium text-gray-700">Senha:</label>
          <input
            type="password"
            className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
        </div>
        <div className="w-full md:w-1/3">
          <label className="block mb-1 font-medium text-gray-700">Confirme a senha:</label>
          <input
            type="password"
            className="w-full p-2.5 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
        </div>
      </div>

      <button className="mt-6 bg-green-800 hover:bg-green-700 transition text-white px-6 py-2 rounded-xl">
        Salvar
      </button>
    </div>
  );
};

export default PerfilCliente;

