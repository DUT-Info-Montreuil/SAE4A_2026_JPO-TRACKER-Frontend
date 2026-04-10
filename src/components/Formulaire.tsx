import {useState, type ChangeEvent} from "react";
import {initialValues, formations, type FormValues, typesFormationOrigine} from "../type/TypeForm.tsx";
import ServiceVisiteur from "../services/ServiceVisiteur.tsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormulaireVisiteur() {
    const [form, setForm] = useState<FormValues>(initialValues);
    const [rgpdOpen, setRgpdOpen] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setForm({ ...form, [name]: val });
    };

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        ServiceVisiteur.putVisiteur(form).then(() => {
            setForm(initialValues);
            toast.success("Formulaire envoyé avec succès !");
        }).catch(() => {
            toast.error("Erreur lors de l'envoi du formulaire");
        });
    };

    return (
        <div className="container py-4">
            <ToastContainer position="top-right" autoClose={3000} />
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
                                            <label>Nom*</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input name="prenom" className="form-control" placeholder="Prénom"
                                                   value={form.prenom} onChange={handleChange} required />
                                            <label>Prénom*</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mt-1">
                                    <div className="col-sm-4">
                                        <div className="form-floating">
                                            <input name="dateDeNaissance" type="date" className="form-control"
                                                   placeholder="Date de naissance"
                                                   value={form.dateDeNaissance} onChange={handleChange} required/>
                                            <label>Date de naissance*</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-floating">
                                            <input name="email" type="email" className="form-control"
                                                   placeholder="Email"
                                                   value={form.email} onChange={handleChange}/>
                                            <label>Email</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-floating">
                                            <input name="telephone" type="tel" className="form-control"
                                                   placeholder="Téléphone"
                                                   value={form.telephone} onChange={handleChange}/>
                                            <label>Téléphone (facultatif)</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row g-3 mt-1">
                                    <div className="col-sm-8">
                                        <div className="form-floating">
                                            <input name="ville" className="form-control" placeholder="Ville" type="text"
                                                   value={form.ville} onChange={handleChange} required/>
                                            <label>Ville*</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-floating">
                                            <input name="codePostal" className="form-control" placeholder="Code postal"
                                                   type="number" maxLength={5}
                                                   value={form.codePostal} onChange={handleChange} required/>
                                            <label>Code postal*</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="situationParticuliere"
                                                   name="situationParticuliere" checked={form.situationParticuliere}
                                                   onChange={handleChange}/>
                                            <label className="form-check-label" htmlFor="situationParticuliere">J'ai une situation particulière</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <select name="formationOrigine" className="form-select"
                                                    value={form.formationOrigine} onChange={handleChange} required>
                                                <option value=""></option>
                                                {typesFormationOrigine.map((t) => (
                                                    <option key={t.type} value={t.type}>{t.libelle}</option>
                                                ))}
                                            </select>
                                            <label>Formation actuelle*</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">
                                            <input name="formationOrigineDetail" className="form-control"
                                                   placeholder="Précisez votre formation"
                                                   value={form.formationOrigineDetail} onChange={handleChange}/>
                                            <label>ex: Licence informatique</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-floating mt-3 mb-3">
                                    <input name="lycee" className="form-control" placeholder="Lycée"
                                           value={form.lycee} onChange={handleChange} required/>
                                    <label>Lycée / Établissement de provenance*</label>
                                </div>

                                <div className="form-floating">
                                    <select name="formationInteressee" className="form-select"
                                            value={form.formationInteressee} onChange={handleChange} required>
                                        <option value=""></option>
                                        {formations.map((f) => <option key={f}>{f}</option>)}
                                    </select>
                                    <label>Formation qui vous intéresse*</label>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <label className="form-label fw-medium">Souhaitez-vous participer à une journée d'immersion ?</label>
                                <div className="d-flex gap-4 mb-3">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="immersion"
                                               name="immersion" checked={form.immersion} onChange={handleChange}/>
                                        <label className="form-check-label" htmlFor="immersion">
                                            Je souhaite participer à une journée d'immersion
                                        </label>
                                    </div>
                                </div>

                                {form.immersion && (
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

                        <div className="card shadow-sm mb-4 border-primary">
                            <div className="card-header bg-primary text-white fw-semibold">
                                Protection de vos données personnelles (RGPD)
                            </div>
                            <div className="card-body">
                                <div className="alert alert-light border mb-3 p-3" style={{fontSize: "0.875rem"}}>
                                    <p className="mb-2">
                                        <strong>Responsable du traitement :</strong> IUT de Montreuil Paris, Montreuil (93100).
                                    </p>
                                    <p className="mb-2">
                                        <strong>Finalité :</strong> Les données collectées sont utilisées exclusivement pour le suivi de votre visite lors de nos événements de présentation des formations (JPO, portes ouvertes, salons) et, si vous y consentez, pour vous recontacter au sujet de nos formations.
                                    </p>
                                    <p className="mb-2">
                                        <strong>Durée de conservation :</strong> Vos données personnelles sont supprimées au 30 septembre de l'année de l'événement.
                                    </p>
                                    <div>
                                        <button type="button"
                                                className="btn btn-link btn-sm p-0 text-decoration-none"
                                                onClick={() => setRgpdOpen(!rgpdOpen)}
                                                aria-expanded={rgpdOpen}>
                                            {rgpdOpen ? "▾" : "▸"} Vos droits (accès, rectification, effacement, opposition…)
                                        </button>
                                        {rgpdOpen && (
                                            <div className="mt-2 ps-2 border-start border-primary">
                                                <p className="mb-1">Conformément au RGPD (Art. 15 à 22), vous disposez des droits suivants :</p>
                                                <ul className="mb-1" style={{fontSize: "0.85rem"}}>
                                                    <li><strong>Accès</strong> — obtenir une copie de vos données</li>
                                                    <li><strong>Rectification</strong> — corriger des données inexactes</li>
                                                    <li><strong>Effacement</strong> — demander la suppression de vos données</li>
                                                    <li><strong>Opposition</strong> — vous opposer au traitement</li>
                                                    <li><strong>Limitation</strong> — suspendre le traitement</li>
                                                    <li><strong>Portabilité</strong> — recevoir vos données dans un format lisible</li>
                                                    <li><strong>Retrait du consentement</strong> — à tout moment, sans effet rétroactif</li>
                                                </ul>
                                                <p className="mb-0" style={{fontSize: "0.85rem"}}>
                                                    Pour exercer vos droits, contactez le <strong>secrétariat de l'IUT de Montreuil Paris</strong>, Montreuil (93100).
                                                    En cas de non-réponse, vous pouvez saisir la <strong>CNIL</strong> — <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">www.cnil.fr</a>.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox"
                                           id="rgpdCollecte" name="rgpdCollecte"
                                           checked={form.rgpdCollecte} onChange={handleChange} required />
                                    <label className="form-check-label" htmlFor="rgpdCollecte">
                                        <span className="fw-semibold">J'accepte que mes données personnelles soient collectées et traitées</span> par l'IUT de Montreuil Paris dans le cadre de ma visite. <span className="text-danger">*</span>
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"
                                           id="rgpdContact" name="rgpdContact"
                                           checked={form.rgpdContact} onChange={handleChange}
                                           disabled={!form.rgpdCollecte} />
                                    <label className="form-check-label" htmlFor="rgpdContact"
                                           style={{opacity: form.rgpdCollecte ? 1 : 0.45}}>
                                        J'accepte d'être recontacté(e) par l'IUT de Montreuil Paris au sujet de ses formations. <span className="text-muted fst-italic">(facultatif)</span>
                                    </label>
                                </div>

                                {!form.rgpdCollecte && (
                                    <p className="text-danger small mt-2 mb-0">
                                        Le consentement à la collecte est obligatoire pour valider le formulaire.
                                    </p>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg w-100"
                                disabled={!form.rgpdCollecte}>
                            Valider l'inscription
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}