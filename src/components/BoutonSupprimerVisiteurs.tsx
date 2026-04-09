import { useState } from "react";
import ServiceVisiteur from "../services/ServiceVisiteur.tsx";

interface ButtonSuppProps {
    onDeleted?: () => void;
}

export default function BoutonSupprimerVisiteurs({ onDeleted }: ButtonSuppProps) {
    const [open, setOpen] = useState(false);

    function handleDelete() {
        ServiceVisiteur.deleteTout()
            .then((data) => {
                alert(`${data.deleted_count} visiteurs supprimés`);
                setOpen(false);
                onDeleted?.();
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <>
            <button className="btn btn-danger" onClick={() => setOpen(true)}>
                Supprimer tous les visiteurs
            </button>

            {open && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Confirmation</h3>
                        <p> Supprimer TOUS les visiteurs ? Cette action est irréversible.</p>

                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setOpen(false)}>
                                Annuler
                            </button>

                            <button className="btn btn-danger" onClick={handleDelete}>
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}