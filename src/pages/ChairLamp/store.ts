import { ChairLampResult, ChairLampResultAll, ChairLampResultItem } from '../../api';
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
    result: ChairLampResultAll
}

export function calcChairLampStats(result: ChairLampResultAll): ChairLampStats {
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

        console.log(this.startTime, this.endTime);
        this.endTime = new Date();
        
        if (this.startTime == null || this.endTime == null){
            throw new Error("The test hasn't ended yet.");
        }

        let store = this;

        let incorrectlyMarked = 0;
        let incorrectlyIgnored = 0;
        let correctlyMarked = 0;
        let correctlyIgnored = 0;

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

        for(let i = 0; i <= store.picturesRevised; i++){
            let item = store.pictures[i];
            let isMarked = item.marked;
            let shouldMark = store.picturesToFind.includes(item.pictureIdx);
            
            if (isMarked && shouldMark){
                correctlyMarked++;
                result.values[item.minute-1].correctlyMarked++;
            } else if (!isMarked && shouldMark){
                incorrectlyIgnored++;
                result.values[item.minute-1].incorrectlyIgnored++;
            } else if (isMarked && !shouldMark){
                incorrectlyMarked++;
                result.values[item.minute-1].incorrectlyMarked++;
            } else if (!isMarked && !shouldMark){
                correctlyIgnored++;
                result.values[item.minute-1].correctlyIgnored++;
            }
        }
        console.log(result);

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
            if(state.picturesRevised+1 < state.pictures.length)
                state.pictures[state.picturesRevised+1].selected = true;
            state.picturesRevised++;
            
        }
    })),
    
}));
