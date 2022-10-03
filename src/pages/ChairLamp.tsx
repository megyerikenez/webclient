import { COL_COUNT, MAX_TIME, ROW_COUNT } from './ToulousePieron/Constants';
import { Picture, getImgRes } from './ChairLamp/Picture';
import React, { useEffect, useState } from 'react';

import { Corner } from './ToulousePieron/Corner';
import { GridItem } from './ToulousePieron/GridItem';
import Navbar from '../components/Navbar';
import { Score } from './ToulousePieron/Score';
import { Side } from './ToulousePieron/Side';
import { Timer } from '../components/Timer';
import { formatTime } from '../util';
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
    let store = useTestStore(({startTime, endTime, hasStarted, hasEnded, endTest, startTest, toggleMarked, pictures, picturesToFind}) => ({
        startTime, endTime, hasStarted, hasEnded, endTest, startTest, toggleMarked, pictures, picturesToFind
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
                                    <Picture idx={index} />
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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 5,
                    }}
                >
                    {store.pictures.map((row, index)=>{
                        return <>
                        {/* <span
                            className='font-sm w-8'
                            style={{
                                display: 'flex',
                                flexShrink: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexGrow: 1,
                            }}
                        >{index+1}</span> */}
                        </>
                    })}
                </div>

                <div>
                {
					store.pictures.map(pic => {
						return <Picture idx={pic.pictureIdx} revised={pic.revised} selected={pic.selected} />
					})
				}
                </div>
            </div>
        </div>
        <div>
            {
                hasEnded ? <>
                
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
			<button className="button-primary m-2" onClick={() => { store.toggleMarked(false) }}>Nem</button>
			<button className="button-primary m-2" onClick={() => { store.toggleMarked(true) }}>Igen</button>
		</div>
    </>;
}