import { MAX_TIME, PIC_COUNT } from './Constants';

import { PictureCell } from './PictureCell';
import create from 'zustand';
import produce from 'immer';
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
    picturesToFind: number[];
    pictures: PictureCell[];
    picturesRevised: number;
    startTest: () => void;
    endTest: () => void;
    toggleMarked: (marked: boolean) => void;
}

function createData(){
    function randomPicture(idx: number): PictureCell {
        return {
            pictureIdx: randomInt(0, 5),
            positionIdx: idx,
            minute: 1,
            revised: false,
            marked: false,
            selected: false
        } as PictureCell;
    }
    let picturesToFind: number[] = [0, 2];
    
    let pictureCount = 0;
    let pictures = new Array(PIC_COUNT).fill(null).map(() => randomPicture(pictureCount++));   
    pictures[0].selected = true;

    return {
        picturesToFind,
        pictures,
    }
}

export const useTestStore = create<TestState>((set) => ({
    hasStarted: false,
    hasEnded: false,
    startTime: null,
    endTime: null,
    selected: [],
    picturesRevised: 0,
    ...createData(),
    startTest: () => set((state) => {
        setTimeout(() => {
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
    toggleMarked: (marked) => set(produce((state: TestState) => {
        state.pictures.map(pic => pic.selected = false);
        let elem = state.pictures.find((e) => e.positionIdx === state.picturesRevised);
        if (elem !== undefined){
            
            state.pictures[state.picturesRevised].marked = marked;
            state.pictures[state.picturesRevised].revised = true;
            
            if(state.startTime != undefined)
                state.pictures[state.picturesRevised].minute = Math.ceil((Date.now() - state.startTime.getTime()) / 60000);
            if(state.picturesRevised+1 < state.pictures.length)
                state.pictures[state.picturesRevised+1].selected = true;
            state.picturesRevised++;
            
        }
    })),
    
}));
