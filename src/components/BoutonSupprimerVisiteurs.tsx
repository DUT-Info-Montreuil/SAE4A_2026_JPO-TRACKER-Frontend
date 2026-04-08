import ServiceVisiteur from "../services/ServiceVisiteur.tsx";

export default function BoutonSupprimerVisiteurs() {
    function handleClick() {
        if (!confirm("Supprimer TOUS les visiteurs ? Cette action est irréversible.")) return;
        ServiceVisiteur.deleteTout()
            .then(() => alert("Base vidée avec succès."))
            .catch(() => alert("Erreur lors de la suppression."));
    }

    return (
        <button className="btn btn-danger" onClick={handleClick}>
            Supprimer tous les visiteurs
        </button>
    );
}