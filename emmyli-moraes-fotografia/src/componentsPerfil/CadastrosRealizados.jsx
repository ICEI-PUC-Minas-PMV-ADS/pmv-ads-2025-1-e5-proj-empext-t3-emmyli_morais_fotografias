import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import {
  buscaTodosUsuarios,
  editaUsuario,
  removeUsuario,
} from "../services/userService";
import Modal from "../components/Modal";

const CadastrosRealizados = () => {
  const [usuarios, setUsuarios] = useState([]);

  const [busca, setBusca] = useState("");
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [dadosEditados, setDadosEditados] = useState({
    nome: "",
    email: "",
    senha_hash: "",
    telefone: "",
  });
  const [usuarioIdParaRemover, setUsuarioIdParaRemover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchAllUsuarios();
  }, []);

  useEffect(() => {
    console.log("dadosEditados:", dadosEditados);
  }, [dadosEditados]);

  const fetchAllUsuarios = async () => {
    try {
      const users = await buscaTodosUsuarios();
      setUsuarios(users);
    } catch (error) {
      console.error("Erro ao buscar usuários");
    } finally {
      setLoading(false);
    }
  };

  const abrirModalEdicao = (usuario) => {
    setEditandoUsuario(usuario);
    setDadosEditados({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha_hash: "",
      telefone: usuario.telefone || "",
    });
  };

  const fecharModal = () => setEditandoUsuario(null);

  const removerUsuario = async (id) => {
    try {
      setLoading(true);
      await removeUsuario(id);
      setModalOpen(false);
      fetchAllUsuarios();
    } catch (error) {
      console.error("Erro ao remover usuário");
    } finally {
      setLoading(false);
    }
  };

  const editarUsuario = async (dadosEditados) => {
    try {
      setLoading(true);
      await editaUsuario(dadosEditados);
      setModalOpen(false);
      fetchAllUsuarios();
    } catch (error) {
      console.error("Erro ao remover usuário");
    } finally {
      setLoading(false);
    }
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const termo = busca.toLowerCase();
    return (
      usuario.nome.toLowerCase().includes(termo) ||
      usuario.email.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="p-6 font-serif bg-[#F9F9F9] min-h-screen">
      <h1 className="text-2xl font-bold text-[#c09b2d] border-b-2 border-[#c09b2d] pb-4">
        Cadastros Realizados
      </h1>

      <div className="flex items-center gap-2 mt-4 mb-4">
        <FiSearch className="text-[#c09b2d] text-xl" />
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
        />
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
          <img src="/loading.gif" alt="Carregando..." className="w-32 h-20" />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden hidden sm:table">
          <thead className="bg-[#c09b2d] text-white">
            <tr>
              <th className="py-4 px-6 text-left">Nome</th>
              <th className="py-4 px-6 text-left">E-mail</th>
              <th className="py-4 px-6 text-left">Telefone</th>
              <th className="py-4 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario, index) => (
                <tr
                  key={usuario.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-200 transition-all`}
                >
                  <td className="py-4 px-6">{usuario.nome}</td>
                  <td className="py-4 px-6">{usuario.email}</td>
                  <td className="py-4 px-6">{usuario.telefone}</td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <button
                      onClick={() => abrirModalEdicao(usuario)}
                      className="text-blue-500 hover:text-blue-700 text-xl transition-all"
                      title="Editar"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setUsuarioIdParaRemover(usuario.id);
                      }}
                      className="text-red-500 hover:text-red-700 text-xl transition-all"
                      title="Excluir"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 px-4 text-center text-gray-500">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Layout para telas pequenas */}

        <div className="sm:hidden">
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((usuario) => (
              <div
                key={usuario.id}
                className="bg-white p-4 rounded-lg shadow mb-4"
              >
                <p>
                  <strong>Nome:</strong> {usuario.nome}
                </p>
                <p>
                  <strong>E-mail:</strong> {usuario.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {usuario.telefone}
                </p>
                <div className="flex justify-end space-x-4 mt-2">
                  <button
                    onClick={() => abrirModalEdicao(usuario)}
                    className="text-blue-500 hover:text-blue-700 text-xl transition-all"
                    title="Editar"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="text-red-500 hover:text-red-700 text-xl transition-all"
                    title="Excluir"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Nenhum cliente encontrado.
            </p>
          )}
        </div>
      </div>

      {/* Modal de Edição */}
      {editandoUsuario && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg text-center flex flex-col sm:max-w-md">
            <h2 className="text-2xl font-bold text-[#c09b2d] mb-6">
              Editar Cliente
            </h2>

            <form className="w-full flex flex-col space-y-4 text-left">
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  value={dadosEditados.nome}
                  onChange={(e) =>
                    setDadosEditados({ ...dadosEditados, nome: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  value={dadosEditados.email}
                  onChange={(e) =>
                    setDadosEditados({
                      ...dadosEditados,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Telefone
                </label>
                <input
                  type="text"
                  value={dadosEditados.telefone}
                  onChange={(e) =>
                    setDadosEditados({
                      ...dadosEditados,
                      telefone: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  value={dadosEditados.senha_hash}
                  onChange={(e) =>
                    setDadosEditados({
                      ...dadosEditados,
                      senha_hash: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c09b2d]"
                />
              </div>

              <div className="flex justify-between w-full mt-4">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="w-1/2 bg-gray-300 text-gray-700 p-3 rounded-md hover:bg-gray-400 transition-all text-lg"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editarUsuario(dadosEditados);
                    setEditandoUsuario(null);
                  }}
                  className="w-1/2 bg-[#c09b2d] text-white p-3 rounded-md hover:bg-[#a68523] transition-all text-lg ml-2"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={"Confirmar exclusão"}
        content={"Tem certeza que deseja excluir o usuário?"}
      >
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => removerUsuario(usuarioIdParaRemover)}
            className="px-4 py-2 rounded bg-[#c09b2d] text-white hover:bg-[#7e6931]"
          >
            Excluir
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CadastrosRealizados;
