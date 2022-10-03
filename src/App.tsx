import "./css/App.css";

import { Link, Route, Routes } from "react-router-dom";

import ApplyToJobMockup from "./pages/ApplyToJobMockUp";
import { ChairLampPage } from "./pages/ChairLamp";
import Home from "./pages/Home";
import { I18nextProvider } from "react-i18next";
import Results from "./pages/Results";
import Settings from "./pages/Settings";
import Tests from "./pages/Tests";
import { ToulousePieronPage } from "./pages/ToulousePieron";
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
					<Route path="/signup" element={<ApplyToJobMockup />} />
					<Route path="/tests/toulouse-pieron" element={<ToulousePieronPage />} />
					<Route path="/tests/chair-lamp" element={<ChairLampPage />} />
				</Routes>
			</I18nextProvider>
		</>
	);
}

export default App;