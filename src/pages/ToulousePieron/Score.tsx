import { COL_COUNT, ROW_COUNT } from './Constants';
import { useTestStore } from './store';
import { formatTime } from '../../util';


export function Score(){

    let store = useTestStore(state=>state);

    if (store.endTime === null || store.startTime === null) {
        throw new Error("This branch should be unreachable");
    }

    let incorrectlyMarked = 0;
    let incorrectlyIgnored = 0;
    let correctlyMarked = 0;
    let correctlyIgnored = 0;

    for(let y = 1; y < store.pictures.length; y++){ // ignore the first row
        let row = store.pictures[y];
        for(let x = 0; x < row.length; x++){
            let col = row[x];
            
            let isMarked = store.selected.findIndex(e=>e.column === x && e.row === y) != -1;
            let shouldMark = store.picturesToFind.includes(col);
            if (isMarked && shouldMark){
                correctlyMarked++;
            } else if (!isMarked && shouldMark){
                incorrectlyIgnored++;
            } else if (isMarked && !shouldMark){
                incorrectlyMarked++;
            } else if (!isMarked && !shouldMark){
                correctlyIgnored++;
            }
        }
    }
    
    let pictureCount = (ROW_COUNT-1)*(COL_COUNT);

    let score = (pictureCount - (incorrectlyIgnored+incorrectlyMarked))/pictureCount;

    return <>
        <div className='flex gap-6 pb-6 overflow-x-auto px-6 sm:px-0'>
            <div className='card text-center'>
                <p>Teljesítmény</p>
                <p className='text-lg font-bold'>{(score*100).toFixed(2)}%</p>
            </div>
            <div className='card text-center'>
                <p>Megtalált (zöld)</p>
                <p className='text-lg font-bold'>{correctlyMarked}</p>
            </div>
            <div className='card text-center'>
                <p>Megtalálatlan (lila)</p>
                <p className='text-lg font-bold'>{incorrectlyIgnored}</p>
            </div>
            <div className='card text-center'>
                <p>Hibás (piros)</p>
                <p className='text-lg font-bold'>{incorrectlyMarked}</p>
            </div>
            <div className='card text-center'>
                <p>Idő</p>
                <p className='text-lg font-bold'>{formatTime(store.endTime.getTime() - store.startTime.getTime())}</p>
            </div>
        </div>
    </>
}