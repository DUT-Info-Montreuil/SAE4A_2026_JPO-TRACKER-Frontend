import type {Filtres} from "../type/Typefiltres.tsx";
import {type ChangeEvent, useState} from "react";
import {formations, typesFormationOrigine} from "../type/TypeForm.tsx";

interface FiltresVisiteursProps {
    filtres: Filtres;
    onFiltres: (f: Partial<Filtres>) => void;
    onReinit: () => void;
}

export default function FiltresVisiteurs({filtres, onFiltres, onReinit}: FiltresVisiteursProps) {
    const [saisie, setSaisie] = useState(filtres.recherche);

    function handleOk() {
        onFiltres({recherche: saisie});
    }

    function handleCheck(e: ChangeEvent<HTMLInputElement>) {
        onFiltres({[e.target.name]: e.target.checked});
    }

    function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
        onFiltres({[e.target.name]: e.target.value});
    }

    return (
        <div className="filtres-panel">
            <div className="filtres-search">
                <input className="form-control"
                       type="text"
                       placeholder="Recherche par nom, prénom, email…"
                       value={saisie}
                       onChange={e => setSaisie(e.target.value)}
                />
                <button className="btn btn-dark" onClick={handleOk}>OK</button>
            </div>

            <div className="filtres-selects">
                <div className="filtres-field">
                    <label>Département</label>
                    <select name="departement" value={filtres.departement} onChange={handleSelect}>
                        <option value="">Tous</option>
                        {formations.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>
                <div className="filtres-field">
                    <label>Formation d'origine</label>
                    <select name="formationOrigine" value={filtres.formationOrigine} onChange={handleSelect}>
                        <option value="">Toutes</option>
                        {typesFormationOrigine.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>

            <div className="filtres-checks">
                <label className="check-pill">
                    <input type="checkbox"
                           name="reorientation"
                           id="reorientation"
                           checked={filtres.reorientation}
                           onChange={handleCheck}
                    />
                    Réorientation uniquement
                </label>
                <label className="check-pill">
                    <input type="checkbox"
                           name="situationParticuliere"
                           id="situationParticuliere"
                           checked={filtres.situationParticuliere}
                           onChange={handleCheck}
                    />
                    Dossier particulier uniquement
                </label>
            </div>

            <div className="filtres-actions">
                <button className="btn-reset" onClick={onReinit}>Reset</button>
            </div>
        </div>
    );
}