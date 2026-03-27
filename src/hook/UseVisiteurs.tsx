import {useEffect, useState} from "react";
import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";
import {type Filtres, filtresInitiaux} from "../type/Typefiltres.tsx";
import ServiceVisiteur from "../services/ServiceVisiteur.tsx";

export function useVisiteurs (){
    const [visiteurs, setVisiteurs] = useState<TypeVisiteur[]>([]);
    const [filtres, setFiltres] = useState<Filtres>(filtresInitiaux);

    useEffect(() => {
        charger(filtresInitiaux)
    }, []);

    function charger(f:Filtres) {
        ServiceVisiteur.recupVisiteurs(f).then(data =>setVisiteurs(data))
    }

    function appliquerFiltres(f: Partial<Filtres>) {
        const nouveauxFiltres = {...filtres, ...f}
        setFiltres(nouveauxFiltres);
        charger(nouveauxFiltres)
    }

    function reinitialiser() {
        setFiltres(filtresInitiaux);
        charger(filtresInitiaux)
    }

    return {
        visiteurs,
        filtres,
        appliquerFiltres,
        reinitialiser
    };
}