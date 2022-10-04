import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";

function Home() {

  const [t, i18n] = useTranslation('common');

  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
          <h1>{t('homepage.name')}</h1>
          <h2 className="font-normal my-4 w-1/3">
            {t('homepage.text')}
          </h2>
        </div>
      </main>
    </>
  );
}

export default Home;
