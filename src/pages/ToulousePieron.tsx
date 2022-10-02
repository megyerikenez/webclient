import React, { useState, useEffect } from 'react';
import { COL_COUNT, MAX_TIME, ROW_COUNT } from './ToulousePieron/Constants';
import { Corner } from './ToulousePieron/Corner';
import { Side } from './ToulousePieron/Side';
import { useTestStore } from './ToulousePieron/store';
import { formatTime } from '../util';
import { Picture } from './ToulousePieron/Picture';
import { Timer } from '../components/Timer';
import { GridItem } from './ToulousePieron/GridItem';
import shallow from 'zustand/shallow'
import { Score } from './ToulousePieron/Score';
import Navbar from '../components/Navbar';
import { useTranslation } from 'react-i18next';

export function ToulousePieronPage(){
    return <>
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ToulousePieron />
        </div>
      </main>
    
    </>
}

export function ToulousePieron(){

    const [t, i18n] = useTranslation('common');

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
            <div className='px-6'>
                <h1 className='mb-6'>{t('tests.toulousePieron.name')}</h1>
                <p>{t('tests.toulousePieron.description.1')}</p>
                <p>{t('tests.toulousePieron.description.2')}</p>
                <div className='my-2'>
                    { squares.map((index)=>{
                        return <>
                            <Picture value={index} />
                        </>
                    }) }
                </div>
                <p>{t('tests.toulousePieron.description.3')}</p>
                <button
                    className='mt-6 button-primary'
                    onClick={()=>{
                        store.startTest();
                    }}
                >{t('tests.actions.start')}</button>
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
                            <p>{t('tests.toulousePieron.shapesToMark')}</p>
                            { store.picturesToFind.map(pic=>{
                                return <>
                                    <Picture value={pic} />
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
                        <span
                            className='font-sm w-8'
                            style={{
                                display: 'flex',
                                flexShrink: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexGrow: 1,
                            }}
                        >{index+1}</span>
                        </>
                    })}
                </div>

                <div
                    style={{
                        overflowX: 'auto',
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
                        {
                            row.map((col, colIndex)=>{
                                return <GridItem row={index} column={colIndex} />
                            })
                        }
                    </div>
                }) }
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
                        onClick={()=>{
                            store.endTest();
                        }}
                    >{t('tests.actions.end')}</button>
                </>
            }
            
        </div>
    </>;
}