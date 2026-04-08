import ListerVisiteurs from "./components/ListerVisiteurs.tsx";
import Statistiques from "./components/Statistique.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FormulaireVisiteur from "./components/Formulaire.tsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<FormulaireVisiteur />} />
              <Route path="/visiteurs" element={<ListerVisiteurs />} />
              <Route path="/statistiques" element={<Statistiques />}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
