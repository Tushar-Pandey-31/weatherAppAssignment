import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CityDetails from "./pages/CityDetails";

function App() {
  return (
     <div className="app">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/city/:city" element={<CityDetails />} />
      </Routes>
     </div>
      
    
  );
}

export default App;
