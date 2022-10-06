import { useEffect, useState } from "react";
import {
  calculateToulousePieronScore,
  getResults,
  Results as ResultsData,
} from "../api";
import { LoaderPage } from "../components/LoaderPage";
import { useTranslation } from "react-i18next";
import { formatDate } from "../util";
import toast from "react-hot-toast";
import { Results as Segglyuk } from "../api";

function InnerResult(adat?: Segglyuk) {
  return (
    <>
      <Results />
    </>
  );
}

function NoResults() {
  const [t, i18n] = useTranslation("common");

  return <p className="text-center mt-6">{t("results.noResults")}</p>;
}

let dataPromise: Promise<ResultsData> | null = null;

function Results() {
  let [results, setResults] = useState<ResultsData | null>(null);

  const [t, i18n] = useTranslation("common");

  useEffect(() => {
    if (!dataPromise) {
      dataPromise = getResults();
      toast.promise(dataPromise, {
        loading: t("loaders.data.loading"),
        success: <b>{t("loaders.data.success")}</b>,
        error: <b>{t("loaders.data.error")}</b>,
      });
      dataPromise.finally(() => {
        dataPromise = null;
      });
    }
    dataPromise.then((data) => setResults(data));
  }, []);

  if (results == null) {
    return <LoaderPage />;
  }

  return (
    <>
      <main>
        <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8">
          <div
            className="
              flex
              flex-col
              lg:flex-row
            "
          >
            <div className="flex-1 mb-6">
              <h2 className="text-center">{t("tests.chairLamp.name")}</h2>
              {results.chairLampResult.length > 0 ? (
                results.chairLampResult.map((result) => {
                  return (
                    <div
                      className="card mt-6 mx-auto"
                      key={result.startTime.toISOString()}
                    ></div>
                  );
                })
              ) : (
                <NoResults />
              )}
            </div>
            <div className="flex-1 mb-6">
              <h2 className="text-center">{t("tests.toulousePieron.name")}</h2>

              {results.toulousePieronResult.length > 0 ? (
                results.toulousePieronResult.map((result) => {
                  return (
                    <div
                      className="card mt-6 mx-auto"
                      key={result.startTime.toISOString()}
                    >
                      <p>
                        {t("tests.performance")}:{" "}
                        <span className="font-bold">
                          {(calculateToulousePieronScore(result) * 100).toFixed(
                            2
                          )}
                          %
                        </span>
                      </p>
                      <p>
                        {t("tests.stats.correctlyMarked")}:{" "}
                        <span className="font-bold">
                          {result.correctlyMarked}
                        </span>
                      </p>
                      <p>
                        {t("tests.stats.incorrectlyIgnored")}:{" "}
                        <span className="font-bold">
                          {result.incorrectlyIgnored}
                        </span>
                      </p>
                      <p>
                        {t("tests.stats.incorrectlyMarked")}:{" "}
                        <span className="font-bold">
                          {result.incorrectlyMarked}
                        </span>
                      </p>
                      <p className="text-right">
                        {formatDate(result.startTime)}
                      </p>
                    </div>
                  );
                })
              ) : (
                <NoResults />
              )}
            </div>
            <div className="flex-1 mb-6">
              <h2 className="text-center">{t("tests.bourdon.name")}</h2>
              {results.bourdonResult.length > 0 ? (
                results.bourdonResult.map((result) => {
                  return (
                    <div
                      className="card mt-6 mx-auto"
                      key={result.startTime.toISOString()}
                    ></div>
                  );
                })
              ) : (
                <NoResults />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default InnerResult;
