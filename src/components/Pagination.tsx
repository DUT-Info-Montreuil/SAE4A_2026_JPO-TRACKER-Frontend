interface Props {
    pageActuelle: number;
    totalPages: number;
    onChangerPage: (page: number) => void;
}

export default function Pagination({ pageActuelle, totalPages, onChangerPage }: Props) {
    if (totalPages <= 1) return null;

    return (
        <div className="d-flex gap-2 justify-content-center">
            <button
                className="btn btn-outline-secondary"
                disabled={pageActuelle === 1}
                onClick={() => onChangerPage(pageActuelle - 1)}
            >
                Précédent
            </button>

            <span className="align-self-center">
        Page {pageActuelle} / {totalPages}
      </span>

            <button
                className="btn btn-outline-secondary"
                disabled={pageActuelle === totalPages}
                onClick={() => onChangerPage(pageActuelle + 1)}
            >
                Suivant
            </button>
        </div>
    );
}