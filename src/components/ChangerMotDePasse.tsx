import {useState, type ChangeEvent} from "react";
import ServiceAuth from "../services/ServiceAuth.tsx";

export default function ChangerMotDePasse() {
    const [form, setForm] = useState({ancien_mot_de_passe: "", nouveau_mot_de_passe: ""});
    const [visibleAncien, setVisibleAncien] = useState(false);
    const [visibleNouveau, setVisibleNouveau] = useState(false);
    const [erreur, setErreur] = useState("");
    const [succes, setSucces] = useState("");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    function handleSubmit(e: React.BaseSyntheticEvent) {
        e.preventDefault();
        setErreur("");
        setSucces("");
        ServiceAuth.changerMotDePasse(form.ancien_mot_de_passe, form.nouveau_mot_de_passe)
            .then(() => {
                setSucces("Mot de passe mis à jour");
                setForm({ancien_mot_de_passe: "", nouveau_mot_de_passe: ""});
            })
            .catch(() => setErreur("Ancien mot de passe incorrect"));
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <h2 className="text-center mb-3">Changer le mot de passe</h2>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input
                                            type={visibleAncien ? "text" : "password"}
                                            name="ancien_mot_de_passe"
                                            className="form-control"
                                            placeholder="Ancien mot de passe"
                                            value={form.ancien_mot_de_passe}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button type="button" className="btn btn-outline-secondary" onClick={() => setVisibleAncien(!visibleAncien)}>
                                            {visibleAncien ? "Cacher" : "Voir"}
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input
                                            type={visibleNouveau ? "text" : "password"}
                                            name="nouveau_mot_de_passe"
                                            className="form-control"
                                            placeholder="Nouveau mot de passe"
                                            value={form.nouveau_mot_de_passe}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button type="button" className="btn btn-outline-secondary" onClick={() => setVisibleNouveau(!visibleNouveau)}>
                                            {visibleNouveau ? "Cacher" : "Voir"}
                                        </button>
                                    </div>
                                </div>
                                {erreur && <p className="text-danger small">{erreur}</p>}
                                {succes && <p className="text-success small">{succes}</p>}
                                <button type="submit" className="btn btn-dark w-100">Valider</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}