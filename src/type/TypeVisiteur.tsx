export interface TypeVisiteur {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    date_de_naissance?: string;
    situation_particulier?: boolean;
    formation_origine?: { type: string; detail: string };
    etablissement_origine?: { nom: string };
    adresse?: { ville: string; code_postal: number };
    formation_interessee?: string;
    evenement?: { type: string | null };
    immersion?: { souhaite_participer: boolean };
    meta?: { statut: string; annee_campagne: number };
}