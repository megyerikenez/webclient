import create from 'zustand';
import produce from 'immer';

import { COL_COUNT, MAX_TIME, ROW_COUNT } from './Constants';
import { randomInt } from '../../util';

interface SelectedEntry {
    row: number;
    column: number;
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
        // TODO submit test results to api
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
  
