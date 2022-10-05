import { COL_COUNT, ROW_COUNT } from './Constants';
import { calcToulousePieronStats, TestState, useTestStore } from './store';
import { formatTime } from '../../util';
import { useTranslation } from 'react-i18next';


export function Score(){

    const [t, i18n] = useTranslation('common');

    let store = useTestStore(state=>state);

    if (store.endTime === null || store.startTime === null) {
        throw new Error("This branch should be unreachable");
    }

    let {time, score, result} = calcToulousePieronStats(store.getResults());
    let {incorrectlyIgnored, incorrectlyMarked, correctlyMarked, correctlyIgnored} = result;

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
                <p className='text-lg font-bold'>{formatTime(time)}</p>
            </div>
        </div>
    </>
}