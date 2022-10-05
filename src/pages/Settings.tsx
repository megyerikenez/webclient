import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";

function Settings() {
  const [t, i18n] = useTranslation("common");
  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1> {t("nav.settings")}</h1>
        </div>
      </main>
    </>
  );
}

export default Settings;
