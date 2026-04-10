# Frontend – Gestion des Visiteurs JPO

Interface React (Vite + TypeScript) pour la gestion des visiteurs des Journées Portes Ouvertes de l'IUT de Montreuil.

---

## Prérequis

- Node.js 18+
- Le backend Flask doit tourner sur `http://localhost:5000`

---

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

L'application démarre sur `http://localhost:5173`.

---

## Logo

Placer le logo dans le dossier `public` :

```
public/
└── images/
    └── LOGO_IUT_Montreuil_Baseline_Couleur_INFO.png
```

---

## Structure du projet

```
frontend/
├── public/
│   └── images/
│       └── LOGO_IUT_Montreuil_Baseline_Couleur_INFO.png
├── src/
│   ├── components/
│   │   ├── BoutonSupprimerVisiteurs.tsx  # Bouton suppression + modale de confirmation
│   │   ├── ChangerMotDePasse.tsx         # Formulaire changement de mot de passe
│   │   ├── Connexion.tsx                 # Page de connexion admin
│   │   ├── ExportButtons.tsx             # Boutons export CSV
│   │   ├── FiltresVisiteurs.tsx          # Panneau de filtres
│   │   ├── Formulaire.tsx                # Formulaire d'inscription visiteur (public)
│   │   ├── ListerVisiteurs.tsx           # Liste paginée des visiteurs
│   │   ├── NavAdmin.tsx                  # Barre de navigation admin
│   │   ├── Pagination.tsx                # Composant pagination
│   │   ├── RouteAdmin.tsx                # Guard de route (JWT)
│   │   ├── Statistique.tsx               # Dashboard avec graphiques
│   │   ├── VisiteurCard.tsx              # Ligne de tableau visiteur
│   │   └── VisiteurDetail.tsx            # Fiche détaillée d'un visiteur
│   ├── hook/
│   │   ├── UseAuth.tsx                   # Hook gestion authentification
│   │   └── UseVisiteurs.tsx              # Hook chargement et filtrage visiteurs
│   ├── services/
│   │   ├── ServiceAuth.tsx               # Appels API auth
│   │   ├── ServiceExport.tsx             # Appels API export CSV
│   │   └── ServiceVisiteur.tsx           # Appels API visiteurs
│   ├── styles/
│   │   ├── ActionsBar.css
│   │   ├── dashboard.css
│   │   ├── FiltresVisiteurs.css
│   │   ├── modal.css
│   │   └── Tableau.css
│   ├── type/
│   │   ├── TypeAuth.tsx                  # Interface AuthForm
│   │   ├── Typefiltres.tsx               # Interface Filtres + valeurs initiales
│   │   ├── TypeForm.tsx                  # Interface FormValues + listes de formations
│   │   └── TypeVisiteur.tsx              # Interface TypeVisiteur
│   ├── App.tsx                           # Routeur principal
│   └── main.tsx                          # Point d'entrée React
├── index.html
└── package.json
```

---

## Pages et routes

| Route | Accès | Description |
|-------|-------|-------------|
| `/` | Public | Formulaire d'inscription visiteur |
| `/visiteurs` | Admin | Liste filtrée et paginée des visiteurs |
| `/visiteurs/:id` | Admin | Fiche détaillée d'un visiteur |
| `/statistiques` | Admin | Dashboard avec graphiques Chart.js |
| `/mot-de-passe` | Admin | Changement de mot de passe |

Les routes admin affichent la page de connexion si aucun token JWT n'est présent en `localStorage`.

---

## Authentification

Le token JWT est stocké dans le `localStorage` sous la clé `token`. Il est envoyé automatiquement dans le header `Authorization: Bearer <token>` pour toutes les requêtes protégées.

---

## Fonctionnalités

**Formulaire visiteur (public)**
- Saisie complète : identité, formation, établissement, adresse, RGPD
- Soumission vers `POST /visiteurs/`

**Liste des visiteurs (admin)**
- Recherche par nom, prénom, email
- Filtres : département, formation d'origine, réorientation, situation particulière
- Pagination (10 visiteurs par page)
- Export CSV complet ou emails uniquement, avec les filtres actifs
- Suppression de tous les visiteurs avec confirmation

**Statistiques (admin)**
- Graphiques barres, camembert, anneau via Chart.js
- Métriques : formation intéressée, formation d'origine, type d'événement, situation particulière, immersion, étudiants par jour
- Filtres combinables sur les graphiques

**Mot de passe (admin)**
- Validation : 8 caractères minimum, 1 majuscule, 1 chiffre, 1 caractère spécial

---

## Dépendances principales

| Package | Version | Rôle |
|---------|---------|------|
| React | 19 | Framework UI |
| React Router DOM | 7 | Routage SPA |
| Chart.js + react-chartjs-2 | 4 / 5 | Graphiques statistiques |
| Bootstrap | 5.3 (CDN) | Composants UI et grille |
| Bootstrap Icons | 1.11 (CDN) | Icônes |
| react-toastify | 11 | Notifications |
| Vite | 8 | Bundler et serveur de développement |
| TypeScript | 5 | Typage statique |

---

## Build de production

```bash
npm run build
```

Les fichiers sont générés dans le dossier `dist/`, à servir avec un serveur statique (Nginx, Apache, etc.).