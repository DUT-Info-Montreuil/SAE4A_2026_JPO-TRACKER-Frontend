import { Link } from "react-router-dom";

export default function NavAdmin() {
    return (
        <div className="d-flex gap-2 mb-3">
            <Link to="/visiteurs" className="btn btn-outline-primary btn-sm">Visiteurs</Link>
            <Link to="/statistiques" className="btn btn-outline-primary btn-sm">Statistiques</Link>
        </div>
    );
}