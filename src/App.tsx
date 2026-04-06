import ListerVisiteurs from "./components/ListerVisiteurs.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FormulaireVisiteur from "./components/Formulaire.tsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<FormulaireVisiteur />} />
              <Route path="/visiteurs/filtrer/" element={<ListerVisiteurs />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
