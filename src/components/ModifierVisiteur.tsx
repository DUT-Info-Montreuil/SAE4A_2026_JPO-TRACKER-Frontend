import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ServiceVisiteur from "../services/ServiceVisiteur.tsx";
import type {FormValues} from "../type/TypeForm.tsx";
import FormulaireVisiteur from "./Formulaire.tsx";

export default function ModifierVisiteur() {
    const {id} = useParams();
    const [formValues, setFormValues] = useState<FormValues>();

    useEffect(() => {
        if (id) {
            ServiceVisiteur.getVisiteurById(id).then(v => {
                setFormValues({
                    nom: v.nom ?? "",
                    prenom: v.prenom ?? "",
                    email: v.email ?? "",
                    telephone: v.telephone ?? "",
                    dateDeNaissance: v.date_de_naissance ?? "",
                    situationParticuliere: v.situation_particulier ?? false,
                    formationOrigine: v.formation_origine?.type ?? "",
                    formationOrigineDetail: v.formation_origine?.detail ?? "",
                    lycee: v.etablissement_origine?.nom ?? "",
                    ville: v.adresse?.ville ?? "",
                    codePostal: String(v.adresse?.code_postal ?? ""),
                    formationInteressee: v.formation_interessee ?? "",
                    immersion: v.immersion?.souhaite_participer ?? false,
                    typeEvenement: v.evenement?.type ?? "",
                    rgpd: v.rgpd?.consentement_collecte ?? false,
                });
            });
        }
    }, [id]);

    if (!formValues) return <p>Chargement...</p>;

    return <FormulaireVisiteur valuesInitiales={formValues} visiteurId={id} />;
}