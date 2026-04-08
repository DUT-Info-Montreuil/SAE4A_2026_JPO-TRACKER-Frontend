import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";

interface VisiteurCardProps {
    visiteur: TypeVisiteur;
}

export default function VisiteurCard ({visiteur}: VisiteurCardProps){
    return (
        <tr>
            <td>{visiteur.nom}</td>
            <td>{visiteur.prenom}</td>
            <td>{visiteur.email}</td>
            <td>{visiteur.telephone ? visiteur.telephone : "pas de num !"}</td>
        </tr>
    );
}