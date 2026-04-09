import {useState} from "react";
import ServiceAuth from "../services/ServiceAuth.tsx";

export function useAuth() {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [erreur, setErreur] = useState<string>("");

    function login(mot_de_passe: string) {
        ServiceAuth.login(mot_de_passe)
            .then(data => {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                setErreur("");
            })
            .catch(() => setErreur("Mot de passe incorrect"));
    }

    function logout() {
        setToken(null);
        localStorage.removeItem("token");
    }

    return {token, erreur, login, logout};
}