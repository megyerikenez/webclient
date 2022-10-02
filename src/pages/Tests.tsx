import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Tests() {

  const [t, i18n] = useTranslation('common');

  let tests = [
    {
      name:"tests.toulousePieron.name",
      path:"toulouse-pieron",
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1
            className="mb-6"
          >{t('nav.tests')}</h1>
          <div>
            { tests.map(test=>
                <>
                  <div className="card">
                    <h2>
                      <Link to={"/tests/"+test.path}>
                        {t(test.name)}
                      </Link>
                    </h2>
                  </div>
                </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Tests;
