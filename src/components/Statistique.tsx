import { useState, useEffect } from "react";
import NavAdmin from "./NavAdmin.tsx";

import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import ServiceVisiteur from "../services/ServiceVisiteur.tsx";
import "../styles/dashboard.css"
Chart.register(
    CategoryScale, LinearScale, BarElement,
    PointElement, ArcElement, Title, Tooltip, Legend, Filler
);

interface VisiteurComplet {
    nom: string;
    prenom: string;
    email: string;
    telephone?: number | string;
    date_de_naissance?: string;
    situation_particulier?: boolean;
    formation_origine?: { type?: string; detail?: string };
    etablissement_origine?: { nom?: string };
    adresse?: { ville?: string; code_postal?: number | string };
    formation_interessee?: string;
    evenement?: { type?: string | null; date_visite?: { $date: string } | string };
    immersion?: { souhaite_participer?: boolean | string; statut?: string };
    rgpd?: { consentement_collecte?: boolean; consentement_contact?: boolean };
    meta?: { source_saisie?: string; annee_campagne?: number; created_at?: { $date: string } | string };
}

const PALETTE = [
    "#6366f1","#f59e0b","#10b981","#ef4444","#3b82f6",
    "#ec4899","#8b5cf6","#14b8a6","#f97316","#06b6d4",
];

const EVENEMENT_LABELS: Record<string, string> = {
    jpo:              "JPO",
    portes_ouvertes:  "Portes ouvertes",
    salon_virtuel:    "Salon virtuel",
    salon:            "Salon",
    evenement:        "Événement",
    forum:            "Forum",
    autre:            "Autre",
};

const CHART_TYPES = [
    { id: "bar",      label: "Barres",    icon: "" },
    { id: "pie",      label: "Camembert", icon: "" },
    { id: "doughnut", label: "Anneau",    icon: "" },
] as const;

type ChartTypeId = typeof CHART_TYPES[number]["id"];

const METRICS = [
    { id: "formation_interessee",  label: "Formation intéressée" },
    { id: "formation_origine",     label: "Formation d'origine" },
    { id: "type_evenement",        label: "Type d'événement" },
    { id: "situation_particulier", label: "Situation particulière" },
    { id: "immersion",             label: "Souhaite immersion" },
    { id: "etudiant par jour",     label: "Etudiant par jour" },
] as const;

type MetricId = typeof METRICS[number]["id"];

function extractMetricData(visiteurs: VisiteurComplet[], metricId: MetricId) {
    const counts: Record<string, number> = {};

    visiteurs.forEach((v) => {
        let key: string;
        switch (metricId) {
            case "formation_interessee":
                key = v.formation_interessee || "Non renseigné";
                break;
            case "formation_origine":
                key = v.formation_origine?.type || "Non renseigné";
                break;
            case "type_evenement":
                key = v.evenement?.type || "Non renseigné";
                break;
            case "situation_particulier":
                key = v.situation_particulier ? "Oui" : "Non";
                break;
            case "immersion":
                key = v.immersion?.souhaite_participer ? "Oui" : "Non";
                break;
            case "etudiant par jour": {
                const rawVisite = v.evenement?.date_visite;
                if (!rawVisite) return; // ignorer les entrées sans date de visite
                const rawStr = typeof rawVisite === "object" ? rawVisite.$date : rawVisite;
                const d = new Date(rawStr);
                if (isNaN(d.getTime())) return; // ignorer les dates invalides
                key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                break;
            }
            default:
                key = "Non renseigné";
        }
        counts[key] = (counts[key] || 0) + 1;
    });

    // Pour "etudiant par jour" : tri chronologique ; sinon tri par valeur décroissante
    const sorted = metricId === "etudiant par jour"
        ? Object.entries(counts).sort(([a], [b]) => a.localeCompare(b))
        : Object.entries(counts).sort((a, b) => b[1] - a[1]);

    return { labels: sorted.map(([k]) => k), values: sorted.map(([, v]) => v) };
}

function buildChartData(labels: string[], values: number[], chartType: ChartTypeId) {
    const isMultiColor = chartType === "pie" || chartType === "doughnut" || chartType === "bar";
    return {
        labels,
        datasets: [{
            label: "Visiteurs",
            data: values,
            backgroundColor: isMultiColor ? PALETTE.slice(0, labels.length) : PALETTE[0] + "cc",
            borderColor: isMultiColor ? PALETTE.slice(0, labels.length) : PALETTE[0],
            borderWidth: 2,
            borderRadius: chartType === "bar" ? 6 : 0,
            tension: 0.4,
            pointBackgroundColor: PALETTE[0],
            pointRadius: 5,
        }],
    };
}

const axisOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { labels: { color: "#e2e8f0", font: { family: "'DM Sans', sans-serif", size: 12 } } },
        tooltip: { backgroundColor: "#1e293b", titleColor: "#f8fafc", bodyColor: "#94a3b8", borderColor: "#334155", borderWidth: 1 },
    },
    scales: {
        x: { ticks: { color: "#ffffff" }, grid: { color: "#2e2b2b" } },
        y: { ticks: { color: "#000000" }, grid: { color: "#2e2b2b" } },
    },
};

const radialOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: "right" as const, labels: { color: "#e2e8f0", font: { family: "'DM Sans', sans-serif", size: 12 }, padding: 16 } },
        tooltip: { backgroundColor: "#1e293b", titleColor: "#f8fafc", bodyColor: "#000000", borderColor: "#334155", borderWidth: 1 },
    },
};

export default function Dashboard() {
    const [visiteurs, setVisiteurs] = useState<VisiteurComplet[]>([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState<string | null>(null);

    const [chartType, setChartType] = useState<ChartTypeId>("bar");
    const [metric, setMetric]       = useState<MetricId>("formation_interessee");

    const [filterFormation,  setFilterFormation]  = useState("");
    const [filterOrigine,    setFilterOrigine]     = useState("");
    const [filterEvenement,  setFilterEvenement]   = useState("");
    const [filterSituation,  setFilterSituation]   = useState("");
    const [filterImmersion,  setFilterImmersion]   = useState("");

    useEffect(() => {
        ServiceVisiteur.recupVisiteursFull()
            .then((data) => {
                setVisiteurs((data as unknown as VisiteurComplet[]) || []);
                setLoading(false);
            })
            .catch((e: Error) => {
                setError(e.message);
                setLoading(false);
            });
    }, []);

    const handleMetricChange = (newMetric: MetricId) => {
        setMetric(newMetric);
    };

    const handleChartTypeChange = (newType: ChartTypeId) => {
        setChartType(newType);
    };

    // Derive unique filter options from data
    const formationsDisponibles = [...new Set(visiteurs.map((v) => v.formation_interessee).filter(Boolean))].sort() as string[];
    const originesDisponibles   = [...new Set(visiteurs.map((v) => v.formation_origine?.type).filter(Boolean))].sort() as string[];
    const evenements            = [...new Set(visiteurs.map((v) => v.evenement?.type).filter(Boolean))].sort() as string[];

    const filtered = visiteurs.filter((v) => {
        if (filterFormation && v.formation_interessee !== filterFormation) return false;
        if (filterOrigine   && v.formation_origine?.type !== filterOrigine)  return false;
        if (filterEvenement && v.evenement?.type !== filterEvenement)         return false;
        if (filterSituation !== "") {
            const val = filterSituation === "true";
            if (v.situation_particulier !== val) return false;
        }
        if (filterImmersion !== "") {
            const val = filterImmersion === "true";
            if (Boolean(v.immersion?.souhaite_participer) !== val) return false;
        }
        return true;
    });

    const { labels, values } = extractMetricData(filtered, metric);
    const chartData = buildChartData(labels, values, chartType);
    const isPieType = chartType === "pie" || chartType === "doughnut";

    const activeFiltersCount = [filterFormation, filterOrigine, filterEvenement, filterSituation, filterImmersion].filter(Boolean).length;

    const resetFilters = () => {
        setFilterFormation("");
        setFilterOrigine("");
        setFilterEvenement("");
        setFilterSituation("");
        setFilterImmersion("");
    };

    const renderChart = () => {
        if (isPieType) {
            const Comp = chartType === "pie" ? Pie : Doughnut;
            return <Comp data={chartData} options={radialOptions} />;
        }
        return <Bar data={chartData} options={axisOptions} />;
    };

    return (
        <div className="db">
            <NavAdmin />
            <div className="db-header">
                <h1 className="db-title">JPO <span>Tracker</span> — Tableau de bord</h1>
                <div className="db-badge">
                    <strong>{filtered.length}</strong> / {visiteurs.length} visiteurs
                </div>
            </div>

            {error && <div className="err-box">⚠ Erreur de chargement : {error}</div>}

            <div className="controls">
                <div className="panel">
                    <div className="panel-label">Type de graphique</div>
                    <div className="ct-grid">
                        {CHART_TYPES.map((ct) => (
                            <button
                                key={ct.id}
                                className={`ct-btn ${chartType === ct.id ? "active" : ""}`}
                                onClick={() => handleChartTypeChange(ct.id)}
                            >
                                <span className="ic">{ct.icon}</span>
                                {ct.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="panel">
                    <div className="panel-label">Métrique affichée</div>
                    <div className="m-grid">
                        {METRICS.map((m) => (
                            <button
                                key={m.id}
                                className={`m-btn ${metric === m.id ? "active" : ""}`}
                                onClick={() => handleMetricChange(m.id)}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="filters">
                <div className="filters-hd">
                    <div className="panel-label" style={{ marginBottom: 0 }}>
                        Filtres {activeFiltersCount > 0 && `(${activeFiltersCount} actif${activeFiltersCount > 1 ? "s" : ""})`}
                    </div>
                    {activeFiltersCount > 0 && (
                        <button className="reset-btn" onClick={resetFilters}>Réinitialiser</button>
                    )}
                </div>
                <div className="filter-grid">
                    <div className="fg">
                        <label>Formation intéressée</label>
                        <select value={filterFormation} onChange={(e) => setFilterFormation(e.target.value)}>
                            <option value="">Toutes</option>
                            {formationsDisponibles.map((f) => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                    <div className="fg">
                        <label>Formation d'origine</label>
                        <select value={filterOrigine} onChange={(e) => setFilterOrigine(e.target.value)}>
                            <option value="">Toutes</option>
                            {originesDisponibles.map((f) => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>
                    <div className="fg">
                        <label>Type d'événement</label>
                        <select value={filterEvenement} onChange={(e) => setFilterEvenement(e.target.value)}>
                            <option value="">Tous</option>
                            {evenements.map((e) => (
                                <option key={e} value={e}>{EVENEMENT_LABELS[e] ?? e}</option>
                            ))}
                        </select>
                    </div>
                    <div className="fg">
                        <label>Situation particulière</label>
                        <select value={filterSituation} onChange={(e) => setFilterSituation(e.target.value)}>
                            <option value="">Tous</option>
                            <option value="true">Oui</option>
                            <option value="false">Non</option>
                        </select>
                    </div>
                    <div className="fg">
                        <label>Souhaite immersion</label>
                        <select value={filterImmersion} onChange={(e) => setFilterImmersion(e.target.value)}>
                            <option value="">Tous</option>
                            <option value="true">Oui</option>
                            <option value="false">Non</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="chart-container">
                <div className="chart-title">
                    {METRICS.find((m) => m.id === metric)?.label} —{" "}
                    {CHART_TYPES.find((c) => c.id === chartType)?.label}
                </div>
                {loading ? (
                    <div className="loading">
                        <div className="spinner" /> Chargement des données…
                    </div>
                ) : labels.length === 0 ? (
                    <div className="empty">
                        <span className="empty-ic">◌</span>
                        Aucune donnée pour cette combinaison de filtres
                    </div>
                ) : (
                    <div className="chart-wrap">{renderChart()}</div>
                )}
            </div>
        </div>
    );
}