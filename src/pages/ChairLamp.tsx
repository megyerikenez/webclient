import { Picture, getImgRes } from "./ChairLamp/Picture";

import { MAX_TIME } from "./ChairLamp/Constants";
import Navbar from "../components/Navbar";
import { Score } from "./ChairLamp/Score";
import { Timer } from "../components/Timer";
import { isCompleted } from "../api";
import shallow from "zustand/shallow";
import toast from "react-hot-toast";
import { useTestStore } from "./ChairLamp/store";
import { useTranslation } from "react-i18next";

export function ChairLampPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ChairLamp />
        </div>
      </main>
    </>
  );
}

export function ChairLamp() {
    const [t, i18n] = useTranslation("common");
    let store = useTestStore(({startTime, endTime, hasStarted, hasEnded, endTest, startTest, toggleMarked, getResults, pictures, picturesRevised, picturesToFind}) => ({
        startTime, endTime, hasStarted, hasEnded, endTest, startTest, toggleMarked, getResults, pictures, picturesRevised, picturesToFind
    }), shallow);

    if (!store.hasStarted || store.startTime == null){
        let squares: number[] = [];
        for(let i = 0; i < 8; i++){
            if (i % 2 == 0){
                squares.push(i);
            } else {
                squares.unshift(i);
            }
        }

        return <>
            <div className='px-6'>
                <h1 className='mb-6'>{t("tests.chairLamp.name")}</h1>
                <p>{t("tests.chairLamp.description.1")}</p>
                <p>{t("tests.chairLamp.description.2")}</p>
                <div className='my-2'>
                    {
						getImgRes().map((res)=>{
							return <>
								<Picture res={res} />
							</>
						})
					}
                </div>
                <p>{t("tests.toulousePieron.description.time")}</p>
                <button
                    className='mt-6 button-primary'
                    onClick={() => {
                        isCompleted('chair-lamp').then(value=>{
                            if (value == false){
                              store.startTest();
                            } else {
                              toast.error(t('errors.completed'));
                            }
                        }).catch(err=>{
                            toast.error(t('error'));
                        });
                    }}
                >{t("tests.actions.start")}</button>
            </div>
        </>
    }

    let hasEnded = store.hasEnded && store.endTime;

    return <>
        <div>
            {
                hasEnded ? <>
                    <Score />
                </>
                :
                <>
                    <div
                        style={{
                            flexDirection: 'row',
                            alignItems: 'start'
                        }}
                        className='flex mb-6 gap-6 mx-6 sm:mx-0'
                    >
                        <div
                            className='card text-center pb-2'
                        >
                            <p>{t("tests.chairLamp.shapesToMark")}</p>
                            { store.picturesToFind.map(index =>{
                                return <>
                                    <Picture picIdx={index} />
                                </>
                            }) }
                        </div>
                        <Timer startTime={store.startTime} maxTime={MAX_TIME} />
                    </div>
                </>
            }

            <div
                className="mb-6"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                }}>
                <div>
                {
					store.pictures.map(pic => {
						return <Picture posIdx={pic.positionIdx} picIdx={pic.pictureIdx} revised={pic.revised} selected={pic.selected} />
					})
				}
                </div>
            </div>

            {
                !hasEnded && <>
                    <button
                        className='mx-6 sm:mx-0 button-primary'
                        
                        onClick={() => {
                            store.endTest();
                            store.getResults();
                        }}
                    >{t("tests.actions.end")}</button>
                </>
            }

            <div className="mb-16"></div>

        </div>
		<div className='w-full fixed bottom-0 left-0 p-1 text-center bg-slate-200'>
			<button disabled={store.hasEnded} className={"button-primary m-2" + (store.hasEnded ? " opacity-50" : "")} onClick={() => {
                store.toggleMarked(false)
                if(store.picturesRevised+1 >= store.pictures.length){
                    store.endTest();
                    store.getResults();
                }
            }}>Nem</button>
			<button disabled={store.hasEnded} className={"button-primary m-2" + (store.hasEnded ? " opacity-50" : "")} onClick={() => {
                if(store.startTime != undefined)
                store.toggleMarked(true)
                if(store.picturesRevised+1 >= store.pictures.length){
                    store.endTest();
                    store.getResults();
                }
            }}>Igen</button>
		</div>
    </>;
}
