import { COL_COUNT, ROW_COUNT } from './Constants';
import { useTestStore } from './store';
import { formatTime } from '../../util';
import { useTranslation } from 'react-i18next';


export function Score(){

    const [t, i18n] = useTranslation('common');

    let store = useTestStore(state=>state);

    let { selected, letters } = store;

    if (store.endTime === null || store.startTime === null) {
        throw new Error("This branch should be unreachable");
    }

    let linesViewed = 0; // C
    let charsViewed = 0; // N

    let incorrectlyMarked = 0; // O
    let incorrectlyIgnored = 0; // P
    let correctlyMarked = 0; // S
    let correctlyIgnored = 0;

    for(let y = 1; y < letters.length; y++){ // ignore the first row
        let row = letters[y];

        let hasMarked = false;

        for(let x = 0; x < row.length; x++){
            let col = row[x];
            
            let isMarked = store.selected.findIndex(e=>e.column === x && e.row === y) != -1;

            if (isMarked){
                hasMarked = true;
            }

            let shouldMark = row[0] == col;
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
        if (hasMarked){
            linesViewed = y;
        }

    }

    {
        let last = 0;
        for(let i = 1; i < letters[linesViewed].length; i++){
            let isMarked = store.selected.findIndex(e=>e.column === i && e.row === linesViewed) != -1;
            if (isMarked){
                last = i;
            }
        }
        charsViewed = (linesViewed)*(COL_COUNT-1) + last;
    }

    let shouldMark = correctlyMarked + incorrectlyIgnored; // n
    let marked = incorrectlyMarked + correctlyMarked; // M

    let seconds = store.endTime.getTime() - store.startTime.getTime(); // t

    let speedOfAttention = charsViewed/seconds; // A
    let workAccuracy1 = marked/shouldMark; // T1
    let workAccuracy2 =  correctlyMarked/shouldMark; // T2
    let workAccuracy3 =  (marked - incorrectlyMarked)/(marked + incorrectlyIgnored); // T3
    let productivityIndex = charsViewed*workAccuracy2; // E
    let mentalPerformance = (charsViewed/seconds)*((marked-(incorrectlyMarked+incorrectlyIgnored))/shouldMark) // Au
    let concentration =  ((marked-incorrectlyMarked))/shouldMark; // K
    let one = 0;
    if (incorrectlyIgnored == 0 && incorrectlyMarked == 0){
        one = 1;
    }
    let stabilityConcentration = linesViewed*(linesViewed/(incorrectlyIgnored+incorrectlyMarked+one));// Ku
    let capacity = 0.5936 * charsViewed; //V
    let processingRate = (capacity-2.807*(incorrectlyIgnored+incorrectlyMarked))/seconds; //Q

    console.log({
        linesViewed,
        charsViewed,
        speedOfAttention,
        workAccuracy1,
        workAccuracy2,
        workAccuracy3,
        productivityIndex,
        mentalPerformance,
        concentration,
        stabilityConcentration,
        capacity,
        processingRate
    });

    return <>
        
    </>
}