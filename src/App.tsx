import "./css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ApplyToJobMockup from "./pages/ApplyToJobMockUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="mockup" element={<ApplyToJobMockup />} />
    </Routes>
  );
}

export default App;
