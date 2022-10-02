import "./css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ApplyToJobMockup from "./pages/ApplyToJobMockUp";
import { ToulousePieron } from "./pages/ToulousePieron";
import Settings from "./pages/Settings";
import Results from "./pages/ApplyToJobMockUp copy";
import Tests from "./pages/Tests";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tests" element={<Tests />} />
      <Route path="/results" element={<Results />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/mockup" element={<ApplyToJobMockup />} />
      <Route path="/tests/toulouse-pieron" element={<ToulousePieron />} />
    </Routes>
  );
}

export default App;
