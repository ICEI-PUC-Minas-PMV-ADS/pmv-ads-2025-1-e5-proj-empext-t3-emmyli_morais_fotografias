import { useAuth } from "../context/authContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import React from "react";
import Cookies from 'js-cookie';

interface IsValidRouteProps {
    isFotografo?: boolean,
    isCliente?: boolean,
    isAnon?: boolean
}

export const IsValidRouter = ({ isAnon, isCliente, isFotografo }: IsValidRouteProps) => {
    const { user } = useAuth();
    const eventURL = Cookies.get('eventURL');
    const navigate = useNavigate();

    if (isAnon) {
        if (user.token) {
            if (user.perfil?.toLowerCase() === 'cliente') {
                if (eventURL && eventURL.startsWith('/')) {
                    navigate(eventURL);
                    return null;
                }
                return <Navigate to={'/PerfilCliente'} />;
            }
            if (user.perfil?.toLowerCase() === 'fotografo')
                return <Navigate to={'/Perfil'} />
        }
    }

    if (isFotografo) {
        if (!user.token)
            return <Navigate to={'/login'}/>

        if (user.perfil?.toLowerCase() === 'cliente')
            return <Navigate to={'/PerfilCliente'} />;
    }

    if (isCliente){
        if (!user.token)
            return <Navigate to={'/login'}/>

        if (user.perfil?.toLowerCase() === 'fotografo')
            return <Navigate to={'/Perfil'} />
    }

    return <Outlet />
}