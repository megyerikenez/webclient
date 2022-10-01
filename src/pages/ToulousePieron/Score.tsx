import { COL_COUNT, ROW_COUNT } from './Constants';
import { useTestStore } from './store';
import { formatTime } from './util';


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
        <div>Ennyi időt töltött a teszt kitöltésével: {formatTime(store.endTime.getTime() - store.startTime.getTime())}</div>
        <div className='text-green-900 font-bold'>Megtalált: {correctlyMarked}</div>
        <div className='text-purple-900 font-bold'>Megtalálatlan: {incorrectlyIgnored}</div>
        <div className='text-rose-900 font-bold'>Helytelenül jelölt: {incorrectlyMarked}</div>
        {/* <div>Helyesen jelöletlen: {correctlyIgnored}</div> */}
        <div>Teljesítmény: {(score*100).toFixed(2)}%</div>
    </>
}