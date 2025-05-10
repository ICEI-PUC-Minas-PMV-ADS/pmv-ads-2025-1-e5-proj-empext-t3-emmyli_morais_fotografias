import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

interface IsValidRouteProps {
    isFotografo?: boolean,
    isCliente?: boolean,
    isAnon?: boolean
}

export const IsValidRouter = ({ isAnon, isCliente, isFotografo }: IsValidRouteProps) => {
    const { user } = useAuth();

    if (isAnon) {
        if (user.token) {
            if (user.perfil?.toLowerCase() === 'cliente')
                return <Navigate to={'/PerfilCliente'} />;

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