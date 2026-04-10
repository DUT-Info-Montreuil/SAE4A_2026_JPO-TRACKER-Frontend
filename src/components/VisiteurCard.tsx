import type {TypeVisiteur} from "../type/TypeVisiteur.tsx";
import {useNavigate} from "react-router-dom";
import ServiceVisiteur from "../services/ServiceVisiteur.tsx";
import {useState} from "react";

interface VisiteurCardProps {
    visiteur: TypeVisiteur;
    onDeleted?: () => void;
}

export default function VisiteurCard({visiteur, onDeleted}: VisiteurCardProps) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    function handleDelete(e: React.MouseEvent) {
        e.stopPropagation();
        ServiceVisiteur.deleteById(visiteur.id)
            .then(() => { setOpen(false); onDeleted?.(); })
            .catch(err => alert(err.message));
    }

    return (
        <tr onClick={() => navigate(`/visiteurs/${visiteur.id}`)}>
            <td>{visiteur.nom}</td>
            <td>{visiteur.prenom}</td>
            <td>{visiteur.email}</td>
            <td>{visiteur.adresse?.code_postal}</td>
            <td>{visiteur.formation_origine?.type}</td>
            <td onClick={e => e.stopPropagation()}>
                <button className="btn-row-delete" onClick={() => setOpen(true)}>Supp</button>

                {open && (
                    <div className="modal-overlay">
                        <div className="modal-box">
                            <h3>Confirmation</h3>
                            <p>Supprimer <strong>{visiteur.prenom} {visiteur.nom}</strong> ? Cette action est irréversible.</p>
                            <div className="modal-actions">
                                <button className="btn-cancel" onClick={() => setOpen(false)}>Annuler</button>
                                <button className="btn-confirm" onClick={handleDelete}>Confirmer</button>
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
}