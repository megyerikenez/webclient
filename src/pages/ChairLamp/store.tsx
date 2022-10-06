import { ChairLampResult, ChairLampResultItem, sendChairLamp } from '../../api';
import { MAX_TIME, PIC_COUNT } from './Constants';
import create, { useStore } from 'zustand';

import { PictureCell } from './PictureCell';
import { ResultItem } from './ResultItem';
import { getImgRes } from './Picture';
import produce from 'immer';
import { randomInt } from '../../util';
import shallow from 'zustand/shallow';
import i18next from 'i18next';
import toast from 'react-hot-toast';

export interface ChairLampStats {
    time: number;
    qualityOfAttention: number,
    extentOfAttention: number,
    score: number;
    result: ChairLampResultItem
}

export function calcChairLampStats(res: ChairLampResult): ChairLampStats {
    let time = 0;
    
    let result: ChairLampResultItem = {
        incorrectlyMarked: 0,
        incorrectlyIgnored: 0,
        correctlyMarked: 0,
        correctlyIgnored: 0,
        picturesRevised: 0
    }
    
    let minRevised = Number.MAX_VALUE, maxRevised = 0;
    for (let i = 0; i < res.values.length; i++) {
        const element = res.values[i];
        if(minRevised > element.picturesRevised)
            minRevised = element.picturesRevised;
        if(maxRevised < element.picturesRevised)
            maxRevised = element.picturesRevised;
        result.incorrectlyMarked += element.incorrectlyMarked;
        result.incorrectlyIgnored += element.incorrectlyIgnored;
        result.correctlyMarked += element.correctlyMarked;
        result.correctlyIgnored += element.correctlyIgnored;
        result.picturesRevised += element.picturesRevised;
    }
    
    let qualityOfAttention = (result.incorrectlyMarked + result.incorrectlyIgnored) / result.picturesRevised;
    let extentOfAttention = maxRevised - minRevised;
    let score = (result.picturesRevised - (result.incorrectlyIgnored + result.incorrectlyMarked)) / result.picturesRevised;
    
    return {
        time,
        qualityOfAttention,
        extentOfAttention,
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
            pictureIdx: randomInt(0, 8),
            positionIdx: idx,
            minute: 1,
            revised: false,
            marked: false,
            selected: false
        } as PictureCell;
    }
    let picturesToFind: number[] = [1, 5];
    
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
useTestStore.subscribe((state,prev)=>{
    if(prev.hasEnded == false && state.hasEnded == true){
        let success = i18next.t('loaders.test.success', { ns: 'common' });
        let error = i18next.t('loaders.test.error', { ns: 'common' });
        toast.promise(sendChairLamp(state.getResults()),
            {
              loading: i18next.t('loaders.test.loading', { ns: 'common' }),
              success: <b>{success}</b>,
              error: <b>{error}</b>,
            }
        );
        
    }
});
