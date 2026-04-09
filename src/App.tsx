import ListerVisiteurs from "./components/ListerVisiteurs.tsx";
import Statistiques from "./components/Statistique.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FormulaireVisiteur from "./components/Formulaire.tsx";
import VisiteurDetail from "./components/VisiteurDetail.tsx";
import RouteAdmin from "./components/RouteAdmin.tsx";
import ChangerMotDePasse from "./components/ChangerMotDePasse.tsx";
import {useAuth} from "./hook/UseAuth.tsx";

function App() {
    const {token, erreur, login, logout} = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FormulaireVisiteur />} />

                <Route path="/visiteurs" element={
                    <RouteAdmin token={token} erreur={erreur} onLogin={login} onLogout={logout}>
                        <ListerVisiteurs />
                    </RouteAdmin>
                } />
                <Route path="/statistiques" element={
                    <RouteAdmin token={token} erreur={erreur} onLogin={login} onLogout={logout}>
                        <Statistiques />
                    </RouteAdmin>
                } />

                <Route path="/mot-de-passe" element={
                    <RouteAdmin token={token} erreur={erreur} onLogin={login} onLogout={logout}>
                        <ChangerMotDePasse />
                    </RouteAdmin>
                } />
                <Route path="/visiteurs/:id" element={
                    <RouteAdmin token={token} erreur={erreur} onLogin={login} onLogout={logout}>
                        <VisiteurDetail />
                    </RouteAdmin>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;