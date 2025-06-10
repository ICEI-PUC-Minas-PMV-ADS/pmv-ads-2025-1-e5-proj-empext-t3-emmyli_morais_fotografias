import { useEffect } from "react";
import MenuNav from "../components/MenuNav";
const NotFound = () => {
   
    useEffect(() => {
    }, []);
    return (
        <div className="font-serif bg-[#0B3727] min-h-screen text-[#c09b2d] overflow-x-hidden">
            {/* Navegação principal */}
            <MenuNav />

            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>404</h1>
                <p>Página não encontrada.</p>
            </div>
        </div>
    );
};

export default NotFound;
