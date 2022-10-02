import "./css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ApplyToJobMockup from "./pages/ApplyToJobMockUp";
import { ToulousePieronPage } from "./pages/ToulousePieron";
import Settings from "./pages/Settings";
import Tests from "./pages/Tests";
import Results from "./pages/Results";
import { I18nextProvider } from "react-i18next";
import { i18next } from "./i18n";

function App() {
  return (
    <>
    <I18nextProvider i18n={i18next}>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/results" element={<Results />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/mockup" element={<ApplyToJobMockup />} />
        <Route path="/tests/toulouse-pieron" element={<ToulousePieronPage />} />
      </Routes>
    </I18nextProvider>
    </>
  );
}

export default App;
