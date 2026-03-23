import {useEffect, useState} from "react";
import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";
import ServiceVisiteur from "../services/ServiceVisiteur.tsx";
import VisiteurCard from "./VisiteurCard.tsx";

export default function ListerVisiteurs (){
    const [visiteurs, setVisiteurs] = useState<TypeVisiteur[]>([]);

    useEffect(() => {
        ServiceVisiteur.recupVisiteurs().then(data => setVisiteurs(data))
    })

    return (
        <div className="table-responsive container">
            <h2>Liste des visiteurs</h2>
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
        </div>
    );
}