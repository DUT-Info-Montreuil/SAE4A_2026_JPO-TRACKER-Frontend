import {useEffect, useState} from "react";
import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";
import {type Filtres, filtresInitiaux} from "../type/Typefiltres.tsx";
import ServiceVisiteur from "../services/ServiceVisiteur.tsx";

const LIMIT = 10; // nb visiteurs par page
export function useVisiteurs (){
    const [visiteurs, setVisiteurs] = useState<TypeVisiteur[]>([]);
    const [filtres, setFiltres] = useState<Filtres>(filtresInitiaux);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        charger(filtresInitiaux)
    }, []);

    function charger(f:Filtres) {
        ServiceVisiteur.recupVisiteurs(f, LIMIT)
            .then(data => {
                setVisiteurs(data.visiteurs)
                setTotalPages(Math.ceil(data.total / LIMIT))
            })
            .finally(() => setLoading(false))
    }

    function appliquerFiltres(f: Partial<Filtres>) {
        const nouveauxFiltres = {...filtres, ...f, page: 1}
        setFiltres(nouveauxFiltres);
        charger(nouveauxFiltres)
    }


    function changerPage(page: number) {
        const nouveauxFiltres = {...filtres, page}
        setFiltres(nouveauxFiltres);
        charger(nouveauxFiltres)
    }

    function reinitialiser() {
        setFiltres({...filtres,...filtresInitiaux});
        charger(filtresInitiaux)
    }

    return {
        visiteurs,
        filtres,
        appliquerFiltres,
        reinitialiser,
        loading,
        totalPages,
        changerPage,
        LIMIT,
    };
}