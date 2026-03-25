import {useEffect, useState} from "react";
import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";
import {type Filtres, filtresInitiaux} from "../type/Typefiltres.tsx";
import ServiceVisiteur from "../services/ServiceVisiteur.tsx";

export function useVisiteurs (){
    const [visiteurs, setVisiteurs] = useState<TypeVisiteur[]>([]);
    const [filtres, setFiltres] = useState<Filtres>(filtresInitiaux);
    const [recherche, setRecherche] = useState("");

    useEffect(() => {
        ServiceVisiteur.recupVisiteurs().then(data =>setVisiteurs(data))
    }, []);

    function filtrer(v: TypeVisiteur){
        const saisie = recherche.toLowerCase();
        if (!v.nom.toLowerCase().includes(saisie) && !v.prenom.toLowerCase().includes(saisie) && !v.email.includes(saisie)) return false;

        if (filtres.departement && v.formation_interessee !== filtres.departement) return false;
        if (filtres.typeBac && v.formation_origine?.type !== filtres.typeBac) return false;
        if (filtres.reorientation && v.formation_origine?.type !== "reorientation") return false;
        if (filtres.situationParticuliere && !v.situation_particulier) return false;

        return true;
    }

    function appliquerRecherche(valeur: string) {
        setRecherche(valeur);
    }

    function appliquerFiltres(f: Partial<Filtres>) {
        setFiltres(prev => ({...prev, ...f}));
    }

    function reinitialiser() {
        setFiltres(filtresInitiaux);
        setRecherche("");
    }

    return {
        visiteursFiltres: visiteurs.filter(filtrer),
        filtres,
        recherche,
        appliquerRecherche,
        appliquerFiltres,
        reinitialiser
    };
}