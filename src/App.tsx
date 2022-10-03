import "./css/App.css";

import { Link, Route, Routes } from "react-router-dom";

import ApplyToJobMockup from "./pages/ApplyToJobMockUp";
import ChairLampPage from "./pages/ChairLamp";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Settings from "./pages/Settings";
import Tests from "./pages/Tests";
import { ToulousePieronPage } from "./pages/ToulousePieron";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tests" element={<Tests />} />
      <Route path="/results" element={<Results />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/mockup" element={<ApplyToJobMockup />} />
      <Route path="/tests/toulouse-pieron" element={<ToulousePieronPage />} />
      <Route path="/tests/chair-lamp" element={<ChairLampPage />} />
    </Routes>
  );
}

export default App;
