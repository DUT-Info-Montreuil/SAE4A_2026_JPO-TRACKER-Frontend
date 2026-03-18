import {useState, type ChangeEvent} from "react";

import { initialValues, formations, type FormValues } from "../type/TypeForm.tsx";

export default function FormulaireVisiteur() {
    const [form, setForm] = useState<FormValues>(initialValues);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setForm({ ...form, [name]: val });
    };

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        setForm(initialValues);
        setSubmitted(false);
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <h2 className="text-center mb-3">Formulaire d'inscription</h2>
                <div className="col-12 col-md-10 col-lg-8">

                    <form onSubmit={handleSubmit}>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input name="nom" className="form-control" placeholder="Nom"
                                                   value={form.nom} onChange={handleChange} required />
                                            <label>Nom</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input name="prenom" className="form-control" placeholder="Prénom"
                                                   value={form.prenom} onChange={handleChange} required />
                                            <label>Prénom</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mt-1">
                                    <div className="col-sm-4">
                                        <div className="form-floating">
                                            <input name="age" type="number" className="form-control" placeholder="Age"
                                                   min={0} max={99} value={form.age} onChange={handleChange} required />
                                            <label>Age</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-floating">
                                            <input name="email" type="email" className="form-control" placeholder="Email"
                                                   value={form.email} onChange={handleChange} />
                                            <label>Email <span className="text-muted">(facultatif)</span></label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-floating">
                                            <input name="telephone" type="number" className="form-control" placeholder="Téléphone"
                                                   value={form.telephone} onChange={handleChange} />
                                            <label>Téléphone <span className="text-muted">(facultatif)</span></label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mt-1">
                                    <div className="col-sm-8">
                                        <div className="form-floating">
                                            <input name="ville" className="form-control" placeholder="Ville" type="text"
                                                   value={form.ville} onChange={handleChange} required />
                                            <label>Ville</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-floating">
                                            <input name="codePostal" className="form-control" placeholder="Code postal" type="number"
                                                   maxLength={5} value={form.codePostal} onChange={handleChange} required />
                                            <label>Code postal</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <div className="d-flex gap-4 mb-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="formationOrigine"
                                               id="bac-general" value="bac-general" checked={form.formationOrigine === "bac-general"}
                                               onChange={handleChange} required />
                                        <label className="form-check-label" htmlFor="bac-general">Lycéen</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="formationOrigine"
                                               id="reorientation" value="reorientation" checked={form.formationOrigine === "reorientation"}
                                               onChange={handleChange} required />
                                        <label className="form-check-label" htmlFor="reorientation">Étudiant en réorientation</label>
                                    </div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input name="lycee" className="form-control" placeholder="Lycée"
                                           value={form.lycee} onChange={handleChange} required />
                                    <label>Lycée / Établissement de provenance</label>
                                </div>

                                <div className="form-floating">
                                    <select name="formationInteressee" className="form-select"
                                            value={form.formationInteressee} onChange={handleChange} required>
                                        <option value=""></option>
                                        {formations.map((f) => <option key={f}>{f}</option>)}
                                    </select>
                                    <label>Formation qui vous intéresse</label>
                                </div>

                            </div>
                        </div>

                        <div className="card shadow-sm mb-3">
                            <div className="card-body">

                                <label className="form-label fw-medium">Souhaitez-vous participer à une journée d'immersion ?</label>
                                <div className="d-flex gap-4 mb-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="immersion"
                                               id="immersion_oui" value="oui" checked={form.immersion === "oui"}
                                               onChange={handleChange} required />
                                        <label className="form-check-label" htmlFor="immersion_oui">Oui</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="immersion"
                                               id="immersion_non" value="non" checked={form.immersion === "non"}
                                               onChange={handleChange} required />
                                        <label className="form-check-label" htmlFor="immersion_non">Non</label>
                                    </div>
                                </div>

                                {form.immersion === "oui" && (
                                    <div className="form-floating">
                                        <select name="typeEvenement" className="form-select"
                                                value={form.typeEvenement} onChange={handleChange} required>
                                            <option value=""></option>
                                            <option value="jpo">Journée Porte Ouverte</option>
                                            <option value="forum">Forum des formations</option>
                                            <option value="autre">Autre</option>
                                        </select>
                                        <label>Type d'événement</label>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="rgpd" name="rgpd"
                                           checked={form.rgpd} onChange={handleChange} required />
                                    <p>RGPD</p>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg">Valider</button>

                    </form>
                </div>
            </div>
        </div>
    );
}