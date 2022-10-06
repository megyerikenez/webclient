import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";

function Home() {

  const [t, i18n] = useTranslation('common');

  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8 flex items-center justify-center flex-col w-full min-h-screen absolute top-0">
          <h1 className="text-center">{t('homepage.name')}</h1>
          <h2 className="font-normal my-4 w-full text-center max-w-7xl lg:px-15">
            <div className="w-2/3 md:w-1/3 mx-auto">{t('homepage.text')}</div>
          </h2>
        </div>
      </main>
    </>
  );
}

export default Home;
