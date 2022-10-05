import { COL_COUNT, ROW_COUNT } from './Constants';
import { calcBourdonStats, useTestStore } from './store';
import { formatTime } from '../../util';
import { useTranslation } from 'react-i18next';


export function Score(){

    const [t, i18n] = useTranslation('common');

    let store = useTestStore(state=>state);

    let {time, result, concentration, concentrationStability, concentrationKey} = calcBourdonStats(store.getResults());


    
    return <>
        <div className='flex gap-6 pb-6 overflow-x-auto px-6 sm:px-0 items-start'>
            <div className='card text-center'>
                <p>{t('tests.stats.concentration')}</p>
                <p className='text-lg font-bold'>
                    {t("scoreNames."+concentrationKey)}<br />
                    {concentration.toFixed(2)}%
                </p>
            </div>
            <div className='card text-center'>
                <p>{t('tests.stats.concentrationStability')}</p>
                <p className='text-lg font-bold'>
                    {t("scoreNames."+concentrationKey)}<br />
                    {concentrationStability.toFixed(2)}%
                </p>
            </div>
            <div className='card text-center'>
                <p>{t('tests.time')}</p>
                <p className='text-lg font-bold'>{formatTime(time)}</p>
            </div>
        </div>
    </>
}