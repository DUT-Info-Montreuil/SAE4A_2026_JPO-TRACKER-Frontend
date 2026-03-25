
import VisiteurCard from "./VisiteurCard.tsx";
import {useVisiteurs} from "../hook/UseVisiteurs.tsx";
import FiltresVisiteurs from "./FiltresVisiteurs.tsx";

export default function ListerVisiteurs (){
    const {visiteursFiltres, filtres, recherche, appliquerRecherche, appliquerFiltres, reinitialiser} = useVisiteurs();

    return (
        <div className="table-responsive container">
            <h2>Liste des visiteurs</h2>

            <FiltresVisiteurs
                filtres={filtres}
                recherche={recherche}
                onRecherche={appliquerRecherche}
                onFiltres={appliquerFiltres}
                onReinit={reinitialiser}
            />

            <p className="text-muted small mb-2">résultats : {visiteursFiltres.length}</p>

            <table className="table table-striped table-hover align-middle">
                <thead>
                <tr>
                    <td>Nom</td>
                    <td>Prénom</td>
                    <td>Email</td>
                    <td>Téléphone</td>
                </tr>
                </thead>
                <tbody>
                {visiteursFiltres.map(v => (
                    <VisiteurCard key={v.email} visiteur={v}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}