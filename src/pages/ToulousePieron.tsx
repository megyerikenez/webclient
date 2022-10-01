import React, { useState, useEffect } from 'react';
import { COL_COUNT, MAX_TIME, ROW_COUNT } from './ToulousePieron/Constants';
import { Corner } from './ToulousePieron/Corner';
import { Side } from './ToulousePieron/Side';
import { useTestStore } from './ToulousePieron/store';
import { formatTime } from './ToulousePieron/util';
import { Picture } from './ToulousePieron/Picture';
import { Timer } from './ToulousePieron/Timer';
import { GridItem } from './ToulousePieron/GridItem';
import shallow from 'zustand/shallow'
import { Score } from './ToulousePieron/Score';

export function ToulousePieron(){
    let store = useTestStore(({startTime, endTime, hasStarted, hasEnded, endTest, startTest, pictures, picturesToFind})=>({
        startTime, endTime, hasStarted, hasEnded, endTest, startTest, pictures, picturesToFind
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
            <div>
                <p>A következő feladatban kapni fog 4 féle négyzetet, azokat kell megtalálnia, és bejelölnie (kattintással).</p>
                <p>Összesen 8 fajta négyzet van, azok az alábbi módon néznek ki:</p>
                <div>
                    { squares.map((index)=>{
                        return <>
                            <Picture value={index} />
                        </>
                    }) }
                </div>
                <p>A feladat megoldására 5 perc áll rendelkezésre.</p>
                <button
                    className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none'
                    onClick={()=>{
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
                    <Timer startTime={store.startTime} />
                </>
            }

            
            <div>
                { store.picturesToFind.map(pic=>{
                    return <>
                        <Picture value={pic} />
                    </>
                }) }
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,
                }}
            >
                { store.pictures.map((row, index)=>{
                    return <div
                        style={{
                            display: 'flex',
                            gap: 5,
                        }}
                    >
                        <span
                            style={{
                                display: 'flex',
                                width: '30px',
                                fontSize: '15px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >{index+1}</span>

                        {
                            row.map((col, colIndex)=>{
                                return <GridItem row={index} column={colIndex} />
                            })
                        }
                    </div>
                }) }
            </div>
        </div>
        <div>
            {
                hasEnded ? <>
                
                </>
                :
                <>
                    <button
                        className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none'
                        onClick={()=>{
                            store.endTest();
                        }}
                    >Befejezés</button>
                </>
            }
            
        </div>
    </>;
}