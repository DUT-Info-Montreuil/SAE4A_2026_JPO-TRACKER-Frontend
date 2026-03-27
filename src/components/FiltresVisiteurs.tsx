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
        onFiltres({recherche: saisie})
    }

    function handleCheck(e: ChangeEvent<HTMLInputElement>) {
        onFiltres({[e.target.name]: e.target.checked});
    }
    
    function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
        onFiltres({[e.target.name]: e.target.value});
    }

    return (
        <div>
            <div className="input-group">
                <input className="form-control"
                       type="text"
                       placeholder="Recherche..."
                       value={saisie}
                       onChange={e => setSaisie(e.target.value)}
                />
                <button className="btn btn-dark" onClick={handleOk}>OK</button>
            </div>

            <div>
                <label>Département</label>
                <select name="departement" value={filtres.departement} onChange={handleSelect}>
                    <option value=""></option>
                    {formations.map(f => <option key={f}>{f}</option>)}
                </select>
            </div>

            <div>
                <label>Type de formation d'origine</label>
                <select name="bac">
                    <option value=""></option>
                    {typesFormationOrigine.map(t => <option key={t}>{t}</option>)}
                </select>
            </div>

            <div>
                <div>
                    <input type="checkbox"
                           name="reorientation"
                           checked={filtres.reorientation}
                           onChange={handleCheck}
                    />
                    <label htmlFor="reorientation">Réorientation uniquement</label>
                </div>
                <div>
                    <input type="checkbox"
                           name="situationParticuliere"
                           checked={filtres.situationParticuliere}
                           onChange={handleCheck}
                    />
                    <label htmlFor="situationParticuliere">Dossier particulier uniquement</label>
                </div>
                <button onClick={onReinit}></button>
            </div>
        </div>


    );
}