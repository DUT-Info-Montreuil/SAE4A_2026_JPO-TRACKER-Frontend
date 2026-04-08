import ListerVisiteurs from "./components/ListerVisiteurs.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FormulaireVisiteur from "./components/Formulaire.tsx";
import RouteAdmin from "./components/RouteAdmin.tsx";
import ChangerMotDePasse from "./components/ChangerMotDePasse.tsx";
import {useAuth} from "./hook/UseAuth.tsx";

function App() {
    const {token, erreur, login, logout} = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FormulaireVisiteur />} />
                <Route path="/admin" element={
                    <RouteAdmin token={token} erreur={erreur} onLogin={login} onLogout={logout}>
                        <ListerVisiteurs />
                    </RouteAdmin>
                } />
                <Route path="/admin/mot-de-passe" element={
                    <RouteAdmin token={token} erreur={erreur} onLogin={login} onLogout={logout}>
                        <ChangerMotDePasse />
                    </RouteAdmin>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;