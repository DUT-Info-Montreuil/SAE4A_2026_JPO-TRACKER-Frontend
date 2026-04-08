
import VisiteurCard from "./VisiteurCard.tsx";
import {useVisiteurs} from "../hook/UseVisiteurs.tsx";
import FiltresVisiteurs from "./FiltresVisiteurs.tsx";
import Pagination from "./Pagination.tsx";

export default function ListerVisiteurs (){

    const {visiteurs, filtres, appliquerFiltres, reinitialiser, totalPages, changerPage} = useVisiteurs();

    return (
        <div className="table-responsive container">
            <h2>Liste des visiteurs</h2>

            <FiltresVisiteurs
                filtres={filtres}
                onFiltres={appliquerFiltres}
                onReinit={reinitialiser}
            />

            <p className="text-muted small mb-2">résultats : {visiteurs.length}</p>

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
                {visiteurs.map(v => (
                    <VisiteurCard key={v.email} visiteur={v}/>
                ))}
                </tbody>
            </table>

            <Pagination
                pageActuelle={filtres.page}
                totalPages={totalPages}
                onChangerPage={changerPage}
            />
        </div>
    );
}