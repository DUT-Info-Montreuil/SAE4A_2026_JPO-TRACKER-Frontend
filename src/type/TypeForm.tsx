export interface FormValues {
    nom: string;
    prenom: string;
    email: string;
    telephone ?: string;
    dateDeNaissance: string;
    situationParticuliere: boolean;
    formationOrigine: string;
    formationOrigineDetail: string;
    lycee: string;
    formationInteressee: string;
    ville: string;
    codePostal: string;
    immersion: boolean;
    typeEvenement: "jpo" | "forum" | "autre" | "";
    rgpd: boolean;
}


export const initialValues: FormValues = {
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateDeNaissance: "",
    situationParticuliere: false,
    formationOrigine: "",
    formationOrigineDetail: "",
    lycee: "",
    formationInteressee: "",
    ville: "",
    codePostal: "",
    immersion: false,
    typeEvenement: "",
    rgpd: false,
};


export const formations = [
    "BUT informatique",
    "BUT GACO",
    "BUT QLIO",
    "BUT INFO-COM",
];


export const typesFormationOrigine = [
    "Lycéen (Bac général)",
    "Lycéen (Bac technologique)",
    "Lycéen (Bac professionnel)",
    "BTS",
    "BUT",
    "Licence",
    "Prépa",
    "Master",
    "Autre",
];
