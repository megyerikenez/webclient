import { COL_COUNT, MAX_TIME, ROW_COUNT } from './ToulousePieron/Constants';
import { Picture, getImgRes } from './ChairLamp/Picture';
import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import { Score } from './ChairLamp/Score';
import { Timer } from '../components/Timer';
import shallow from 'zustand/shallow'
import { useTestStore } from './ChairLamp/store';

export function ChairLampPage(){
    return <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ChairLamp />
        </div>
      </main>
    
    </>
}

export function ChairLamp(){
    let store = useTestStore(({startTime, endTime, hasStarted, hasEnded, endTest, startTest, toggleMarked, pictures, picturesRevised, picturesToFind}) => ({
        startTime, endTime, hasStarted, hasEnded, endTest, startTest, toggleMarked, pictures, picturesRevised, picturesToFind
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
                <h1 className='mb-6'>Toulouse-Piéron teszt</h1>
                <p>A következő feladatban kapni fog 4 féle négyzetet, azokat kell megtalálnia, és bejelölnie (kattintással).</p>
                <p>
					Összesen { getImgRes().length } fajta négyzet van, azok az alábbi módon néznek ki:
				</p>
                <div className='my-2'>
                    {
						getImgRes().map((res)=>{
							return <>
								<Picture res={res} />
							</>
						})
					}
                </div>
                <p>A feladat megoldására 5 perc áll rendelkezésre.</p>
                <button
                    className='mt-6 button-primary'
                    onClick={() => {
                        store.startTest();
                    }}
                >Kezdés</button>
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
                            <p>Az alábbi alakzatokat kell bejelölnie</p>
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
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                }}
            >
                <div>
                {
					store.pictures.map(pic => {
						return <Picture posIdx={pic.positionIdx} picIdx={pic.pictureIdx} revised={pic.revised} selected={pic.selected} />
					})
				}
                </div>
            </div>
        </div>
        <div>
            {
                hasEnded ? <>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' style={{ margin: 'auto' }}>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope="col" className="py-3 px-6"></th>
                                <th scope="col" className="py-3 px-6">átnézett képek száma</th>
                                <th scope="col" className="py-3 px-6">hibák száma</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='table-row'>
                                <td>1. perc</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className='table-row'>
                                <td>2. perc</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className='table-row'>
                                <td>3. perc</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className='table-row'>
                                <td>4. perc</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className='table-row'>
                                <td>5. perc</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className='table-row'>
                                <td>ÖSSZESEN</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </>
                :
                <>
                    <button
                        className='mx-6 sm:mx-0 mt-6 button-primary'
                        onClick={() => {
                            store.endTest();
                        }}
                    >Befejezés</button>
                </>
            }
        </div>
		<div className='w-full fixed bottom-0 left-0 p-1 text-center bg-slate-200'>
			<button disabled={store.hasEnded} className={"button-primary m-2" + (store.hasEnded ? " opacity-50" : "")} onClick={() => {
                store.toggleMarked(false)
                if(store.picturesRevised+1 >= store.pictures.length){
                    store.endTest();
                }
            }}>Nem</button>
			<button disabled={store.hasEnded} className={"button-primary m-2" + (store.hasEnded ? " opacity-50" : "")} onClick={() => {
                if(store.startTime != undefined)
                store.toggleMarked(true)
                if(store.picturesRevised+1 >= store.pictures.length){
                    store.endTest();
                }
            }}>Igen</button>
		</div>
    </>;
}