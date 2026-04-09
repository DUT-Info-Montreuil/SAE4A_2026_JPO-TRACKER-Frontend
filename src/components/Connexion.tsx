import {useState} from "react";

interface ConnexionProps {
    onLogin: (mot_de_passe: string) => void;
    erreur: string;
}

export default function Connexion({onLogin, erreur}: ConnexionProps) {
    const [motDePasse, setMotDePasse] = useState("");
    const [visible, setVisible] = useState(false);

    function handleSubmit(e: React.BaseSyntheticEvent) {
        e.preventDefault();
        onLogin(motDePasse);
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <h2 className="text-center mb-3">Espace administrateur</h2>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input
                                            type={visible ? "text" : "password"}
                                            className="form-control"
                                            placeholder="Mot de passe"
                                            value={motDePasse}
                                            onChange={e => setMotDePasse(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setVisible(!visible)}
                                        >
                                            {visible ? "Cacher" : "Voir"}
                                        </button>
                                    </div>
                                </div>
                                {erreur && <p className="text-danger small">{erreur}</p>}
                                <button type="submit" className="btn btn-dark w-100">Se connecter</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}