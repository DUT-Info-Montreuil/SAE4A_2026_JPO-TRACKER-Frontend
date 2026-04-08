import type {Filtres} from "../type/Typefiltres.tsx";
import ServiceExport from "../services/ServiceExport.tsx";

interface ExportButtonsProps {
    filtres?: Partial<Filtres>;
}

export default function ExportButtons({filtres}: ExportButtonsProps) {
    function handleExport() {
        ServiceExport.exporterCSV(filtres);
    }

    return (
        <button
            onClick={handleExport}
            className="btn btn-success d-flex align-items-center gap-2"
        >
            <i className="bi bi-download"></i>
            Exporter les données (CSV)
        </button>
    );
}