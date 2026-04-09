import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";
import {useNavigate} from "react-router-dom";

interface VisiteurCardProps {
    visiteur: TypeVisiteur;
}

export default function VisiteurCard ({visiteur}: VisiteurCardProps){
    const navigate = useNavigate();

    return (
        <tr
            style={{cursor: "pointer"}}
            onClick={() => navigate(`/visiteurs/${visiteur.id}`)}
        >
            <td>{visiteur.nom}</td>
            <td>{visiteur.prenom}</td>
            <td>{visiteur.email}</td>
            <td>{visiteur.adresse?.code_postal}</td>
            <td>{visiteur.formation_origine?.type}</td>
        </tr>
    );
}