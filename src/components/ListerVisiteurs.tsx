
import VisiteurCard from "./VisiteurCard.tsx";
import {useVisiteurs} from "../hook/UseVisiteurs.tsx";
import FiltresVisiteurs from "./FiltresVisiteurs.tsx";
import Pagination from "./Pagination.tsx";
import ExportButtons from "./ExportButtons.tsx";
import NavAdmin from "./NavAdmin.tsx";
import BoutonSupprimerVisiteurs from "./BoutonSupprimerVisiteurs.tsx";

export default function ListerVisiteurs (){

    const {visiteurs, filtres, appliquerFiltres, reinitialiser, totalPages, changerPage} = useVisiteurs();

    return (
        <div className="table-responsive container">
            <NavAdmin />
            <h2>Liste des visiteurs</h2>

            <FiltresVisiteurs
                filtres={filtres}
                onFiltres={appliquerFiltres}
                onReinit={reinitialiser}
            />

            <div className="actions-bar">
                <p className="results-count">résultats : {visiteurs.length}</p>
                <div className="actions-right">
                    <ExportButtons filtres={filtres}/>
                    <BoutonSupprimerVisiteurs onDeleted={reinitialiser}/>
                </div>
            </div>

            <table className="visiteurs-table mb-3">
                <thead>
                <tr>
                    <td>Nom</td>
                    <td>Prénom</td>
                    <td>Email</td>
                    <td>Code postal</td>
                    <td>Formation d'origine</td>
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