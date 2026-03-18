export interface FormValues {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    formationOrigine: "bac-general" | "reorientation" | "";
    formationInteressee: string;
    lycee: string;
    age: string;
    ville: string;
    codePostal: string;
    immersion: "oui" | "non" | "";
    typeEvenement: "jpo" | "forum" | "autre" | "";
    rgpd: boolean;
}

export const initialValues: FormValues = {
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    formationOrigine: "",
    formationInteressee: "",
    lycee: "",
    age: "",
    ville: "",
    codePostal: "",
    immersion: "",
    typeEvenement: "",
    rgpd: false,
};

export const formations = [
    "BUT informatique",
    "Licence informatique"
];