import create from 'zustand';
import produce from 'immer';

import { COL_COUNT, MAX_TIME, ROW_COUNT } from './Constants';
import { randomInt } from '../../util';
import { BourdonResult, sendBourdon } from '../../api';
import { i18next } from '../../i18n';
import toast from 'react-hot-toast';

interface SelectedEntry {
    row: number;
    column: number;
}

export function calcBourdonStats(result: BourdonResult){
    let { linesViewed, correctlyIgnored, correctlyMarked, charsViewed, incorrectlyIgnored, incorrectlyMarked, startTime, endTime } = result;

    let shouldMark = correctlyMarked + incorrectlyIgnored; // n
    let marked = incorrectlyMarked + correctlyMarked; // M

    let seconds = endTime.getTime() - startTime.getTime(); // t

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
    let concentrationStability = linesViewed*(linesViewed/(incorrectlyIgnored+incorrectlyMarked+one));// Ku
    let capacity = 0.5936 * charsViewed; //V
    let processingRate = (capacity-2.807*(incorrectlyIgnored+incorrectlyMarked))/seconds; //Q

    let concentrationKey = "veryBad";

    if (concentration > 0.20){
        concentrationKey = "bad";
    }
    if (concentration > 0.40){
        concentrationKey = "average";
    }
    if (concentration > 0.60){
        concentrationKey = "good";
    }
    if (concentration > 0.80){
        concentrationKey = "veryGood";
    }

    let concentrationStabilityKey = "low";

    if (concentrationStability > 65.7){
        concentrationStabilityKey = "average";
    }
    if (concentrationStability > 111.1){
        concentrationStabilityKey = "high";
    }
    if (concentrationStability > 219.7){
        concentrationStabilityKey = "veryHigh";
    }

    return ({
        time:seconds,
        linesViewed,
        charsViewed,
        speedOfAttention,
        workAccuracy1,
        workAccuracy2,
        workAccuracy3,
        productivityIndex,
        mentalPerformance,
        concentration,
        concentrationStability,
        capacity,
        processingRate,

        concentrationKey,

        result
    });
}

interface TestState {
    hasStarted: boolean;
    hasEnded: boolean;
    startTime: Date | null;
    endTime: Date | null;
    letters: string[][];
    selected: SelectedEntry[];
    startTest: () => void;
    endTest: () => void;
    toggleSelected: (y: number, x: number) => void;
    getResults: () => BourdonResult;
}



function createData(){
    let lettersArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    function randomLetter(): string {
        return lettersArray[randomInt(0,lettersArray.length)];
    }

    let letters = new Array(ROW_COUNT).fill(null).map(e=>{ // create a 20*20 grid of pictures
        return new Array(COL_COUNT).fill(null).map(_=>randomLetter());
    });
    return {
        letters
    }
}

export const useTestStore = create<TestState>((set) => ({
    hasStarted: false,
    hasEnded: false,
    startTime: null,
    endTime: null,
    selected: [],
    ...createData(),
    startTest: () => set((state) => {
        setTimeout(()=>{
            if (!useTestStore.getState().hasEnded){
                useTestStore.getState().endTest();
            }
        },MAX_TIME);

        return { hasStarted: true, startTime: new Date() };
    }),
    endTest: () => set((state) => {
        return { hasEnded: true, endTime: new Date() };
    }),
    toggleSelected: (row, col) => set(produce((state: TestState)=>{
        let i = state.selected.findIndex((e)=>e.column === col && e.row === row);
        if (i === -1){
            state.selected.push({
                row: row,
                column: col,
            })
        } else {
            state.selected.splice(i,1);
        }
    })),
    getResults() {
        if (this.startTime == null || this.endTime == null){
            throw new Error("The test hasn't ended yet.");
        }

        let { letters } = this;

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
                
                let isMarked = this.selected.findIndex(e=>e.column === x && e.row === y) != -1;

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
                let isMarked = this.selected.findIndex(e=>e.column === i && e.row === linesViewed) != -1;
                if (isMarked){
                    last = i;
                }
            }
            charsViewed = (linesViewed)*(COL_COUNT-1) + last;
        }

        

        return {
            incorrectlyIgnored,
            incorrectlyMarked,
            correctlyIgnored,
            correctlyMarked,
            linesViewed,
            charsViewed,
            startTime:this.startTime,
            endTime:this.endTime,
        }
    },
}));
  
useTestStore.subscribe((state,prev)=>{
    if(prev.hasEnded == false && state.hasEnded == true){
        let success = i18next.t('loaders.test.success', { ns: 'common' });
        let error = i18next.t('loaders.test.error', { ns: 'common' });
        toast.promise(sendBourdon(state.getResults()),
            {
              loading: i18next.t('loaders.test.loading', { ns: 'common' }),
              success: <b>{success}</b>,
              error: <b>{error}</b>,
            }
        );
    }
});
