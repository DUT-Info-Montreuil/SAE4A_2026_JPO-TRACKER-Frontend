import type {FormValues} from "../type/TypeForm.tsx";
import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";
import type {Filtres} from "../type/Typefiltres.tsx";

const URL: string = "http://localhost:5000";


export default class ServiceVisiteur {


    static putVisiteur(visiteur: FormValues): Promise<void> {
        const donneeVisiteur = {
            nom:               visiteur.nom,
            prenom:            visiteur.prenom,
            email:             visiteur.email,
            telephone:         visiteur.telephone || null,
            date_de_naissance: visiteur.dateDeNaissance || null,
            situation_particulier: visiteur.situationParticuliere,
            formation_origine: {
                type:    visiteur.formationOrigine,
                libelle: visiteur.formationOrigineDetail,
            },
            etablissement_origine: {
                nom: visiteur.lycee,
            },
            adresse: {
                ville:       visiteur.ville,
                code_postal: visiteur.codePostal,
            },
            formation_interessee: visiteur.formationInteressee,
            evenement: {
                type:        visiteur.immersion ? visiteur.typeEvenement : null,
                date_visite: new Date().toISOString(),
            },
            immersion: {
                souhaite_participer: visiteur.immersion,
                statut: visiteur.immersion ? "en_attente" : "non_demande",
            },
            rgpd: {
                information_affichee:  true,
                consentement_collecte: visiteur.rgpdCollecte,
                consentement_contact:  visiteur.rgpdContact,
                date_consentement:     new Date().toISOString(),
            },
            meta: {
                source_saisie:  "formulaire_web",
                annee_campagne: new Date().getFullYear(),
                statut:         "actif",
            },
        };

        return fetch(`${URL}/visiteurs/`, {
            method: "POST",
            body: JSON.stringify(donneeVisiteur),
            headers: {"Content-Type": "application/json"},
        })
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.error(error));
    }

    static getVisiteurs(filtres?: Partial<Filtres>, limit: number = 10): Promise<{visiteurs: TypeVisiteur[], total: number}> {
        const f = new URLSearchParams();

        if (filtres?.recherche) f.append("search", filtres.recherche);
        if (filtres?.departement) f.append("departement", filtres.departement);
        if (filtres?.formationOrigine) f.append("formationOrigine", filtres.formationOrigine);
        if (filtres?.reorientation) f.append("reorientation", "true");
        if (filtres?.situationParticuliere) f.append("situationParticuliere", "true");
        f.append("page", String(filtres?.page ?? 1));
        f.append("limit", String(limit));

        const query = f.toString() ? `?${f.toString()}` : "";
        const token = localStorage.getItem("token");

        return fetch(`${URL}/visiteurs/filtrer${query}`, {
            headers: {"Authorization": `Bearer ${token}`},
        })
            .then(res => res.json())
            .catch(error => {
                console.error(error);
                return {visiteurs: [], total: 0};
            });
    }

    static recupVisiteursFull(): Promise<TypeVisiteur[]> {
        return fetch(`${URL}/visiteurs/full`)
            .then(res => res.json())
            .catch(error => console.error(error));
    }

    static getVisiteurById(id: string): Promise<TypeVisiteur> {
        const token = localStorage.getItem("token");
        return fetch(`${URL}/visiteurs/${id}`, {
            headers: {"Authorization": `Bearer ${token}`},
        })
            .then(res => res.json())
            .catch(error => {
                console.error(error);
                return null;
            });
    }

    static deleteTout(): Promise<{ message: string; deleted_count: number }> {
        const token = localStorage.getItem("token");

        return fetch(`${URL}/visiteurs/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Erreur lors de la suppression");
                }
                return data;
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
    }

    static deleteById(id: string): Promise<void> {
        const token = localStorage.getItem("token");

        return fetch(`${URL}/visiteurs/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        })
            .then(async res => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                return data;
            })
            .catch(error => { throw error; });
    }

}