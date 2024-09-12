import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GridPage from "./pages/GridPage";
import LookupPage from "./pages/LookupPage";
import NavBar from "./components/NavBar";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <NavBar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate replace to="/grid" />} />
          <Route path="/grid" element={<GridPage />} />
          <Route path="/lookup" element={<LookupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
