import { COL_COUNT, MAX_TIME, ROW_COUNT } from './Constants';
import { ToulousePieronResult, sendToulousePieron } from '../../api';
import { formatTime, randomInt } from '../../util';

import create from 'zustand';
import { i18next } from '../../i18n';
import produce from 'immer';
import toast from "react-hot-toast";

interface SelectedEntry {
    row: number;
    column: number;
}

export interface ToulousePieronStats {
    time: number;
    score: number;
    result: ToulousePieronResult
}

export function calcToulousePieronStats(result: ToulousePieronResult): ToulousePieronStats {
    let {incorrectlyIgnored, incorrectlyMarked, correctlyMarked, correctlyIgnored} = result;
    let pictureCount = incorrectlyIgnored+incorrectlyMarked+correctlyIgnored+correctlyMarked;
    let score = (pictureCount - (incorrectlyIgnored+incorrectlyMarked))/pictureCount;
    let time = result.endTime.getTime() - result.startTime.getTime();

    return {
        score,
        time,
        result
    }
}

export interface TestState {
    hasStarted: boolean;
    hasEnded: boolean;
    startTime: Date | null;
    endTime: Date | null;
    picturesToFind: number[];
    pictures: number[][];
    selected: SelectedEntry[];
    startTest: () => void;
    endTest: () => void;
    toggleSelected: (y: number, x: number) => void;
    getResults: () => ToulousePieronResult
}



function createData(){
    function randomPicture(): number {
        return randomInt(0,8);
    }
    let picturesToFind: number[] = [];
    while(picturesToFind.length !== 4){
        let n = randomPicture();
        if (picturesToFind.includes(n)){
            continue;
        }
        picturesToFind.push(n);
    }

    let pictures = new Array(ROW_COUNT).fill(null).map(e=>{ // create a 20*20 grid of pictures
        return new Array(COL_COUNT).fill(null).map(_=>randomPicture());
    });
    return {
        picturesToFind,
        pictures
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
    getResults(): ToulousePieronResult {

        if (this.startTime == null || this.endTime == null){
            throw new Error("The test hasn't ended yet.");
        }

        let store = this;

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

        return {
            incorrectlyMarked,
            incorrectlyIgnored,
            correctlyMarked,
            correctlyIgnored,
            startTime:this.startTime,
            endTime:this.endTime
        }
    },
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
    
}));
useTestStore.subscribe((state,prev)=>{
    if(prev.hasEnded == false && state.hasEnded == true){
        let success = i18next.t('loaders.test.success', { ns: 'common' });
        let error = i18next.t('loaders.test.error', { ns: 'common' });
        toast.promise(sendToulousePieron(state.getResults()),
            {
              loading: i18next.t('loaders.test.loading', { ns: 'common' }),
              success: <b>{success}</b>,
              error: <b>{error}</b>,
            }
        );
        
    }
});
