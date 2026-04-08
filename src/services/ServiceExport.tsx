import type {Filtres} from "../type/Typefiltres.tsx";

const URL: string = "http://localhost:5000";

export default class ServiceExport {
    private static buildQuery(filtres?: Partial<Filtres>): string {
        const f = new URLSearchParams();

        if (filtres?.recherche) f.append("search", filtres.recherche);
        if (filtres?.departement) f.append("departement", filtres.departement);
        if (filtres?.formationOrigine) f.append("formationOrigine", filtres.formationOrigine);
        if (filtres?.reorientation) f.append("reorientation", "true");
        if (filtres?.situationParticuliere) f.append("situationParticuliere", "true");

        return f.toString() ? `?${f.toString()}` : "";
    }

    private static telecharger(url: string, nomFichier: string): Promise<void> {
        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("Erreur serveur");
                return response.blob();
            })
            .then(blob => {
                const u = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = u;
                a.download = nomFichier;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(u);
            })
            .catch(error => console.error(error));
    }

    static exporterCSV(filtres?: Partial<Filtres>): Promise<void> {
        return ServiceExport.telecharger(
            `${URL}/export/visiteurs/csv${ServiceExport.buildQuery(filtres)}`,
            "export_visiteurs.csv"
        );
    }

    static exporterEmailsCSV(filtres?: Partial<Filtres>): Promise<void> {
        return ServiceExport.telecharger(
            `${URL}/export/visiteurs/emails/csv${ServiceExport.buildQuery(filtres)}`,
            "emails_visiteurs.csv"
        );
    }
}