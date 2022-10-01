import React, { useState, useEffect } from 'react';
import { Corner } from './ToulousePieron/Corner';
import { Side } from './ToulousePieron/Side';

let MAX_TIME = 5*60*1000;
let ROW_COUNT = 5;
let COL_COUNT = 20;

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function createData(){
    function randomPicture(): number {
        return randomInt(0,8);
    }
    let picturesToFind: number[] = [];
    while(picturesToFind.length != 4){
        let n = randomPicture();
        if (picturesToFind.includes(n)){
            continue;
        }
        picturesToFind.push(n);
    }

    let rows = new Array(ROW_COUNT).fill(null).map(e=>{ // create a 20*20 grid of pictures
        return new Array(COL_COUNT).fill(null).map(_=>randomPicture());
    });
    return {
        picturesToFind,
        rows
    }
}
function Picture(props: {value: number}){
    let { value } = props;

    let P = value % 2 == 0 ? Corner : Side;

    let rotation = Math.floor(value / 2);

    let style = {
        transform: `rotate(${90*rotation}deg)`,
        display: 'inline-block',
    }

    return <>
        <span style={style}>
            <P/>
        </span>
    </>
}

function formatTime(ms: number){
    let minutes = Math.floor(ms / 1000 / 60);
    let seconds = Math.floor(ms / 1000 - minutes * 60);

    return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

function Timer(props: {startTime: Date}){

    function getDiff(){
        return Date.now() - props.startTime.getTime();
    }

    let [diff, setDiff] = useState(getDiff());

    useEffect(()=>{
        let interval = setInterval(()=>{
            setDiff(getDiff());
        },1000);

        return ()=>{
            clearInterval(interval);
        }
    })

    let timeForTask = MAX_TIME;
    let timeLeft = timeForTask - diff;

    if (timeLeft < 0){
        timeLeft = 0;
    }

    return <>
        <div
            style={{
                position: 'sticky',
                display: 'inline-block',
                top: 0,
                margin: '0 auto',
                zIndex: 1,
                textAlign: 'center',
            }}
        >
            <div>Hátralévő idő</div>
            <div>{formatTime(timeLeft)}</div>
        </div>
    </>
}

interface StartData {
    hasStarted: boolean,
    hasEnded: boolean,
    startTime: Date | null,
    endTime: Date | null,
}
interface SelectedEntry {
    row: number,
    column: number
}

export function ToulousePieron(){
    let [data, setData] = useState(createData());
    
    let [startData, setStartData] = useState<StartData>({
        hasStarted: false,
        hasEnded: false,
        startTime: null,
        endTime: null,
    });

    let [selected, setSelected] = useState<SelectedEntry[]>([]);

    if (!startData.hasStarted || startData.startTime == null){
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
                        setStartData({
                            hasStarted: true,
                            startTime: new Date(),
                            hasEnded: false,
                            endTime: null,
                        })
                    }}
                >Kezdés</button>
            </div>
        </>
    }

    let hasEnded = startData.hasEnded && startData.endTime;

    function EndStats(){

        if (startData.endTime == null || startData.startTime == null) {
            throw new Error(); // unreachable
        }

        let incorrctlyTicked = 0;
        let incorrectlyIgnored = 0;
        let correctlyTicked = 0;
        let correctlyIgnored = 0;

        for(let y = 1; y < data.rows.length; y++){ // ignore the first row
            let row = data.rows[y];
            for(let x = 0; x < row.length; x++){
                let col = row[x];
                
                let isMarked = selected.findIndex(e=>e.column == x && e.row == y) != -1;
                let shouldMark = data.picturesToFind.includes(col);
                if (isMarked && shouldMark){
                    correctlyTicked++;
                } else if (!isMarked && shouldMark){
                    incorrectlyIgnored++;
                } else if (isMarked && !shouldMark){
                    incorrctlyTicked++;
                } else if (!isMarked && !shouldMark){
                    correctlyIgnored++;
                }
            }
        }
        
        let pictureCount = (ROW_COUNT-1)*(COL_COUNT);
        let revised = correctlyTicked+incorrctlyTicked;


        let score = (pictureCount - (incorrectlyIgnored+incorrctlyTicked))/pictureCount;

        return <>
            <div>Ennyi időt töltött a teszt kitöltésével: {formatTime(startData.endTime.getTime() - startData.startTime.getTime())}</div>
            <div className='text-green-900 font-bold'>Megtalált: {correctlyTicked}</div>
            <div className='text-purple-900 font-bold'>Megtalálatlan: {incorrectlyIgnored}</div>
            <div className='text-rose-900 font-bold'>Helytelenül jelölt: {incorrctlyTicked}</div>
            {/* <div>Helyesen jelöletlen: {correctlyIgnored}</div> */}
            <div>Teljesítmény: {(score*100).toFixed(2)}%</div>
        </>
    }

    

    return <>
        <div>
            {
                hasEnded ? <>
                    <EndStats/>
                </>
                :
                <>
                    <Timer startTime={startData.startTime} />
                </>
            }

            
            <div>
                { data.picturesToFind.map(pic=>{
                    return <>
                        <Picture value={pic} />
                    </>
                }) }
            </div>
            <div>
                { data.rows.map((row, index)=>{
                    return <div>
                        <span>{index+1}</span>

                        {
                            row.map((col, colIndex)=>{
                                function SelectableSquare(){
                                    let [isSelected, setIsSelected] = useState(false);
                                    
                                    isSelected = isSelected || selected.findIndex(e=>e.column == colIndex && e.row == index) != -1;

                                    let shouldMark = data.picturesToFind.includes(col);

                                    let bg = 'bg-transparent';

                                    if (!hasEnded){
                                        if (isSelected){
                                            bg = 'bg-slate-200';
                                        }
                                    } else {
                                        if (isSelected && shouldMark){
                                            bg = 'bg-lime-200';
                                        } else if (isSelected && !shouldMark){
                                            bg = 'bg-rose-300';
                                        } else if (!isSelected && shouldMark){
                                            bg = 'bg-purple-200';
                                        }
                                    }

                                    return <>
                                        <button

                                            className={bg}

                                            style={{
                                                borderRadius: '50%',
                                                display: 'inline-flex'
                                            }}
                                            onClick={()=>{
                                                let i = selected.findIndex((e)=>e.column == colIndex && e.row == index);
                                                if (i == -1){
                                                    selected.push({
                                                        row: index,
                                                        column: colIndex,
                                                    })
                                                } else {
                                                    selected.splice(i,1);
                                                }
                                                setIsSelected(!isSelected);

                                                //setSelected([...selected]);
                                            }}
                                        >
                                            <Picture value={col} />
                                        </button>
                                    </>
                                }

                                return <SelectableSquare />
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
                            setStartData({
                                ...startData,
                                hasEnded: true,
                                endTime: new Date(),
                            })
                        }}
                    >Befejezés</button>
                </>
            }
            
        </div>
    </>;
}