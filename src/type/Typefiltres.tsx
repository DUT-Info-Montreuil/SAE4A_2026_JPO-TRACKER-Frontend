export interface Filtres {
    recherche: string;
    departement: string;
    formationOrigine: string;
    reorientation: boolean;
    situationParticuliere: boolean;
    page: number;
}

export const filtresInitiaux: Filtres = {
    recherche: "",
    departement: "",
    formationOrigine: "",
    reorientation: false,
    situationParticuliere: false,
    page: 1
}