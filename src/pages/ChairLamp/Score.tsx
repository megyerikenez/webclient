import { calcChairLampStats, useTestStore } from './store';

import { PIC_COUNT } from './Constants';
import { ResultItem } from './ResultItem';
import { formatTime } from '../../util';
import { useTranslation } from 'react-i18next';

export function Score(){

    const [t, i18n] = useTranslation('common');

    let store = useTestStore(state => state);

    let stats = calcChairLampStats(store.getResults());

    return <>
        <div className='flex gap-6 pb-6 overflow-x-auto px-6 sm:px-0'>
            <div className='card text-center'>
                <p>{t('tests.performance')}</p>
                <p className='text-lg font-bold'>{(stats.score*100).toFixed(2)}%</p>
            </div>
            <div className='card text-center'>
                <p>{t('tests.stats.correctlyMarked')} ({t('colors.green')})</p>
                <p className='text-lg font-bold'>{stats.result.correctlyMarked}</p>
            </div>
            <div className='card text-center'>
                <p>{t('tests.stats.incorrectlyIgnored')} ({t('colors.purple')})</p>
                <p className='text-lg font-bold'>{stats.result.incorrectlyIgnored}</p>
            </div>
            <div className='card text-center'>
                <p>{t('tests.stats.incorrectlyMarked')} ({t('colors.red')})</p>
                <p className='text-lg font-bold'>{stats.result.incorrectlyMarked}</p>
            </div>
            <div className='card text-center'>
                <p>{t('tests.time')}</p>
                <p className='text-lg font-bold'>
                    {
                        (store.startTime != null && store.endTime != null) ?
                            formatTime(store.endTime.getTime() - store.startTime.getTime()) :
                            ""
                    }
                </p>
            </div>
        </div>
    </>
}