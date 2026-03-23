import type {FormValues} from "../type/TypeForm.tsx";
import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";

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

    static recupVisiteurs (): Promise<TypeVisiteur[]>{
        return fetch(`${URL}/visiteurs/`)
            .then(res => res.json())
            .catch(error => console.error(error))
    }

}
