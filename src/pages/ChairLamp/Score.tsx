import { PIC_COUNT } from './Constants';
import { ResultItem } from './ResultItem';
import { formatTime } from '../../util';
import { useTestStore } from './store';
import { useTranslation } from 'react-i18next';

export function Score(){

    const [t, i18n] = useTranslation('common');

    let store = useTestStore(state => state);

    if (store.endTime === null || store.startTime === null) {
        throw new Error("This branch should be unreachable");
    }

    let incorrectlyMarked = 0;
    let incorrectlyIgnored = 0;
    let correctlyMarked = 0;
    let correctlyIgnored = 0;

    let res = {
        incorrectlyMarked: 0,
        incorrectlyIgnored: 0,
        correctlyMarked: 0,
        correctlyIgnored: 0,
        picturesRevised: 0,
    }

    let result = [
        {...res} as ResultItem,
        {...res} as ResultItem,
        {...res} as ResultItem,
        {...res} as ResultItem,
        {...res} as ResultItem
    ]

    for(let i = 0; i < store.pictures.length; i++){
        let item = store.pictures[i];
        let isMarked = item.marked;
        let shouldMark = store.picturesToFind.includes(item.pictureIdx);
        
        if(item.minute != undefined)
            result[0].incorrectlyIgnored++;
        
        if (isMarked && shouldMark){
            correctlyMarked++;
            if(item.minute != undefined)
                result[0].correctlyMarked++;
        } else if (!isMarked && shouldMark){
            incorrectlyIgnored++;
            if(item.minute != undefined)
                result[0].incorrectlyIgnored++;
        } else if (isMarked && !shouldMark){
            incorrectlyMarked++;
            if(item.minute != undefined)
                result[0].incorrectlyMarked++;
        } else if (!isMarked && !shouldMark){
            correctlyIgnored++;
            if(item.minute != undefined)
                result[0].correctlyIgnored++;
        }
    }
    
    
    let pictureCount = PIC_COUNT;

    let score = (pictureCount - (incorrectlyIgnored+incorrectlyMarked))/pictureCount;

    return <>
        <div className='flex gap-6 pb-6 overflow-x-auto px-6 sm:px-0'>
            <div className='card text-center'>
                <p>{t('tests.performance')}</p>
                <p className='text-lg font-bold'>{(score*100).toFixed(2)}%</p>
            </div>
            <div className='card text-center'>
                <p>{t('tests.stats.correctlyMarked')} ({t('colors.green')})</p>
                <p className='text-lg font-bold'>{correctlyMarked}</p>
            </div>
            <div className='card text-center'>
                <p>{t('tests.stats.incorrectlyIgnored')} ({t('colors.purple')})</p>
                <p className='text-lg font-bold'>{incorrectlyIgnored}</p>
            </div>
            <div className='card text-center'>
                <p>{t('tests.stats.incorrectlyMarked')} ({t('colors.red')})</p>
                <p className='text-lg font-bold'>{incorrectlyMarked}</p>
            </div>
            <div className='card text-center'>
                <p>{t('tests.time')}</p>
                <p className='text-lg font-bold'>{formatTime(store.endTime.getTime() - store.startTime.getTime())}</p>
            </div>
        </div>
    </>
}