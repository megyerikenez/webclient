import { COL_COUNT, MAX_TIME, ROW_COUNT } from './Constants';

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
            revised: false,
            marked: false,
            selected: false
        } as PictureCell;
    }
    let picturesToFind: number[] = [0, 2];
    /* while(picturesToFind.length !== 4){
        let n = randomPicture();
        if (picturesToFind.includes(n)){
            continue;
        }
        picturesToFind.push(n);
    } */
    
    let pictureCount = 0;
    let pictures = new Array(200).fill(null).map(() => randomPicture(pictureCount++));   
    pictures[0].revised = true;
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
    toggleMarked: (marked) => set(produce((state: TestState)=>{
        state.pictures.map(pic => pic.selected = false);
        let elem = state.pictures.find((e) => e.positionIdx === state.picturesRevised);
        if (elem !== undefined){
            elem.marked = marked;
            elem.revised = true;
            elem.selected = true;
            state.picturesRevised++;
        }
    })),
    
}));
  
