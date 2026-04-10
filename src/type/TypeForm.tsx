export interface FormValues {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
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
    rgpdCollecte: boolean;
    rgpdContact: boolean;
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
    rgpdCollecte: false,
    rgpdContact: false,
};


export const formations = [
    "BUT Informatique",
    "BUT GACO",
    "BUT QLIO",
    "BUT Infocom",
];


export const typesFormationOrigine: { libelle: string; type: string }[] = [
    { libelle: "Lycéen (Bac général)",       type: "bac_general" },
    { libelle: "Lycéen (Bac technologique)", type: "bac_techno"  },
    { libelle: "Lycéen (Bac professionnel)", type: "bac_pro"     },
    { libelle: "BTS",                        type: "bts"         },
    { libelle: "BUT",                        type: "but"         },
    { libelle: "Licence",                    type: "licence"     },
    { libelle: "Prépa",                      type: "prepa"       },
    { libelle: "Master",                     type: "master"      },
    { libelle: "Autre",                      type: "autre"       },
];