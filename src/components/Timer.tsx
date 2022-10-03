import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatTime } from "../util";

export function Timer(props: {startTime: Date, maxTime: number}){

    const [t, i18n] = useTranslation('common');

    function getDiff(){
        return Date.now() - props.startTime.getTime();
    }

    let [diff, setDiff] = useState(getDiff());

    useEffect(()=>{
        let interval = setInterval(()=>{
            setDiff(getDiff());
        },1000);

        return ()=>{
            clearInterval(interval);
        }
    })

    let timeForTask = props.maxTime;
    let timeLeft = timeForTask - diff;

    if (timeLeft < 0){
        timeLeft = 0;
    }

    return <>
        <div
            className="card"
            style={{
                display: 'inline-block',
                textAlign: 'center',
            }}
        >
            <div>{t('tests.timeRemaining')}</div>
            <div>{formatTime(timeLeft)}</div>
        </div>
    </>
}