import { useEffect } from "react";
import logo from "../../img/logo.png"; // Use seu logo aqui
import { useParams } from "react-router-dom";
import { refreshToken } from "../../services/authService";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../../context/authContext";

const AcessandoEmail = () => {

  const { emailToken } = useParams();
  const { update } = useAuth();

  useEffect(() => {
    refreshToken(emailToken)
      .then((response) => {

        const tokenDecodifcado = jwtDecode(response.token.informacao);

        update({
          usuario: {
            email: tokenDecodifcado.email,
            login: tokenDecodifcado.login,
            nome: tokenDecodifcado.nome,
            perfil : tokenDecodifcado.perfil,
            id: tokenDecodifcado.idusuario
          },
          token: response.token,
          refreshToken: response.refreshToken
        });
      });

  }, []);

  return (
    <div className="font-serif bg-[#0B3727] min-h-screen flex items-center justify-center text-[#c09b2d]">
      <div className="flex flex-col items-center space-y-6 animate-fadeIn">
        <img src={logo} alt="Logo" className="w-40 sm:w-32 animate-pulse" />
        <div className="w-16 h-16 border-4 border-[#c09b2d] border-t-transparent rounded-full animate-spin" />
        <p className="text-lg text-[#c09b2d] mt-4">Carregando, por favor aguarde...</p>
      </div>
    </div>
  );
};

export default AcessandoEmail;