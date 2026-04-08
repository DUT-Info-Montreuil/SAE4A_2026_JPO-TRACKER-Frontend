import type {Filtres} from "../type/Typefiltres.tsx";

const URL: string = "http://localhost:5000";

export default class ServiceExport {
    static exporterCSV(filtres?: Partial<Filtres>): Promise<void> {
        const f = new URLSearchParams();

        if (filtres?.recherche) f.append("search", filtres.recherche);
        if (filtres?.departement) f.append("departement", filtres.departement);
        if (filtres?.formationOrigine) f.append("formationOrigine", filtres.formationOrigine);
        if (filtres?.reorientation) f.append("reorientation", "true");
        if (filtres?.situationParticuliere) f.append("situationParticuliere", "true");

        const query = f.toString() ? `?${f.toString()}` : "";

        return fetch(`${URL}/export/visiteurs/csv${query}`)
            .then(response => {
                if (!response.ok) throw new Error("Erreur serveur");
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "export_visiteurs.csv";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error(error));
    }
}