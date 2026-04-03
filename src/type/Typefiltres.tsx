export interface Filtres {
    recherche: string;
    departement: string;
    formationOrigine: string;
    reorientation: boolean;
    situationParticuliere: boolean;
}

export const filtresInitiaux: Filtres = {
    recherche: "",
    departement: "",
    formationOrigine: "",
    reorientation: false,
    situationParticuliere: false
}