export interface Filtres {
    recherche: string;
    departement: string;
    typeBac: string;
    reorientation: boolean;
    situationParticuliere: boolean;
}

export const filtresInitiaux: Filtres = {
    recherche: "",
    departement: "",
    typeBac: "",
    reorientation: false,
    situationParticuliere: false
}