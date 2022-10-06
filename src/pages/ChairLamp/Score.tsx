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
        <div className='flex gap-6 pb-6 overflow-x-auto px-6 sm:px-0 justify-center'>
            <div className='card text-center flex flex-col justify-center'>
                <p>{t('tests.qualityOfAttention')}</p>
                <p className='text-lg font-bold'>{(stats.qualityOfAttention*100).toFixed(2)}%</p>
            </div>
            <div className='card text-center flex flex-col justify-center'>
                <p>{t('tests.extentOfAttention')}</p>
                <p className='text-lg font-bold'>{stats.extentOfAttention}</p>
            </div>
            <div className='card text-center max-w-none flex flex-col justify-center'>
                <p>{t('tests.qualityOfAttentionByMinute')}</p>
                <table className='text-lg font-bold'>
                    <tr>
                        <td className='px-2'>1. perc</td>
                        <td className='px-2'>2. perc</td>
                        <td className='px-2'>3. perc</td>
                        <td className='px-2'>4. perc</td>
                        <td className='px-2'>5. perc</td>
                    </tr>
                    <tr>
                    {(stats.qualityOfAttentionByMinute.map((x) => (isNaN(x) ? <td>-</td> : <td>{Math.round(x*100)} %</td>)))}
                    </tr>
                </table>
            </div>
        </div>
        <div className='flex gap-6 pb-6 overflow-x-auto px-6 sm:px-0 justify-center'>
            <div className='card text-center flex flex-col justify-center'>
                <p>{t('tests.stats.correctlyMarked')} ({t('colors.green')})</p>
                <p className='text-lg font-bold'>{stats.result.correctlyMarked}</p>
            </div>
            <div className='card text-center flex flex-col justify-center'>
                <p>{t('tests.stats.incorrectlyIgnored')} ({t('colors.purple')})</p>
                <p className='text-lg font-bold'>{stats.result.incorrectlyIgnored}</p>
            </div>
            <div className='card text-center flex flex-col justify-center'>
                <p>{t('tests.stats.incorrectlyMarked')} ({t('colors.red')})</p>
                <p className='text-lg font-bold'>{stats.result.incorrectlyMarked}</p>
            </div>
            <div className='card text-center flex flex-col justify-center'>
                <p>{t('tests.performance')}</p>
                <p className='text-lg font-bold'>{(stats.score*100).toFixed(2)}%</p>
            </div>
            <div className='card text-center flex flex-col justify-center'>
                <p>{t('tests.time')}</p>
                <p className='text-lg font-bold'>
                    {
                        (store.startTime != null && store.endTime != null) ?
                            formatTime(store.endTime.getTime() - store.startTime.getTime()) : ""
                    }
                </p>
            </div>
        </div>
    </>
}