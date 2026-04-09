import ListerVisiteurs from "./components/ListerVisiteurs.tsx";
import Statistiques from "./components/Statistique.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FormulaireVisiteur from "./components/Formulaire.tsx";
import VisiteurDetail from "./components/VisiteurDetail.tsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<FormulaireVisiteur />} />
              <Route path="/visiteurs" element={<ListerVisiteurs />} />
              <Route path="/statistiques" element={<Statistiques />}/>
              <Route path="/visiteurs/:id" element={<VisiteurDetail />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
