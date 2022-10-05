import { ChairLampResult, ChairLampResultItem } from '../../api';
import { MAX_TIME, PIC_COUNT } from './Constants';
import create, { useStore } from 'zustand';

import { PictureCell } from './PictureCell';
import { ResultItem } from './ResultItem';
import produce from 'immer';
import { randomInt } from '../../util';
import shallow from 'zustand/shallow';

export interface ChairLampStats {
    time: number;
    score: number;
    result: ChairLampResultItem
}

export function calcChairLampStats(res: ChairLampResult): ChairLampStats {
    /* let {incorrectlyIgnored, incorrectlyMarked, correctlyMarked, correctlyIgnored} = result;
    let pictureCount = incorrectlyIgnored + incorrectlyMarked+correctlyIgnored+correctlyMarked;
    let score = (pictureCount - (incorrectlyIgnored+incorrectlyMarked))/pictureCount;
    let time = result.endTime.getTime() - result.startTime.getTime(); */
    //let score = 0;
    let time = 0;
    
    let result: ChairLampResultItem = {
        incorrectlyMarked: 0,
        incorrectlyIgnored: 0,
        correctlyMarked: 0,
        correctlyIgnored: 0,
        picturesRevised: 0
    }
    
    for (let i = 0; i < res.values.length; i++) {
        const element = res.values[i];
        result.incorrectlyMarked += element.incorrectlyMarked;
        result.incorrectlyIgnored += element.incorrectlyIgnored;
        result.correctlyMarked += element.correctlyMarked;
        result.correctlyIgnored += element.correctlyIgnored;
        result.picturesRevised += element.picturesRevised;
    }
    console.log(result);
    
    
    let score = (result.picturesRevised - (result.incorrectlyIgnored + result.incorrectlyMarked)) / result.picturesRevised;
    
    return {
        time,
        score,
        result
    }
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
    getResults: () => ChairLampResult
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
    getResults(): ChairLampResult {

        this.endTime = new Date();
        
        if (this.startTime == null || this.endTime == null){
            throw new Error("The test hasn't ended yet.");
        }

        let store = this;

        let res: ChairLampResultItem = {
            incorrectlyMarked: 0,
            incorrectlyIgnored: 0,
            correctlyMarked: 0,
            correctlyIgnored: 0,
            picturesRevised: 0,
        }

        let result: ChairLampResult = {
            startTime: this.startTime,
            endTime: this.endTime,
            values: [
                {...res},
                {...res},
                {...res},
                {...res},
                {...res}
            ]
        };
        
        for(let i = 0; i < store.picturesRevised; i++){
            let item = store.pictures[i];
            
            let isMarked = item.marked;
            let shouldMark = store.picturesToFind.includes(item.pictureIdx);

            result.values[item.minute-1].picturesRevised++;
            
            if (isMarked && shouldMark){
                result.values[item.minute-1].correctlyMarked++;
            } else if (!isMarked && shouldMark){
                result.values[item.minute-1].incorrectlyIgnored++;
            } else if (isMarked && !shouldMark){
                result.values[item.minute-1].incorrectlyMarked++;
            } else if (!isMarked && !shouldMark){
                result.values[item.minute-1].correctlyIgnored++;
            }
        }

        return result;

    },
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
            
            state.picturesRevised++;
            
            if(state.picturesRevised < state.pictures.length)
                state.pictures[state.picturesRevised].selected = true;
            
        }
        
    })),
    
}));
