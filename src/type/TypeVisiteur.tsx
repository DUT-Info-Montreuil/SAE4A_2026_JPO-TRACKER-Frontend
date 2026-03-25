export interface TypeVisiteur {
    nom: string;
    prenom: string;
    email: string;
    telephone ?:number;
    formation_interessee?: string;
    formation_origine?: { type: string; detail: string };
    situation_particulier?: boolean;
}