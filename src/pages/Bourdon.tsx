import { MAX_TIME } from "./Bourdon/Constants";
import { useTestStore } from "./Bourdon/store";
import { Timer } from "../components/Timer";
import { GridItem } from "./Bourdon/GridItem";
import shallow from "zustand/shallow";
import { Score } from "./Bourdon/Score";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

export function BourdonPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Bourdon />
        </div>
      </main>
    </>
  );
}

export function Bourdon() {
  const [t, i18n] = useTranslation("common");

  let store = useTestStore(
    ({
      startTime,
      endTime,
      hasStarted,
      hasEnded,
      endTest,
      startTest,
      letters,
    }) => ({
      startTime,
      endTime,
      hasStarted,
      hasEnded,
      endTest,
      startTest,
      letters,
    }),
    shallow
  );

  if (!store.hasStarted || store.startTime == null) {
    let squares: number[] = [];
    for (let i = 0; i < 8; i++) {
      if (i % 2 === 0) {
        squares.push(i);
      } else {
        squares.unshift(i);
      }
    }

    return (
      <>
        <div className="px-6">
          <h1 className="mb-6">{t("tests.bourdon.name")}</h1>
          <p>{t("tests.bourdon.description.1")}</p>
          <p>{t("tests.bourdon.description.2")}</p>
          <div className="my-2"></div>
          <p>{t("tests.bourdon.description.time")}</p>
          <button
            className="mt-6 button-primary"
            onClick={() => {
              store.startTest();
            }}
          >
            {t("tests.actions.start")}
          </button>
        </div>
      </>
    );
  }

  let hasEnded = store.hasEnded && store.endTime;

  return (
    <>
      <div>
        {hasEnded ? (
          <>
            <Score />
          </>
        ) : (
          <>
            <div
              style={{
                flexDirection: "row",
                alignItems: "start",
              }}
              className="flex mb-6 gap-6 mx-6 sm:mx-0"
            >
              <div className="card text-center">
                {t('tests.bourdon.description.2')}
              </div>
              <Timer startTime={store.startTime} maxTime={MAX_TIME} />
            </div>
          </>
        )}

        <div
          style={{
            overflowX: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            fontFamily: "'Courier New', monospace",
          }}
          className="items-center md:items-start"
        >
          {store.letters.map((row, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  letterSpacing: 2,
                }}
              >
                {row.map((col, colIndex) => {
                  return <GridItem row={index} column={colIndex} />;
                })}
              </div>
            );
          })}

          <div>
            {hasEnded ? (
              <></>
            ) : (
              <>
                <div className="w-full">
                  <button
                    className="mx-6 sm:mx-0 mt-6 button-primary"
                    onClick={() => {
                      store.endTest();
                    }}
                  >
                    {t("tests.actions.end")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
