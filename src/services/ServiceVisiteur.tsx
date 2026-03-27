import type {FormValues} from "../type/TypeForm.tsx";
import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";
import type {Filtres} from "../type/Typefiltres.tsx";

const URL: string = "http://localhost:5000";


export default class ServiceVisiteur {


    static ajouterVisiteur (visiteur: FormValues): Promise<any> {
        const donneeVisiteur = {
            nom: visiteur.nom,
            prenom: visiteur.prenom,
            email: visiteur.email,
            telephone: visiteur.telephone,
            date_de_naissance: visiteur.dateDeNaissance,
            situation_particulier: visiteur.situationParticuliere,
            formation_origine: {
                type: visiteur.formationOrigine,
                detail: visiteur.formationOrigineDetail,
            },
            etablissement_origine: {
                nom: visiteur.lycee,
            },
            adresse: {
                ville: visiteur.ville,
                code_postal: Number(visiteur.codePostal),
            },
            formation_interessee: visiteur.formationInteressee,
            evenement: {
                type: visiteur.immersion ? visiteur.typeEvenement : null,
            },
            immersion: {
                souhaite_participer: visiteur.typeEvenement,
            },
            rgpd: {
                consentement_collecte: visiteur.rgpd,
                consentement_contact: visiteur.rgpd,
            },
        };


        return fetch(`${URL}/visiteurs/`, {
            method: "POST",
            body: JSON.stringify(donneeVisiteur),
            headers: {"Content-Type": "application/json"},
        }).then(res => res.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error(error));
    }

    static recupVisiteurs (filtres?: Partial<Filtres>): Promise<TypeVisiteur[]>{
        const f = new URLSearchParams();

        if (filtres?.recherche) f.append("search", filtres.recherche);
        if (filtres?.departement) f.append("departement", filtres.departement);
        if (filtres?.formationOrigine) f.append("formationOrigine", filtres.formationOrigine);
        if (filtres?.reorientation) f.append("reorientation", "true");
        if (filtres?.situationParticuliere) f.append("situationParticuliere", "true");

        const query = f.toString() ? `${f.toString()}`: "";

        return fetch(`${URL}/visiteurs/${query}`)
            .then(res => res.json())
            .catch(error => console.error(error))
    }

}
