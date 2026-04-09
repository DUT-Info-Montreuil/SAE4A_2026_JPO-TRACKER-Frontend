import type {ReactNode} from "react";
import Connexion from "./Connexion.tsx";import {Link} from "react-router-dom";



interface RouteAdminProps {
    token: string | null;
    erreur: string;
    onLogin: (mot_de_passe: string) => void;
    onLogout: () => void;
    children: ReactNode;
}

export default function RouteAdmin({token, erreur, onLogin, onLogout, children}: RouteAdminProps) {
    if (!token) {
        return <Connexion onLogin={onLogin} erreur={erreur} />;
    }
    return (
        <>
            <div className="d-flex justify-content-end p-2">
                <Link to="/mot-de-passe" className="btn btn-outline-secondary btn-sm">Changer le mot de passe</Link>
                <button className="btn btn-outline-secondary btn-sm" onClick={onLogout}>Se déconnecter</button>
            </div>
            {children}
        </>
    );
}