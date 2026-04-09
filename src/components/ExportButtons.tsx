import type {Filtres} from "../type/Typefiltres.tsx";
import ServiceExport from "../services/ServiceExport.tsx";

interface ExportButtonsProps {
    filtres?: Partial<Filtres>;
}

export default function ExportButtons({filtres}: ExportButtonsProps) {
    function handleExport() {
        ServiceExport.exporterCSV(filtres);
    }

    function handleExportEmails() {
        ServiceExport.exporterEmailsCSV(filtres);
    }

    return (
        <div className="d-flex gap-2">
            <button onClick={handleExport} className="btn-export btn-export-primary">
                <i className="bi bi-download"></i>
                Exporter les données (CSV)
            </button>
            <button onClick={handleExportEmails} className="btn-export btn-export-outline">
                <i className="bi bi-envelope"></i>
                Exporter les emails (CSV)
            </button>
        </div>
    );
}