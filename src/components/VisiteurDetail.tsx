import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ServiceVisiteur from "../services/ServiceVisiteur.tsx";
import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";

export default function VisiteurDetail() {
    const {id} = useParams();
    const [visiteur, setVisiteur] = useState<TypeVisiteur>();

    useEffect(() => {
        if (id) {
            ServiceVisiteur.getVisiteurById(id)
                .then(setVisiteur)
        }
    }, [id])

    if (!visiteur) return "id false"

    return (
        <div className="container">
            <h2>{visiteur.prenom} {visiteur.nom}</h2>
            <p>Email : {visiteur.email}</p>
            <p>Téléphone : {visiteur.telephone || "pas de num"}</p>
            <p>Situation particulière : {visiteur.situation_particulier ? "oui" : "non"}</p>

            <h2>Formation</h2>
            <p>Intéressé par : {visiteur.formation_interessee || "—"}</p>
            <p>Formation actuelle : {visiteur.formation_origine?.type || "—"}</p>
            <p>Détail : {visiteur.formation_origine?.detail || "—"}</p>
            <p>Nom établissement : {visiteur.etablissement_origine?.nom || "—"}</p>

            <h2>Immersion</h2>
            <p>Souhaite participer : {visiteur.immersion?.souhaite_participer ? "oui" : "non"}</p>
            <p>Type d'événement : {visiteur.evenement?.type || "—"}</p>
        </div>
    );
}