export interface TypeVisiteur {
    nom: string;
    prenom: string;
    email: string;
    telephone ?:number;
    formationInteressee?: string;
    formationOrigine?: { type: string; detail: string };
    situationParticulier?: boolean;
}