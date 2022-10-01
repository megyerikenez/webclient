import "./css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ApplyToJobMockup from "./pages/ApplyToJobMockUp";
import { ToulousePieron } from "./pages/ToulousePieron";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mockup" element={<ApplyToJobMockup />} />
      <Route path="/tests/toulouse-pieron" element={<ToulousePieron />} />
    </Routes>
  );
}

export default App;
